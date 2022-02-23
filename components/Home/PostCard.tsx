import React from 'react'
import Image from 'next/image'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { ChatAlt2Icon, SwitchVerticalIcon, HeartIcon, UploadIcon } from '@heroicons/react/outline'

import samplePic from '../../public/overhaulVSdeku.jpg'

const PostCard = () => {
  return (
    <div className="flex space-x-2 px-4 pt-3 cursor-pointer hover:bg-gray-100 transition ease-in-out border-b-[1px] border-gray-100">
      <div className='w-16'>
        <Image 
          src='/overhaull.jpg'
          alt="OverHaul"
          height="55px"
          width="55px"
          className="rounded-full" />
      </div>
      <div className="pl-[0.4rem] flex flex-col flex-grow">
        <div className="flex justify-start relative">
          <h1 className="font-bold">OverHaul</h1>
          <h1 className="text-gray-600 ml-2">@overhaulll</h1>
          <DotsHorizontalIcon className="h-7 w-7 px-[0.35rem]  text-gray-600 hover:bg-blue-200 transition ease-in-out rounded-full absolute right-2 " />
        </div>
        <p>Overhaul vs Deku</p>
        <div className="w-max h-max relative block min-w-full">
          <Image 
            src='/overhaulVSdeku.jpg'
            alt="Overhaul Vs Deku"
            height={60}
            width={100}
            layout='responsive'
            className="rounded-xl"
            priority
          />
        </div>
        <div className="flex space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
          <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
            <ChatAlt2Icon className="h-5 w-5 "/>
            <h1 className="absolute top-[5px] -right-3">1</h1>
          </div>
          <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
            <SwitchVerticalIcon className="h-5 w-5 "/>
            <h1 className="absolute top-[5px] -right-3">1</h1>
          </div>
          <div className="hover:bg-red-100 hover:text-red-500 postIcon ">
            <HeartIcon className="h-5 w-5 "/>
            <h1 className="absolute top-[5px] -right-3">1</h1>
          </div>
          <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
            <UploadIcon className="h-5 w-5 "/>
            {/* <h1 className="absolute top-[5px] -right-3">1</h1> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default PostCard
