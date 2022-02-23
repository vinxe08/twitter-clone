import React from 'react'
import 'tailwindcss/tailwind.css'
import Sidebar from './Partial/Sidebar'
import Titlebar from './Partial/Titlebar'
import Trendingbar from './Partial/Trendingbar'

type Props = {
  children: any
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full sm:w-[99%] xl:w-[100%]">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-[2] border-r-[1px] max-w-[38.5rem] " >
        <Titlebar />
        {children}
      </div>
      <div className="w-[420px] hidden lg:block">
        <Trendingbar />
      </div>
    </div>
  )
}

export default Layout
