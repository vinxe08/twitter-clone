import React from 'react'
import Image from 'next/image'
import { DotsHorizontalIcon, HomeIcon, PencilIcon } from '@heroicons/react/solid'
import { SearchIcon, HashtagIcon, BellIcon, MailIcon, UserIcon, DotsCircleHorizontalIcon, BookmarkIcon, ClipboardListIcon } from '@heroicons/react/outline'
import SidebarItems from './SidebarItems'
import twitter from '../../public/twitter.png'

const Sidebar = () => {
  return (
    <div className=" max-w-[14%] md:max-w-[15%] xl:max-w-[23.5%] border-r-[1px] border-gray-100 border-b-[1px] flex flex-col items-center p-0 pt-[2px] h-screen xl:items-start xl:px-[3.1rem] flex-[.7] sticky top-0">
      <div className="hover:bg-blue-100 px-[10px] pt-[10px] rounded-full transition ease-out mb-2">
        <Image 
          src={twitter}
          alt="Twitter Logo"
          width="32px"
          height="32px"
        />
      </div>
      {/* Side bar Items */}
      <SidebarItems title="Home" Icon={HomeIcon} />

      <SidebarItems title="Explore" Icon={HashtagIcon} />

      <SidebarItems title="Notifications" Icon={BellIcon} />

      <SidebarItems title="Messages" Icon={MailIcon} />

      <SidebarItems title="Bookmarks" Icon={BookmarkIcon} />

      <SidebarItems title="Lists" Icon={ClipboardListIcon} />

      <SidebarItems title="Profile" Icon={UserIcon} />

      <SidebarItems title="More" Icon={DotsCircleHorizontalIcon} />

      <div className="flex items-center justify-center bg-blue-400 hover:bg-blue-500 p-[11.5px] rounded-full transition ease-out mt-[10px] xl:min-w-full cursor-pointer ">
        <PencilIcon className="h-[29px] w-[29px] text-white xl:hidden" />
        <h1 className="hidden text-white text-xl xl:inline xl:w-max">Tweet</h1>
      </div>

      <div className="flex items-center justify-center xl:justify-start py-2 px-[10px] xl:px-3 space-x-3 mt-auto mb-3 rounded-full hover:bg-gray-200 xl:w-[110%] relative cursor-pointer transition ease-in-out">
        <div className="rounded-full py-[7px] px-[15px] bg-blue-600">
          <h1 className="text-lg text-white">V</h1>
        </div>
        <div className="hidden xl:block">
          <h1 className="font-bold text-gray-800">Vince Garcia</h1>
          <h1 className="text-gray-500">@vinxeeeee</h1>
        </div>
        <DotsHorizontalIcon className="hidden xl:block h-5 w-5 absolute right-3" />
      </div>     
    </div>
  )
}

export default Sidebar