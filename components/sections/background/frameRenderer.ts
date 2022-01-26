/* eslint-disable no-param-reassign */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @babel/no-invalid-this */

import type { StarProps } from "./Canvas"

function frameRenderer(ball: StarProps, centerx, centery) {
	const rotate = (
		cx: number,
		cy: number,
		x: number,
		y: number,
		angle: number
	): number[] => {
		const cos = Math.cos(angle)
		const sin = Math.sin(angle)
		const nx = cos * (x - cx) + sin * (y - cy) + cx
		const ny = cos * (y - cy) - sin * (x - cx) + cy

		return [nx, ny]
	}

	const drawStar = (
		x,
		y,
		color,
		cx,
		cy,
		previousX,
		previousY,
		previousRotation,
		rotation
	) => {
		this.save()
		this.fillStyle = color
		this.strokeStyle = color
		this.shadowColor = color
		this.shadowBlur = 6
		this.lineWidth = 6
		this.lineCap = "round"
		this.beginPath()
		const oldPos = rotate(cx, cy, previousX, previousY, -previousRotation)
		this.moveTo(oldPos[0], oldPos[1])
		this.translate(this.canvas.width / 2, this.canvas.height / 2)
		this.rotate(rotation)
		this.translate(-this.canvas.width / 2, -this.canvas.height / 2)
		this.lineTo(x, y)
		this.stroke()
		this.restore()
	}

	drawStar(
		ball.x,
		ball.y,
		ball.color,
		centerx,
		centery,
		ball.previousX,
		ball.previousY,
		ball.previousRotation,
		ball.rotation
	)
}

export default frameRenderer
