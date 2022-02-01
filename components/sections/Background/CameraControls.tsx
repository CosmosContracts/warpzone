// eslint-disable-next-line unicorn/no-abusive-eslint-disable
/* eslint-disable */
import type { ReactThreeFiber } from "@react-three/fiber"
import { extend, useFrame, useThree } from "@react-three/fiber"
import CameraControlsDefault from "camera-controls"
import type { ForwardedRef, MutableRefObject } from "react"
import React, { forwardRef, useEffect, useRef } from "react"
import {
	MOUSE,
	Vector2,
	Vector3,
	Vector4,
	Quaternion,
	Matrix4,
	Spherical,
	Box3,
	Sphere,
	Raycaster,
	MathUtils
} from "three"

declare global {
	namespace JSX {
		interface IntrinsicElements {
			cameraControlsDefault: ReactThreeFiber.Node<
				CameraControlsDefault,
				typeof CameraControlsDefault
			>
		}
	}
}

const subsetOfTHREE = {
	Box3,
	MathUtils: {
		clamp: MathUtils.clamp,
		DEG2RAD: MathUtils.DEG2RAD
	},
	Matrix4,
	MOUSE,
	Quaternion,
	Raycaster,
	Sphere,
	Spherical,
	Vector2,
	Vector3,
	Vector4
}

CameraControlsDefault.install({ THREE: subsetOfTHREE })
extend({ CameraControlsDefault })

export const CameraControls = forwardRef<CameraControlsDefault, unknown>(
	(_, ref) => {
		const cameraControls = useRef<CameraControlsDefault | null>(null)
		const camera = useThree((state) => state.camera)
		const renderer = useThree((state) => state.gl)
		useFrame((_, delta) => cameraControls.current?.update(delta))
		useEffect(() => () => cameraControls.current?.dispose(), [])
		return (
			<cameraControlsDefault
				args={[camera, renderer.domElement]}
				ref={mergeReferences<CameraControlsDefault>(cameraControls, ref)}
			/>
		)
	}
)

export type CameraControls = CameraControlsDefault

function mergeReferences<T>(
	...references: Array<ForwardedRef<T> | MutableRefObject<T>>
) {
	return (instance: T): void => {
		for (const ref of references) {
			if (typeof ref === "function") {
				ref(instance)
			} else if (ref) {
				ref.current = instance
			}
		}
	}
}
