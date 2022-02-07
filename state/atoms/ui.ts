import { atom } from "recoil"

export const activePlanetState = atom<string>({
	default: "warp",
	key: "activePlanetState"
})

export const activeStepState = atom<number[]>({
	default: [0, 0],
	key: "activeStepState"
})

export const disableNextStepState = atom<boolean>({
	default: false,
	key: "disableNextStepState"
})

export const activeTokenState = atom<number>({
	default: undefined,
	key: "activeTokenState"
})

export const isCosmosWalletConnectedState = atom<boolean>({
	default: false,
	key: "isCosmosWalletConnectedState"
})
