import React from 'react'
import { CogIcon, DotsHorizontalIcon } from '@heroicons/react/outline'
import { Props } from '../../interfaces/MediumCard'

const MediumCard = () => {

  const Trends: Props[] =  [
    {
      id: 1,
      TrendingType: 'Music · Trending',
      title: 'jaehyun',
      tweets: '254k'
    },
    {
      id: 2,
      TrendingType: 'Trending in Philippines',
      title: 'STOP CANCEL CULTURE',
      tweets: '6,006'
    },
    {
      id: 3,
      TrendingType: 'Trending in Philippines',
      title: 'Choice Top 10',
      tweets: '910k'
    },
    {
      id: 4,
      TrendingType: 'Music · Trending',
      title: 'Eminem',
      tweets: '29.8k'
    },
    {
      id: 5,
      TrendingType: 'Trending in Philippines',
      title: 'Stays',
      tweets: '250k'
    },
]

  return (
    <div className="mt-[18px] pt-[10px] rounded-2xl bg-gray-100">
      <div className="flex mb-[13px] px-5 ">
        <h1 className="text-[1.29rem] font-bold">Trends for you</h1>
        <div className="ml-auto cursor-pointer rounded-full hover:bg-gray-200 p-2 flex items-center transition ease-out">
          <CogIcon className="h-5 w-5" />
        </div>
      </div>
      { Trends.map((item) => (
        <div key={item.id} className="bg-transparent hover:bg-gray-200  px-5 py-[11px] transition ease-in-out cursor-pointer">
          <div className="flex relative">
            <h1 className="text-[13px] text-gray-500">{item.TrendingType}</h1>
            <div className="absolute right-0 cursor-pointer rounded-full p-2 hover:bg-blue-200 hover:text-blue-500 transition ease-in-out">
              <DotsHorizontalIcon className="h-5 w-5" />
            </div>
          </div>
          <h1 className="text-[15px] font-semibold">{item.title}</h1>
          <h1 className="text-[13.4px] text-gray-600">{item.tweets} Tweets</h1>
        </div>
      ) )
      }
      <div className="hover:bg-gray-200 rounded-b-2xl py-[14px] pl-5 transition ease-in-out cursor-pointer">
        <h1 className="text-blue-500">Show more</h1>
      </div>
    </div>
  )
}

export default MediumCard;