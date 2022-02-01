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

export const Juno = () => {
	const [juno, neta] = useLoader(TextureLoader, [
		"/assets/junoTexture.png",
		"/assets/netaTexture.png"
	])

	const junoRef = useRef<Mesh>(null)
	const netaRef = useRef<Group>(null)
	const junoSystemRef = useRef<Group>(null)

	const activePlanet = useRecoilValue(activePlanetState)

	const junoAtmosphere = useMemo(
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
					value: new Color(0xf0_82_7d)
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
			blending: AdditiveBlending,
			fragmentShader,
			side: FrontSide,
			transparent: true,
			uniforms: {
				b: {
					value: 1
				},
				glowColor: {
					value: new Color(0x33_22_33)
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
		if (activePlanet === "juno") {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [activePlanet])

	const { x, y, z, junoRotX, junoRotY } = useSpring({
		config: {
			friction: 70,
			mass: 2,
			precision: 0.001,
			tension: 100
		},
		junoRotX: isActive ? 0.45 : 0,
		junoRotY: isActive ? -1 : 0,
		netaRotX: isActive ? -0.5 : -0.5,
		netaRotY: isActive ? -1 : 0,
		x: isActive ? -15 : -40,
		y: isActive ? 0 : 30,
		z: isActive ? -15 : -40
	})

	useFrame((state) => {
		netaRef.current.rotation.z += 0.002
		const target = {
			x: (1 - state.mouse.x) * 3,
			y: (1 - state.mouse.y) * 3
		}

		if (isActive) {
			junoRef.current.rotation.y =
				-0.05 * (target.x - junoRef.current.rotation.z) + junoRotX.get() - 0.2
			junoSystemRef.current.position.x =
				0.07 * (target.y - junoSystemRef.current.position.x) + x.get()
			junoSystemRef.current.position.y =
				0.07 * (target.x - junoSystemRef.current.position.y) + y.get()
		}
	})

	return (
		<group position={[2_600, 2_600, 600]} scale={[80, 80, 80]}>
			<a.group
				position-x={x}
				position-y={y}
				position-z={z}
				ref={junoSystemRef}
				rotation-x={junoRotX}
				rotation-y={junoRotY}
			>
				<mesh>
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
					<a.group ref={netaRef} scale={[2, 2, 2]}>
						<mesh position={[2, -2.5, -2.5]}>
							<sphereGeometry args={[0.72, 32, 32]} />
							<shaderMaterial attach="material" {...netaAtmosphere} />
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
