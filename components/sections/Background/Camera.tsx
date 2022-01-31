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
		void cameraControlsRef.current?.rotateTo(0, Math.PI / 2, true)
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
			800,
			800,
			1_000,
			1_400,
			1_400,
			400,
			true
		)
	}

	const toEnterWarpAnim = () => {
		void cameraControlsRef.current?.setLookAt(0, 800, 0, 0, 0, 0, true)
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
			void cameraControlsRef.current?.dollyTo(500, true)
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
			x: (1 - state.mouse.x) * 0.2,
			y: (1 - state.mouse.y) * 0.2
		}
		state.camera.rotation.x += 0.1 * (target.y - state.camera.rotation.x)
		state.camera.rotation.y += 0.1 * (target.x - state.camera.rotation.y)
	})

	return (
		<>
			<CameraControls ref={cameraControlsRef} />
			<PerspectiveCamera
				far={4_000}
				fov={70}
				makeDefault
				near={3}
				position={[0, 0, 4_000]}
				ref={cameraRef}
				rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]}
			/>
		</>
	)
}
