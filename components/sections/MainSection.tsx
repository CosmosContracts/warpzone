import {
	Center,
	Text,
	Button,
	Stack,
	ButtonGroup,
	VStack,
	IconButton,
	Flex,
	HStack,
	Box
} from "@chakra-ui/react"
import { Stepper, Step3 } from "@components/elements"
import { Step1 } from "@components/elements/step1"
import { Step2 } from "@components/elements/step2"
import type { Variants } from "framer-motion"
import {
	AnimatePresence,
	motion,
	MotionConfig,
	useAnimation
} from "framer-motion"
import { ArrowFatLinesLeft, ArrowsClockwise, Parachute } from "phosphor-react"
import { useState } from "react"
import { GlitchAnimation } from "react-glitch-animation"

const MainSection = () => {
	const stackControls = useAnimation()
	const topBarControls = useAnimation()
	const [activeStep, setActiveStep] = useState(0)

	// TODO
	// const step3Width = useBreakpointValue({
	// 	base: "var(--chakra-sizes-sm)",
	// 	lg: "52rem",
	// 	md: "var(--chakra-sizes-md)"
	// })

	const toggleStepWidth = async (h: string, w: string) => {
		await stackControls.start({
			height: h,
			transition: {
				damping: 15,
				stiffness: 50
			},
			width: w
		})
	}

	// 10,25 12,35 35,52

	const goToStep = (step: number, h: string, w: string) => {
		toggleStepWidth(h, w).catch(() => {})
		if (step === 0) {
			// TODO fill finally with something as EsLint depends their life on it
			topBarControls.start("hide").finally(() => {})
		} else {
			topBarControls.start("show").finally(() => {})
		}

		setActiveStep(step)
	}

	// useEffect(() => {
	// 	console.log("active step:", activeStep)
	// }, [activeStep])

	const stepVariants: Variants = {
		hidden: {
			opacity: 0,
			transition: {
				damping: 15,
				stiffness: 10
			},
			y: 100
		},
		show: {
			opacity: 1,
			transition: {
				damping: 15,
				stiffness: 50
			},
			y: 50
		}
	}
	const headingVariants: Variants = {
		hidden: {
			transition: {
				damping: 15,
				stiffness: 10
			},
			y: -100
		},
		show: {
			transition: {
				damping: 15,
				stiffness: 50
			},
			y: 0
		}
	}

	return (
		<MotionConfig transition={{ duration: 0.25 }}>
			<Center as="section" h="100vh" w="full">
				<Flex
					align="center"
					animate="show"
					as={motion.div}
					direction="column"
					fontWeight={400}
					initial="hidden"
					inset="1rem 0 auto 0"
					justify="center"
					letterSpacing={5}
					pos="absolute"
					variants={headingVariants}
				>
					<GlitchAnimation animationDurationMS={0} isActive text="WARPZONE" />
					<HStack
						align="center"
						inset="-1.75rem auto auto 0"
						pos="relative"
						w="xs"
					>
						<Box bg="whiteAlpha.800" h="0.1rem" rounded="sm" w="full" />
						<Text align="center" fontFamily="heading">
							Interface
						</Text>
						<Box bg="whiteAlpha.800" h="0.1rem" rounded="sm" w="full" />
					</HStack>
				</Flex>
				<Center direction="column" h="full" pos="relative" w="full">
					<Stack
						align="center"
						animate={stackControls}
						as={motion.div}
						backdropFilter="blur(6px)"
						bg="blackAlpha.400"
						boxShadow="sm"
						direction="column"
						initial={{
							width: "20rem"
						}}
						justify="center"
						overflow="hidden"
						pos="relative"
						rounded="2xl"
						spacing={0}
					>
						<AnimatePresence exitBeforeEnter>
							{activeStep !== 0 && (
								<HStack
									animate={topBarControls}
									as={motion.div}
									bg="whiteAlpha.200"
									exit="hidden"
									initial="show"
									pos="absolute"
									top="0"
									variants={headingVariants}
									w="full"
								>
									<IconButton
										alignSelf="start"
										aria-label="back to mode selection"
										colorScheme="white"
										h="2.5rem"
										icon={<ArrowFatLinesLeft size={22} weight="duotone" />}
										onClick={() => goToStep(0, "auto", "auto")}
										rounded="sm"
										variant="ghost"
										w="2.5rem"
									/>
								</HStack>
							)}
						</AnimatePresence>
						<AnimatePresence exitBeforeEnter>
							{activeStep === 0 && (
								<ButtonGroup
									animate="show"
									as={motion.div}
									colorScheme="brand"
									exit="hidden"
									initial="hidden"
									key="Step0"
									p={6}
									spacing={6}
									variant="outline"
									variants={stepVariants}
								>
									<Button
										as={motion.button}
										h="full"
										key="ConvertButton"
										onClick={() => goToStep(1, "12rem", "35rem")}
										rounded="xl"
									>
										<Stack align="center" direction="column" p={4}>
											<ArrowsClockwise size={42} weight="duotone" />
											<Text>Convert</Text>
										</Stack>
									</Button>
									<Button
										as={motion.button}
										disabled
										h="full"
										key="AirdropButton"
										rounded="xl"
									>
										<Stack align="center" direction="column" p={4}>
											<Parachute size={42} weight="duotone" />
											<Text>Airdrop</Text>
										</Stack>
									</Button>
								</ButtonGroup>
							)}
							{activeStep === 1 && (
								<Flex
									animate="show"
									as={motion.div}
									direction="column"
									exit="hidden"
									h="full"
									initial="hidden"
									key="Step1"
									pos="relative"
									variants={stepVariants}
									w="full"
								>
									<VStack
										align="start"
										h="full"
										justify="start"
										pt={2}
										px={6}
										w="full"
									>
										<Step1 />
										<HStack align="center" h="full" justify="end" w="full">
											<Button
												color="white"
												colorScheme="brand"
												onClick={() => goToStep(2, "12rem", "35rem")}
												rounded="xl"
												variant="outline"
											>
												Next Step
											</Button>
										</HStack>
									</VStack>
								</Flex>
							)}
							{activeStep === 2 && (
								<Flex
									animate="show"
									as={motion.div}
									direction="column"
									exit="hidden"
									h="full"
									initial="hidden"
									key="Step2"
									pos="relative"
									variants={stepVariants}
									w="full"
								>
									<VStack
										align="start"
										h="full"
										justify="start"
										pt={2}
										px={6}
										w="full"
									>
										<Step2 />
										<HStack align="center" h="full" justify="end" w="full">
											<Button
												color="white"
												colorScheme="brand"
												onClick={() => goToStep(3, "35rem", "52rem")}
												rounded="xl"
												variant="outline"
											>
												Next Step
											</Button>
										</HStack>
									</VStack>
								</Flex>
							)}
							{activeStep === 3 && (
								<Flex
									animate="show"
									as={motion.div}
									direction="column"
									exit="hidden"
									h="full"
									initial="hidden"
									key="Step3"
									pos="relative"
									variants={stepVariants}
									w="full"
								>
									<VStack
										align="start"
										h="full"
										justify="start"
										pt={2}
										px={6}
										w="full"
									>
										<Step3 />
										<HStack align="center" h="full" justify="end" w="full">
											<Button
												color="white"
												colorScheme="brand"
												rounded="xl"
												variant="outline"
											>
												Next Step
											</Button>
										</HStack>
									</VStack>
								</Flex>
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
