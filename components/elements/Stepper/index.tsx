/* eslint-disable react/no-unused-prop-types */
import { Box, Center } from "@chakra-ui/react"
import type {
	AnimationControls,
	AnimationOptions,
	Variants
} from "framer-motion"
import { animate, motion, useAnimation, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"

type ItemProps = {
	active?: boolean
	controls: AnimationControls
	done?: boolean
}

type StepperProps = {
	activeStep: number
}

const Line = ({ controls }: ItemProps) => {
	const style = {
		backgroundImage:
			"linear-gradient(to right,rgba(180, 189, 199,0.25), rgba(172, 184, 197,0.25))",
		height: "0.2rem",
		width: "80px"
	}

	const variants: Variants = {
		initial: { width: 0 },
		start: {
			backgroundImage:
				"linear-gradient(to right,rgba(14,174,87,0.45), rgba(0, 125, 37,0.45))",
			height: "0.2rem",
			transition: { damping: 20, type: "spring" },
			width: "80px"
		}
	}

	return (
		<Box style={style}>
			<motion.div
				animate={controls}
				initial="initial"
				style={style}
				variants={variants}
			/>
		</Box>
	)
}

const Circle = ({ controls, done, active }: ItemProps) => {
	const [isComplete, setIsComplete] = useState(false)
	const stepBackground = useMotionValue(
		"radial-gradient(circle at left bottom,rgba(40, 49, 59,0.25) 40%, rgba(72, 84, 97,0.35))"
	)
	const stepGlow = useMotionValue(
		"0 22px 70px 4px rgba(102, 182, 253,0), 0 -22px 70px 4px rgba(13, 217, 159, 0)"
	)
	const donePathLength = useMotionValue(0)
	const activePathLength = useMotionValue(0)

	const doneOpacity = useMotionValue(0)
	const activeOpacity = useMotionValue(0)

	const transition: AnimationOptions<never> = {
		duration: 1.5,
		ease: "easeInOut",
		type: "tween"
	}

	useEffect(() => {
		if (active) {
			animate(
				stepBackground,
				"radial-gradient(circle at left bottom,rgba(102, 182, 253,0.45) 80%, rgba(28, 122, 253,0.45))",
				transition
			)
			animate(
				stepGlow,
				"0 10px 50px 4px rgba(102, 182, 253,0.25), 0 -10px 50px 4px rgba(13, 217, 159, 0.25)",
				transition
			)
			animate(donePathLength, 0, transition)
			animate(activePathLength, 1, transition)
			animate(activeOpacity, 1, transition)
			animate(doneOpacity, 0, transition)
		} else if (done) {
			animate(
				stepBackground,
				"radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,0.45) 0%, rgba(0, 125, 37,0.45) 90% )",
				transition
			)
			animate(
				stepGlow,
				"0 22px 50px 4px rgba(102, 182, 253,0), 0 -18px 50px 4px rgba(13, 217, 159, 0)",
				transition
			)
			animate(donePathLength, 1, transition)
			animate(doneOpacity, 1, transition)
			animate(activePathLength, 0, transition)
			animate(activeOpacity, 0, transition)
			setIsComplete(true)
		} else {
			animate(
				stepBackground,
				"radial-gradient(circle at left bottom,rgba(40, 49, 59,0.25) 40%, rgba(13, 217, 159, 0.15))",
				transition
			)
			animate(
				stepGlow,
				"0 22px 50px 4px rgba(102, 182, 253,0), 0 -18px 50px 4px rgba(13, 217, 159, 0)",
				transition
			)
			animate(donePathLength, 0, transition)
			animate(activePathLength, 0, transition)
			animate(doneOpacity, 0, transition)
			animate(activeOpacity, 0, transition)
			setIsComplete(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active])

	return (
		<Center
			animate={isComplete ? "start" : controls}
			as={motion.div}
			border="1px solid rgba(255, 255, 255, 0.125)"
			boxSize="2rem"
			rounded="0.6rem"
			// @ts-expect-error "Chakra style props don't support MotionValue in type but it works for now"
			style={{ backgroundImage: stepBackground, boxShadow: stepGlow }}
		>
			<motion.svg
				animate="show"
				exit="hidden"
				fill="transparent"
				height="2rem"
				initial="hidden"
				style={{ padding: "2px" }}
				viewBox="0 0 256 256"
				width="2rem"
			>
				<motion.g style={{ opacity: doneOpacity }}>
					<motion.polyline
						fill="none"
						points="172 104 113.3 160 84 132"
						stroke="#fff"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						style={{
							pathLength: donePathLength
						}}
					/>
					<motion.circle
						cx="128"
						cy="128"
						fill="none"
						r="85"
						stroke="#fff"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="16"
						style={{
							pathLength: donePathLength
						}}
					/>
				</motion.g>

				<motion.g
					fill="none"
					stroke="white"
					strokeDasharray="0 1"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="16"
					style={{ opacity: activeOpacity }}
				>
					<motion.path
						d="M94.1,184.6c-11.4,33.9-56.6,33.9-56.6,33.9s0-45.2,33.9-56.6"
						style={{
							pathLength: activePathLength
						}}
					/>
					<motion.path
						d="M195.9,105.4,128,173.3,82.7,128l67.9-67.9C176.3,34.4,202,34.7,213,36.3a7.8,7.8,0,0,1,6.7,6.7C221.3,54,221.6,79.7,195.9,105.4Z"
						style={{
							pathLength: activePathLength
						}}
					/>
					<motion.path
						d="M184.6,116.7v64.6a8,8,0,0,1-2.4,5.6l-32.3,32.4a8,8,0,0,1-13.5-4.1L128,173.3"
						style={{
							pathLength: activePathLength
						}}
					/>
					<motion.path
						d="M139.3,71.4H74.7a8,8,0,0,0-5.6,2.4L36.7,106.1a8,8,0,0,0,4.1,13.5L82.7,128"
						style={{
							pathLength: activePathLength
						}}
					/>
				</motion.g>
			</motion.svg>
		</Center>
	)
}

const Stepper = ({ activeStep }: StepperProps) => {
	const stepperControls = useAnimation()
	const line1 = useAnimation()
	const line2 = useAnimation()

	const firstCircle = useAnimation()
	const secondCircle = useAnimation()
	const thirdCircle = useAnimation()

	const stepperVariants: Variants = {
		hidden: {
			transition: {
				duration: 0.3,
				type: "tween"
			},
			y: 100
		},
		show: {
			transition: {
				duration: 0.3,
				type: "tween"
			},
			y: 0
		}
	}

	useEffect(() => {
		if (activeStep === 0) {
			const sequence = async () => {
				void stepperControls.start("hidden")
			}

			void sequence()
		}

		if (activeStep === 1) {
			const sequence = async () => {
				void stepperControls.start("show")
				await firstCircle.start("start")
				await secondCircle.start("initial")
				await thirdCircle.start("initial")
				await line1.start("initial")
				await line2.start("initial")
			}

			void sequence()
		}

		if (activeStep === 2) {
			const sequence = async () => {
				await line1.start("start")
				await secondCircle.start("start")
			}

			void sequence()
		}

		if (activeStep === 3) {
			const sequence = async () => {
				await line2.start("start")
				await thirdCircle.start("start")
			}

			void sequence()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStep])

	return (
		<Center
			animate={stepperControls}
			as={motion.div}
			initial="hidden"
			inset="auto auto 2rem auto"
			pos="absolute"
			variants={stepperVariants}
		>
			<Circle
				active={activeStep === 1}
				controls={firstCircle}
				done={activeStep - 1 >= 1}
			/>
			<Line active={false} controls={line1} done={false} />
			<Circle
				active={activeStep === 2}
				controls={secondCircle}
				done={activeStep - 1 >= 2}
			/>
			<Line active={false} controls={line2} done={false} />
			<Circle
				active={activeStep === 3}
				controls={thirdCircle}
				done={activeStep - 1 >= 3}
			/>
		</Center>
	)
}

export default Stepper
