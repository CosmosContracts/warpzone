/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	InputGroup,
	Input,
	InputRightElement,
	Button,
	VStack
} from "@chakra-ui/react"
import { useConnectWallet } from "@hooks/useConnectWallet"
import { useTokenList } from "@hooks/useTokenList"
// import { useFetchSupportedTokens } from "@hooks/useFetchSupportedTokens"
import { cosmosWalletState, WalletStatusType } from "@state/atoms/cosmosWallet"
import { useRecoilState } from "recoil"
import ProgressBar from "./components/ProgressBar"

const Step1 = () => {
	const { mutate: connectWallet } = useConnectWallet()
	const [{ status, address }, setWalletState] =
		useRecoilState(cosmosWalletState)

	// @ts-expect-error token list needs to be fetched once before usage in Step 3 to avoid an unnecessary re-render
	const [tokenList] = useTokenList()

	function resetWalletConnection() {
		setWalletState({
			address: "",
			client: null,
			key: null,
			status: WalletStatusType.idle
		})
	}

	return (
		<VStack
			border="2px solid rgba(255,255,255,0.125)"
			overflow="hidden"
			rounded="2xl"
			spacing={0}
			w="full"
		>
			<InputGroup overflow="hidden" variant="glass">
				<Input
					borderBottom="0px"
					color="juno.200"
					colorScheme="juno"
					h="2.5rem"
					p={0}
					pl={2}
					readOnly
					roundedBottom="0"
					type="tel"
					value={
						status === WalletStatusType.connected
							? address
							: "Waiting for Keplr connection..."
					}
				/>
				<InputRightElement h="2.5rem" maxW="6.5rem" w="100%">
					<Button
						bg="blackAlpha.200"
						border="1px solid rgba(255, 255, 255,0.125)"
						borderBottom="0px"
						borderEnd="0px"
						borderEndRadius="0px"
						borderTop="0px"
						colorScheme="brand"
						fontSize="xs"
						fontWeight="400"
						h="full"
						key="2"
						letterSpacing={0.75}
						onClick={() => {
							if (status === WalletStatusType.idle) {
								connectWallet(null)
							} else {
								resetWalletConnection()
							}
						}}
						rounded="2xl"
						variant="outline"
						w="full"
					>
						{status === WalletStatusType.idle ? "Connect Keplr" : "Disconnect"}
					</Button>
				</InputRightElement>
			</InputGroup>
			<ProgressBar progressColor="juno.200" status={status} />
		</VStack>
	)
}

export default Step1
