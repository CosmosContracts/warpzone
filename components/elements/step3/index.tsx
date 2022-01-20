import { InputGroup, Input, VStack } from "@chakra-ui/react"
import { useEthers } from "@usedapp/core"
import { useEffect, useState } from "react"
import { useSdk } from "services"
import { AssetsList } from "./elements/components/AssetsList"

const Step3 = () => {
	const { account } = useEthers()
	const sdk = useSdk()
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
				w="full"
				border="2px double"
				rounded="2xl"
				borderColor="whiteAlpha.500"
			>
				<Input
					variant="glass"
					rounded="0"
					border="0"
					borderBottom="1px double"
					colorScheme={"juno"}
					h="3rem"
					type="tel"
					color={"juno.200"}
					placeholder={junoAddress}
					defaultValue={junoAddress}
				/>

				<AssetsList />
			</VStack>
			<InputGroup variant="glass">
				<Input
					colorScheme={"blue"}
					h="3rem"
					type="tel"
					color={"blue.200"}
					placeholder={ethAddress}
					defaultValue={ethAddress}
				/>
			</InputGroup>
		</VStack>
	)
}

export { Step3 }
