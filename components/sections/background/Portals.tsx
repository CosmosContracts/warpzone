import { useTexture } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { folder, useControls } from "leva"
import { nanoid } from "nanoid"
import React, { useRef, useEffect, useMemo } from "react"
import * as THREE from "three"
import { Curves } from "three/examples/jsm/curves/CurveExtras"
import { Rings } from "./Rings"

// const { width, height } = useControls("Portal", {
// 	Geometry: folder({
// 		height: {
// 			max: 500,
// 			min: 10,
// 			step: 10,
// 			value: 300
// 		},
// 		width: {
// 			max: 500,
// 			min: 10,
// 			step: 10,
// 			value: 300
// 		}
// 	})
// })

// TODO
// function randomPortalCenter(count) {
// 	const spline = new Curves.TorusKnot()
// 	const track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
// 	const temporary = []

// 	let t = 0.4

// 	for (let index = 0; index < count; index++) {
// 		t += 0.003
// 		const pos = new THREE.Vector3(
// 			0.5 * index * Math.cos((4 * index * Math.PI) / 180),
// 			0.5 * index * Math.sin((4 * index * Math.PI) / 180),
// 			0.1 * index
// 		)
// 		const pickt = t * 6
// 		const pick = Math.floor(pickt)
// 		const lookAt = new THREE.Vector3(0, 0, 0)
// 		const matrix = new THREE.Matrix4().lookAt(
// 			pos,
// 			lookAt,
// 			track.binormals[pick]
// 		)
// 		temporary.push([pos.toArray(), matrix])
// 	}

// 	return temporary
// }

export const Portal = () => {
	const rings = useRef(Array.from({ length: 30 }))

	const smokeReferences = useRef([])

	const portalSmokeTexture = useTexture("/assets/smoke.png")

	const smokeGeo = new THREE.PlaneBufferGeometry(1_000, 1_000)
	const smokeMaterial = new THREE.MeshStandardMaterial({
		color: "#0DD69E",
		map: portalSmokeTexture,
		transparent: true
	})

	return (
		<motion.group scale={[0.5, 0.5, 0.5]}>
			{rings.current.map((_, index) => {
				const f = (Math.sin(index / 10) * Math.PI) / 2
				const pos = new THREE.Vector3(
					Math.random() * 1_000 - 500,
					Math.random() * 400 - 200,
					index
				)
				const rotation = new THREE.Euler(0, 0, Math.random() * 360)
				return (
					<mesh
						geometry={smokeGeo}
						key={nanoid()}
						material={smokeMaterial}
						position={pos}
						ref={(ref) => smokeReferences.current.push(ref)}
						rotation={rotation}
					/>
				)
			})}
		</motion.group>
	)
}
