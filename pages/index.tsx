import { Flex } from "@chakra-ui/react"
import { motion, Variants } from "framer-motion"
import { MainSection } from "../components/sections"

const variants: Variants = {
	hidden: { opacity: 0, transition: { duration: 0.5, staggerChildren: 0.2 } },
	enter: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } }
}

export const IndexPage = () => {
	return (
		<Flex
			as={motion.main}
			initial="hidden"
			animate="enter"
			variants={variants}
			w="full"
			direction="column"
			align="center"
			justifyContent="center"
		>
			<MainSection />
		</Flex>
	)
}

export default IndexPage
