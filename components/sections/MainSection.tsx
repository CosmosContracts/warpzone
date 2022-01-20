import {
	Center,
	Text,
	Button,
	Stack,
	ButtonGroup,
	useBoolean,
	VStack,
	IconButton,
	Flex,
	HStack,
	useBreakpointValue,
	Box
} from "@chakra-ui/react"
import { Stepper } from "@components/elements"
import { Step1 } from "@components/elements/Step1"
import { Step2 } from "@components/elements/Step2"
import { Step3 } from "@components/elements"
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion"

import { ArrowFatLinesLeft, ArrowsClockwise, Parachute } from "phosphor-react"
import { useState } from "react"
import { GlitchAnimation } from "react-glitch-animation"

const MainSection = () => {
	const stackControls = useAnimation()

	const step3Width = useBreakpointValue({
		base: "var(--chakra-sizes-sm)",
		md: "var(--chakra-sizes-md)",
		lg: "52rem"
	})

	const [isStep0, setStep0] = useBoolean(true)
	const [isStep1, setStep1] = useBoolean(false)
	const [isStep2, setStep2] = useBoolean(false)
	const [isStep3, setStep3] = useBoolean(false)

	const [activeStep, setActiveStep] = useState(0)

	const goToStep0 = () => {
		setStep1.off()
		setStep2.off()
		setStep3.off()
		stackControls.start({
			width: "25rem",
			height: "10rem",
			transition: {
				stiffness: 50,
				damping: 15
			}
		})
		setActiveStep(0)
		setStep0.on()
	}

	const goToStep1 = () => {
		setStep0.off()
		stackControls.start({
			width: "35rem",
			height: "12rem",
			transition: {
				stiffness: 50,
				damping: 15
			}
		})
		setActiveStep(1)
		setStep1.on()
	}

	const goToStep2 = () => {
		setStep1.off()
		stackControls.start({
			width: "35rem",
			height: "12rem",
			transition: {
				stiffness: 50,
				damping: 15
			}
		})
		setActiveStep(2)
		setStep2.on()
	}

	const goToStep3 = () => {
		setStep2.off()
		stackControls.start({
			width: step3Width,
			height: "35rem",
			transition: {
				stiffness: 50,
				damping: 15
			}
		})
		setActiveStep(3)
		setStep3.on()
	}

	const step0Variants: Variants = {
		hidden: {
			y: 40,
			opacity: 0,
			transition: {
				stiffness: 50,
				damping: 15
			}
		},
		show: {
			y: 0,
			opacity: 1,
			transition: {
				stiffness: 50,
				damping: 15
			}
		}
	}
	const stepVariants: Variants = {
		hidden: {
			y: 100,
			opacity: 0,
			transition: {
				stiffness: 10,
				damping: 15
			}
		},
		show: {
			y: 0,
			opacity: 1,
			transition: {
				stiffness: 50,
				damping: 15
			}
		}
	}
	const headingVariants: Variants = {
		hidden: {
			y: -100,
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

	return (
		<Center as="section" w="full" h="100vh">
			<Flex
				as={motion.div}
				initial="hidden"
				animate="show"
				variants={headingVariants}
				justify="center"
				align="center"
				direction="column"
				fontWeight={400}
				letterSpacing={5}
				pos="absolute"
				inset="1rem 0 auto 0"
			>
				<GlitchAnimation
					isActive={true}
					animationDurationMS={0}
					text="WARPZONE"
				/>
				<HStack
					w="xs"
					align="center"
					pos="relative"
					inset="-1.75rem auto auto 0"
				>
					<Box rounded="sm" w="full" h="0.1rem" bg="whiteAlpha.800" />
					<Text align="center" fontFamily="heading">
						Interface
					</Text>
					<Box rounded="sm" w="full" h="0.1rem" bg="whiteAlpha.800" />
				</HStack>
			</Flex>
			<VStack
				w="full"
				h="full"
				pos="relative"
				direction="column"
				align="center"
				justify="center"
			>
				<Stack
					justify="center"
					as={motion.div}
					initial={{
						width: "20rem"
					}}
					animate={stackControls}
					direction="row"
					align="center"
					bg="blackAlpha.400"
					backdropFilter="blur(6px)"
					boxShadow="inset -0.1rem -0.1rem 0 0 rgba(255,255,255,0.25)"
					rounded="2xl"
				>
					<AnimatePresence exitBeforeEnter>
						{isStep0 && (
							<ButtonGroup
								initial="hidden"
								animate="show"
								exit="hidden"
								variants={step0Variants}
								key="Step0"
								spacing={6}
								p={6}
								colorScheme={"brand"}
								variant="outline"
								as={motion.div}
							>
								<Button
									key="ConvertButton"
									as={motion.button}
									onClick={goToStep1}
									h="full"
									rounded="xl"
								>
									<Stack align="center" direction="column" p={4}>
										<ArrowsClockwise weight="duotone" size={42} />
										<Text>Convert</Text>
									</Stack>
								</Button>
								<Button
									key="AirdropButton"
									as={motion.button}
									disabled
									h="full"
									rounded="xl"
								>
									<Stack align="center" direction="column" p={4}>
										<Parachute size={42} weight="duotone" />
										<Text>Airdrop</Text>
									</Stack>
								</Button>
							</ButtonGroup>
						)}
						{isStep1 && (
							<Flex
								pos="relative"
								w="full"
								h="full"
								key="Step1"
								initial="hidden"
								exit="hidden"
								variants={stepVariants}
								as={motion.div}
								animate={"show"}
								direction="column"
							>
								<HStack align="center" w="full" h="3.5rem">
									<IconButton
										h="3.5rem"
										w="3.5rem"
										rounded="sm"
										colorScheme="white"
										variant="ghost"
										alignSelf={"start"}
										aria-label="back to mode selection"
										icon={
											<ArrowFatLinesLeft
												size={24}
												weight="duotone"
											/>
										}
										onClick={goToStep0}
									/>
								</HStack>
								<VStack
									pt={2}
									px={6}
									w="full"
									h="full"
									justify="start"
									align="start"
								>
									<Step1 />
									<HStack
										justify="end"
										align="center"
										w="full"
										h="full"
									>
										<Button
											rounded="xl"
											colorScheme={"brand"}
											variant="outline"
											color="white"
											onClick={goToStep2}
										>
											Next Step
										</Button>
									</HStack>
								</VStack>
							</Flex>
						)}
						{isStep2 && (
							<Flex
								pos="relative"
								w="full"
								h="full"
								key="Step2"
								initial="hidden"
								exit="hidden"
								variants={stepVariants}
								as={motion.div}
								animate={"show"}
								direction="column"
							>
								<HStack w="full">
									<IconButton
										h="3.5rem"
										w="3.5rem"
										rounded="sm"
										colorScheme="white"
										variant="ghost"
										alignSelf={"start"}
										aria-label="back to mode selection"
										icon={
											<ArrowFatLinesLeft
												size={24}
												weight="duotone"
											/>
										}
										onClick={goToStep0}
									/>
								</HStack>

								<VStack
									pt={2}
									px={6}
									w="full"
									h="full"
									justify="start"
									align="start"
								>
									<Step2 />
									<HStack
										justify="end"
										align="center"
										w="full"
										h="full"
									>
										<Button
											rounded="xl"
											colorScheme={"brand"}
											variant="outline"
											color="white"
											onClick={goToStep3}
										>
											Next Step
										</Button>
									</HStack>
								</VStack>
							</Flex>
						)}
						{isStep3 && (
							<Flex
								pos="relative"
								w="full"
								h="full"
								key="Step3"
								initial="hidden"
								exit="hidden"
								variants={stepVariants}
								as={motion.div}
								animate={"show"}
								direction="column"
							>
								<HStack w="full">
									<IconButton
										h="3.5rem"
										w="3.5rem"
										rounded="sm"
										colorScheme="white"
										variant="ghost"
										alignSelf={"start"}
										aria-label="back to mode selection"
										icon={
											<ArrowFatLinesLeft
												size={24}
												weight="duotone"
											/>
										}
										onClick={goToStep0}
									/>
								</HStack>

								<VStack
									pt={2}
									px={6}
									w="full"
									h="full"
									justify="start"
									align="start"
								>
									<Step3 />
									<HStack
										justify="end"
										align="center"
										w="full"
										h="full"
									>
										<Button
											rounded="xl"
											colorScheme={"brand"}
											variant="outline"
											color="white"
										>
											Next Step
										</Button>
									</HStack>
								</VStack>
							</Flex>
						)}
					</AnimatePresence>
				</Stack>
			</VStack>
			<Stepper activeStep={activeStep} />
		</Center>
	)
}

export { MainSection }
