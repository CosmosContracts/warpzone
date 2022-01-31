/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-new */
import { a, useSpring } from "@react-spring/three"
import { useFrame, useLoader } from "@react-three/fiber"
import { activePlanetState } from "@state/atoms/ui"
import { useEffect, useMemo, useRef, useState } from "react"
import { useRecoilValue } from "recoil"
import type { Mesh, Group } from "three"
import { FrontSide, AdditiveBlending, Color, TextureLoader } from "three"
import fragmentShader from "./shaders/planet/fragment.glsl"
import vertexShader from "./shaders/planet/vertex.glsl"

export const Ethereum = () => {
	const [juno, neta] = useLoader(TextureLoader, [
		"/assets/ethereumTexture.png",
		"/assets/uniTexture.png"
	])

	const ethRef = useRef<Mesh>(null)
	const uniRef = useRef<Group>(null)
	const ethSystemRef = useRef<Group>(null)

	const activePlanet = useRecoilValue(activePlanetState)

	const ethAtmosphere = useMemo(
		() => ({
			blending: AdditiveBlending,
			fragmentShader,
			side: FrontSide,
			transparent: true,
			uniforms: {
				b: {
					value: 1
				},
				glowColor: {
					value: new Color(0xec_f0_f1)
				},
				p: {
					value: 0.8
				},
				s: {
					value: -1
				}
			},
			vertexShader
		}),
		[]
	)

	const uniAtmosphere = useMemo(
		() => ({
			blending: AdditiveBlending,
			fragmentShader,
			side: FrontSide,
			transparent: true,
			uniforms: {
				b: {
					value: 1
				},
				glowColor: {
					value: new Color(0x2c_22_2d)
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

	const [isActive, setActive] = useState(false)

	useEffect(() => {
		if (activePlanet === "ethereum") {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [activePlanet])

	const { x, y, z, ethRotX, ethRotY } = useSpring({
		config: {
			friction: 70,
			mass: 2,
			precision: 0.001,
			tension: 100
		},
		ethRotX: isActive ? 0.45 : 0,
		ethRotY: isActive ? -1 : 0,
		uniRotX: isActive ? -0.5 : -0.5,
		uniRotY: isActive ? -1 : 0,
		x: isActive ? -15 : -40,
		y: isActive ? 0 : 30,
		z: isActive ? -15 : -40
	})

	useFrame((state) => {
		uniRef.current.rotation.z += 0.002

		const target = {
			x: (1 - state.mouse.x) * 5,
			y: (1 - state.mouse.y) * 5
		}

		if (isActive) {
			ethRef.current.rotation.y =
				0.05 * (target.x - ethRef.current.rotation.z) + ethRotX.get() + 2
			ethSystemRef.current.position.x =
				0.1 * (target.y - ethSystemRef.current.position.x) + x.get()
			ethSystemRef.current.position.y =
				0.1 * (target.x - ethSystemRef.current.position.y) + y.get()
		}
	})

	return (
		<group position={[5_500, 5_000, 5_600]} scale={[150, 150, 150]}>
			<a.group
				position-x={x}
				position-y={y}
				position-z={z}
				ref={ethSystemRef}
				rotation-x={ethRotX}
				rotation-y={ethRotY}
			>
				<mesh>
					<sphereGeometry args={[5, 32, 32]} />
					<shaderMaterial attach="material" {...ethAtmosphere} />
				</mesh>
				<mesh ref={ethRef}>
					<sphereGeometry args={[4.9, 32, 32]} />
					<meshStandardMaterial
						attach="material"
						fog
						map={juno}
						roughness={1}
					/>
					<a.group ref={uniRef} scale={[1.5, 1.5, 1.5]}>
						<mesh position={[2, -2.5, -2.5]}>
							<sphereGeometry args={[0.72, 32, 32]} />
							<shaderMaterial attach="material" {...uniAtmosphere} />
						</mesh>
						<mesh position={[2, -2.5, -2.5]} rotation={[-0, -0.6, 0]}>
							<sphereGeometry args={[0.7, 32, 32]} />
							<meshStandardMaterial fog map={neta} roughness={1} />
						</mesh>
					</a.group>
				</mesh>
			</a.group>
		</group>
	)
}
