import { Environment } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { KernelSize } from "postprocessing"
import { useRef, Suspense } from "react"
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil"
import { ACESFilmicToneMapping, Color } from "three"
import { Camera } from "./Camera"
import { Ethereum } from "./Ethereum"
import { Juno } from "./Juno"
import { Stars } from "./Stars"
import { Warpzone } from "./Warpzone"

export const Scene = () => {
	const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE()

	const ambientLightRef = useRef<THREE.AmbientLight>(null)

	return (
		<Canvas
			dpr={[1, 1.5]}
			gl={{
				alpha: false,
				antialias: false,
				depth: false,
				powerPreference: "high-performance",
				stencil: false
			}}
			onCreated={({ gl }) => {
				gl.toneMapping = ACESFilmicToneMapping
				gl.setClearColor(new Color("#000202"))
			}}
		>
			<RecoilBridge>
				<Camera />
				<Environment
					background={false}
					files={["px.png", "nx.png", "py.png", "ny.png", "pz.png", "nz.png"]}
					path="/assets/background/skybox/"
				/>
				<ambientLight ref={ambientLightRef} />
				<Stars />
				<Suspense fallback={null}>
					<fogExp2 args={["#000202", 0.000_5]} attach="fog" />
					<Warpzone position={[0, 0, 0]} />
					<Juno />
					<Ethereum />
					<EffectComposer multisampling={8}>
						<Bloom
							intensity={0.6}
							kernelSize={3}
							luminanceSmoothing={0.4}
							luminanceThreshold={0}
						/>
						<Bloom
							intensity={0.5}
							kernelSize={KernelSize.HUGE}
							luminanceSmoothing={0}
							luminanceThreshold={0}
						/>
					</EffectComposer>
				</Suspense>
			</RecoilBridge>
		</Canvas>
	)
}
