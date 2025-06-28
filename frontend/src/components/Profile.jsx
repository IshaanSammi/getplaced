import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector(store => store.auth)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d0e4ff] via-[#f0f4ff] to-white pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-300 rounded-3xl shadow-lg my-8 p-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 shadow-md">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/avatar-gender-neutral-silhouette-vector-600nw-2470054311.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">{user?.fullname}</h1>
              <p className="mt-1 text-gray-600">{user?.profile?.bio || 'No bio available.'}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="text-gray-700 hover:text-blue-600 hover:border-blue-600"
            aria-label="Edit Profile"
          >
            <Pen />
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-blue-500" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Contact className="text-blue-500" />
            <span>{user?.phoneNumber || 'Not Provided'}</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length > 0
              ? user.profile.skills.map((skill, idx) => (
                  <Badge
                    key={idx}
                    className="bg-blue-100 text-blue-700 border-blue-300"
                  >
                    {skill}
                  </Badge>
                ))
              : <span className="text-gray-500">No skills added</span>}
          </div>
        </div>

        <div className="max-w-sm">
          <Label className="block mb-2 text-lg font-bold text-gray-800">Resume</Label>
          {isResume && user?.profile?.resume ? (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={user.profile.resume}
              className="text-blue-600 hover:underline break-all"
            >
              {user.profile.resumeOriginalName || 'View Resume'}
            </a>
          ) : (
            <span className="text-gray-500">Not available</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h2 className="font-bold text-2xl text-gray-900 mb-6">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
