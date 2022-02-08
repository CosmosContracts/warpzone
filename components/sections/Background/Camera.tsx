import { PerspectiveCamera } from "@react-three/drei"
import { useThree, useFrame } from "@react-three/fiber"
import { activePlanetState } from "@state/atoms/ui"
import { useIsomorphicLayoutEffect } from "framer-motion"
import { useRef, useEffect } from "react"
import { useRecoilValue } from "recoil"
import { CameraControls } from "./CameraControls"

export const Camera = ({ ...props }) => {
	const activePlanet = useRecoilValue(activePlanetState)
	const { size } = useThree()

	const cameraControlsRef = useRef<CameraControls | null>(null)
	const cameraRef = useRef(null)

	const toWarpAnim = () => {
		void cameraControlsRef.current?.setLookAt(0, 0, 700, 0, 0, 0, true)
	}

	const toJunoAnim = () => {
		void cameraControlsRef.current?.setLookAt(
			2_000,
			2_000,
			1_500,
			2_600,
			2_600,
			600,
			true
		)
	}

	const toEthereumAnim = () => {
		void cameraControlsRef.current?.setLookAt(
			3_000,
			3_000,
			1_300,
			3_600,
			3_600,
			1_600,
			true
		)
	}

	const toEnterWarpAnim = () => {
		void cameraControlsRef.current?.setLookAt(0, 0, 900, 0, 100, 0, true)
		void cameraControlsRef.current?.rotateAzimuthTo(1, true)
		void cameraControlsRef.current?.rotatePolarTo(2.35, true)
		void cameraControlsRef.current?.truck(730, 0, true)
	}

	useEffect(() => {
		switch (activePlanet) {
			case "warp":
				toWarpAnim()
				break
			case "juno":
				toJunoAnim()
				break
			case "ethereum":
				toEthereumAnim()
				break
			case "warpTop":
				toEnterWarpAnim()
				break
			default:
				toWarpAnim()
				break
		}
	}, [activePlanet])

	useFrame(() => {
		if (cameraRef.current.position.z >= 4_000) {
			void cameraControlsRef.current?.dollyTo(700, true)
		}
	})

	useIsomorphicLayoutEffect(() => {
		const { current: cam } = cameraRef
		if (cam) {
			cam.aspect = size.width / size.height
			cam.updateProjectionMatrix()
		}
	}, [size, props])

	useFrame((state) => {
		const target = {
			x: state.mouse.x * 0.2,
			y: state.mouse.y * 0.2
		}
		state.camera.rotation.x += 0.1 * (target.y - state.camera.rotation.x)
		state.camera.rotation.y += 0.1 * (target.x - state.camera.rotation.y)
	})

	return (
		<>
			<CameraControls ref={cameraControlsRef} />
			<PerspectiveCamera
				far={12_000}
				fov={75}
				makeDefault
				near={3}
				position={[0, 0, 4_000]}
				ref={cameraRef}
				rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
			/>
		</>
	)
}
