import {
	Text,
	VStack,
	Flex,
	Button,
	ButtonGroup,
	HStack
} from "@chakra-ui/react"
import { CurrencyEth } from "phosphor-react"
import { AssetList } from "./elements/components/AssetList"
import Pagination from "./elements/components/Pagination"

const Step3 = () => {
	return (
		<VStack align="center" h="full" w="full">
			<VStack
				border="1px solid rgba(255, 255, 255, 0.125)"
				h="full"
				overflow="hidden"
				rounded="2xl"
				spacing="0"
				w="full"
			>
				<Flex
					align="center"
					border="0"
					borderBottom="1px solid"
					borderColor="brand.200"
					color="white"
					px={2}
					py={1}
					rounded="0"
					w="full"
				>
					<Text>Available Assets</Text>
					<HStack ml="auto">
						<ButtonGroup isAttached variant="ghost">
							<Button
								border="1px solid rgba(255, 255, 255, 0.125)"
								fontSize="sm"
								fontWeight="400"
								h="1.5rem"
								roundedStart="0.6rem"
							>
								Amount
							</Button>
							<Button
								border="1px solid rgba(255, 255, 255, 0.125)"
								fontSize="sm"
								fontWeight="400"
								h="1.5rem"
							>
								Juno
							</Button>
							<Button
								border="1px solid rgba(255, 255, 255, 0.125)"
								fontSize="sm"
								fontWeight="400"
								h="1.5rem"
								py={2}
								roundedEnd="0.6rem"
							>
								<CurrencyEth size={20} weight="regular" />
							</Button>
						</ButtonGroup>
					</HStack>
				</Flex>
				<AssetList />
				<Pagination />
			</VStack>
			{/* <InputGroup variant="glass">
				<Input
					color="blue.200"
					colorScheme="blue"
					defaultValue={account}
					h="3rem"
					type="tel"
				/>
			</InputGroup> */}
		</VStack>
	)
}

export default Step3
