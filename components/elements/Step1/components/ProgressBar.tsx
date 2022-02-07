/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex } from "@chakra-ui/react"
import { WalletStatusType } from "@state/atoms/cosmosWallet"
import {
	disableNextStepState,
	isCosmosWalletConnectedState
} from "@state/atoms/ui"
import { animate, motion, useMotionValue } from "framer-motion"
import { useEffect } from "react"
import { useRecoilState } from "recoil"

type ProgressBarProps = {
	progressColor: string
	status: WalletStatusType
}

const ProgressBar = ({
	progressColor = "brand.1",
	status
}: ProgressBarProps) => {
	const variants = {
		hideBar: { height: "0rem" },
		showBar: { height: "0.2rem" }
	}

	const [, setDisableNextStep] = useRecoilState(disableNextStepState)

	const width = useMotionValue("0%")

	const [, setCosmosWalletConnected] = useRecoilState(
		isCosmosWalletConnectedState
	)

	useEffect(() => {
		if (status === WalletStatusType.connected) {
			animate(width, "100%", { type: "tween" })
			setDisableNextStep(false)
			setCosmosWalletConnected(true)
			return
		} else {
			setDisableNextStep(true)
		}

		if (status === WalletStatusType.connecting) {
			animate(width, "35%", { type: "tween" })
		}

		if (status === WalletStatusType.idle) {
			animate(width, "0%", { type: "tween" })
			setCosmosWalletConnected(false)
		}
	}, [status])

	return (
		<Flex my={1} w="full">
			<Box
				animate={
					status === WalletStatusType.connected ||
					status === WalletStatusType.connecting
						? "showBar"
						: "hideBar"
				}
				as={motion.div}
				bg="transparent"
				overflow="hidden"
				pos="relative"
				variants={variants}
				w="full"
			>
				<Box
					as={motion.div}
					bg={progressColor}
					exit="enter"
					h="100%"
					left={0}
					maxW="100%"
					pos="absolute"
					// @ts-expect-error Chakra > < Motion types
					style={{ width }}
					top={0}
					variants={variants}
				/>
			</Box>
		</Flex>
	)
}

export default ProgressBar
