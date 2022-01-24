/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable @babel/no-invalid-this */
/* eslint-disable no-new */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable func-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable canonical/id-match */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-negated-condition */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { forwardRef, useEffect, useRef } from "react"

type StarProps = {
	collapseBonus: number
	color: string
	draw?: () => void
	gravity: number
	id: number
	previousRotation: number
	previousX: number
	previousY: number
	rotation: number
	speed: number
	startRotation: number
	x: number
	y: number
	yOrigin: number
}

const PureCanvas = forwardRef<HTMLCanvasElement>((props, ref) => (
	<canvas
		style={{
			position: "relative"
		}}
		{...props}
		ref={ref}
	/>
))

export const Background = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const parentRef = useRef<HTMLDivElement>(null)
	let context: CanvasRenderingContext2D

	let w: number
	let h: number
	let cw: number
	let ch: number
	const maxOrbit = 255
	let centery: number
	let centerx: number

	const startTime = Date.now()
	let currentTime = 0

	const stars: StarProps[] = []

	function fadeOut() {
		context.fillStyle = "rgba(17,49,56,0.2)"
		context.fillRect(0, 0, context.canvas.width, context.canvas.height)
		setTimeout(fadeOut, 1_000 / 60)
	}

	function rotate(
		cx: number,
		cy: number,
		x: number,
		y: number,
		angle: number
	): number[] {
		const cos = Math.cos(angle)
		const sin = Math.sin(angle)
		const nx = cos * (x - cx) + sin * (y - cy) + cx
		const ny = cos * (y - cy) - sin * (x - cx) + cy

		return [nx, ny]
	}

	const star = function () {
		this.canvas = context.canvas
		const randomWeights: number[] = []
		randomWeights.push(Math.random() * (maxOrbit / 2) + 1)
		randomWeights.push(Math.random() * (maxOrbit / 2) + maxOrbit)

		this.gravity =
			randomWeights.reduce(function (p, c) {
				return p + c
			}, 0) / randomWeights.length

		this.x = centerx

		this.y = centery + this.gravity
		this.yOrigin = centery + this.gravity

		this.speed = ((Math.floor(Math.random() * 2.5) + 1.5) * Math.PI) / 180
		this.rotation = 0
		this.startRotation = ((Math.floor(Math.random() * 360) + 1) * Math.PI) / 180

		this.collapseBonus = this.gravity - maxOrbit * 0.7
		if (this.collapseBonus < 0) {
			this.collapseBonus = 0
		}

		this.id = stars.length

		this.color = "rgba(13, 214, 158," + (1 - this.gravity / 255) + ")"

		this.previousRotation = this.startRotation
		this.previousX = this.x
		this.previousY = this.y

		stars.push(this)
	}

	star.prototype.draw = function () {
		this.rotation = this.startRotation + currentTime * this.speed
		if (this.y > this.yOrigin) {
			this.y -= 2.5
		}

		if (this.y < this.yOrigin - 4) {
			this.y += (this.yOrigin - this.y) / 100
		}

		context.save()
		context.fillStyle = this.color
		context.strokeStyle = this.color
		context.shadowColor = "rgb(13, 214, 158)"
		context.shadowBlur = 10
		context.lineWidth = 3
		context.lineCap = "round"
		context.beginPath()
		var oldPos = rotate(
			centerx,
			centery,
			this.previousX,
			this.previousY,
			-this.previousRotation
		)
		context.moveTo(oldPos[0], oldPos[1])
		context.translate(this.canvas.width / 2, this.canvas.height / 2)
		context.rotate(this.rotation)
		context.translate(-this.canvas.width / 2, -this.canvas.height / 2)
		context.lineTo(this.x, this.y)
		context.stroke()
		context.restore()

		this.previousRotation = this.rotation
		this.previousY = this.y
		this.previousX = this.x
	}

	function drawStars() {
		const now = Date.now()
		currentTime = (now - startTime) / 50

		for (const index of stars) {
			index.draw()
		}

		requestAnimationFrame(() => drawStars())
	}

	useEffect(() => {
		context = canvasRef.current.getContext("2d")
		const canvas = context.canvas

		const handleResize = () => {
			context.canvas.height = window.innerHeight
			context.canvas.width = window.innerWidth
			w = canvasRef.current.offsetWidth
			h = canvasRef.current.offsetHeight
			cw = w
			ch = h
			centery = ch / 2
			centerx = cw / 2
		}

		const startAnimation = () => {
			drawStars()
			fadeOut()
		}

		context.fillStyle = "rgba(50, 82, 82,1)"
		context.fillRect(0, 0, canvas.width, canvas.height)
		context.globalCompositeOperation = "multiply"

		handleResize()

		for (let index = 0; index < 250; index++) {
			new star()
		}

		requestAnimationFrame(() => startAnimation())

		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [])

	return (
		<Box
			as={motion.div}
			pos="absolute"
			ref={parentRef}
			top="0"
			w="full"
			zIndex="-1"
		>
			<PureCanvas ref={canvasRef} />
		</Box>
	)
}
