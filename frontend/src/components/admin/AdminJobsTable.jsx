
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter(job => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-x-auto transition-all duration-300">
      <Table>
        <TableCaption className="text-gray-500 text-sm py-2">
           Recently posted jobs
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700">Company Name</TableHead>
            <TableHead className="text-gray-700">Role</TableHead>
            <TableHead className="text-gray-700">Date</TableHead>
            <TableHead className="text-right text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow key={job._id} className="hover:bg-gray-50 transition-colors duration-200">
              <TableCell className="font-medium text-gray-800">{job?.company?.name}</TableCell>
              <TableCell className="text-gray-700">{job?.title}</TableCell>
              <TableCell className="text-gray-500">{job?.createdAt.split('T')[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="p-2 rounded hover:bg-gray-100 transition-colors duration-200">
                    <MoreHorizontal className="text-gray-600" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 rounded-lg shadow-lg border border-gray-200 bg-white">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 text-sm p-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 text-sm p-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
