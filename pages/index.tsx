// eslint-disable-next-line canonical/filename-match-exported
import { Flex } from "@chakra-ui/react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { MainSection } from "../components/sections"

const variants: Variants = {
	enter: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
	hidden: { opacity: 0, transition: { duration: 0.5, staggerChildren: 0.2 } }
}

export const IndexPage = () => {
	return (
		<Flex
			align="center"
			animate="enter"
			as={motion.main}
			direction="column"
			initial="hidden"
			justifyContent="center"
			variants={variants}
			w="full"
		>
			<MainSection />
		</Flex>
	)
}

export default IndexPage
