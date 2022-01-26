/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable @babel/no-invalid-this */
function frameRenderer(context: CanvasRenderingContext2D, size, ball) {
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

	const drawStar = (x, y, radius, color) => {
		this.save()
		this.shadowColor = "rgb(13, 214, 158)"
		this.shadowBlur = 8
		this.lineWidth = 3
		this.beginPath()
		this.lineTo(this.x, this.y)
		this.arc(x, y, radius, 0, Number(Math.PI * 2))
		this.fillStyle = color
		this.fill()
		this.closePath()
		this.restore()
	}

	drawStar(ball.x, ball.y, ball.radius, ball.color)
}

export default frameRenderer
