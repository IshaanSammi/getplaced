import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-xl shadow-lg bg-gradient-to-br from-[#f9f9ff] via-[#f0f0ff] to-[#e6f7ff] border border-gray-200 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0 ? 'Today' : `${daysAgoFunction(job?.createdAt)} days ago`}
        </span>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200">
          <Bookmark size={18} />
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job?.company?.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <h2 className="text-md font-semibold text-[#333]">{job?.company?.name}</h2>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className="mb-3">
        <h1 className="text-lg font-bold text-[#6A38C2]">{job?.title}</h1>
        <p className="text-sm text-gray-700 line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex flex-wrap gap-2 my-4">
        <Badge className="text-blue-700 bg-blue-50 font-medium" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="text-red-600 bg-red-50 font-medium" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] bg-purple-50 font-medium" variant="outline">
          ₹ {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Button  onClick={() => navigate(`/description/${job?._id}`)} variant="outline" className="w-full">
          View Details
        </Button>
        {/* <Button className="bg-[#7209b7] text-white w-full hover:bg-[#5d079d] transition-colors">
          Save For Later
        </Button> */}
      </div>
    </div>
  );
};

export default Job;
