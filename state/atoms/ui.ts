import { atom } from "recoil"

export const activePlanetState = atom<string>({
	default: "warp",
	key: "activePlanetState"
})

export const isLoadingState = atom<boolean>({
	default: true,
	key: "isLoadingState"
})

export const expandState = atom<boolean>({
	default: false,
	key: "expandState"
})

export const activeTokenState = atom<number>({
	default: undefined,
	key: "activeTokenState"
})
