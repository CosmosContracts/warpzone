/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
import { CircularProgress, Flex } from "@chakra-ui/react"
import useMousePosition from "@hooks/ui/useMousePosition"
import { useTexture } from "@react-three/drei"
import { extend, useFrame, useThree } from "@react-three/fiber"
import {
	Bloom,
	EffectComposer,
	DepthOfField,
	Noise,
	Vignette
} from "@react-three/postprocessing"
import { activePlanetState } from "@state/atoms/ui"
import { useMount, useIsomorphicLayoutEffect } from "ahooks"
import type { MotionValue } from "framer-motion"
import { motion } from "framer-motion"
import { motion as motion3d, MotionCanvas } from "framer-motion-3d"
import { folder, useControls } from "leva"
import { Suspense, useEffect, useRef } from "react"
import {
	useRecoilBridgeAcrossReactRoots_UNSTABLE,
	useRecoilValue
} from "recoil"
import * as THREE from "three"
import { BufferAttribute } from "three"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { degToRad } from "three/src/math/MathUtils"
import { Ethereum } from "./Ethereum"
import { Juno } from "./Juno"
import { Portal } from "./Portals"

extend({
	FilmPass,
	RenderPass,
	ShaderPass
})

export type MotionCameraProps = {
	mouseX: MotionValue<number>
	mouseY: MotionValue<number>
}

let centerScreen: number

const Stars = (props: JSX.IntrinsicElements["points"]) => {
	const warpFieldRef = useRef<THREE.Points>(null)
	const warpParticlesRef = useRef<THREE.BufferGeometry>(null)
	const junoFieldRef = useRef<THREE.Points>(null)
	const junoParticlesRef = useRef<THREE.BufferGeometry>(null)
	const materialRef = useRef<THREE.PointsMaterial>(null)

	const particleCount = 1_500

	const starPosArray = new Float32Array(particleCount * 3)
	const starPos = new BufferAttribute(starPosArray, 3)

	const starTexture = useTexture("/assets/star.png")

	useMount(() => {
		for (let index = 0; index < particleCount * 3; index++) {
			starPosArray[index] = (Math.random() - 0.5) * 2_000
		}

		warpParticlesRef.current.setAttribute("position", starPos)

		junoParticlesRef.current.setAttribute("position", starPos)

		materialRef.current.color.setHSL(1, 0.3, 0.7)
	})

	useFrame(() => {
		warpFieldRef.current.rotation.z += 0.000_25
		warpFieldRef.current.rotation.y += 0.000_25
		junoFieldRef.current.rotation.z += 0.000_25
		junoFieldRef.current.rotation.y += 0.000_25
	})

	return (
		<motion3d.group>
			<points position={[0, 0, 0]} ref={warpFieldRef}>
				<bufferGeometry ref={warpParticlesRef} />
				<pointsMaterial
					alphaTest={0.5}
					map={starTexture}
					ref={materialRef}
					size={3}
					sizeAttenuation
					transparent
				/>
			</points>
			<points position={[700, 700, 300]} {...props} ref={junoFieldRef}>
				<bufferGeometry ref={junoParticlesRef} />
				<pointsMaterial
					alphaTest={0.5}
					map={starTexture}
					ref={materialRef}
					size={3}
					sizeAttenuation
					transparent
				/>
			</points>
			<points position={[2_000, -1_600, 1_600]} {...props} ref={junoFieldRef}>
				<bufferGeometry ref={junoParticlesRef} />
				<pointsMaterial
					alphaTest={0.5}
					map={starTexture}
					ref={materialRef}
					size={3}
					sizeAttenuation
					transparent
				/>
			</points>
		</motion3d.group>
	)
}

const Tunnel = (props: JSX.IntrinsicElements["points"]) => {
	const tunnelRef = useRef<THREE.Points>(null)

	const { radius, tube, radialSegments, tubularSegments } = useControls(
		"Tunnel",
		{
			Animation: folder({
				speed: {
					max: 2,
					min: 0.1,
					step: 0.1,
					value: 1.5
				}
			}),
			Geometry: folder({
				radialSegments: {
					max: 64,
					min: 4,
					step: 4,
					value: 64
				},
				radius: {
					max: 400,
					min: 100,
					step: 1,
					value: 300
				},
				tube: {
					max: 1,
					min: 0.1,
					step: 0.1,
					value: 0.4
				},
				tubularSegments: {
					max: 64,
					min: 4,
					step: 4,
					value: 64
				}
			})
		}
	)

	useFrame(() => {
		tunnelRef.current.rotation.z += 0.002_5
		// tunnelRef.current.rotation.x =
		// 	(mouseX - tunnelRef.current.rotation.x) * 0.001
		// tunnelRef.current.rotation.y =
		// 	(mouseY - tunnelRef.current.rotation.y) * 0.001
	})

	useEffect(() => {
		tunnelRef.current.rotation.y = 0
	})

	return (
		<points {...props} ref={tunnelRef}>
			<torusGeometry args={[radius, tube, radialSegments, tubularSegments]} />
			<pointsMaterial color="#0DD69E" size={10} />
		</points>
	)
}

