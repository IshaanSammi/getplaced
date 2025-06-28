import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
  {
    fitlerType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    fitlerType: 'Role',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  // {
  //   fitlerType: 'Salary',
  //   array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  // },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full rounded-xl p-5 shadow-md bg-gradient-to-br from-[#f9f9ff] via-[#f0f0ff] to-[#e6f7ff] border border-gray-200">
      <h1 className="text-xl font-bold text-[#6A38C2] mb-4"> Filter Jobs</h1>
      <RadioGroup value={selectedValue} onValueChange={changeHandler} className="space-y-4">
        {fitlerData.map((section, index) => (
          <div key={section.fitlerType}>
            <h2 className="text-md font-semibold text-[#333] mb-2">{section.fitlerType}</h2>
            <div className="space-y-1">
              {section.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="flex items-center space-x-2" key={itemId}>
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="text-sm text-gray-700">
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
            <hr className="my-4 border-gray-300" />
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
