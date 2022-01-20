import { AssetCard, AssetCardProps } from "./AssetCard"
import {
	Box,
	Flex,
	Grid,
	HStack,
	IconButton,
	Text,
	Wrap
} from "@chakra-ui/react"
import { useGetSupportedAssetsBalancesOnChain } from "../hooks/useGetSupportedAssetsBalancesOnChain"
import { useSdk } from "@services/client"
import {
	MutableRefObject,
	useEffect,
	useLayoutEffect,
	useRef,
	useState
} from "react"
import { AnimatePresence, motion, useAnimation, Variants } from "framer-motion"
import { ArrowCounterClockwise } from "phosphor-react"

type TokenGridItemProps = AssetCardProps & {
	delayPerPixel: number
	i: number
	originIndex: number
	originOffset: MutableRefObject<{
		top: number
		left: number
	}>
}

const TokenGridItem = ({
	delayPerPixel,
	originIndex,
	originOffset,
	tokenSymbol,
	balance,
	i
}: TokenGridItemProps) => {
	const offset = useRef({ top: 0, left: 0 })
	const ref = useRef<HTMLDivElement>()
	const delayRef = useRef<number>(0)
	const tokenCardControls = useAnimation()
	const [isActive, setActive] = useState(false)

	const tokenCardVariants: Variants = {
		hidden: {
			scale: 0.5,
			opacity: 0,
			transition: { duration: 0.25 }
		},
		reveal: (delayRef: MutableRefObject<number>) => ({
			opacity: 1,
			scale: 1,
			width: "8rem",
			transition: { delay: delayRef.current, duration: 0.25 }
		})
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [delayPerPixel])

	useEffect(() => {
		const dx = Math.abs(offset.current.left - originOffset.current.left)
		const dy = Math.abs(offset.current.top - originOffset.current.top)
		const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
		delayRef.current = d * delayPerPixel
	})

	useEffect(() => {
		if (isActive) {
			console.log("Active")
		} else {
			console.log("Not active")
		}
	}, [isActive])

	return (
		<Box
			onClick={() => setActive(!isActive)}
			as={motion.div}
			ref={ref}
			animate={tokenCardControls}
			variants={tokenCardVariants}
			custom={delayRef}
		>
			<AssetCard
				tokenSymbol={tokenSymbol}
				balance={balance}
				isActive={isActive}
			/>
		</Box>
	)
}

export const AssetsList = () => {
	const [loadingBalances, [myTokens, allTokens]] =
		useGetSupportedAssetsBalancesOnChain()

	const sdk = useSdk()
	const [activeIndex, setActiveIndex] = useState<number>(undefined)
	const [activeAccordionItem, setActiveAccordionItem] = useState<number>(0)
	const originOffset = useRef({ top: 0, left: 0 })
	const [isVisible, setVisibility] = useState(false)

	useEffect(() => setVisibility(true), [])

	/* isLoading state is true if either we connect the wallet or loading balances */
	// const isLoading = loadingBalances
	/* check if the user has any of the assets transferred on the chain */
	const hasTransferredAssets = !loadingBalances && myTokens.length > 0

	const selectToken = (tokenId: number, activeIndex: number) => {
		setActiveIndex(tokenId)
		console.log("IDs:", tokenId, activeIndex)
	}

	return (
		<Flex
			mt="0px !important"
			bg="whiteAlpha.100"
			direction="column"
			w="full"
			h="full"
			align="center"
		>
			<HStack placeSelf={"start"} flex="1">
				<Text textAlign="left" pl={3} py={1}>
					Available Tokens
				</Text>
				<IconButton
					h="2.5rem"
					w="2.5rem"
					colorScheme="brand"
					variant="outline"
					rounded="full"
					alignSelf={"start"}
					aria-label="back to mode selection"
					icon={<ArrowCounterClockwise size={24} weight="duotone" />}
					onClick={() => setActiveAccordionItem(0)}
				/>
			</HStack>

			<AnimatePresence>
				{activeAccordionItem == 0 && sdk.initialized && (
					<Grid
						m={0}
						p={0}
						templateColumns="repeat(4, 1fr)"
						gap={1}
						pos="relative"
						bg="blackAlpha.400"
						as={motion.div}
						layout
						initial={false}
						animate={isVisible ? "reveal" : "hidden"}
						w="full"
					>
						{hasTransferredAssets &&
							myTokens.map(({ tokenSymbol, balance }, index) => (
								<TokenGridItem
									onClick={() => selectToken(index, activeIndex)}
									key={tokenSymbol}
									tokenSymbol={tokenSymbol}
									balance={balance}
									delayPerPixel={0.0001}
									originIndex={0}
									originOffset={originOffset}
									isActive={false}
									i={index}
								/>
							))}
						{sdk.initialized && !hasTransferredAssets && (
							<Text color="secondary" as="span">
								No compatible assets found.
							</Text>
						)}
					</Grid>
				)}
			</AnimatePresence>
			<Box
				flex="1"
				textAlign="left"
				onClick={() => setActiveAccordionItem(1)}
			>
				<Text pl={3} py={1}>
					All Tokens
				</Text>
			</Box>
			<AnimatePresence>
				{activeAccordionItem == 1 && (
					<Wrap as={motion.div} px={3} spacing={3} w="full" h="full">
						{sdk.initialized &&
							!hasTransferredAssets &&
							allTokens.map(({ tokenSymbol }) => {
								return (
									<TokenGridItem
										key={tokenSymbol}
										delayPerPixel={0.004}
										originIndex={0}
										originOffset={originOffset}
										isActive={false}
										i={1}
									/>
								)
							})}
						{sdk.initialized && hasTransferredAssets && (
							<Text color="secondary" as="span">
								You seem to own all the assets! Good job, cosmonaut!
							</Text>
						)}
					</Wrap>
				)}
			</AnimatePresence>
		</Flex>
	)
}
