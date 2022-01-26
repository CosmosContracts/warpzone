/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @babel/no-invalid-this */
import { UIState } from "@state/atoms/ui"
import { useMount, useUpdateEffect } from "ahooks"
import { useRef } from "react"
import { useRecoilValue } from "recoil"
import frameRenderer from "./frameRenderer"

type StarProps = {
	color: string
	gravity: number
	radius: number
	vx: number
	vy: number
	x: number
	y: number
}

export const Canvas = (props) => {
	const hover = useRecoilValue(UIState)
	const maxOrbit = 255

	const stars = useRef<StarProps[]>([])

	const startTime = Date.now()
	let currentTime: number

	function star(): StarProps {
		const randomWeights: number[] = []
		randomWeights.push(Math.random() * (maxOrbit / 2) + 1)
		randomWeights.push(Math.random() * (maxOrbit / 2) + maxOrbit)

		const color = "rgb(13, 214, 158)"

		const gravity =
			randomWeights.reduce(function (p, c) {
				return p + c
			}, 0) / randomWeights.length

		const radius = Math.random() * 2
		const vx = Math.random() * 2
		const vy = Math.random() * 3
		const x = Math.floor(Math.random() * 50) + 1
		const y = Math.floor(Math.random() * 50) + 1

		return { color, gravity, radius, vx, vy, x, y }
	}

	const canvasRef = useRef(null)
	const requestIdRef = useRef(null)

	let context: CanvasRenderingContext2D
	let size = { x: 250, y: 400 }

	const updateBall = (index: number) => {
		const starArray = stars.current
		const currentStar = starArray[index]

		currentStar.x += currentStar.vx
		currentStar.y += currentStar.vy
		if (currentStar.x + currentStar.radius >= size.x) {
			currentStar.vx = -currentStar.vx
			currentStar.x = size.x - currentStar.radius
		}

		if (currentStar.x - currentStar.radius <= 0) {
			currentStar.vx = -currentStar.vx
			currentStar.x = currentStar.radius
		}

		if (currentStar.y + currentStar.radius >= size.y) {
			currentStar.vy = -currentStar.vy
			currentStar.y = size.y - currentStar.radius
		}

		if (currentStar.y - currentStar.radius <= 0) {
			currentStar.vy = -currentStar.vy
			currentStar.y = currentStar.radius
		}
	}

	const renderFrame = (index: number) => {
		updateBall(index)
		frameRenderer.call(context, context, size, stars.current[index])
	}

	const tick = () => {
		if (!canvasRef.current) return
		const now = Date.now()
		currentTime = (now - startTime) / 50

		context.fillStyle = "rgba(16, 45, 46,0.3)"
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)

		// eslint-disable-next-line @typescript-eslint/prefer-for-of
		for (let index = 0; index < stars.current.length; index++) {
			renderFrame(index)
		}

		requestIdRef.current = requestAnimationFrame(tick)
	}

	useMount(() => {
		context = canvasRef.current.getContext("2d")
		requestIdRef.current = requestAnimationFrame(tick)

		const handleResize = () => {
			const x = window.innerWidth
			const y = window.innerHeight

			context.canvas.width = x
			context.canvas.height = y
			size = { x, y }
			// w = canvasRef.current.offsetWidth
			// h = canvasRef.current.offsetHeight
			// cw = w
			// ch = h
			// centery = ch / 2
			// centerx = cw / 2
		}

		context.globalCompositeOperation = "multiply"

		handleResize()

		window.addEventListener("resize", handleResize)

		for (let index = 0; index < 250; index++) {
			const randomStar = star()
			stars.current.push(randomStar)
		}

		return () => {
			cancelAnimationFrame(requestIdRef.current)
			window.removeEventListener("resize", handleResize)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	})

	useUpdateEffect(() => {
		context = canvasRef.current.getContext("2d")
		if (hover) {
			for (const hoveredStar of stars.current) {
				hoveredStar.color = "#006699"
			}

			console.log(stars.current)
			console.log(stars.current.length)
		} else {
			for (const hoveredStar of stars.current) {
				hoveredStar.color = "#fff"
				console.log(hoveredStar)
			}
		}
	}, [hover])

	return (
		<canvas
			style={{
				position: "absolute",
				top: 0,
				zIndex: -1
			}}
			{...props}
			ref={canvasRef}
		/>
	)
}
