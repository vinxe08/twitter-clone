import { useEffect, useState } from "react"
import { IPosts } from "../interfaces/Posts"
import { useSession } from 'next-auth/react'
 
  const useFetchLike = (thread: IPosts) => {
    const {data: session} = useSession()
    const [liked, setLiked] = useState<boolean>(false)
    const [likes, setLikes] = useState<any[]>([])

    useEffect(() => {
      setLiked(thread?.likes?.includes(session?.user?.name))
      setLikes(thread?.likes.map(like => {return like }))
    }, [thread])

    // A function that if like is true, remove the element(session.user.name) in DB : add element(session.user.name) in DB 
    const likePost = async () => {
      if(liked) {
        setLiked(false)
        setLikes(thread?.likes?.filter((item: any) => item != session?.user?.name))// Manually removing in likes
        await fetch('/api/like', {
          method: "DELETE",
          body: JSON.stringify({
            id: thread._id,
            user:session?.user?.name
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
      } else {
        setLiked(true)
        setLikes([session?.user?.name])// Manually adding in likes

        await fetch('/api/like', {
          method: "POST",
          body: JSON.stringify({
            id: thread._id,
            likes:session?.user?.name
          }),
          headers: {
            "Content-Type": "application/json",
          }, })
      }
      }

    return { liked, likes, likePost } 
  }

export default useFetchLike