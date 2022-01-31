import { useFrame } from "@react-three/fiber"
import { activePlanetState } from "@state/atoms/ui"
import { useRef } from "react"
import { useRecoilValue } from "recoil"
import { degToRad } from "three/src/math/MathUtils"

export const Warpzone = (props: JSX.IntrinsicElements["points"]) => {
	const tunnelRef = useRef<THREE.Points>(null)
	const activePlanet = useRecoilValue(activePlanetState)

	useFrame(() => {
		tunnelRef.current.rotation.z += 0.002_5
		if (activePlanet === "warpTop") {
			tunnelRef.current.rotation.x = degToRad(90)
		} else {
			tunnelRef.current.rotation.x = degToRad(0)
		}
	})

	return (
		<points {...props} ref={tunnelRef}>
			<torusGeometry args={[300, 100, 32, 32]} />
			<pointsMaterial color="#0DD69E" size={10} />
		</points>
	)
}
