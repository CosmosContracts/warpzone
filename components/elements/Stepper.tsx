import { Center } from "@chakra-ui/react"
import {
	animate,
	AnimationControls,
	AnimatePresence,
	motion,
	useAnimation,
	useMotionValue,
	Variants
} from "framer-motion"
import { useEffect, useState } from "react"

interface CircleProps {
	controls: AnimationControls
	done: boolean
	active: boolean
}

interface StepperProps {
	activeStep: number
}

const Line = ({ controls }) => {
	const style = {
		backgroundImage:
			"linear-gradient(to right,rgba(180, 189, 199,0.35), rgba(172, 184, 197,0.65))",
		width: "80px",
		height: "0.2rem"
	}

	const variants: Variants = {
		start: {
			width: "80px",
			height: "0.2rem",
			backgroundImage:
				"linear-gradient(to right,rgba(152, 222, 91,0.65), rgba(8, 225, 174,0.65))",
			transition: { duration: 0.75, ease: "linear" }
		},
		initial: { width: 0 }
	}

	return (
		<div style={style}>
			<motion.div
				style={style}
				initial={"initial"}
				variants={variants}
				animate={controls}
			></motion.div>
		</div>
	)
}

const Circle = ({ controls, done, active }: CircleProps) => {
	const [isComplete, setIsComplete] = useState(false)
	const stepBackground = useMotionValue(
		"radial-gradient(circle at left bottom,rgba(40, 49, 59,0.15) 40%, rgba(72, 84, 97,0.65))"
	)
	const checkPathLength = useMotionValue(0)
	const activePathLength = useMotionValue(0)
	const circlePathLength = useMotionValue(0)
	useEffect(() => {
		if (active) {
			animate(
				stepBackground,
				"radial-gradient(circle at left bottom,rgba(102, 182, 253,0.65) 80%, rgba(28, 122, 253,0.65))",
				{
					damping: 20,
					type: "spring"
				}
			)
			animate(checkPathLength, 0, {
				damping: 20,
				type: "spring"
			})
			animate(activePathLength, 1, {
				damping: 10,
				stiffness: 20,
				type: "spring"
			})
			animate(circlePathLength, 1, {
				damping: 20,
				type: "spring"
			})
		} else if (done) {
			animate(
				stepBackground,
				"radial-gradient(circle at left bottom,rgba(152, 222, 91,0.65) 80%, rgba(8, 225, 174,0.65))",
				{
					damping: 20,
					type: "spring"
				}
			)
			animate(checkPathLength, 1, {
				damping: 20,
				type: "spring"
			})
			animate(activePathLength, 0, {
				damping: 20,
				type: "spring"
			})
			animate(circlePathLength, 1, {
				damping: 20,
				type: "spring"
			})
			setIsComplete(true)
		} else {
			animate(
				stepBackground,
				"radial-gradient(circle at left bottom,rgba(40, 49, 59,0.15) 40%, rgba(72, 84, 97,0.65))",
				{
					damping: 20,
					type: "spring"
				}
			)
			animate(checkPathLength, 0, {
				damping: 20,
				type: "spring"
			})
			animate(activePathLength, 0, {
				damping: 20,
				type: "spring"
			})
			animate(circlePathLength, 0, {
				damping: 20,
				type: "spring"
			})
			setIsComplete(false)
		}
	}, [
		done,
		stepBackground,
		active,
		checkPathLength,
		activePathLength,
		circlePathLength
	])

	return (
		<Center
			boxSize="2rem"
			rounded="xl"
			as={motion.div}
			// @ts-expect-error
			style={{ backgroundImage: stepBackground }}
			animate={isComplete ? "start" : controls}
		>
			<AnimatePresence exitBeforeEnter>
				{done && (
					<motion.svg viewBox="0 0 60 60">
						<motion.circle
							cx="30"
							cy="30"
							r="20"
							fill="none"
							animate={controls}
							style={{
								pathLength: circlePathLength,
								scale: 1
							}}
							strokeWidth="5"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<motion.path
							fill="none"
							strokeWidth="5"
							stroke="white"
							d="M14,26 L 22,33 L 35,16"
							strokeDasharray="0 1"
							animate={controls}
							style={{
								pathLength: checkPathLength,
								translateX: 6,
								translateY: 6,
								scale: 1
							}}
						/>
					</motion.svg>
				)}
				{active && (
					<motion.svg
						style={{ padding: "2px" }}
						animate={controls}
						viewBox="0 0 256 256"
					>
						<motion.path
							d="M94.1,184.6c-11.4,33.9-56.6,33.9-56.6,33.9s0-45.2,33.9-56.6"
							fill="none"
							animate={controls}
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
							strokeWidth="16"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
						></motion.path>
						<motion.path
							d="M195.9,105.4,128,173.3,82.7,128l67.9-67.9C176.3,34.4,202,34.7,213,36.3a7.8,7.8,0,0,1,6.7,6.7C221.3,54,221.6,79.7,195.9,105.4Z"
							fill="none"
							animate={controls}
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
							strokeWidth="16"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
						></motion.path>
						<motion.path
							d="M184.6,116.7v64.6a8,8,0,0,1-2.4,5.6l-32.3,32.4a8,8,0,0,1-13.5-4.1L128,173.3"
							fill="none"
							animate={controls}
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
							strokeWidth="16"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
						></motion.path>
						<motion.path
							d="M139.3,71.4H74.7a8,8,0,0,0-5.6,2.4L36.7,106.1a8,8,0,0,0,4.1,13.5L82.7,128"
							fill="none"
							animate={controls}
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
							strokeWidth="16"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
						></motion.path>
					</motion.svg>
				)}
			</AnimatePresence>
		</Center>
	)
}

