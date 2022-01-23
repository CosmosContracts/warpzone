import { Box, HStack, IconButton, Text } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowCounterClockwise } from "phosphor-react"
import type { FC } from "react"
import { useState } from "react"

type AssetAccordionProps = {
	title: string
}

const AssetAccordion: FC<AssetAccordionProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Box w="full">
			<AnimatePresence>
				<HStack as={motion.div} flex="1" placeSelf="start">
					<Text pl={3} py={1} textAlign="left">
						{title}
					</Text>
					<IconButton
						alignSelf="start"
						aria-label="back to mode selection"
						colorScheme="brand"
						icon={<ArrowCounterClockwise size={24} weight="duotone" />}
						onClick={() => setIsOpen(!isOpen)}
						rounded="full"
						variant="outline"
					/>
				</HStack>
				{isOpen && (
					<motion.div
						animate={{
							height: "auto",
							opacity: 1,
							transition: {
								when: "beforeChildren"
							}
						}}
						exit={{
							height: 0,
							opacity: 0,
							transition: {
								when: "afterChildren"
							}
						}}
						initial={{ height: 0, opacity: 0 }}
						key="tokenList"
						layout
						style={{ overflow: "hidden" }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	)
}

export default AssetAccordion
