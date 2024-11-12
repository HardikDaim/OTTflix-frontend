"use client";
import Sidebar from "./components/Sidebar";
import FeaturedSection from "./components/FeaturedSection";
import ContinueWatching from "./components/ContinueWatching";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 lg:ml-24 ">
          <FeaturedSection />
          <ContinueWatching />
        </div>
      </div>
    </>
  );
};

export default Home;
