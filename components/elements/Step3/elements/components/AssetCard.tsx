/* eslint-disable react-hooks/exhaustive-deps */
import {
	Badge,
	Box,
	Flex,
	HStack,
	Text,
	useBoolean,
	VStack
} from "@chakra-ui/react"
import { useTokenInfo } from "@hooks/useTokenInfo"
import { useUpdateEffect } from "ahooks"
import type { Variants } from "framer-motion"
import {
	animate,
	AnimatePresence,
	motion,
	useAnimation,
	useMotionValue
} from "framer-motion"
import { Plus } from "phosphor-react"
import type { HTMLProps } from "react"
import { ChakraNextImage } from "./ChakraNextImage"

export type AssetCardProps = Exclude<
	HTMLProps<HTMLDivElement>,
	"children, onClick"
> & {
	balance?: number
	isActive?: boolean
	tokenSymbol?: string
}

export const AssetCard = ({
	tokenSymbol,
	balance,
	isActive
}: AssetCardProps) => {
	const { ticker, logoURI } = useTokenInfo(tokenSymbol) || {}

	const addKeplrControls = useAnimation()
	const plusIconControls = useAnimation()

	const [isHover, setHover] = useBoolean()

	const boxShadow = useMotionValue(
		"0 3px 10px 0 rgba(101, 246, 168, 0), 0 -3px 10px 0 rgba(0, 150, 250, 0),inset 0 0 0 2px  rgba(101, 246, 168, 0),inset -4px 0 7px -2px rgba(220,220,220,0.35)"
	)
	const backgroundSize = useMotionValue("100% 100%")
	const tokenBackground = useMotionValue(
		"radial-gradient(ellipsis at top, rgba(149, 249, 195, 0.35) 0%,rgba(82, 182, 154, 0.35) 20%,rgba(149, 249, 195, 0.25) 40%, #090A0F 75%)"
	)
	const backgroundImage = useMotionValue(
		"radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at bottom left, rgba(34, 222, 237, 0.6),rgba(135, 89, 215, 0.6) 65%)"
	)

	const addKeplrVariants: Variants = {
		exit: {
			opacity: 0,
			scale: 0.5,
			transition: { duration: 0.25 }
		},
		hover: {
			scale: 1.2
		},
		rest: {
			opacity: 1,
			scale: 1.1,
			transition: {
				type: "linear"
			},
			y: 0
		},
		tap: {
			scale: 1.15,
			transition: {
				type: "linear"
			}
		}
	}

	const plusIconVariants: Variants = {
		exit: {
			scale: 0,
			transition: {
				duration: 0.2
			}
		},
		hover: {
			scale: 1.5,
			transition: {
				type: "spring"
			}
		},
		rest: {
			scale: 1,
			transition: {
				type: "spring"
			}
		},
		tap: {
			scale: 1.3,
			transition: {
				type: "spring"
			}
		}
	}

	const PlayActiveAnimation = async () => {
		await addKeplrControls.start("rest")
		await plusIconControls.start("rest")
		animate(
			boxShadow,
			"0 3px 10px 0 rgba(101, 246, 168, 0.23), 0 -3px 10px 0 rgba(0, 150, 250, 0.19),inset 0 0 0 2px  rgba(101, 246, 168, 0.25),inset 6px 0 7px -2px rgba(101, 246, 168,0.5)",
			{
				damping: 20,
				type: "spring"
			}
		)
		animate(
			tokenBackground,
			"radial-gradient(circle at left, rgba(101, 246, 168, 0.3) 4%, rgba(0, 0, 0, 0.3) 20%",
			{
				damping: 20,
				type: "spring"
			}
		)
	}

	const PlayExitAnimation = async () => {
		await addKeplrControls.start("exit")
		await plusIconControls.start("exit")
		animate(
			boxShadow,
			"0 3px 10px 0 rgba(101, 246, 168, 0), 0 -3px 10px 0 rgba(0, 150, 250, 0),inset 0 0 0 2px  rgba(101, 246, 168, 0),inset -4px 0 7px -2px rgba(220,220,220,0)",
			{
				damping: 20,
				type: "spring"
			}
		)
		animate(
			tokenBackground,
			"radial-gradient(circle at left, rgba(0, 0, 0, 0.3) 3%,rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3) 20%",
			{
				damping: 20,
				type: "spring"
			}
		)
	}

	const playHover = async () => {
		await addKeplrControls.start("hover")
		await plusIconControls.start("hover")
		animate(
			backgroundImage,
			"radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at bottom left, rgb(34, 222, 237),rgb(135, 89, 215) 65%)",
			{
				duration: 0.2,
				ease: "linear"
			}
		)
	}

	const endHover = async () => {
		await addKeplrControls.start("rest")
		await plusIconControls.start("rest")
		animate(
			backgroundImage,
			"radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at bottom left, rgb(34, 222, 237),rgb(135, 89, 215) 85%)",
			{
				duration: 0.2,
				ease: "linear"
			}
		)
	}

	useUpdateEffect(() => {
		if (isHover) {
			void playHover()
		} else {
			void endHover()
		}
	}, [isHover])

	useUpdateEffect(() => {
		if (isActive) {
			void PlayActiveAnimation()
		} else {
			void PlayExitAnimation()
		}
	}, [isActive])

	return (
		<Box
			as={motion.div}
			h="5rem"
			layout
			rounded="2xl"
			style={{
				// @ts-expect-error Chakra UI != Framer Motion typed
				backgroundImage: tokenBackground,
				// @ts-expect-error Chakra UI != Framer Motion typed
				boxShadow
			}}
		>
			<HStack as={motion.div} bg="blackAlpha.100" h="full">
				<ChakraNextImage height="70px" src={logoURI} width="70px" />
				<VStack
					align="start"
					h="full"
					justify="center"
					maxW="4.5rem"
					spacing={0}
					w="full"
				>
					<Text fontSize="sm">{balance}</Text>
					<Badge
						align="start"
						colorScheme="brand"
						fontSize="xs"
						letterSpacing={1.3}
						px="0.3rem"
						py="0.05rem"
						rounded="lg"
						variant="outline"
					>
						{ticker}
					</Badge>
				</VStack>
				<AnimatePresence>
					{isActive && (
						<Flex
							align="center"
							as={motion.div}
							exit="exit"
							h="full"
							justify="end"
							pr={3}
							variants={addKeplrVariants}
							w="full"
						>
							<Flex
								align="center"
								animate={addKeplrControls}
								aria-label="Add to Keplr Wallet"
								as={motion.button}
								exit="exit"
								h="2rem"
								initial={{ scale: 0 }}
								justify="center"
								onHoverEnd={() => setHover.off}
								onHoverStart={() => setHover.on}
								p={0}
								rounded="lg"
								// @ts-expect-error Chakra UI != Framer Motion typed
								style={{ backgroundImage, backgroundSize }}
								variant="keplrButton"
								variants={addKeplrVariants}
								w="2rem"
								zIndex="3"
							>
								<motion.div
									animate={plusIconControls}
									variants={plusIconVariants}
								>
									<Plus />
								</motion.div>
							</Flex>
						</Flex>
					)}
				</AnimatePresence>
			</HStack>
		</Box>
	)
}
