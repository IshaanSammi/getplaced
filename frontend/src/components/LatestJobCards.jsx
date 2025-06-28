
import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className="p-6 rounded-xl bg-gradient-to-br from-[#f8f9ff] to-[#eef1f8] border border-gray-300 cursor-pointer hover:shadow-md transition-all duration-200"
        >
            <div className="mb-3">
                <h1 className="font-semibold text-lg text-gray-800">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
            <div className="mb-4">
                <h1 className="font-bold text-xl text-[#1e1e2f] mb-1">{job?.title}</h1>
                <p className="text-sm text-gray-700 line-clamp-2">{job?.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-blue-100 text-blue-800 font-medium" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="bg-orange-100 text-orange-700 font-medium" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 font-medium" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;

