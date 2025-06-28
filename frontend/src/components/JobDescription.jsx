import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const isInitiallyApplied =
    singleJob?.applications?.some(application => application.applicant === user?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)

  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })

      if (res.data.success) {
        setIsApplied(true)
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Failed to apply')
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job))
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  return (
    <div className="max-w-7xl mx-auto my-12 px-6 sm:px-8 bg-gradient-to-b from-[#fef6f6] via-[#fdeeee] to-[#fbdcdc] rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="font-extrabold text-3xl text-[#6b2135]">{singleJob?.title}</h1>
          <div className="flex flex-wrap gap-3 mt-5">
            <Badge variant="ghost" className="text-[#4a148c] font-semibold border-[#7e57c2]">
              {singleJob?.postion} Positions
            </Badge>
            <Badge variant="ghost" className="text-[#b71c1c] font-semibold border-[#ef5350]">
              {singleJob?.jobType}
            </Badge>
            <Badge variant="ghost" className="text-[#2e7d32] font-semibold border-[#66bb6a]">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg px-6 py-2 font-semibold transition-colors duration-300 ${
            isApplied
              ? 'bg-[#9e9e9e] cursor-not-allowed text-[#e0e0e0]'
              : 'bg-[#6a1b9a] hover:bg-[#4a148c] text-white'
          }`}
        >
          {isApplied ? 'Already Applied' : 'Apply Now'}
        </Button>
      </div>

      <h2 className="border-b-2 border-[#b45309] font-semibold text-xl pb-3 mb-6 text-[#78350f]">
        Job Description
      </h2>

      <div className="space-y-4 max-w-3xl">
        {[
          ['Role', singleJob?.title],
          ['Location', singleJob?.location],
          ['Description', singleJob?.description],
          ['Experience', singleJob?.experience ? `${singleJob.experience} yrs` : null],
          ['Salary', singleJob?.salary ? `${singleJob.salary} LPA` : null],
          ['Total Applicants', singleJob?.applications?.length ?? 0],
          ['Posted Date', singleJob?.createdAt ? singleJob.createdAt.split('T')[0] : null],
        ].map(([label, value], idx) => (
          <p key={idx} className="text-[#4a148c] text-lg">
            <span className="font-bold text-[#311b92]">{label}:</span>{' '}
            <span className="text-[#311b92]">{value ?? 'N/A'}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default JobDescription
