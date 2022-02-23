import React, { useState } from 'react'
import { PhotographIcon, MenuAlt2Icon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'

const PostField = () => {
  const [input, setInput] = useState("")

  return (
    <div className="flex w-full border-b-[1px] pt-[7px] px-4 border-gray-100">
      <div className="mr-4 flex justify-center ">
        <h1 className="text-white text-2xl bg-blue-500 h-12 p-[1.15rem] flex items-center rounded-full">V</h1>
      </div>
      <div className="flex flex-col w-full">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What's happening?" className="outline-none text-xl placeholder-gray-500 py-5 border-b-[1px] border-gray-100 scrollbar-hide" />
        <div className="flex items-center py-5 space-x-1 lg:space-x-4 relative">
          <PhotographIcon className="icon" />
          <div className="icon flex items-center justify-center"><h1 className="text-[10px] text-blue-500 flex items-center justify-center border-[1px] h-[18px] w-5 border-blue-500 rounded-sm">GIF</h1></div>
          <MenuAlt2Icon className="icon" />
          <EmojiHappyIcon className="icon" />
          <CalendarIcon className="icon" />
          <div className="ml-auto absolute right-0 px-5 py-[0.45rem] bg-blue-400 rounded-full text-white cursor-pointer hover:bg-blue-500 transition ease-in-out">Tweet</div>
        </div>
      </div>
    </div>
  )
}

export default PostField