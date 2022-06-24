import React, { useEffect } from 'react'
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { routingState } from '../../atoms/routingAtom'
import { useRouter } from 'next/router'
import { loadingState } from '../../atoms/modalAtom'


const Titlebar = () => {
  const [routeState, setRouteState] = useRecoilState(routingState)
  const { push } = useRouter()
  const [loading, setLoading] = useRecoilState(loadingState)

  const routeStateFunction = () => {
    setRouteState(false)
    push('/thread')
    setLoading(true)
  }

  useEffect(() => {
    setLoading(false)
  },[])

  return (
    <div className="flex pl-[14px] pr-[6px] py-[8px] items-center cursor-pointer sticky top-0 bg-[rgba(255,255,255,0.93)] z-50">
      {!routeState
        ? <h1 className="text-xl font-bold text-gray-800 ">Home</h1>
        : <div className='flex items-center space-x-9'>
            <ArrowLeftIcon className='h-[2.2rem] w-[2.2rem] hover:bg-gray-200 p-2 rounded-full transition ease-in-out active:scale-90' onClick={routeStateFunction}/>
            <h1 className="text-xl font-bold text-gray-800 ">Thread</h1>
        </div>
      }
      <SparklesIcon className="h-10 w-[2.4rem] ml-auto text-gray-800 p-[8px] hover:bg-gray-200 rounded-full transition ease-out" />
    </div>
  )
}

export default Titlebar