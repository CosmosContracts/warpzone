import type { Variants } from "framer-motion"
import { motion } from "framer-motion"

const LogoVariants: Variants = {
	normal: {
		rotateZ: 0
	},
	spin: {
		rotateZ: 360
	}
}

const Logo = () => (
	<motion.svg
		animate="spin"
		initial="normal"
		style={{ fontSize: 38, position: "relative", right: 1, top: 0.8 }}
		transition={{
			duration: 1,
			repeat: Number.POSITIVE_INFINITY,
			repeatType: "loop"
		}}
		variants={LogoVariants}
		viewBox="0 0 100 100"
	>
		<path
			d="M45 13.1c9.7-5.6 21.9-4.4 30.3 3l4.6 4-6-1.2c-7.7-1.5-15.9-.1-23.2 4.1-7.3 4.2-12.6 10.6-15.1 18l-2 5.8-1.2-6C30.3 29.9 35.3 18.7 45 13.1z"
			fill="rgb(241, 242, 243)"
		/>
		<path
			d="M33.3 60.6l5.8 2-4-4.6C29.9 52.1 27 44.2 27 35.9c0-8.4 2.9-16.2 8.1-22.1l4.1-4.6-5.8 2c-10.6 3.6-17.7 13.5-17.7 24.7-.1 11.2 7 21.1 17.6 24.7z"
			fill="rgb(241, 242, 243)"
		/>
		<path
			d="M33.6 76.2c6.2 0 12.3-2.2 17.2-6.5l4.6-4-6 1.2c-7.7 1.6-15.9.1-23.2-4.1-7.3-4.2-12.6-10.6-15.1-18l-2-5.8L8 45c-2.2 11 2.9 22.1 12.6 27.7 4 2.4 8.5 3.5 13 3.5z"
			fill="rgb(241, 242, 243)"
		/>
		<path
			d="M67.5 59.1l-1.2-6-2 5.8c-2.5 7.4-7.9 13.8-15.1 18-7.2 4.3-15.4 5.7-23.1 4.1l-6-1.2 4.6 4c4.9 4.3 11 6.5 17.2 6.5 4.5 0 9-1.2 13.1-3.5 9.7-5.5 14.7-16.7 12.5-27.7z"
			fill="rgb(241, 242, 243)"
		/>
		<path
			d="M66.7 39.4l-5.8-2L65 42c5.2 5.9 8.1 13.7 8.1 22.1 0 8.4-2.9 16.2-8.1 22.1l-4.1 4.6 5.8-2c10.6-3.6 17.7-13.5 17.7-24.7S77.3 43 66.7 39.4z"
			fill="rgb(241, 242, 243)"
		/>
		<path
			d="M79.4 27.3c-9.7-5.6-21.9-4.4-30.3 3l-4.6 4 6-1.2c7.7-1.6 15.9-.1 23.2 4.1 7.3 4.2 12.6 10.6 15.1 18l2 5.8 1.2-6c2.2-11-2.9-22.1-12.6-27.7z"
			fill="rgb(241, 242, 243)"
		/>
	</motion.svg>
)

export default Logo
