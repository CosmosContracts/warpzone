import { nanoid } from "nanoid"
import React from "react"
import * as THREE from "three"
import { Curves } from "three/examples/jsm/curves/CurveExtras"

const geometry = new THREE.RingBufferGeometry(1, 1.01, 64)

const material = new THREE.MeshBasicMaterial({
	color: new THREE.Color("lightgreen"),
	side: THREE.DoubleSide
})

function randomRings(count) {
	const spline = new Curves.TorusKnot()
	const track = new THREE.TubeBufferGeometry(spline, 250, 0.2, 10, true)
	const temporary = []

	let t = 0.4

	for (let index = 0; index < count; index++) {
		t += 0.003
		const pos = track.parameters.path.getPointAt(t)
		pos.multiplyScalar(15)
		const segments = 6
		const pickt = t * 6
		const pick = Math.floor(pickt)
		const lookAt = new THREE.Vector3(0, 0, 0)
		const matrix = new THREE.Matrix4().lookAt(
			pos,
			lookAt,
			track.binormals[pick]
		)
		temporary.push([pos.toArray(), matrix])
	}

	return temporary
}

export const Rings = () => {
	const rings = randomRings(30)

	return rings.map(([pos, matrix], index) => {
		const f = (Math.sin(index / 10) * Math.PI) / 2

		return (
			<mesh
				geometry={geometry}
				key={nanoid()}
				material={material}
				onUpdate={(self) => self.quaternion.setFromRotationMatrix(matrix)}
				position={pos}
				scale={[30 + index * 5 * f, 30 + index * 5 * f, 30 + index * 5 * f]}
			/>
		)
	})
}
