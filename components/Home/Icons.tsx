import { ChatAlt2Icon, SwitchVerticalIcon, HeartIcon, UploadIcon, XIcon } from '@heroicons/react/outline'

const Icons = () => {
  return (
    <>  
      <div className="hover:bg-blue-100 hover:text-blue-500 postIcon ">
        <ChatAlt2Icon className="h-6 w-7 "/>
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
    </>
  )
}

export default Icons