// eslint-disable-next-line canonical/filename-match-exported
import { Flex } from "@chakra-ui/react"
import { MainSection } from "../components/sections"

export const IndexPage = () => {
	return (
		<Flex
			align="center"
			as="main"
			direction="column"
			justifyContent="center"
			pointerEvents="none"
			w="full"
		>
			<MainSection />
		</Flex>
	)
}

export default IndexPage
