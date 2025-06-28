import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-slate-800">
              Get<span className="text-indigo-600">Placed</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              © 2025 GetPlaced. All rights reserved.
            </p>
          </div>

          
          <div className="text-md text-gray-500">
            Empowering your career journey.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
