import React from 'react'
import { SearchIcon } from '@heroicons/react/outline';
import MediumCard from './MediumCard';
import SmallCard from './SmallCard';

const Trendingbar = () => {
  return (
    <div className="hidden lg:block w-full h-full border- border-gray-100 pl-[29px] pr-[29px] xl:pr-14 pt-[5px]">
      {/* Search Bar */}
      <div className="flex bg-gray-100 py-[9.3px] px-5 rounded-full items-center text-center ">
        <SearchIcon className="h-[20px] w-[23px] text-gray-500" />
        <input 
          className="bg-transparent outline-none ml-5 text-gray-300 placeholder-gray-600"
          type="text" 
          placeholder="Search Twitter" />
      </div>

      <MediumCard />
      
      <SmallCard />
    </div>
  )
}

export default Trendingbar;