// eslint-disable-next-line react/prop-types
const Camera = ({ mouseX, mouseY, ...props }) => {
	// const cameraX = useSmoothTransform(mouseX, spring, (x) => x / 350)
	// const cameraY = useSmoothTransform(mouseY, spring, (y) => (-1 * y) / 350)

	// const cameraX = useSpring(
	// 	useTransform(mouseX, (x: number) => x / 350),
	// 	spring
	// )

	// const cameraY = useSpring(
	// 	useTransform(mouseY, (y: number) => (-1 * y) / 350),
	// 	spring
	// )

	const activePlanet = useRecoilValue(activePlanetState)

	useEffect(() => {
		console.log(activePlanet)
	}, [activePlanet])

	const cameraVariants = {
		ethereum: {
			rotateX: degToRad(-120),
			rotateY: degToRad(-80),
			x: 1_800,
			y: -900,
			z: 1_000
		},
		juno: {
			rotateX: degToRad(45),
			rotateY: degToRad(-45),
			x: 500,
			y: -400,
			z: 1_000
		},
		warp: {
			rotateX: degToRad(0),
			rotateY: degToRad(0),
			x: 0,
			y: 0,
			z: 500
		}
	}

	const set = useThree(({ set }) => set)
	const camera = useThree(({ camera }) => camera)
	const size = useThree(({ size }) => size)
	const cameraRef = useRef(null)

	useIsomorphicLayoutEffect(() => {
		const { current: cam } = cameraRef
		if (cam) {
			cam.aspect = size.width / size.height
			cam.updateProjectionMatrix()
		}
	}, [size, props])

	// eslint-disable-next-line consistent-return
	useIsomorphicLayoutEffect(() => {
		if (cameraRef.current) {
			const oldCam = camera
			set(() => ({ camera: cameraRef.current }))
			return () => set(() => ({ camera: oldCam }))
		}
	}, [camera, cameraRef, set])

	// useLayoutEffect(() => {
	// 	return cameraX.onChange(() => camera.lookAt(scene.position))
	// }, [cameraX])

	return (
		<motion3d.perspectiveCamera
			animate={activePlanet}
			aspect={centerScreen}
			far={12_000}
			fov={70}
			near={1}
			position={[0, 0, 1_000]}
			ref={cameraRef}
			transition={{
				damping: 12,
				mass: 2,
				stiffness: 40,
				type: "spring"
			}}
			variants={cameraVariants}
		/>
	)
}

const MotionThreeCanvas = () => {
	const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()

	const ambientLightRef = useRef<THREE.AmbientLight>(null)

	const { x, y } = useMousePosition()

	return (
		<MotionCanvas
			gl={{
				alpha: false,
				antialias: false,
				depth: false,
				powerPreference: "high-performance",
				stencil: false
			}}
			onCreated={({ gl }) => {
				gl.toneMapping = THREE.ReinhardToneMapping
				gl.setClearColor(new THREE.Color("#212B2B"))
			}}
		>
			<RecoilBridge>
				<Camera mouseX={x} mouseY={y} />
				<ambientLight ref={ambientLightRef} />
				<group>
					<Stars />
				</group>
				<fogExp2 args={["#070710", 0.000_2]} attach="fog" />
				<Tunnel position={[0, 0, 0]} />
				<Juno mouseX={x} mouseY={y} />
				<Ethereum mouseX={x} mouseY={y} />
				<Portal />
			</RecoilBridge>
		</MotionCanvas>
	)
}

export const Background = () => {
	const backgroundGradient =
		"linear-gradient(320deg,hsl(156deg 61% 19%) 0%,hsl(158deg 63% 17%) 3%,hsl(160deg 64% 16%) 8%,hsl(162deg 63% 14%) 14%,hsl(163deg 61% 13%) 21%,hsl(164deg 58% 12%) 28%,hsl(166deg 54% 11%) 37%,hsl(167deg 49% 9%) 46%,hsl(168deg 43% 8%) 57%,hsl(169deg 43% 7%) 68%,hsl(170deg 46% 5%) 82%,hsl(170deg 43% 3%) 100%)"

	return (
		<Flex
			as={motion.div}
			bgImage={backgroundGradient}
			h="100vh"
			pos="absolute"
			top="0"
			w="full"
			zIndex={-1}
		>
			<Suspense
				fallback={<CircularProgress color="green.300" isIndeterminate />}
			>
				<MotionThreeCanvas />
			</Suspense>
		</Flex>
	)
}
