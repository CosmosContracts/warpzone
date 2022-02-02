import {
	Center,
	Text,
	Button,
	Stack,
	IconButton,
	Flex,
	HStack,
	Box,
	useUpdateEffect,
	Heading,
	Badge
} from "@chakra-ui/react"
import Logo from "@components/elements/Logo"
import { activePlanetState, activeStepState } from "@state/atoms/ui"
import { useDebounceEffect, useMount } from "ahooks"
import type { Variants } from "framer-motion"
import {
	animate,
	useMotionValue,
	AnimatePresence,
	motion,
	MotionConfig,
	useAnimation
} from "framer-motion"
import dynamic from "next/dynamic"
import { ArrowFatLinesLeft } from "phosphor-react"
import { useState } from "react"
import { useRecoilState } from "recoil"

const Step0 = dynamic(() => import("@components/elements/Step0"), {
	ssr: false
})
const Stepper = dynamic(() => import("@components/elements/Stepper"), {
	ssr: false
})
const Step1 = dynamic(() => import("@components/elements/Step1"), {
	ssr: false
})
const Step2 = dynamic(() => import("@components/elements/Step2"), {
	ssr: false
})
const Step3 = dynamic(() => import("@components/elements/Step3"), {
	ssr: false
})

const stackVariants: Variants = {
	hidden: {
		backdropFilter: "blur(16px)",
		filter: "blur(20px)",
		height: "0px",
		opacity: 1,
		transition: { duration: 3, type: "tween" },
		width: "0px"
	},
	step0: {
		filter: "blur(0px)",
		height: "10rem",
		opacity: 1,
		width: "auto"
	},
	step1: {
		height: "14rem",
		opacity: 1,
		width: "35rem"
	},
	step2: {
		height: "14rem",
		opacity: 1,
		width: "35rem"
	},
	step3: {
		height: "25rem",
		opacity: 1,
		width: "45rem"
	}
}
const stepVariants: Variants = {
	center: {
		opacity: 1,
		x: 0,
		zIndex: 1
	},
	enter: (direction: number) => {
		return {
			opacity: 0,
			x: direction > 0 ? 200 : -200
		}
	},
	exit: (direction: number) => {
		return {
			opacity: 0,
			x: direction < 0 ? 200 : -200,
			zIndex: 0
		}
	}
}
const headingVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -100
	},
	show: {
		opacity: 1,
		y: 0
	}
}
const stackHeaderVariants: Variants = {
	hidden: {
		opacity: 0,
		x: -100
	},
	show: {
		opacity: 1,
		x: 0
	}
}
const stackFooterVariants: Variants = {
	hidden: {
		opacity: 0,
		x: 200
	},
	show: {
		opacity: 1,
		x: 0
	}
}
const backIconVariants: Variants = {
	hover: {
		color: "#F8FAFA",
		x: -3
	},
	rest: {
		color: "rgba(248, 250, 250, 0.45)",
		x: 0
	}
}
const LogoVariants: Variants = {
	spin: {
		rotate: [0, 360],
		transition: {
			duration: 12,
			ease: "linear",
			repeat: Number.POSITIVE_INFINITY,
			repeatType: "loop"
		}
	}
}

