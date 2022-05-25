import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export const useLikePost = async (postID:string, likeValue:boolean) => {
  
  const [liked, setLiked] = useState(likeValue)
  const {data: session} = useSession()

  const likePost = async () => {
    if(liked) {
      setLiked(false)
      await fetch('/api/like', {
        method: "DELETE",
        body: JSON.stringify({
          id: postID,
          user:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } else {
      setLiked(true)
      await fetch('/api/like', {
        method: "POST",
        body: JSON.stringify({
          id: postID,
          likes:session?.user?.name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    }
  }
  return { liked, likePost }
}


// if(liked) {
//   setLiked(false)
//   await fetch('/api/liked', {
//     method: "DELETE",
//     body: JSON.stringify({
//       id: postID,
//       user:session?.user?.name
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// } else {
//   setLiked(true)
//   await fetch('/api/liked', {
//     method: "POST",
//     body: JSON.stringify({
//       id: postID,
//       likes:session?.user?.name
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
// }