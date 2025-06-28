import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d0e4ff] via-[#f0f4ff] to-white">
      <Navbar />
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <Input
              className="w-full md:w-1/2 border-gray-300 rounded-lg"
              placeholder="Search companies by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="bg-[#7209b7] hover:bg-[#5f32ad] text-white rounded-lg"
              onClick={() => navigate('/admin/companies/create')}
            >
              + New Company
            </Button>
          </div>
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
