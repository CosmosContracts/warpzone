import { useFrame, useLoader } from "@react-three/fiber"
import { useMotionValue } from "framer-motion"
import { motion } from "framer-motion-3d"
import React, { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import fragmentShader from "./shaders/planet/fragment.glsl"
import vertexShader from "./shaders/planet/vertex.glsl"

export type JunoProps = {
	mouseX: number
	mouseY: number
}

export const Juno = ({ mouseX, mouseY }: JunoProps) => {
	const [juno, neta] = useLoader(THREE.TextureLoader, [
		"/assets/junoTexture.png",
		"/assets/netaTexture.png"
	])

	const junoRef = useRef<THREE.Mesh>(null)

	const junoAtmosphere = useMemo(
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
					value: new THREE.Color(0xf0_82_7d)
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
		// console.log(mouseX)
		junoRef.current.rotation.x = (mouseX + junoRef.current.rotation.x) * 0.000_5
		junoRef.current.rotation.y = (mouseY + junoRef.current.rotation.y) * 0.000_5
	})

	return (
		<group position={[700, 700, 300]} scale={[80, 80, 80]}>
			<motion.group>
				<mesh>
					<sphereGeometry args={[5, 32, 32]} />
					<shaderMaterial attach="material" {...junoAtmosphere} />
				</mesh>
				<mesh ref={junoRef} rotation={[-200, -200, -200]}>
					<sphereGeometry args={[5, 32, 32]} />
					<meshStandardMaterial
						attach="material"
						fog
						map={juno}
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
					<meshStandardMaterial fog map={neta} roughness={1} />
				</mesh>
			</group>
		</group>
	)
}
