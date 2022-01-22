/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	Flex,
	Grid,
	GridItem,
	Text,
	useBoolean,
	Wrap
} from "@chakra-ui/react"
import { useSdk } from "@services/client"
import type { Variants } from "framer-motion"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import type { MutableRefObject } from "react"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useGetSupportedAssetsBalancesOnChain } from "../hooks/useGetSupportedAssetsBalancesOnChain"
import AssetAccordion from "./AssetAccordion"
import { AssetCard } from "./AssetCard"
import type { AssetCardProps } from "./AssetCard"

type TokenGridItemProps = AssetCardProps & {
	activeIndex: number
	delayPerPixel: number
	i: number
	originIndex: number
	originOffset: MutableRefObject<{
		left: number
		top: number
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
	const offset = useRef({ left: 0, top: 0 })
	const ref = useRef<HTMLDivElement>()
	const delayRef = useRef<number>(0)
	const tokenCardControls = useAnimation()
	const [isActive, setActive] = useState<boolean>(false)

	const tokenCardVariants: Variants = {
		hidden: () => ({
			opacity: 0,
			scale: 0.5,
			transition: {
				delay: delayRef.current,
				duration: 0.25
			}
		}),
		reveal: () => ({
			opacity: 1,
			scale: 1,
			transition: { delay: delayRef.current, duration: 0.25 }
		})
	}

	useLayoutEffect(() => {
		const element = ref.current
		if (!element) return

		offset.current = {
			left: element.offsetLeft,
			top: element.offsetTop
		}

		if (i === originIndex) {
			// eslint-disable-next-line no-param-reassign
			originOffset.current = offset.current
		}
	}, [delayPerPixel])

	useLayoutEffect(() => {
		const dx = Math.abs(offset.current.left - originOffset.current.left)
		const dy = Math.abs(offset.current.top - originOffset.current.top)
		const d = Math.sqrt(dx ** 2 + dy ** 2)
		delayRef.current = d * delayPerPixel
	})

	useEffect(() => {
		const playActiveAnimation = async () => {
			await tokenCardControls.start("active")
		}

		const playRevealAnimation = async () => {
			await tokenCardControls.start("reveal")
		}

		if (i === activeIndex) {
			setActive(true)
			// eslint-disable-next-line no-console
			playActiveAnimation().catch(() => console.log(isActive))
		} else {
			// eslint-disable-next-line no-console
			playRevealAnimation().catch(() => console.log(isActive))
		}
	}, [activeIndex, isActive])

	return (
		<Box
			animate={tokenCardControls}
			as={motion.div}
			custom={delayRef}
			exit="hidden"
			initial="hidden"
			ref={ref}
			variants={tokenCardVariants}
		>
			<AssetCard
				balance={balance}
				isActive={isActive}
				tokenSymbol={tokenSymbol}
			/>
		</Box>
	)
}

export const AssetsList = () => {
	const [loadingBalances, [myTokens, allTokens]] =
		useGetSupportedAssetsBalancesOnChain()

	const sdk = useSdk()
	const [activeIndex, setActiveIndex] = useState<number>(undefined)
	const originOffset = useRef({ left: 0, top: 0 })
	const [isVisible, setVisibility] = useBoolean(false)

	useLayoutEffect(() => {
		const toggleVisibility = async () => {
			setVisibility.on()
		}

		toggleVisibility().catch(() => {
			// eslint-disable-next-line no-console
			console.log(isVisible)
		})
	}, [])

	/* isLoading state is true if either we connect the wallet or loading balances */
	const isLoading = loadingBalances
	/* check if the user has any of the assets transferred on the chain */
	const hasTransferredAssets = !loadingBalances && myTokens.length > 0

	const selectToken = (tokenId: number) => {
		setActiveIndex(tokenId)
		// console.log("IDs:", tokenId, activeIndex)
	}

	// TODO
	const [zoomValue, setZoomValue] = useState(3)

	return (
		<Flex
			align="center"
			bg="whiteAlpha.100"
			direction="column"
			h="full"
			mt="0px !important"
			w="full"
		>
			<AssetAccordion title="Available Tokens">
				<AnimatePresence exitBeforeEnter>
					{isLoading ? (
						<Text as="span" color="secondary">
							Loading Token Balances...
						</Text>
					) : (
						<>
							<input
								max="5"
								min="2"
								onChange={(event) =>
									setZoomValue(Number.parseInt(event.target.value, 10))
								}
								type="range"
								value={zoomValue}
							/>
							<Grid
								as={motion.div}
								// style={{
								// 	gridTemplateColumns:
								// 		activeIndex === index
								// 			? `repeat(${zoomValue - 1}, auto)`
								// 			: `repeat(${zoomValue}, auto)`
								// }}
								autoFlow="row dense"
								bg="blackAlpha.400"
								gap={1}
								layout
								pos="relative"
								style={{
									gridTemplateColumns: `repeat(${zoomValue}, auto)`
								}}
								w="full"
							>
								{hasTransferredAssets &&
									// myTokens.map(({ tokenSymbol, balance }, index) => (
									Array.from({ length: 14 }).map((_, index) => (
										<GridItem
											colSpan={activeIndex === index ? 2 : 1}
											key={length}
											onClick={() => selectToken(index)}
										>
											<TokenGridItem
												activeIndex={activeIndex}
												balance={20}
												delayPerPixel={0.001}
												i={index}
												originIndex={0}
												originOffset={originOffset}
												tokenSymbol="ccat"
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
			<AssetAccordion title="All Tokens">
				<Wrap as={motion.div} h="full" px={3} spacing={3} w="full">
					{sdk.initialized &&
						!hasTransferredAssets &&
						allTokens.map(({ tokenSymbol }) => {
							return (
								<TokenGridItem
									activeIndex={activeIndex}
									delayPerPixel={0.004}
									i={1}
									isActive={false}
									key={tokenSymbol}
									originIndex={0}
									originOffset={originOffset}
								/>
							)
						})}
					{sdk.initialized && hasTransferredAssets && (
						<Text as="span" color="secondary">
							You seem to own all the assets! Good job, cosmonaut!
						</Text>
					)}
				</Wrap>
			</AssetAccordion>
		</Flex>
	)
}
