/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new */
import { a, useSpring } from "@react-spring/three"
import { useLoader } from "@react-three/fiber"
import { forwardRef, useMemo, useRef } from "react"
import * as THREE from "three"
import fragmentShader from "./shaders/planet/fragment.glsl"
import vertexShader from "./shaders/planet/vertex.glsl"

export const Juno = forwardRef((_, forwardedRef) => {
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

	const { x } = useSpring({
		from: { x: 0 },
		loop: { reverse: true },
		to: { x: 100 }
	})

	return (
		<group position={[2_600, 2_600, 600]} scale={[80, 80, 80]}>
			<a.group position={[x.get(), 0, 0]}>
				<mesh ref={forwardedRef}>
					<sphereGeometry args={[5, 32, 32]} />
					<shaderMaterial attach="material" {...junoAtmosphere} />
				</mesh>
				<mesh ref={junoRef}>
					<sphereGeometry args={[4.9, 32, 32]} />
					<meshStandardMaterial
						attach="material"
						fog
						map={juno}
						roughness={1}
					/>
				</mesh>
			</a.group>
			<group>
				<mesh position={[5, -5, -5]}>
					<sphereGeometry args={[0.75, 32, 32]} />
					<shaderMaterial attach="material" {...netaAtmosphere} />
				</mesh>
				<mesh position={[5, -5, -5]}>
					<sphereGeometry args={[0.72, 32, 32]} />
					<meshStandardMaterial fog map={neta} roughness={1} />
				</mesh>
			</group>
		</group>
	)
})
