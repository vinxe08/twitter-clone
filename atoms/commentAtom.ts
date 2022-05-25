import { atom } from 'recoil'

export const handleCommentState = atom({
  key:"handleCommentState",
  default:false
})

export const useSSRCommentsState = atom({
  key: "useSSRCommentsState",
  default: true,
})