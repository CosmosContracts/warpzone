import { AssetCard } from "./AssetCard"
import {
	Box,
	Flex,
	HStack,
	IconButton,
	Text,
	UnorderedList,
	Wrap
} from "@chakra-ui/react"
import { useGetSupportedAssetsBalancesOnChain } from "../hooks/useGetSupportedAssetsBalancesOnChain"
import { useSdk } from "@services/client"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowCounterClockwise } from "phosphor-react"

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
				{activeAccordionItem == 0 && (
					<UnorderedList
						listStyleType={"none"}
						m={0}
						p={0}
						pos="relative"
						flexWrap="wrap"
						display="flex"
						bg="blackAlpha.400"
						as={motion.ul}
						layout
						initial={false}
						animate={isVisible ? "visible" : "hidden"}
						w="full"
					>
						{sdk.initialized &&
							hasTransferredAssets &&
							myTokens.map(({ tokenSymbol, balance }, index) => (
								<Box
									as={motion.li}
									layout
									onClick={() => selectToken(index, activeIndex)}
									key={tokenSymbol}
								>
									<AssetCard
										tokenSymbol={tokenSymbol}
										balance={balance}
										activeIndex={activeIndex}
										assetId={index}
										delayPerPixel={0.0012}
										i={index}
										originIndex={0}
										originOffset={originOffset}
									/>
								</Box>
							))}
						{sdk.initialized && !hasTransferredAssets && (
							<Text color="secondary" as="span">
								No compatible assets found.
							</Text>
						)}
					</UnorderedList>
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
									<AssetCard
										key={tokenSymbol}
										tokenSymbol={tokenSymbol}
										activeIndex={activeIndex + 50}
										assetId={200}
										delayPerPixel={0}
										i={0}
										originIndex={0}
										originOffset={originOffset}
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
