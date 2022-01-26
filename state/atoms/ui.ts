import { atom } from "recoil"

export const HoverState = atom<boolean>({
	default: false,
	key: "hoverState"
})

export const ExpandState = atom<boolean>({
	default: false,
	key: "expandState"
})
