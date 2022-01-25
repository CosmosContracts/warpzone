import { InputGroup, Input, VStack } from "@chakra-ui/react"
import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import { AssetsList } from "./elements/components/AssetsList"

const Step3 = () => {
	const { account } = useEthers()
	const [junoAddress, setJunoAddress] = useState("")
	const [ethAddress, setEthAddress] = useState("")

	useEffect(() => {
		setEthAddress(account)
	}, [account])

	useEffect(() => {
		setJunoAddress(sdk.address)
	}, [sdk.address])

	return (
		<VStack align="center" w="full">
			<VStack
				border="2px double"
				borderColor="whiteAlpha.500"
				rounded="2xl"
				spacing="0"
				w="full"
			>
				<Input
					border="0"
					borderBottom="1px double"
					color="juno.200"
					colorScheme="juno"
					defaultValue={junoAddress}
					h="3rem"
					placeholder={junoAddress}
					rounded="0"
					type="tel"
					variant="glass"
				/>

				<AssetsList />
			</VStack>
			<InputGroup variant="glass">
				<Input
					color="blue.200"
					colorScheme="blue"
					defaultValue={ethAddress}
					h="3rem"
					placeholder={ethAddress}
					type="tel"
				/>
			</InputGroup>
		</VStack>
	)
}

export { Step3 }
