import { atom } from "recoil"

export const hoverState = atom<boolean>({
	default: false,
	key: "hoverState"
})

export const expandState = atom<boolean>({
	default: false,
	key: "expandState"
})

export const activeTokenState = atom<number>({
	default: undefined,
	key: "activeTokenState"
})
