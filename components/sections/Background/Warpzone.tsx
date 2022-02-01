/* eslint-disable @babel/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { activePlanetState } from "@state/atoms/ui"
import { useRef } from "react"
import { useRecoilValue } from "recoil"
import type * as THREE from "three"
import { degToRad } from "three/src/math/MathUtils"

export const Warpzone = (props: JSX.IntrinsicElements["points"]) => {
	const circleRef = useRef<THREE.Points>(null)
	const activePlanet = useRecoilValue(activePlanetState)

	const circleTexture = useTexture("/assets/star.png")

	useFrame(() => {
		circleRef.current.rotation.z -= 0.000_8
		if (activePlanet === "warpTop") {
			circleRef.current.rotation.x = degToRad(90)
		} else {
			circleRef.current.rotation.x = degToRad(0)
		}
	})

	return (
		<group>
			<points ref={circleRef} {...props}>
				<torusGeometry args={[300, 40, 8, 32]} />
				<pointsMaterial
					alphaTest={0.7}
					color="#0DD69E"
					map={circleTexture}
					size={25}
				/>
			</points>
		</group>
	)
}
