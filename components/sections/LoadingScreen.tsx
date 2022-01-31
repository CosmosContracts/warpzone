import { Box, Center } from "@chakra-ui/react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import type { FC } from "react"

const draw: Variants = {
	hidden: { pathLength: 0, pathOffset: 0, rotateZ: 0 },
	visible: (index) => {
		return {
			pathLength: 1.1,
			pathOffset: 1,
			rotateZ: 360,
			transition: {
				delay: index,
				duration: 1.4,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "loop",
				type: "tween"
			}
		}
	}
}

const LoadingScreen: FC = () => {
	return (
		<>
			<Center
				bg="#001C1C"
				h="100vh"
				pos="absolute"
				textAlign="center"
				w="100vw"
				zIndex="4"
			/>
			<Box
				bg="whiteAlpha.50"
				h="full"
				p="15rem"
				pos="absolute"
				top="0"
				w="full"
				zIndex="5"
			>
				<motion.svg
					fill="transparent"
					height="100%"
					strokeWidth={5}
					viewBox="0 0 200 200"
					width="100%"
				>
					<motion.circle
						animate="visible"
						custom={0.8}
						cx="100"
						cy="100"
						initial="hidden"
						r="80"
						stroke="#003232"
						style={{
							filter: "drop-shadow(0px 0px 4px #003232)"
						}}
						variants={draw}
					/>
					<motion.circle
						animate="visible"
						custom={0.4}
						cx="100"
						cy="100"
						initial="hidden"
						r="55"
						stroke="#005252"
						style={{
							filter: "drop-shadow(0px 0px 4px #005252)"
						}}
						variants={draw}
					/>
					<motion.circle
						animate="visible"
						custom={0}
						cx="100"
						cy="100"
						initial="hidden"
						r="30"
						stroke="#0DD69E"
						strokeLinecap="round"
						strokeLinejoin="round"
						style={{
							filter: "drop-shadow(0px 0px 4px #3fffb4)"
						}}
						variants={draw}
					/>
				</motion.svg>
			</Box>
		</>
	)
}

export default LoadingScreen
