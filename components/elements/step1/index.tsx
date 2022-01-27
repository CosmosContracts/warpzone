import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react"
import { useConnectWallet } from "@hooks/useConnectWallet"
import { cosmosWalletState, WalletStatusType } from "@state/atoms/cosmosWallet"
import { AnimatePresence, motion } from "framer-motion"
import { useRecoilState } from "recoil"

const Step1 = () => {
	const [{ status, address }, setWalletState] =
		useRecoilState(cosmosWalletState)
	const { mutate: connectWallet } = useConnectWallet()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [tokenList] = <useTokenLis></useTokenLis>t()

	function resetWalletConnection() {
		setWalletState({
			address: "",
			client: null,
			key: null,
			status: WalletStatusType.idle
		})
	}

	return (
		<InputGroup overflow="hidden" variant="glass">
			<Input
				color="juno.200"
				colorScheme="juno"
				h="3rem"
				readOnly
				rounded="2xl"
				type="tel"
				value={
					status === WalletStatusType.connected
						? address
						: "Your Juno Address ..."
				}
			/>
			<InputRightElement as={motion.div} h="full" layout w="8rem">
				<AnimatePresence exitBeforeEnter presenceAffectsLayout>
					{status !== WalletStatusType.connected && (
						<Button
							colorScheme="brand"
							fontSize="xs"
							key="2"
							letterSpacing={0.5}
							onClick={() => connectWallet(null)}
							rounded="2xl"
							variant="outline"
							w="full"
						>
							Connect Keplr
						</Button>
					)}
					{status === WalletStatusType.connected && (
						<Button
							colorScheme="brand"
							fontSize="xs"
							key="1"
							letterSpacing={0.5}
							onClick={() => resetWalletConnection()}
							rounded="2xl"
							variant="outline"
							w="full"
						>
							Disconnect Keplr
						</Button>
					)}
				</AnimatePresence>
			</InputRightElement>
		</InputGroup>
	)
}

export { Step1 }
