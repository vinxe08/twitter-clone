import React from 'react'

type Props = {
  title: string,
  Icon: any
}

const SidebarItems: React.FC<Props>  = ({ title, Icon }) => {
  return (
    <div className="flex items-center hover:bg-gray-200 p-[11.5px] rounded-full transition ease-out space-x-5 cursor-pointer ">
      <Icon className="h-[29px] w-[29px] text-gray-800" />
      <h1 className="hidden xl:inline text-xl">{title}</h1>
    </div>

  )
}

export default SidebarItems