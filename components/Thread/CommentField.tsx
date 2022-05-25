import React, { useRef, useState } from 'react'
import { PhotographIcon, MenuAlt2Icon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import { XIcon } from '@heroicons/react/solid'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from "emoji-mart"
import { NextPage } from 'next'
import { IPosts } from '../../interfaces/Posts'
import Swal from 'sweetalert2'
import { useRecoilState } from 'recoil'
import { loadingState } from '../../atoms/modalAtom'
import { handleCommentState } from '../../atoms/commentAtom'

interface IThread {
  thread: IPosts
}

const CommentField: NextPage<IThread> = ({thread}) => {
  const {data: session} = useSession()
  const [loading, setLoading] = useRecoilState(loadingState)
  const [input, setInput] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState(null || '')
  const [handleComment, setHandleComment] = useRecoilState(handleCommentState)
  const [displayImage, setDisplayImage] = useState(null)
  const [showEmojis, setShowEmojis] = useState<any>(false)
  const filePickerRef = useRef<any>(null)

  // Add image into File Reader and use dsplayImage to Display
  const addImageToPost = (e: any) => {
    const reader = new FileReader();

    if(e.target.files[0]){ reader.readAsDataURL(e.target.files[0]); }
    // Holds the Image to Display in UI
    reader.onload = (readerEvent: any) => {
      setDisplayImage(readerEvent.target.result);
    }
    setSelectedFile(e.target.files[0]) // Holds the data of the image that may send in CLOUDINARY
  }

  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el:any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  const replyPost = async (e:any) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData();
    formData.append('file', selectedFile)// Contains File
    formData.append('upload_preset', 'my-twitter-uploads')// Presets for Cloudinary

    // Uploads photo in Cloudinary
    let data
    if(selectedFile){
      data = await fetch('https://api.cloudinary.com/v1_1/twitter-got-cloned/image/upload', {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
    }
    

      // Sends Data in MongoDB
    const response = await fetch('/api/comment', {
      method: "POST",
      body: JSON.stringify({
        id:thread._id,
        post: input,
        name: session?.user?.name,
        photoUrl: data?.url || null,
        username: session?.username,
        email:session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
        likes:[],
        comment:[],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

      // If upload succeed
    if(response){
      setLoading(false)
      setInput("")
      setShowEmojis(false)
      setDisplayImage(null)
      setHandleComment(true)
      Swal.fire({
      title: 'Done',
      icon: 'success',
      showConfirmButton: false,
      timer:1500,
      }) 
    }
  }

  return (
    <div 
      className='z-0 flex flex-grow px-4 py-2 space-x-3 border-b-[1px]'>
      <img 
        src={`${session?.user?.image}`} 
        alt="User Photo"
        className='rounded-full h-12 mt-6'
      />
      <div className='flex flex-col flex-grow'>
        <h1 className='cursor-pointer text-gray-500'>Replying to <span className='text-blue-500'>@{thread.name}</span></h1>
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="Tweet your reply" 
          className="outline-none text-xl placeholder-gray-500 py-5  scrollbar-hide" 
        />
        { displayImage && (
          <div className='relative'>
            <div 
              className='absolute w-8 h-8  hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
              onClick={() => setDisplayImage(null)}
            >
              <XIcon className='text-gray-400 h-5'/>
            </div>
            <img src={displayImage} alt="" className='rounded-2xl max-h-80 object-contain' />
          </div>
        )}

        {/* Add File/Emojis Section */}
            <div className="flex items-center py-5 space-x-1 lg:space-x-2 relative">
              <div onClick={() => filePickerRef?.current?.click()}>    
                <PhotographIcon className="icon" />
                <input 
                  type="file"
                  hidden 
                  onChange={addImageToPost} 
                  ref={filePickerRef} />
              </div>
              <div className="icon flex items-center justify-center">
                <h1 className="text-[10px] text-blue-500 flex items-center justify-center border-[1px] h-[18px] w-5 border-blue-500 rounded-sm">GIF</h1>
              </div>
              <MenuAlt2Icon className="icon" />
              <EmojiHappyIcon className="icon" onClick={() => setShowEmojis(!showEmojis)} />
              <CalendarIcon className="icon" />
              <button 
                className="tweetButton" 
                disabled={!input.trim() && !selectedFile}
                onClick={replyPost}
                >Reply</button>

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
            /> )}
        </div>
      </div>
    </div>    
  )
}

export default CommentField
