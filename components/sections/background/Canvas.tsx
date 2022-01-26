import { UIState } from "@state/atoms/ui"
import { useMount, useUpdateEffect } from "ahooks"
import { useRef } from "react"
import { useRecoilValue } from "recoil"
import frameRenderer from "./frameRenderer"

export const Canvas = (props) => {
	const canvasRef = useRef(null)
	const requestIdRef = useRef(null)
	const ballRef = useRef({ radius: 20, vx: 3.9, vy: 3.3, x: 50, y: 50 })

	const hover = useRecoilValue(UIState)

	let context: CanvasRenderingContext2D
	let size = { x: 250, y: 400 }

	const updateBall = () => {
		const ball = ballRef.current
		ball.x += ball.vx
		ball.y += ball.vy
		if (ball.x + ball.radius >= size.x) {
			ball.vx = -ball.vx
			ball.x = size.x - ball.radius
		}

		if (ball.x - ball.radius <= 0) {
			ball.vx = -ball.vx
			ball.x = ball.radius
		}

		if (ball.y + ball.radius >= size.y) {
			ball.vy = -ball.vy
			ball.y = size.y - ball.radius
		}

		if (ball.y - ball.radius <= 0) {
			ball.vy = -ball.vy
			ball.y = ball.radius
		}
	}

	const renderFrame = () => {
		updateBall()
		frameRenderer.call(context, size, ballRef.current)
	}

	const tick = () => {
		if (!canvasRef.current) return
		renderFrame()
		requestIdRef.current = requestAnimationFrame(tick)
	}

	function fadeOut() {
		context.fillStyle = "rgba(17,49,56,0.2)"
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)
		setTimeout(fadeOut, 1_000 / 60)
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

		context.fillStyle = "rgba(40, 72, 72,1)"
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)
		context.globalCompositeOperation = "multiply"

		handleResize()
		fadeOut()

		window.addEventListener("resize", handleResize)

		return () => {
			cancelAnimationFrame(requestIdRef.current)
			window.removeEventListener("resize", handleResize)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	})

	useUpdateEffect(() => {
		console.log(hover)
	}, [hover])

	return (
		<canvas
			style={{ position: "absolute", top: 0, zIndex: -1 }}
			{...props}
			ref={canvasRef}
		/>
	)
}
