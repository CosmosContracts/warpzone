/* eslint-disable react-hooks/exhaustive-deps */
import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { useTokenInfo } from "@hooks/useTokenInfo"
import shortenNumber from "@utils/shortenNumber"
import { useUpdateEffect } from "ahooks"
import { animate, motion, useMotionValue } from "framer-motion"
import type { FC } from "react"
import { ChakraNextImage } from "./ChakraNextImage"

export type AssetCardProps = {
	balance?: number
	isActive?: boolean
	tokenSymbol?: string
}

export const AssetCard: FC<AssetCardProps> = ({
	tokenSymbol,
	balance,
	isActive
}) => {
	const { ticker, logoURI, name } = useTokenInfo(tokenSymbol) || {}
	const boxShadow = useMotionValue(
		"0 3px 10px 0 rgba(101, 246, 168, 0), 0 -3px 10px 0 rgba(0, 150, 250, 0),inset 0 0 0 2px  rgba(101, 246, 168, 0),inset -4px 0 7px -2px rgba(220,220,220,0)"
	)
	const tokenBackground = useMotionValue(
		"radial-gradient(ellipsis at top, rgba(149, 249, 195, 0.35) 0%,rgba(82, 182, 154, 0.35) 20%,rgba(149, 249, 195, 0.25) 40%, #090A0F 75%)"
	)

	const PlayActiveAnimation = async () => {
		animate(
			boxShadow,
			"0 3px 10px 0 rgba(101, 246, 168, 0.23), 0 -3px 10px 0 rgba(0, 150, 250, 0.19),inset 0 0 0 2px  rgba(101, 246, 168, 0.25),inset 6px 0 7px -2px rgba(101, 246, 168,0.5)",
			{
				duration: 1,
				type: "tween"
			}
		)
		animate(
			tokenBackground,
			"radial-gradient(circle at left, rgba(101, 246, 168, 0.3) 4%, rgba(0, 0, 0, 0.3) 20%",
			{
				duration: 1,
				type: "tween"
			}
		)
	}

	const PlayExitAnimation = async () => {
		animate(
			boxShadow,
			"0 3px 10px 0 rgba(101, 246, 168, 0), 0 -3px 10px 0 rgba(0, 150, 250, 0),inset 0 0 0 2px  rgba(101, 246, 168, 0),inset -4px 0 7px -2px rgba(220,220,220,0)",
			{
				duration: 1,
				type: "tween"
			}
		)
		animate(
			tokenBackground,
			"radial-gradient(circle at left, rgba(0, 0, 0, 0.3) 3%,rgba(0, 0, 0, 0.3) 10%, rgba(0, 0, 0, 0.3) 20%",
			{
				duration: 1,
				type: "tween"
			}
		)
	}

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
			border="1px solid rgba(255, 255, 255, 0.125)"
			layout
			opacity={balance > 0 ? 1 : 0.5}
			rounded="2xl"
			style={{
				// @ts-expect-error Chakra UI != Framer Motion typed
				backgroundImage: tokenBackground,
				// @ts-expect-error Chakra UI != Framer Motion typed
				boxShadow
			}}
		>
			<HStack as={motion.div} h="full" px={2} py={2}>
				<ChakraNextImage
					filter={balance > 0 ? "" : "saturate(20%) brightness(60%)"}
					h="2.5rem"
					height={100}
					rounded="full"
					src={logoURI}
					width={100}
				/>
				<VStack
					align="start"
					fontSize="sm"
					h="full"
					justify="center"
					lineHeight={1.3}
					spacing={0}
				>
					<Text
						color={balance > 0 ? "offwhite.200" : "whiteAlpha.400"}
						isTruncated
						maxWidth="4.5rem"
					>
						{name}
					</Text>
					<Text
						color={balance > 0 ? "brand.200" : "whiteAlpha.500"}
						fontWeight="semibold"
						letterSpacing={1.3}
					>
						{ticker}
					</Text>
				</VStack>
				<Text
					color={balance > 0 ? "offwhite.200" : "whiteAlpha.400"}
					fontSize="sm"
					textAlign="right"
					w="full"
				>
					{shortenNumber(balance, 2)}
				</Text>
			</HStack>
		</Box>
	)
}
