import { ChatIcon, HeartIcon, SwitchVerticalIcon, UploadIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React from 'react'
import { IPosts } from '../../interfaces/Posts'
import TimeAgo from 'timeago-react'

interface IThread {
  thread: IPosts,
  postOwner: string
}

const CommentCard: React.FC<IThread> = ({thread, postOwner}) => {
  const { data: session } = useSession()

  return (
    <div
      className='flex p-4 space-x-3 border-b-[1px] hover:bg-gray-100'>
      <img src={`${session?.user?.image}`} alt="" className='h-12 rounded-full' />
      <div className='flex flex-col w-full'>
        <div className='flex space-x-1 items-center w-max'>
          <h1 className='font-medium text-lg'>{session?.user?.name}</h1>
          <h1 className='text-gray-500'>@{session?.username} · </h1>
          <TimeAgo
            datetime={thread.createdAt}
            className='text-gray-500'
          />
        </div>
        <h1 className='text-gray-500'>Replying to <span className='text-blue-400'>@{postOwner}</span> </h1>
        <p>{thread.post}</p>
        {thread.photoUrl && <img src={`${thread.photoUrl}`} alt="" className='rounded-lg border-[1px]' />}
        <div className='flex justify-evenly'>
          <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
            <ChatIcon className="h-5 w-5 "/>
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

export default CommentCard