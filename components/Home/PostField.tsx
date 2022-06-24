import React, { useRef, useState } from 'react'
import { PhotographIcon, MenuAlt2Icon, EmojiHappyIcon, CalendarIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import avatar from '../../public/avatar.png'
import { XIcon } from '@heroicons/react/solid'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Swal from 'sweetalert2'
import { useRecoilState } from 'recoil'
import { loadingState } from '../../atoms/modalAtom'
import { handlePostState } from '../../atoms/postAtom'

const PostField = () => {
  const [input, setInput] = useState<string>("")
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState(null || '')
  const [displayImage, setDisplayImage] = useState(null)
  const [showEmojis, setShowEmojis] = useState<any>(false)
  const [loading, setLoading] = useRecoilState(loadingState)
  const [handlePost, setHandlePost] = useRecoilState(handlePostState)

  const filePickerRef = useRef<any>(null)

  // Add image into File Reader and use dsplayImage to Display
  const addImageToPost = (e: any) => {
    const reader = new FileReader();

    if(e.target.files[0]){ reader.readAsDataURL(e.target.files[0]); }
    // Holds the Image to Display
    reader.onload = (readerEvent: any) => {
      setDisplayImage(readerEvent.target.result);
    }
    setSelectedFile(e.target.files[0]) // Holds the data of the image that may send in CLOUDINARY
  }

  // Combines string and emoji in input field as value
  const addEmoji = (e:any) => {
    let sym = e.unified.split("-");
    let codesArray: any[] = [];
    sym.forEach((el:any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray)
    setInput(input + emoji)
  }

  const uploadPost = async (e:any) => {
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
      const response = await fetch('/api/posts', {
        method: "POST",
        body: JSON.stringify({
          post: input,
          name: session?.user?.name,
          photoUrl: data?.url || null,
          username: session?.username,
          email:session?.user?.email,
          userImg: session?.user?.image,
          createdAt: new Date().toString(),
          likes:[],
          comments:[]
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
        setHandlePost(true)
        setSelectedFile('')
        Swal.fire({
        title: 'Your tweet was send',
        icon: 'success',
        showConfirmButton: false,
        timer:1500,
      }) 
    }
  }

  return (
    <div className="flex w-full border-b-[1px] pt-[7px] px-4 border-gray-100 relative z-40">
      
      <img src={`${session?.user?.image || avatar}`} alt="" className='mr-4 rounded-full h-12' />
      <div className="flex flex-col w-full">
        <textarea 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What's happening?" className="outline-none text-xl placeholder-gray-500 py-5 border-b-[1px] border-gray-100 scrollbar-hide" />
        
        {/* Add File/Emojis Section */}
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

        <div className="flex items-center py-5 space-x-1 lg:space-x-4 relative">
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
            disabled={!input.trim() && !displayImage}
            onClick={uploadPost} >
              Tweet
          </button>

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
  )
}

export default PostField

