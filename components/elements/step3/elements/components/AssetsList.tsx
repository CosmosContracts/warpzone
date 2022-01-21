/* eslint-disable react-hooks/exhaustive-deps */
import { AssetCard, AssetCardProps } from "./AssetCard"
import {
	Box,
	Flex,
	Grid,
	GridItem,
	Text,
	useBoolean,
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
import AssetAccordion from "./AssetAccordion"

type TokenGridItemProps = AssetCardProps & {
	delayPerPixel: number
	i: number
	originIndex: number
	activeIndex: number
	isVisible: boolean
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
	i,
	activeIndex
}: TokenGridItemProps) => {
	const offset = useRef({ top: 0, left: 0 })
	const ref = useRef<HTMLDivElement>()
	const delayRef = useRef<number>(0)
	const tokenCardControls = useAnimation()
	const [isActive, setActive] = useState<boolean>(false)

	const tokenCardVariants: Variants = {
		hidden: (delayRef: MutableRefObject<number>) => ({
			scale: 0.5,
			opacity: 0,
			transition: {
				delay: delayRef.current,
				duration: 0.25
			}
		}),
		reveal: (delayRef: MutableRefObject<number>) => ({
			opacity: 1,
			scale: 1,
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
	}, [delayPerPixel])

	useLayoutEffect(() => {
		const dx = Math.abs(offset.current.left - originOffset.current.left)
		const dy = Math.abs(offset.current.top - originOffset.current.top)
		const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
		delayRef.current = d * delayPerPixel
	})

	useEffect(() => {
		if (i === activeIndex) {
			tokenCardControls.start("active")
			setActive(true)
			console.log(isActive)
		} else {
			setActive(false)
			tokenCardControls.start("reveal")
		}
	}, [activeIndex, isActive])

	return (
		<Box
			as={motion.div}
			ref={ref}
			initial="hidden"
			exit="hidden"
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
	const originOffset = useRef({ top: 0, left: 0 })
	const [isVisible, setVisibility] = useBoolean(false)

	useLayoutEffect(() => {
		const toggleVisibility = async () => {
			setVisibility.on
			console.log(isVisible)
		}
		toggleVisibility()
	}, [])

	/* isLoading state is true if either we connect the wallet or loading balances */
	const isLoading = loadingBalances
	/* check if the user has any of the assets transferred on the chain */
	const hasTransferredAssets = !loadingBalances && myTokens.length > 0

	const selectToken = (tokenId: number) => {
		setActiveIndex(tokenId)
		// console.log("IDs:", tokenId, activeIndex)
	}

	//TODO
	const [zoomValue, setZoomValue] = useState(3)

	return (
		<Flex
			mt="0px !important"
			bg="whiteAlpha.100"
			direction="column"
			w="full"
			h="full"
			align="center"
		>
			<AssetAccordion title={"Available Tokens"}>
				<AnimatePresence exitBeforeEnter>
					{isLoading ? (
						<Text color="secondary" as="span">
							Loading Token Balances...
						</Text>
					) : (
						<>
							<input
								type="range"
								min="2"
								max="5"
								value={zoomValue}
								// @ts-expect-error
								onChange={(e) => setZoomValue(e.target.value)}
							/>
							<Grid
								autoFlow="row dense"
								// style={{
								// 	gridTemplateColumns:
								// 		activeIndex === index
								// 			? `repeat(${zoomValue - 1}, auto)`
								// 			: `repeat(${zoomValue}, auto)`
								// }}
								style={{
									gridTemplateColumns: `repeat(${zoomValue}, auto)`
								}}
								gap={1}
								pos="relative"
								bg="blackAlpha.400"
								as={motion.div}
								layout
								w="full"
							>
								{hasTransferredAssets &&
									//myTokens.map(({ tokenSymbol, balance }, index) => (
									Array.from({ length: 14 }).map((_, index) => (
										<GridItem
											colSpan={activeIndex === index ? 2 : 1}
											key={index}
											onClick={() => selectToken(index)}
										>
											<TokenGridItem
												activeIndex={activeIndex}
												tokenSymbol={"ccat"}
												balance={20}
												delayPerPixel={0.001}
												originIndex={0}
												originOffset={originOffset}
												isVisible={isVisible}
												i={index}
											/>
										</GridItem>
									))}
								{sdk.initialized && !hasTransferredAssets && (
									<Text>No compatible assets found.</Text>
								)}
							</Grid>
						</>
					)}
				</AnimatePresence>
			</AssetAccordion>
			<AssetAccordion title={"All Tokens"}>
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
									activeIndex={activeIndex}
									isVisible={false}
								/>
							)
						})}
					{sdk.initialized && hasTransferredAssets && (
						<Text color="secondary" as="span">
							You seem to own all the assets! Good job, cosmonaut!
						</Text>
					)}
				</Wrap>
			</AssetAccordion>
		</Flex>
	)
}