const Stepper = ({ activeStep }: StepperProps) => {
	const [active, setActive] = useState(0)

	const line1 = useAnimation()
	const line2 = useAnimation()
	const line3 = useAnimation()
	const firstCircle = useAnimation()
	const secondCircle = useAnimation()
	const thirdCircle = useAnimation()
	const fourthCircle = useAnimation()

	const stepperVariants: Variants = {
		hidden: {
			y: 100,
			transition: {
				stiffness: 10,
				damping: 15
			}
		},
		show: {
			y: 0,
			transition: {
				stiffness: 50,
				damping: 15
			}
		}
	}

	useEffect(() => {
		setActive(activeStep)
	}, [activeStep])

	useEffect(() => {
		if (active === 0) {
			const sequence = async () => {
				await firstCircle.start("initial")
				await thirdCircle.start("initial")
				await line2.start("initial")
				await secondCircle.start("initial")
				await line1.start("initial")
			}
			sequence()
		}
		if (active === 1) {
			const sequence = async () => {
				await line1.start("start")
				await secondCircle.start("start")
			}
			sequence()
		}
		if (active === 2) {
			const sequence = async () => {
				await line2.start("start")
				await thirdCircle.start("start")
			}
			sequence()
		}
		if (active === 3) {
			const sequence = async () => {
				await line3.start("start")
				await fourthCircle.start("start")
			}
			sequence()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active])

	return (
		<Center
			as={motion.div}
			variants={stepperVariants}
			initial="hidden"
			animate="show"
			pos={"absolute"}
			inset="auto auto 2rem auto"
		>
			<Circle
				active={active === 0 ? true : false}
				done={active - 1 >= 0 ? true : false}
				controls={firstCircle}
			/>
			<Line controls={line1} />
			<Circle
				active={active === 1 ? true : false}
				done={active - 1 >= 1 ? true : false}
				controls={secondCircle}
			/>
			<Line controls={line2} />
			<Circle
				active={active === 2 ? true : false}
				done={active - 1 >= 2 ? true : false}
				controls={thirdCircle}
			/>
			<Line controls={line3} />
			<Circle
				active={active === 3 ? true : false}
				done={active - 1 >= 3 ? true : false}
				controls={fourthCircle}
			/>
		</Center>
	)
}

export { Stepper }
