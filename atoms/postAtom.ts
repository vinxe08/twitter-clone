import { atom } from "recoil";
import { IPosts } from '../interfaces/Posts'

export const handlePostState = atom({
  key: "handlePostState",
  default: false
})

export const getPostState = atom({
  key: "getPostState",
  default: {} as IPosts
})

export const useSSRPostsState = atom({
  key: "useSSRPostsState",
  default: true,
})