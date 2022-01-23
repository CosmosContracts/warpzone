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
				color="blue.200"
				colorScheme="blue"
				h="3rem"
				onChange={handleChange}
				placeholder="Ethereum Address"
				type="tel"
				value={value}
			/>
			<InputRightElement
				display={account ? "none" : "flex"}
				h="full"
				px={2}
				w="9rem"
			>
				<Button
					colorScheme="brand"
					onClick={() => activateBrowserWallet()}
					px={4}
					rounded="xl"
					size="sm"
					variant="outline"
				>
					Connect MetaMask
				</Button>
			</InputRightElement>
		</InputGroup>
	)
}

export { Step2 }
