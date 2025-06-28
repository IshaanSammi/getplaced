
import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d0e4ff] via-[#f0f4ff] to-white">
      <Navbar />
      <div className="bg-gradient-to-b from-[#b3d4ff] via-[#e1dbff] to-white">
        <HeroSection />
        
      </div>
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;