const MainSection = () => {
	const stackControls = useAnimation()
	const stackHeaderControls = useAnimation()
	const stackFooterControls = useAnimation()
	const backIconControls = useAnimation()
	const [isHover, setHover] = useState(false)
	const [isDisabled, setDisabled] = useState(true)
	const [, setActivePlanet] = useRecoilState(activePlanetState)
	const [[activeStep, direction], setActiveStep] =
		useRecoilState(activeStepState)

	const stepCount = 3

	const backButtonBg = useMotionValue(
		"radial-gradient(circle at top left, rgba(13,214,158,0.0), rgba(0,0,0,0) 60%)"
	)

	// When back or next button was clicked
	const paginate = (newDirection: number) => {
		setActiveStep([activeStep + newDirection, newDirection])

		switch (activeStep + newDirection) {
			case 1:
				setActivePlanet("juno")
				break
			case 2:
				setActivePlanet("ethereum")
				break
			case 3:
				setActivePlanet("warpTop")
				break
			default:
				setActivePlanet("")
				break
		}

		if (activeStep + newDirection >= stepCount) {
			setDisabled(true)
		} else {
			setDisabled(false)
		}
	}

	// Show/hide back/next button + bars
	useUpdateEffect(() => {
		stackControls.start(`step${activeStep}`).finally(() => {
			switch (activeStep) {
				case 0:
					stackHeaderControls.start("hidden").finally(() => {})
					// step variant is propagated from stack controls
					stackFooterControls.start("hidden").finally(() => {})
					break
				default:
					stackHeaderControls.start("show").finally(() => {})
					// step variant is propagated from stack controls
					stackFooterControls.start("show").finally(() => {})
					break
			}
		})
	}, [activeStep])

	// Previous step button hover transitions
	useUpdateEffect(() => {
		if (isHover) {
			const playHover = async () => {
				animate(
					backButtonBg,
					"radial-gradient(ellipse at top left, rgba(13,214,158,0.25), rgba(0,0,0,0) 70%)"
				)
				await backIconControls.start("hover")
			}

			// eslint-disable-next-line no-console
			playHover().catch(() => console.log("Hover", isHover))
		} else {
			const endHover = async () => {
				animate(
					backButtonBg,
					"radial-gradient(circle at top left, rgba(13,214,158,0.0), rgba(0,0,0,0) 70%)"
				)
				await backIconControls.start("rest")
			}

			endHover().finally(() => {})
		}
	}, [isHover])

	// Wait until enabling convert button
	useDebounceEffect(
		() => {
			setDisabled(false)
		},
		[isDisabled],
		{ wait: 0 }
	)

	// Intro animation on first mount
	useMount(() => {
		stackControls
			.start("step0", { duration: 1.25, ease: "easeOut", type: "tween" })
			.finally(() => {})
	})

	return (
		<MotionConfig
			transition={{ duration: 0.25, ease: "easeInOut", type: "tween" }}
		>
			<Center as="section" h="100vh" w="full" zIndex="2">
				<Flex
					align="center"
					animate="show"
					as={motion.div}
					direction="column"
					fontWeight={400}
					initial="hidden"
					inset="1rem auto auto auto"
					justify="center"
					letterSpacing={15}
					maxW="6xl"
					pos="absolute"
					variants={headingVariants}
				>
					<HStack
						align="center"
						animate={activeStep === 0 ? "show" : "hidden"}
						as={motion.div}
						color="brand.1"
						initial="hidden"
						inset="0.7rem auto auto 0"
						letterSpacing={3}
						pos="relative"
						spacing={0}
						variants={headingVariants}
						w="20rem"
					>
						<Text
							align="right"
							color="offwhite"
							flex={5}
							fontFamily="heading"
							fontSize="14"
							fontWeight="100"
							px={0}
						>
							Juno
						</Text>
						<Text
							align="center"
							color="offwhite"
							flex={1}
							fontFamily="heading"
							fontSize="14"
							fontWeight="100"
							px={0}
						>
							x
						</Text>
						<Text
							align="left"
							color="offwhite"
							flex={5}
							fontFamily="heading"
							fontSize="14"
							fontWeight="100"
							px={0}
						>
							Ethereum
						</Text>
					</HStack>
					<HStack
						animate={activeStep === 0 ? "show" : "hidden"}
						as={motion.div}
						fontSize={48}
						h="3rem"
						initial="hidden"
						justify="center"
						spacing={0}
						variants={headingVariants}
						w="full"
					>
						<Heading left={2} pos="relative" textAlign="right">
							WARPZ
						</Heading>
						<Box
							animate="spin"
							as={motion.div}
							boxSize="full"
							pos="relative"
							right={1}
							style={{ scale: 0.65 }}
							top={1}
							variants={LogoVariants}
							w="full"
						>
							<Logo />
						</Box>

						<Heading pos="relative" right={2}>
							NE
						</Heading>
					</HStack>

					<HStack
						align="center"
						animate={activeStep === 0 ? "show" : "hidden"}
						as={motion.div}
						initial="hidden"
						inset="-0.2rem auto auto 0"
						letterSpacing={3}
						pos="relative"
						spacing={1}
						variants={headingVariants}
						w="19rem"
					>
						<Box
							bg="brand.200"
							display="inline-flex"
							flex={1}
							flexGrow={2}
							h="0.05rem"
							rounded="sm"
						/>
						<Badge colorScheme="teal" rounded="md">
							pre-alpha
						</Badge>
						<Box
							bg="brand.200"
							flex={1}
							flexGrow={2}
							h="0.05rem"
							rounded="sm"
						/>
					</HStack>
				</Flex>
				<Center direction="column" h="full" pos="relative" w="full">
					<Stack
						align="center"
						animate={stackControls}
						as={motion.div}
						border="1px solid rgba(255, 255, 255, 0.125)"
						direction="column"
						initial="hidden"
						justify="center"
						layout
						overflow="hidden"
						pos="relative"
						rounded="2xl"
						spacing={0}
						sx={{
							backgroundImage:
								"linear-gradient(325deg,hsl(163deg 89% 45% / 0.15) 0%,hsl(163deg 84% 42% / 0.15) 2%,hsl(163deg 81% 40% / 0.15) 4%,hsl(163deg 78% 37% / 0.15) 5%,hsl(164deg 76% 34% / 0.15) 7%,hsl(164deg 73% 31% / 0.15) 10%,hsl(165deg 71% 29% / 0.15) 13%,hsl(165deg 69% 26% / 0.15) 16%,hsl(165deg 61% 24% / 0.15) 20%,hsl(164deg 51% 23% / 0.15) 25%,hsl(163deg 43% 21% / 0.15) 31%,hsl(162deg 35% 20% / 0.15) 39%,hsl(161deg 27% 18% / 0.15) 48%,hsl(160deg 19% 16% / 0.15) 60%,hsl(159deg 11% 14% / 0.15) 76%,hsl(0deg 0% 11% / 0.15) 100%)"
						}}
						variants={stackVariants}
						willChange="transform"
					>
						{/* Back button bar */}
						<AnimatePresence custom={direction}>
							{activeStep !== 0 && (
								<HStack
									animate={stackHeaderControls}
									as={motion.div}
									custom={direction}
									exit="hidden"
									initial="hidden"
									pos="absolute"
									top="0"
									variants={stackHeaderVariants}
									w="full"
									zIndex="20"
								>
									<IconButton
										_active={{ bg: "none" }}
										_hover={{ bg: "none" }}
										alignSelf="start"
										aria-label="go back one step"
										as={motion.button}
										colorScheme="white"
										h="2.5rem"
										icon={
											<motion.div
												animate={backIconControls}
												exit="hidden"
												initial="hidden"
												variants={backIconVariants}
											>
												<ArrowFatLinesLeft size={22} weight="duotone" />
											</motion.div>
										}
										onClick={() => {
											paginate(-1)
										}}
										onHoverEnd={() => setHover(false)}
										onHoverStart={() => setHover(true)}
										rounded="sm"
										// @ts-expect-error Chakra style is not supporting MotionValue type from framer motion but it works anyway
										style={{ backgroundImage: backButtonBg }}
										variant="ghost"
										w="2.5rem"
									/>
								</HStack>
							)}
						</AnimatePresence>
						{/* Step */}
						<AnimatePresence custom={direction} exitBeforeEnter>
							{activeStep === 0 && (
								<Flex
									align="center"
									animate="center"
									as={motion.div}
									custom={direction}
									direction="column"
									exit="exit"
									h="full"
									initial="enter"
									justify="center"
									key="Step0"
									pos="relative"
									variants={stepVariants}
									w="full"
								>
									<Step0 />
								</Flex>
							)}
							{activeStep === 1 && (
								<Flex
									align="center"
									animate="center"
									as={motion.div}
									custom={direction}
									direction="column"
									exit="exit"
									h="full"
									initial="enter"
									justify="center"
									key="Step1"
									pos="relative"
									variants={stepVariants}
									w="full"
								>
									<Step1 />
								</Flex>
							)}
							{activeStep === 2 && (
								<Flex
									align="center"
									animate="center"
									as={motion.div}
									custom={direction}
									direction="column"
									exit="exit"
									h="full"
									initial="enter"
									justify="center"
									key="Step2"
									pos="relative"
									variants={stepVariants}
									w="full"
								>
									<Step2 />
								</Flex>
							)}
							{activeStep === 3 && (
								<Flex
									align="center"
									animate="center"
									as={motion.div}
									custom={direction}
									direction="column"
									exit="exit"
									h="full"
									initial="enter"
									justify="start"
									key="Step3"
									pos="relative"
									px={4}
									py={10}
									variants={stepVariants}
									w="full"
								>
									<Step3 />
								</Flex>
							)}
						</AnimatePresence>
						{/* Next step button bar */}
						<AnimatePresence custom={direction} exitBeforeEnter>
							{activeStep !== 0 && (
								<HStack
									align="center"
									animate={stackFooterControls}
									as={motion.div}
									bottom="0"
									custom={direction}
									exit="hidden"
									initial="hidden"
									justify="end"
									p={2}
									pos="absolute"
									variants={stackFooterVariants}
									w="full"
									zIndex="20"
								>
									<Button
										as={motion.button}
										color="white"
										colorScheme="brand"
										disabled={isDisabled}
										onClick={() => paginate(1)}
										rounded="2xl"
										variant="outline"
									>
										Next Step
									</Button>
								</HStack>
							)}
						</AnimatePresence>
					</Stack>
				</Center>
				<Stepper activeStep={activeStep} />
			</Center>
		</MotionConfig>
	)
}

export { MainSection }
