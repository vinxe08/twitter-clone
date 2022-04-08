import { atom } from "recoil";

export const postModalState = atom({
  key: "postModalState",
  default: false
})

export const fullPostModalState = atom({
  key: "fullPostModalState",
  default: false
})

export const loadingState = atom({
  key:"loadingState",
  default: false
})