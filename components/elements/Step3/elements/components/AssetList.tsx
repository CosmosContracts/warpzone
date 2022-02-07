/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Grid, GridItem, useUpdateEffect } from "@chakra-ui/react"
import { useFetchSupportedTokens } from "@hooks/useFetchSupportedTokens"
import { activeTokenState } from "@state/atoms/ui"
import { useMount } from "ahooks"
import type { Variants } from "framer-motion"
import { motion, useAnimation } from "framer-motion"
import { nanoid } from "nanoid"
import type { MutableRefObject } from "react"
import { useRef, useState } from "react"
import { useRecoilState } from "recoil"
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
			viewport={{ once: true }}
			whileInView="reveal"
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
	const originOffset = useRef({ left: 0, top: 0 })
	const [, setActiveToken] = useRecoilState(activeTokenState)

	const [, [myTokens]] = useFetchSupportedTokens()

	const selectToken = (tokenId: number) => {
		setActiveToken(tokenId)
	}

	return (
		<Flex align="center" direction="column" h="full" w="full">
			<Grid
				as={motion.div}
				bgGradient="linear(to-b, blackAlpha.600, transparent)"
				gap={2}
				h="full"
				layout
				px={2}
				py={2}
				templateColumns="repeat(4, 1fr)"
				templateRows="repeat(4, 1fr)"
				w="full"
			>
				{myTokens.map(({ tokenSymbol, balance }, index) => {
					return (
						<GridItem
							key={nanoid()}
							onClick={() => {
								selectToken(index)
							}}
						>
							<TokenGridItem
								balance={balance}
								delayPerPixel={0.001}
								i={index}
								originIndex={0}
								originOffset={originOffset}
								tokenSymbol={tokenSymbol}
							/>
						</GridItem>
					)
				})}
			</Grid>
		</Flex>
	)
}
