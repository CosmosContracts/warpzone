/* eslint-disable @babel/no-invalid-this */
function frameRenderer(size, ball) {
	// eslint-disable-next-line unicorn/consistent-function-scoping
	const drawStar = (x, y, radius, color, alpha) => {
		this.save()
		this.shadowColor = "rgb(13, 214, 158)"
		this.shadowBlur = 8
		this.beginPath()
		this.arc(x, y, radius, 0, Math.PI * 2)
		this.fillStyle = color
		this.globalAlpha = alpha
		this.fill()
		this.closePath()
		this.restore()
	}

	drawStar(ball.x, ball.y, ball.radius, "rgb(13, 214, 158)", 0.3)
}

export default frameRenderer
