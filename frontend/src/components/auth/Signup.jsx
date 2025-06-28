import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const validateForm = () => {
        const { fullname, email, phoneNumber, password, role } = input;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[6-9]\d{9}$/;

        if (!fullname.trim()) {
            toast.error("Full name is required");
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error("Enter a valid email address");
            return false;
        }
        if (!phoneRegex.test(phoneNumber)) {
            toast.error("Enter a valid 10-digit phone number starting with 6-9");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return false;
        }
        if (!role) {
            toast.error("Please select a role");
            return false;
        }
        return true;
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, []);

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-slate-50 px-4">
                <form
                    onSubmit={submitHandler}
                    className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-8 shadow-md"
                >
                    <h1 className="text-2xl font-semibold text-slate-800 mb-6 text-center">Create an Account</h1>

                    <div className="mb-4">
                        <Label className="text-slate-700">Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Ishaan"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-slate-700">Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="abc@gmail.com"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-slate-700">Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="6230XXXXXX"
                            className="mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <Label className="text-slate-700">Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="••••••••"
                            className="mt-1"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start mb-6">
                        <div>
                            <Label className="text-slate-700 block mb-2">Role</Label>
                            <RadioGroup className="flex items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label className="cursor-pointer text-slate-700">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label className="cursor-pointer text-slate-700">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div>
                            <Label className="text-slate-700 block mb-2">Profile Picture</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-indigo-600 hover:bg-indigo-700 text-white">
                            Signup
                        </Button>
                    )}

                    <p className="text-sm text-center text-slate-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 hover:underline font-medium">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
