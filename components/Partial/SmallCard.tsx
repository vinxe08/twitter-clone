import React from 'react'
import Image from 'next/image'

type Follow = 
  { id: number,
    src: any,
    alt: string,
    name: string,
    username: string,
  }

const SmallCard = () => {
  const toFollow:Follow[] = [
    {
      id: 1,
      src:'/overhaull.jpg',
      alt: 'OverHaul',
      name: 'Kai Chisaki',
      username: '@chisakiii'
    },
    {
      id: 2,
      src:'/law.jpg',
      alt: 'Law',
      name: 'Trafalgar Law',
      username: '@traguy'
    },
    {
      id: 3,
      src:'/nero.png',
      alt: 'Nero',
      name: 'Nero',
      username: '@NERO'
    },
  ]

  return (
    <div className="bg-gray-100 rounded-2xl pt-3 my-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4 px-5">Who to follow</h1>
      {
        toFollow.map((data) => (
          <div key={data.id} className="flex space-x-4 items-center relative hover:bg-gray-200 px-5 py-3 transition ease-in-out cursor-pointer">
            <Image 
              src={data.src}
              alt={data.alt}
              width="50px"
              height="50px"
              className="rounded-full"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-gray-900">{data.name}</h1>
              <h1 className="text-gray-500">{data.username}</h1>
            </div>
            <div className="bg-gray-900 text-white px-3 py-1 rounded-full ml-auto absolute right-4 hover:opacity-[.9]">
              <h1>Follow</h1>
            </div>
          </div>
        ))
      }
      <div className="px-5 cursor-pointer hover:bg-gray-200 py-3 rounded-b-xl text-blue-400">
        <h1 className="">Show more</h1>
      </div>
    </div>
  )
}

export default SmallCard