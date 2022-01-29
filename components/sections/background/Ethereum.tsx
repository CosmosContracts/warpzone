import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMotionValue } from "framer-motion"
import { motion } from "framer-motion-3d"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import fragmentShader from "./shaders/planet/fragment.glsl"
import vertexShader from "./shaders/planet/vertex.glsl"

export type EthereumPlanetProps = {
	mouseX: number
	mouseY: number
}

export const Ethereum = ({ mouseX, mouseY }: EthereumPlanetProps) => {
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

	const junoX = useMotionValue(mouseX)

	useFrame(() => {
		ethereumPlanetRef.current.rotation.x =
			(mouseX + ethereumPlanetRef.current.rotation.x) * 0.000_5
		ethereumPlanetRef.current.rotation.y =
			(mouseY + ethereumPlanetRef.current.rotation.y) * 0.000_5
	})

	return (
		<group position={[2_000, -1_600, 1_600]} scale={[80, 80, 80]}>
			<motion.group>
				<mesh>
					<sphereGeometry args={[5, 32, 32]} />
					<shaderMaterial attach="material" {...ethereumAtmosphere} />
				</mesh>
				<mesh ref={ethereumPlanetRef} rotation={[-200, -200, -200]}>
					<sphereGeometry args={[5, 32, 32]} />
					<meshStandardMaterial
						attach="material"
						fog
						map={ethereumTexture}
						roughness={1}
					/>
				</mesh>
			</motion.group>
			<group>
				<mesh position={[5, -5, -5]}>
					<sphereGeometry args={[0.75, 32, 32]} />
					<shaderMaterial attach="material" {...netaAtmosphere} />
				</mesh>
				<mesh position={[5, -5, -5]}>
					<sphereGeometry args={[0.75, 32, 32]} />
					<meshStandardMaterial fog map={ethereumTexture} roughness={1} />
				</mesh>
			</group>
		</group>
	)
}
