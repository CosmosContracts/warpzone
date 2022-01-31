import { useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useMount } from "ahooks"
import { useRef } from "react"
import { BufferAttribute } from "three"

export const Stars = () => {
	const starFieldRef = useRef<THREE.Points>(null)
	const starParticlesRef = useRef<THREE.BufferGeometry>(null)
	const materialRef = useRef<THREE.PointsMaterial>(null)

	const particleCount = 6_000

	const starPosArray = new Float32Array(particleCount * 3)
	const starPos = new BufferAttribute(starPosArray, 3)

	const starTexture = useTexture("/assets/star.png")

	useMount(() => {
		for (let index = 0; index < particleCount * 3; index++) {
			starPosArray[index] = (Math.random() - 0.5) * 10_000
		}

		starParticlesRef.current.setAttribute("position", starPos)
		materialRef.current.color.setHSL(0.4, 1, 0.33)
	})

	useFrame(() => {
		starFieldRef.current.rotation.z += 0.000_25
		starFieldRef.current.rotation.y += 0.000_25
	})

	return (
		<points frustumCulled={false} position={[0, 0, 0]} ref={starFieldRef}>
			<bufferGeometry ref={starParticlesRef} />
			<pointsMaterial
				alphaTest={0.5}
				map={starTexture}
				ref={materialRef}
				size={4}
				sizeAttenuation
				transparent
			/>
		</points>
	)
}
