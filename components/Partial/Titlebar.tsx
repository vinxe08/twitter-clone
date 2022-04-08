import React from 'react'
import { SparklesIcon } from '@heroicons/react/outline'

const Titlebar = () => {
  return (
    <div className="flex pl-[14px] pr-[6px] py-[8px] items-center cursor-pointer sticky top-0 bg-[rgba(255,255,255,0.93)] z-40">
      <h1 className="text-xl font-bold text-gray-900 ">Home</h1>
      <SparklesIcon className="h-10 w-[2.4rem] ml-auto text-gray-800 p-[8px] hover:bg-gray-200 rounded-full transition ease-out" />
    </div>
  )
}

export default Titlebar