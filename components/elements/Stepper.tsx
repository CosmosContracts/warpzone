/* eslint-disable react/no-unused-prop-types */
import { Center } from "@chakra-ui/react"
import type { AnimationControls, Variants } from "framer-motion"
import {
	animate,
	AnimatePresence,
	motion,
	useAnimation,
	useMotionValue
} from "framer-motion"
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
			"linear-gradient(to right,rgba(180, 189, 199,0.35), rgba(172, 184, 197,0.65))",
		height: "0.2rem",
		width: "80px"
	}

	const variants: Variants = {
		initial: { width: 0 },
		start: {
			backgroundImage:
				"linear-gradient(to right,rgba(152, 222, 91,0.65), rgba(8, 225, 174,0.65))",
			height: "0.2rem",
			transition: { damping: 20, type: "spring" },
			width: "80px"
		}
	}

	return (
		<div style={style}>
			<motion.div
				animate={controls}
				initial="initial"
				style={style}
				variants={variants}
			/>
		</div>
	)
}

const Circle = ({ controls, done, active }: ItemProps) => {
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
			animate={isComplete ? "start" : controls}
			as={motion.div}
			boxSize="2rem"
			rounded="xl"
			// @ts-expect-error "Chakra style props don't support MotionValue in type but it works for now"
			style={{ backgroundImage: stepBackground }}
		>
			<AnimatePresence exitBeforeEnter>
				{done && (
					<motion.svg viewBox="0 0 60 60">
						<motion.circle
							animate={controls}
							cx="30"
							cy="30"
							fill="none"
							r="20"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="5"
							style={{
								pathLength: circlePathLength,
								scale: 1
							}}
						/>
						<motion.path
							animate={controls}
							d="M14,26 L 22,33 L 35,16"
							fill="none"
							stroke="white"
							strokeDasharray="0 1"
							strokeWidth="5"
							style={{
								pathLength: checkPathLength,
								scale: 1,
								translateX: 6,
								translateY: 6
							}}
						/>
					</motion.svg>
				)}
				{active && (
					<motion.svg
						animate={controls}
						style={{ padding: "2px" }}
						viewBox="0 0 256 256"
					>
						<motion.path
							animate={controls}
							d="M94.1,184.6c-11.4,33.9-56.6,33.9-56.6,33.9s0-45.2,33.9-56.6"
							fill="none"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="16"
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
						/>
						<motion.path
							animate={controls}
							d="M195.9,105.4,128,173.3,82.7,128l67.9-67.9C176.3,34.4,202,34.7,213,36.3a7.8,7.8,0,0,1,6.7,6.7C221.3,54,221.6,79.7,195.9,105.4Z"
							fill="none"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="16"
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
						/>
						<motion.path
							animate={controls}
							d="M184.6,116.7v64.6a8,8,0,0,1-2.4,5.6l-32.3,32.4a8,8,0,0,1-13.5-4.1L128,173.3"
							fill="none"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="16"
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
						/>
						<motion.path
							animate={controls}
							d="M139.3,71.4H74.7a8,8,0,0,0-5.6,2.4L36.7,106.1a8,8,0,0,0,4.1,13.5L82.7,128"
							fill="none"
							stroke="white"
							strokeDasharray="0 1"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="16"
							style={{
								pathLength: activePathLength,
								scale: 1
							}}
						/>
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
			transition: {
				damping: 15,
				stiffness: 10
			},
			y: 100
		},
		show: {
			transition: {
				damping: 15,
				stiffness: 50
			},
			y: 0
		}
	}

	useEffect(() => {
		setActive(activeStep)
	}, [activeStep])

	useEffect(() => {
		if (active === 0) {
			const sequence = async () => {
				await firstCircle.start("initial")
				await secondCircle.start("initial")
				await thirdCircle.start("initial")
				await line3.start("initial")
				await line2.start("initial")
				await line1.start("initial")
			}

			sequence().finally(() => {})
		}

		if (active === 1) {
			const sequence = async () => {
				await line1.start("start")
				await secondCircle.start("start")
			}

			sequence().finally(() => {})
		}

		if (active === 2) {
			const sequence = async () => {
				await line2.start("start")
				await thirdCircle.start("start")
			}

			sequence().finally(() => {})
		}

		if (active === 3) {
			const sequence = async () => {
				await line3.start("start")
				await fourthCircle.start("start")
			}

			sequence().finally(() => {})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active])

	return (
		<Center
			animate="show"
			as={motion.div}
			initial="hidden"
			inset="auto auto 2rem auto"
			pos="absolute"
			variants={stepperVariants}
		>
			<Circle
				active={active === 0}
				controls={firstCircle}
				done={active - 1 >= 0}
			/>
			<Line active={false} controls={line1} done={false} />
			<Circle
				active={active === 1}
				controls={secondCircle}
				done={active - 1 >= 1}
			/>
			<Line active={false} controls={line2} done={false} />
			<Circle
				active={active === 2}
				controls={thirdCircle}
				done={active - 1 >= 2}
			/>
			<Line active={false} controls={line3} done={false} />
			<Circle
				active={active === 3}
				controls={fourthCircle}
				done={active - 1 >= 3}
			/>
		</Center>
	)
}

export { Stepper }
