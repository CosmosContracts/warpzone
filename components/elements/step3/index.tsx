import { InputGroup, Input, VStack } from "@chakra-ui/react"
import { cosmosWalletState } from "@state/atoms/cosmosWallet"
import { useEthers } from "@usedapp/core"
import { useRecoilValue } from "recoil"
import { AssetsList } from "./elements/components/AssetsList"

const Step3 = () => {
	const { account } = useEthers()
	const { address } = useRecoilValue(cosmosWalletState)

	return (
		<VStack align="center" w="full">
			<VStack
				border="2px double"
				borderColor="whiteAlpha.500"
				overflow="hidden"
				rounded="2xl"
				spacing="0"
				w="full"
			>
				<Input
					border="0"
					borderBottom="1px double"
					color="juno.200"
					colorScheme="juno"
					defaultValue={address}
					maxH="1rem"
					px={2}
					py={5}
					readOnly
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
					defaultValue={account}
					h="3rem"
					type="tel"
				/>
			</InputGroup>
		</VStack>
	)
}

export { Step3 }
