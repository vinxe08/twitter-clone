import { ChatAlt2Icon, HeartIcon, SwitchVerticalIcon, UploadIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'

function Comment() {
  const { data: session } = useSession()
  const [image, setImage] = useState(null)

  return (
    <div className='flex p-4 space-x-3 border-b-[1px] hover:bg-gray-100'>
      <img src={`${session?.user?.image}`} alt="" className='h-12 rounded-full' />
      <div className='flex flex-col w-screen'>
        <div className='flex space-x-2'>
          <h1 className='font-medium text-lg'>{session?.user?.name}</h1>
          <h1 className='text-gray-500'>@{session?.username}</h1>
        </div>
        <h1 className='text-gray-500'>Replying to <span className='text-blue-400'>@{session?.username}</span> </h1>
        <p>Sample Reply</p>
        {/* {image && <img src={image} alt="Comment image" /> } */}
        <img src='/overhaulVsdeku.jpg' alt="" className='rounded-lg' />
        <div className='flex justify-evenly'>
          <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
            <ChatAlt2Icon className="h-5 w-5 "/>
          </div>
          <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
            <SwitchVerticalIcon className="h-5 w-5 "/>
          </div>
          <div className="hover:bg-red-100 hover:text-red-500 postIcon ">
            <HeartIcon className="h-5 w-5 "/>
          </div>
          <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
            <UploadIcon className="h-5 w-5 "/>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Comment