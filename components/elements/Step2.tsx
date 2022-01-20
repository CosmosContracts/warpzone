import { InputGroup, Input, InputRightElement, Button } from "@chakra-ui/react"
import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"

const Step2 = () => {
	const { activateBrowserWallet, account } = useEthers()

	const [value, setValue] = useState("")

	const handleChange = (event) => setValue(event.target.value)

	useEffect(() => {
		setValue(account)
	}, [account])

	return (
		<InputGroup variant="glass">
			<Input
				colorScheme={"blue"}
				h="3rem"
				type="tel"
				color={"blue.200"}
				placeholder="Ethereum Address"
				onChange={handleChange}
				value={value}
			/>
			<InputRightElement
				display={account ? "none" : "flex"}
				h="full"
				px={2}
				w="9rem"
			>
				<Button
					colorScheme={"brand"}
					rounded="xl"
					variant="outline"
					px={4}
					size="sm"
					onClick={() => activateBrowserWallet()}
				>
					Connect MetaMask
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export { Step2 }
