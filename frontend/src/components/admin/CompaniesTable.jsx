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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 mt-8">
      <Table>
        <TableCaption className="text-gray-500 mb-4">Registered Companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700">Logo</TableHead>
            <TableHead className="text-gray-700">Name</TableHead>
            <TableHead className="text-gray-700">Date</TableHead>
            <TableHead className="text-right text-gray-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <TableRow key={company._id} className="hover:bg-gray-50">
              <TableCell>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback className="bg-violet-100 text-violet-700 font-medium">
                    {company.name?.charAt(0) || 'C'}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium text-gray-800">{company.name}</TableCell>
              <TableCell className="text-gray-600">{company.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="text-gray-600 hover:text-violet-600 transition">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36 border-gray-200">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-violet-600 cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
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

export default CompaniesTable;
