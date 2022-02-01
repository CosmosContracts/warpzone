/* eslint-disable @babel/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { activePlanetState } from "@state/atoms/ui"
import { useMemo, useRef } from "react"
import { useRecoilValue } from "recoil"
import type * as THREE from "three"
import { FrontSide, AdditiveBlending, Color } from "three"
import fragmentShader from "./shaders/star/fragment.glsl"
import vertexShader from "./shaders/star/vertex.glsl"

export const Warpzone = (props: JSX.IntrinsicElements["points"]) => {
	const circleRef = useRef<THREE.Points>(null)
	const ethCircleRef = useRef<THREE.Points>(null)
	const junoCircleRef = useRef<THREE.Points>(null)
	const activePlanet = useRecoilValue(activePlanetState)

	const circleTexture = useTexture("/assets/star.png")

	const starShader = useMemo(
		() => ({
			blending: AdditiveBlending,
			fragmentShader,
			side: FrontSide,
			transparent: true,
			uniforms: {
				uColor: { value: new Color("#0DD96E") },
				uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
				uScale: { value: 10 },
				uSize: { value: 1 },
				uTime: { value: 0 }
			},
			vertexShader
		}),
		[]
	)

	useFrame(() => {
		if (activePlanet === "warpTop") {
			circleRef.current.rotation.z -= 0.007
			ethCircleRef.current.rotation.z += 0.003_5
			junoCircleRef.current.rotation.z += 0.003_5
		} else {
			circleRef.current.rotation.z -= 0.000_8
		}
	})

	return (
		<group>
			<points ref={circleRef} {...props}>
				<torusGeometry args={[300, 40, 8, 32]} />
				<shaderMaterial attach="material" {...starShader} />
			</points>
			{activePlanet === "warpTop" && (
				<group>
					<points ref={ethCircleRef} {...props}>
						<torusGeometry args={[300, 10, 1, 48]} />
						<pointsMaterial
							alphaTest={0.5}
							color="#EDEFF1"
							map={circleTexture}
							size={17}
						/>
					</points>
					<points ref={junoCircleRef} {...props}>
						<torusGeometry args={[300, -10, 1, 48]} />
						<pointsMaterial
							alphaTest={0.5}
							color="#f0827d"
							map={circleTexture}
							size={17}
						/>
					</points>
				</group>
			)}
		</group>
	)
}
