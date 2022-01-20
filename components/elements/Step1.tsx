import {
	InputGroup,
	Input,
	InputRightElement,
	Button,
	useBoolean
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
	configKeplr,
	loadKeplrWallet,
	testnet,
	useSdk,
	WalletLoader
} from "services"
import type { Window as KeplrWindow } from "@keplr-wallet/types"
import { useTokenList } from "@hooks/useTokenList"

const Step1 = () => {
	const [loading, setLoading] = useBoolean()

	const sdk = useSdk()

	const init = async (loadWallet: WalletLoader) => {
		setLoading.on()
		try {
			const signer = await loadWallet(testnet.chainId, testnet.addressPrefix)
			sdk.init(signer)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setLoading.off()
		}
	}

	const connectKeplr = async () => {
		setLoading.on()
		const anyWindow = window as KeplrWindow
		try {
			await anyWindow.keplr?.experimentalSuggestChain(configKeplr(testnet))
			await anyWindow.keplr?.enable(testnet.chainId)
			await init(loadKeplrWallet)
		} catch (error) {
			setLoading.off()
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	const disconnectKeplr = () => {
		setLoading.on()
		try {
			sdk.disconnect()
		} catch (error) {
			setLoading.off()
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	const handleConnect = async () => {
		if (sdk.initialized) {
			disconnectKeplr()
			setLoading.off()
		} else {
			await connectKeplr()
			setLoading.off()
		}
	}

	const [value, setValue] = useState("")

	const handleChange = (event) => setValue(event.target.value)

	/* fetch token */
	// @ts-expect-error
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [tokenList] = useTokenList()

	useEffect(() => {
		setValue(sdk.address)
	}, [sdk.address])

	return (
		<InputGroup variant="glass">
			<Input
				colorScheme={"juno"}
				h="3rem"
				type="tel"
				color={"juno.200"}
				placeholder="Juno Address"
				value={value}
				onChange={handleChange}
			/>
			<InputRightElement
				display={sdk.initialized ? "none" : "flex"}
				h="full"
				px={2}
				w="9rem"
			>
				<Button
					isLoading={loading}
					colorScheme={"brand"}
					rounded="xl"
					variant="outline"
					px={4}
					size="sm"
					onClick={handleConnect}
				>
					Connect Keplr
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export { Step1 }
