
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import logo from './logo.png'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.data.success) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
        setMobileMenuOpen(false) 
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'Logout failed')
    }
  }

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-6 h-16">
        
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2"
        >
          <img
            src={logo}
            alt="GetPlaced"
            className="h-10 w-10 rounded-full border border-indigo-500 shadow-md object-contain"
          />
          <span className="text-2xl font-bold text-slate-800">
            Get<span className="text-indigo-600">Placed</span>
          </span>
        </Link>


        
        <ul className="hidden md:flex items-center gap-8 text-slate-700 font-medium text-sm">
          {user && user.role === 'recruiter' ? (
            <>
              <li>
                <Link to="/admin/companies" className="hover:text-indigo-600 transition">
                  Companies
                </Link>
              </li>
              <li>
                <Link to="/admin/jobs" className="hover:text-indigo-600 transition">
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-indigo-600 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-indigo-600 transition">
                  Jobs
                </Link>
              </li>
              {/* <li>
                <Link to="/browse" className="hover:text-indigo-600 transition">
                  Browse
                </Link>
              </li> */}
            </>
          )}
        </ul>

        
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant="outline"
                  className="text-sm border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white">Signup</Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-9 h-9">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="user avatar" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 shadow-lg border rounded-md p-4">
                <div className="space-y-3">
                  <div className="flex gap-3 items-center">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="user avatar" />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-slate-800">{user?.fullname}</h4>
                      <p className="text-sm text-slate-500">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-2 text-slate-600 text-sm">
                    {user?.role === 'student' && (
                      <div className="flex items-center gap-2">
                        <User2 size={18} />
                        <Link to="/profile" className="hover:underline text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
                          View Profile
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LogOut size={18} />
                      <Button
                        onClick={logoutHandler}
                        variant="link"
                        className="p-0 h-auto text-red-600 hover:underline"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        
        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md px-6 py-4">
          <ul className="flex flex-col gap-4 text-slate-700 font-medium text-base">
            {user && user.role === 'recruiter' ? (
              <>
                <li>
                  <Link to="/admin/companies" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 transition">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 transition">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 transition">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/browse" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600 transition">
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-6 border-t border-gray-200 pt-4">
            {!user ? (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full text-sm border-slate-300 text-slate-700 hover:border-indigo-500 hover:text-indigo-600"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full text-sm bg-indigo-600 hover:bg-indigo-700 text-white">Signup</Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="user avatar" />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-slate-800">{user?.fullname}</h4>
                    <p className="text-sm text-slate-500">{user?.profile?.bio}</p>
                  </div>
                </div>
                {user?.role === 'student' && (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View Profile
                  </Link>
                )}
                <Button
                  onClick={logoutHandler}
                  variant="link"
                  className="p-0 h-auto text-red-600 hover:underline text-left"
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar


