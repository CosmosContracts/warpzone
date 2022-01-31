import { Flex } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Suspense } from "react"
import { Scene } from "./Scene"

const Background = () => {
	return (
		<Flex
			as={motion.div}
			bg="#001C1C"
			h="100vh"
			pointerEvents="auto"
			pos="absolute"
			top="0"
			w="full"
			zIndex={0}
		>
			<Suspense fallback="">
				<Scene />
			</Suspense>
		</Flex>
	)
}

export default Background
