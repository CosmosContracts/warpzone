import { atom } from "recoil"
import { Vector3 } from "three"

export const activePlanetState = atom<string>({
	default: "warp",
	key: "activePlanetState"
})

export const activePlanetCoordsState = atom<THREE.Vector3>({
	default: new Vector3(0, 0, 0),
	key: "activePlanetCoordsState"
})

export const expandState = atom<boolean>({
	default: false,
	key: "expandState"
})

export const activeTokenState = atom<number>({
	default: undefined,
	key: "activeTokenState"
})
