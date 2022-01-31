/* eslint-disable react-hooks/exhaustive-deps */
import {
	Box,
	Flex,
	Text,
	useUpdateEffect,
	Wrap,
	WrapItem
} from "@chakra-ui/react"
import { cosmosWalletState, WalletStatusType } from "@state/atoms/cosmosWallet"
import { activeTokenState } from "@state/atoms/ui"
import { useMount } from "ahooks"
import type { Variants } from "framer-motion"
import {
	useUnmountEffect,
	AnimatePresence,
	motion,
	useAnimation
} from "framer-motion"
import { nanoid } from "nanoid"
import type { MutableRefObject } from "react"
import { useRef, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { useGetSupportedAssetsBalancesOnChain } from "../hooks/useGetSupportedAssetsBalancesOnChain"
import AssetAccordion from "./AssetAccordion"
import { AssetCard } from "./AssetCard"
import type { AssetCardProps } from "./AssetCard"

type TokenGridItemProps = AssetCardProps & {
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
	i
}: TokenGridItemProps) => {
	const offset = useRef({ left: 0, top: 0 })
	const ref = useRef<HTMLDivElement>()
	const delayRef = useRef<number>(0)
	const tokenCardControls = useAnimation()
	const [activeToken] = useRecoilState(activeTokenState)
	const [isActive, setIsActive] = useState(false)

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

	const playActiveAnimation = async () => {
		await tokenCardControls.start("active")
	}

	const playRevealAnimation = async () => {
		await tokenCardControls.start("reveal")
	}

	useMount(() => {
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

		const dx = Math.abs(offset.current.left - originOffset.current.left)
		const dy = Math.abs(offset.current.top - originOffset.current.top)
		const d = Math.sqrt(dx ** 2 + dy ** 2)
		delayRef.current = d * delayPerPixel

		void tokenCardControls.start("reveal")
	})

	useUnmountEffect(() => {
		void tokenCardControls.start("hidden")
	})

	useUpdateEffect(() => {
		if (i === activeToken) {
			void playActiveAnimation()
		} else {
			void playRevealAnimation()
		}
	}, [isActive])

	useUpdateEffect(() => {
		if (i === activeToken) {
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [activeToken])

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

export const AssetList = () => {
	const [loadingBalances, [myTokens, allTokens]] =
		useGetSupportedAssetsBalancesOnChain()

	const originOffset = useRef({ left: 0, top: 0 })
	const { status } = useRecoilValue(cosmosWalletState)
	const [, setActiveToken] = useRecoilState(activeTokenState)

	/* isLoading state is true if either we connect the wallet or loading balances */
	const isLoading = loadingBalances
	/* check if the user has any of the assets transferred on the chain */
	const hasTransferredAssets = !loadingBalances && myTokens.length > 0

	const selectToken = (tokenId: number) => {
		setActiveToken(tokenId)
		// console.log("IDs:", tokenId, activeIndex)
	}

	return (
		<Flex
			align="center"
			bg="whiteAlpha.100"
			direction="column"
			h="full"
			w="full"
		>
			<AssetAccordion title="Available Tokens">
				<AnimatePresence exitBeforeEnter>
					{isLoading ? (
						<Text as="span" color="secondary">
							Loading Token Balances...
						</Text>
					) : (
						<Wrap as={motion.div} bg="blackAlpha.400" gap={1} layout w="full">
							{hasTransferredAssets &&
								// myTokens.map(({ tokenSymbol, balance }, index) => (
								Array.from({ length: 14 }).map((_, index) => (
									<WrapItem
										key={nanoid()}
										onClick={(event) => {
											event.preventDefault()
											selectToken(index)
										}}
									>
										<TokenGridItem
											balance={2_000}
											delayPerPixel={0.001}
											i={index}
											originIndex={0}
											originOffset={originOffset}
											tokenSymbol="ccat"
										/>
									</WrapItem>
								))}
							{status === WalletStatusType.connected &&
								!hasTransferredAssets && (
									<Text>You don't own any listed tokens</Text>
								)}
						</Wrap>
					)}
				</AnimatePresence>
			</AssetAccordion>
			<AssetAccordion title="All Tokens">
				<Wrap as={motion.div} h="full" px={3} spacing={3} w="full">
					{status === WalletStatusType.connected &&
						!hasTransferredAssets &&
						allTokens.map(({ tokenSymbol }) => {
							return (
								<TokenGridItem
									delayPerPixel={0.004}
									i={1}
									isActive={false}
									key={tokenSymbol}
									originIndex={0}
									originOffset={originOffset}
								/>
							)
						})}
					{status === WalletStatusType.connected && hasTransferredAssets && (
						<Text as="span" color="secondary">
							You seem to own all the assets! Good job, cosmonaut!
						</Text>
					)}
				</Wrap>
			</AssetAccordion>
		</Flex>
	)
}
