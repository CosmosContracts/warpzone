/* eslint-disable no-negated-condition */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable @babel/no-invalid-this */
import { expandState, hoverState } from "@state/atoms/ui"
import { useMount, useUpdateEffect } from "ahooks"
import { useRef } from "react"
import { useRecoilValue } from "recoil"
import frameRenderer from "./frameRenderer"

export type StarProps = {
	collapseBonus: number
	color: string
	expanded: boolean
	expansePos: number
	gravity: number
	hoverPos: number
	hovered: boolean
	id: number
	previousRotation: number
	previousX: number
	previousY: number
	radius: number
	rotation: number
	speed: number
	startRotation: number
	vx: number
	vy: number
	x: number
	y: number
	yOrigin: number
}

export const Canvas = (props) => {
	const hover = useRecoilValue(hoverState)
	const expand = useRecoilValue(expandState)
	let w: number
	let h: number
	let cw: number
	let ch: number
	const maxOrbit = 150
	let centery: number
	let centerx: number

	const stars = useRef<StarProps[]>([])

	const startTime = Date.now()
	let currentTime: number

	function star(): StarProps {
		const randomWeights: number[] = []
		randomWeights.push(Math.random() * (maxOrbit / 2) + 1)
		randomWeights.push(Math.random() * (maxOrbit / 2) + maxOrbit)

		const gravity =
			randomWeights.reduce(function (p, c) {
				return p + c
			}, 0) / randomWeights.length

		const x = centerx
		const y = centery + gravity
		const yOrigin = centery + gravity

		const speed = ((Math.floor(Math.random() * 2.5) + 1.5) * Math.PI) / 180
		const rotation = 0
		const startRotation =
			((Math.floor(Math.random() * 360) + 1) * Math.PI) / 180

		let collapseBonus = gravity - maxOrbit * 0.7
		if (collapseBonus < 0) {
			collapseBonus = 0
		}

		const id = stars.current.length

		const color = "rgba(13, 214, 158," + (1 - gravity / 255) + ")"

		const hoverPos = centery + maxOrbit / 2 + collapseBonus
		const expansePos =
			centery + (id % 100) * -10 + (Math.floor(Math.random() * 20) + 1)

		const previousRotation = startRotation
		const previousX = x
		const previousY = y

		const radius = Math.random() * 2
		const vx = Math.random() * 2
		const vy = Math.random() * 3

		return {
			collapseBonus,
			color,
			expanded: false,
			expansePos,
			gravity,
			hovered: false,
			hoverPos,
			id,
			previousRotation,
			previousX,
			previousY,
			radius,
			rotation,
			speed,
			startRotation,
			vx,
			vy,
			x,
			y,
			yOrigin
		}
	}

	const canvasRef = useRef(null)
	const requestIdRef = useRef(null)

	let context: CanvasRenderingContext2D

	const updateBall = (index: number) => {
		const starArray = stars.current
		const currentStar = starArray[index]

		if (!currentStar.expanded) {
			if (!currentStar.hovered) {
				// not hovered
				if (currentStar.y > currentStar.yOrigin) {
					currentStar.y -= -20.5
				}

				currentStar.rotation =
					currentStar.startRotation + currentTime * currentStar.speed * 0.8

				if (currentStar.y < currentStar.yOrigin - 4) {
					currentStar.y += (currentStar.yOrigin - currentStar.y) / 15
				}
			} else {
				if (currentStar.y > currentStar.hoverPos) {
					currentStar.y -= (currentStar.hoverPos - currentStar.y) / -5
				}

				if (currentStar.y > currentStar.expansePos - 50) {
					currentStar.y -=
						Math.floor(currentStar.expansePos - 50 - currentStar.y) / -300
					currentStar.rotation =
						currentStar.startRotation + currentTime * currentStar.speed * 1
				}

				if (currentStar.y < currentStar.hoverPos - 4) {
					currentStar.y -=
						Math.floor(currentStar.hoverPos - currentStar.y) / -140
				}
			}
		} else {
			currentStar.rotation =
				currentStar.startRotation + currentTime * (currentStar.speed / 3)
			if (currentStar.y > currentStar.expansePos) {
				currentStar.y -=
					Math.floor(currentStar.expansePos - currentStar.y) / -140
			}
		}

		currentStar.previousRotation = currentStar.rotation
		currentStar.previousY = currentStar.y
		currentStar.previousX = currentStar.x
	}

	const renderFrame = (index: number) => {
		updateBall(index)
		frameRenderer.call(context, stars.current[index], centerx, centery)
	}

	const tick = () => {
		if (!canvasRef.current) return
		const now = Date.now()
		currentTime = (now - startTime) / 50

		context.fillStyle = "rgba(16, 45, 46,0.2)"
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
			w = canvasRef.current.offsetWidth
			h = canvasRef.current.offsetHeight
			cw = w
			ch = h
			centery = ch / 2
			centerx = cw / 2
		}

		context.globalCompositeOperation = "multiply"

		handleResize()

		window.addEventListener("resize", handleResize)

		for (let index = 0; index < 255; index++) {
			if (stars.current.length < 255) {
				const randomStar = star()
				stars.current.push(randomStar)
			}
		}

		for (const hoveredStar of stars.current) {
			hoveredStar.hovered = false
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
				hoveredStar.hovered = true
			}
		} else {
			for (const hoveredStar of stars.current) {
				hoveredStar.hovered = false
			}
		}
	}, [hover])

	useUpdateEffect(() => {
		context = canvasRef.current.getContext("2d")
		if (expand) {
			for (const hoveredStar of stars.current) {
				hoveredStar.expanded = true
			}
		} else {
			for (const hoveredStar of stars.current) {
				hoveredStar.expanded = false
			}
		}
	}, [expand])

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
