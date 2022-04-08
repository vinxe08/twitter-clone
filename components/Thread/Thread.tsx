import React, { useRef, useState } from 'react'
import { ChatAlt2Icon, SwitchVerticalIcon, HeartIcon, UploadIcon, PhotographIcon, MenuAlt2Icon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { XIcon } from '@heroicons/react/solid'
import { Picker } from 'emoji-mart'
import Comment from './Comment'

const Thread = () => {
  const {data: session} = useSession()
  const [input, setInput] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojis, setShowEmojis] = useState<any>(false)

  const filePickerRef = useRef<any>(null)

  const addImageToPost = () => {

  }

  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el:any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  return (
    <div className='mt-[.5rem]'>
      <div className='flex px-4 '>
        <img src={`${session?.user?.image}`} alt="User Image" className='rounded-full mr-[0.6rem] h-12' />
        <div className='flex flex-col'>
          <h1 className='text-[1.05rem] font-semibold text-gray-800'>{session?.user?.name}</h1>
          <h1 className='text-gray-600 text-[1.05rem]'>@{session?.username}</h1>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='px-4 border-b-[1px]'>
          <p className='text-[1.48rem] font-normal text-gray-800 py-3 '>Attack on Titan x RE:SHAZAM Collaboration illustration</p>
          {/* {session?.user?.image && (
            <img src={`${session.user.image}`} alt="Post Image" />
          )} */}
          <img src='/overhaulVSdeku.jpg' alt="Post Image" className='rounded-xl object-contain ' />
          <div className='flex space-x-1 text-gray-600 text-base border-b-[1px] py-4'>
            <h1 className='cursor-pointer hover:underline transition ease-in-out'>3:45 PM · Mar 3, 2022</h1>
            <h1>·</h1>
            <h1 className='cursor-pointer hover:underline transition ease-in-out'>Twitter Web App</h1>
          </div>
          <div className='flex space-x-4 border-b-[1px] py-4 text-[1.05rem] font-normal'>
            <h1 className='cursor-pointer hover:underline'>0 <span className='text-gray-600'>Retweets</span></h1>
            <h1 className='cursor-pointer hover:underline'>0 <span className='text-gray-600'>Quote Tweets</span></h1>
            <h1 className='cursor-pointer hover:underline'>0 <span className='text-gray-600'>Likes</span></h1>
          </div>
          <div className="flex items-center justify-center space-x-12 md:space-x-20 lg:space-x-28 pb-[6px]">
            <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
              <ChatAlt2Icon className="h-6 w-6 "/>
            </div>
            <div className="hover:bg-green-100 hover:text-green-500 postIcon ">
              <SwitchVerticalIcon className="h-6 w-6 "/>
            </div>
            <div className="hover:bg-red-100 hover:text-red-500 postIcon ">
              <HeartIcon className="h-6 w-6 "/>
            </div>
            <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
              <UploadIcon className="h-6 w-6 "/>
            </div>
          </div>
        </div>
        <div className='flex px-4 py-2 space-x-3 border-b-[1px]'>
          <img 
            src={`${session?.user?.image}`} 
            alt="User Photo"
            className='rounded-full h-12 mt-6'
            />
          <div className='flex flex-col flex-grow'>
            <h1 className='cursor-pointer text-gray-500'>Replying to <span className='text-blue-500'>@Post Owner</span></h1>
            <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={1}
                placeholder="Tweet your reply" className="outline-none text-xl placeholder-gray-500 py-5  scrollbar-hide" />

          {/* Add File/Emojis Section */}
          { selectedFile && (
            <div className='relative'>
              <div 
                className='absolute w-8 h-8  hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className='text-gray-400 h-5'/>
              </div>
              <img src={selectedFile} alt="" className='rounded-2xl max-h-80 object-contain' />
            </div>
          )}

          <div className="flex items-center py-5 space-x-1 lg:space-x-2 relative z-40">
            <div onClick={() => filePickerRef?.current?.click()}>    
              <PhotographIcon className="icon" />
              <input 
                type="file"
                hidden 
                onChange={addImageToPost} 
                ref={filePickerRef} />
            </div>
            <div className="icon flex items-center justify-center">
              <h1 className="text-[10px] text-blue-500 flex items-center justify-center border-[1px] h-[18px] w-5 border-blue-500 rounded-sm">GIF</h1></div>
              <MenuAlt2Icon className="icon" />
              <EmojiHappyIcon className="icon" onClick={() => setShowEmojis(!showEmojis)} />
              <CalendarIcon className="icon" />
              <button className="tweetButton" disabled={!input.trim() && !selectedFile}>Reply</button>

            { showEmojis && (
                <Picker 
                  onSelect={addEmoji}
                  style={{
                    position:'absolute',
                    marginTop:'465px',
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px"
                  }}
                />
            )}
            </div>
          </div>
        </div>
        {/* Map all the Comments */}
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>

    </div>
  )
}

export default Thread