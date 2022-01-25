import {
	InputGroup,
	Input,
	InputRightElement,
	Button,
	useBoolean
} from "@chakra-ui/react"
import { useConnectWallet } from "@hooks/useConnectWallet"
import { walletState } from "@state/atoms/wallet"
import { useRecoilState } from "recoil"

const Step1 = () => {
	const [loading, setLoading] = useBoolean()
	const [{ key }, setWalletState] = useRecoilState(walletState)
	const { mutate: connectWallet } = useConnectWallet()

	/* fetch token */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// const [tokenList] = useTokenList()

	return (
		<InputGroup variant="glass">
			<Input
				color="juno.200"
				colorScheme="juno"
				defaultValue="Juno Address"
				h="3rem"
				placeholder="Your Juno Address"
				type="tel"
			/>
			<InputRightElement display="flex" h="full" px={2} w="9rem">
				<Button
					colorScheme="brand"
					fontSize="xs"
					letterSpacing={0.2}
					onClick={() => connectWallet(null)}
					rounded="xl"
					variant="outline"
					w="auto"
				>
					Connect Keplr
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export { Step1 }
