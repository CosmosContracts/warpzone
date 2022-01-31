import { useSpring, animated } from "@react-spring/three"
import { useTexture } from "@react-three/drei"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import fragmentShader from "./shaders/planet/fragment.glsl"
import vertexShader from "./shaders/planet/vertex.glsl"

export const Ethereum = () => {
	const ethereumTexture = useTexture("/assets/ethereumTexture.png")

	const ethereumPlanetRef = useRef<THREE.Mesh>(null)

	const ethereumAtmosphere = useMemo(
		() => ({
			blending: THREE.AdditiveBlending,
			fragmentShader,
			side: THREE.FrontSide,
			transparent: true,
			uniforms: {
				b: {
					value: 1
				},
				glowColor: {
					value: new THREE.Color(0xa2_b9_bc)
				},
				p: {
					value: 1
				},
				s: {
					value: -1
				}
			},
			vertexShader
		}),
		[]
	)

	const netaAtmosphere = useMemo(
		() => ({
			blending: THREE.AdditiveBlending,
			fragmentShader,
			side: THREE.FrontSide,
			transparent: true,
			uniforms: {
				b: {
					value: 1
				},
				glowColor: {
					value: new THREE.Color(0x33_22_33)
				},
				p: {
					value: 1
				},
				s: {
					value: -1
				}
			},
			vertexShader
		}),
		[]
	)

	const { x } = useSpring({
		from: { x: 10 },
		loop: true,
		to: { x: 0 }
	})

	return (
		<group position={[2_000, -1_600, 1_600]} scale={[80, 80, 80]}>
			<animated.group position={[x.get(), 0, 0]}>
				<mesh>
					<sphereGeometry args={[5, 32, 32]} />
					<shaderMaterial attach="material" {...ethereumAtmosphere} />
				</mesh>
				<mesh ref={ethereumPlanetRef} rotation={[-200, -200, -200]}>
					<sphereGeometry args={[4.9, 32, 32]} />
					<meshStandardMaterial
						attach="material"
						fog
						map={ethereumTexture}
						roughness={1}
					/>
				</mesh>
			</animated.group>
			<group>
				<mesh position={[5, -5, -5]}>
					<sphereGeometry args={[0.75, 32, 32]} />
					<shaderMaterial attach="material" {...netaAtmosphere} />
				</mesh>
				<mesh position={[4.9, -5, -5]}>
					<sphereGeometry args={[0.75, 32, 32]} />
					<meshStandardMaterial fog map={ethereumTexture} roughness={1} />
				</mesh>
			</group>
		</group>
	)
}
