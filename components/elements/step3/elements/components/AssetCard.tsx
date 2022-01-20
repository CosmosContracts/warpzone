/* eslint-disable react-hooks/exhaustive-deps */
import {
	Avatar,
	Badge,
	Flex,
	Grid,
	GridItem,
	ListItem,
	Text,
	useBoolean,
	VStack
} from "@chakra-ui/react"
import {
	HTMLProps,
	MutableRefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from "react"
import { useTokenInfo } from "@hooks/useTokenInfo"
import {
	animate,
	AnimatePresence,
	motion,
	useAnimation,
	useMotionValue,
	Variants
} from "framer-motion"
import { Plus } from "phosphor-react"

type AssetCardProps = Exclude<HTMLProps<HTMLDivElement>, "children"> & {
	tokenSymbol?: string
	onActionClick?: (args: {
		tokenSymbol: string
		actionType: "deposit" | "withdraw"
	}) => void
	balance?: number
	activeIndex?: number
	assetId?: number
	delayPerPixel: number
	i: number
	originIndex: number
	originOffset: MutableRefObject<{
		top: number
		left: number
	}>
}

export const AssetCard = ({
	tokenSymbol,
	balance,
	assetId,
	activeIndex,
	delayPerPixel,
	i,
	originIndex,
	originOffset
}: AssetCardProps) => {
	const { ticker, logoURI } = useTokenInfo(tokenSymbol) || {}

	const tokenControls = useAnimation()
	const addKeplrControls = useAnimation()
	const plusIconControls = useAnimation()

	const boxShadow = useMotionValue(
		"0 3px 10px 0 rgba(101, 246, 168, 0), 0 -3px 10px 0 rgba(0, 150, 250, 0),inset 0 0 0 2px  rgba(101, 246, 168, 0),inset -4px 0 7px -2px rgba(220,220,220,0.35)"
	)
	const backgroundSize = useMotionValue("100% 100%")
	const tokenBackground = useMotionValue(
		"radial-gradient(ellipsis at top, rgba(149, 249, 195, 0.35) 0%,rgba(82, 182, 154, 0.35) 20%,rgba(149, 249, 195, 0.25) 40%, #090A0F 75%)"
	)
	const backgroundImage = useMotionValue(
		"radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at bottom left, rgb(34, 222, 237),rgb(135, 89, 215) 65%)"
	)

	const [isActive, setActive] = useState(false)
	const [isHover, setHover] = useBoolean()

	const offset = useRef({ top: 0, left: 0 })
	const ref = useRef<HTMLDivElement>()
	const delayRef = useRef<number>(0)

	const addKeplrVariants: Variants = {
		hover: {
			scale: 1.2
		},
		tap: {
			scale: 1.15,
			transition: {
				type: "linear"
			}
		},
		rest: {
			y: 0,
			opacity: 1,
			scale: 1.1,
			transition: {
				type: "linear"
			}
		},
		exit: {
			scale: 0.5,
			opacity: 0,
			transition: { duration: 0.25 }
		}
	}

	const plusIconVariants: Variants = {
		hover: {
			scale: 1.5,
			transition: {
				type: "spring"
			}
		},
		tap: {
			scale: 1.3,
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
		exit: {
			scale: 0,
			transition: {
				duration: 0.2
			}
		}
	}

	const tokenCardVariants: Variants = {
		hidden: {
			scale: 0.5,
			opacity: 0,
			transition: { duration: 0.25 }
		},
		reveal: (delayRef: MutableRefObject<number>) => ({
			opacity: 1,
			scale: 1,
			width: "100%",
			transition: { delay: delayRef.current, duration: 0.25 }
		}),
		rest: {
			opacity: 1,
			scale: 1,
			width: "4rem",
			transition: { duration: 0.25 }
		},
		active: {
			opacity: 1,
			scale: 1,
			width: "100%",
			transition: { duration: 0.25 }
		},
		exit: {
			opacity: 0,
			scale: 0.5
		}
	}

	useLayoutEffect(() => {
		const element = ref.current
		if (!element) return

		offset.current = {
			top: element.offsetTop,
			left: element.offsetLeft
		}

		if (i === originIndex) {
			// eslint-disable-next-line no-param-reassign
			originOffset.current = offset.current
		}
	}, [delayPerPixel])

	useEffect(() => {
		const dx = Math.abs(offset.current.left - originOffset.current.left)
		const dy = Math.abs(offset.current.top - originOffset.current.top)
		const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
		delayRef.current = d * delayPerPixel
	})

	useEffect(() => {
		if (assetId === activeIndex) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [activeIndex, assetId])

	useEffect(() => {
		if (isHover) {
			const playHover = async () => {
				addKeplrControls.start("hover")
				plusIconControls.start("hover")
				animate(
					backgroundImage,
					"radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at bottom left, rgb(34, 222, 237),rgb(135, 89, 215) 65%)",
					{
						duration: 0.2,
						ease: "linear"
					}
				)
			}
			playHover()
		} else {
			const endHover = async () => {
				addKeplrControls.start("rest")
				plusIconControls.start("rest")
				animate(
					backgroundImage,
					"radial-gradient(circle at 40% 91%, rgba(251, 251, 251,0.04) 0%, rgba(251, 251, 251,0.04) 50%,rgba(229, 229, 229,0.04) 50%, rgba(229, 229, 229,0.04) 100%),radial-gradient(circle at 66% 97%, rgba(36, 36, 36,0.04) 0%, rgba(36, 36, 36,0.04) 50%,rgba(46, 46, 46,0.04) 50%, rgba(46, 46, 46,0.04) 100%),radial-gradient(circle at 86% 7%, rgba(40, 40, 40,0.04) 0%, rgba(40, 40, 40,0.04) 50%,rgba(200, 200, 200,0.04) 50%, rgba(200, 200, 200,0.04) 100%),radial-gradient(circle at 15% 16%, rgba(99, 99, 99,0.04) 0%, rgba(99, 99, 99,0.04) 50%,rgba(45, 45, 45,0.04) 50%, rgba(45, 45, 45,0.04) 100%),radial-gradient(circle at 75% 99%, rgba(243, 243, 243,0.04) 0%, rgba(243, 243, 243,0.04) 50%,rgba(37, 37, 37,0.04) 50%, rgba(37, 37, 37,0.04) 100%),radial-gradient(circle at bottom left, rgb(34, 222, 237),rgb(135, 89, 215) 85%)",
					{
						duration: 0.2,
						ease: "linear"
					}
				)
			}
			endHover()
		}
	}, [isHover])

	useEffect(() => {
		if (!isActive) {
			const playRestAnimation = async () => {
				addKeplrControls.start("exit")
				plusIconControls
					.start("exit")
					.then(() => tokenControls.start("reveal")) //  delayperpixel nur beim öffnen
			}
			playRestAnimation()
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
		} else {
			tokenControls.start("active")
			addKeplrControls.start("rest")
			plusIconControls.start("rest")
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
	}, [isActive])

	return (
		<ListItem
			minW="6rem"
			animate={tokenControls}
			as={motion.li}
			layout
			initial={"hidden"}
			// @ts-expect-error
			ref={ref}
			custom={delayRef}
			variants={tokenCardVariants}
			h="4rem"
			rounded="2xl"
			style={{
				// @ts-expect-error
				boxShadow,
				// @ts-expect-error
				backgroundImage: tokenBackground
			}}
		>
			<Grid
				w="full"
				h="full"
				as={motion.div}
				templateColumns="fit-content(100px) repeat(2, 1fr)"
				templateRows="repeat(1, 1fr)"
			>
				<GridItem as={Flex} w="full" px={2} align="center" rowSpan={2}>
					<Avatar boxSize="3rem" src={logoURI} />
				</GridItem>
				<GridItem maxW="4.5rem" w="full" h="full">
					<VStack justify="center" align="start" h="full" spacing={0}>
						<Text fontSize="sm">{balance}</Text>
						<Badge
							variant="outline"
							align="start"
							rounded="lg"
							colorScheme="brand"
							fontSize="xs"
							py={"0.05rem"}
							px={"0.3rem"}
							letterSpacing={1.3}
						>
							{ticker}
						</Badge>
					</VStack>
				</GridItem>
				<AnimatePresence>
					{isActive && (
						<Flex
							as={motion.div}
							variants={addKeplrVariants}
							exit="exit"
							pr={3}
							justify="end"
							align="center"
							w="full"
							h="full"
						>
							<Flex
								zIndex="3"
								w="2rem"
								h="2rem"
								p={0}
								initial={{ scale: 0 }}
								variant="keplrButton"
								as={motion.button}
								align="center"
								justify="center"
								exit="exit"
								onHoverStart={setHover.on}
								onHoverEnd={setHover.off}
								onClick={() => console.log("Keplr Klick<")}
								variants={addKeplrVariants}
								animate={addKeplrControls}
								// @ts-expect-error
								style={{ backgroundSize, backgroundImage }}
								rounded="lg"
								aria-label="Add to Keplr Wallet"
							>
								<motion.div
									variants={plusIconVariants}
									animate={plusIconControls}
								>
									<Plus></Plus>
								</motion.div>
							</Flex>
						</Flex>
					)}
				</AnimatePresence>
			</Grid>
		</ListItem>
	)
}
