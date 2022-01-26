import { atom } from "recoil"

export const UIState = atom<boolean>({
	default: false,
	key: "UIState"
})
