import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import nodemailer from 'nodemailer';
import dotenv from "dotenv";


dotenv.config();
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        const job = await Job.findById(jobId).populate("company");
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();


        await newApplication.populate("applicant");
        const userEmail = newApplication.applicant.email;
        const userName = newApplication.applicant.fullname;

        if (userEmail) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            });

            const mailOptions = {
                from: `"GetPlaced Jobs" <ishaansammi004@gmail.com>`,
                to: userEmail,
                subject: `Application Received for ${job.title}`,
                html: `
                    <div>
                        <h2>Hi ${userName},</h2>
                        <p>Thank you for applying for the position of <strong>${job.title}</strong> at <strong>${job.company.name}</strong>.</p>
                        <p>We have received your application and our team will review it shortly.</p>
                        <br/>
                        <p>Regards,<br/>GetPlaced Team</p>
                    </div>
                `
            };

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.error("Error sending application email:", err);
                } else {
                    console.log("Application confirmation email sent:", info.response);
                }
            });
        }

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            })
        };
        return res.status(200).json({
            job,
            succees: true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        };


        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        };


        application.status = status.toLowerCase();
        await application.save();



        await application.populate("applicant");


        const userEmail = application.applicant.email;
        const userName = application.applicant.fullname;
        if (!userEmail) {
            console.error("User email is undefined.");
            return;
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        });

        const mailOptions = {
            from: `"GetPlaced Jobs" <ishaansammi004@gmail.com>`,
            to: userEmail,
            subject: `Application ${status} Notification`,
            html: `
        <div>
            <h2>Hi ${userName},</h2>
            <p>Your application status for the job has been <strong>${status.toLowerCase()}</strong>.</p>
            <p>Thank you for applying!</p>
            <br/>
            <p>Regards,<br/>GetPlaced Team</p>
        </div>
    `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending email:", err);
            } else {
                console.log("Email sent:", info.response);
            }
        });




        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });

    } catch (error) {
        console.log(error);
    }
}











