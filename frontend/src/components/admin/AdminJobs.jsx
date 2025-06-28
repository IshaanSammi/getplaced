
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e0f2fe] via-[#f8f9fa] to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Input
            className="w-full sm:w-80 bg-white text-gray-800 border border-gray-300 placeholder-gray-400 focus:border-violet-500 focus:ring-violet-500 transition-all duration-200"
            placeholder="enter job/title/role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 transition-colors duration-200"
          >
            New Job
          </Button>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 transition-colors duration-200 hover:bg-gray-50">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;


