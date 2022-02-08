import {
	Box,
	Button,
	Center,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from "@chakra-ui/react"
import type { Variants } from "framer-motion"
import { motion } from "framer-motion"
import { ArrowSquareOut } from "phosphor-react"
import type { FC } from "react"
import { isFirefox, isChrome } from "react-device-detect"

const draw: Variants = {
	hidden: { pathLength: 0, pathOffset: 0, rotateZ: 0 },
	visible: (index) => {
		return {
			pathLength: 1.1,
			pathOffset: 1,
			rotateZ: 360,
			transition: {
				delay: index,
				duration: 1.4,
				repeat: Number.POSITIVE_INFINITY,
				repeatType: "loop",
				type: "tween"
			}
		}
	}
}

const LoadingScreen: FC = () => {
	return (
		<>
			<Center
				bg="#001C1C"
				h="100vh"
				pos="absolute"
				textAlign="center"
				w="100vw"
				zIndex="4"
			/>
			{isChrome && (
				<Box h="full" p="15rem" pos="absolute" top="0" w="full" zIndex="5">
					<motion.svg
						fill="transparent"
						height="100%"
						strokeWidth={5}
						viewBox="0 0 200 200"
						width="100%"
					>
						<motion.circle
							animate="visible"
							custom={0.8}
							cx="100"
							cy="100"
							initial="hidden"
							r="80"
							stroke="#003232"
							style={{
								filter: "drop-shadow(0px 0px 4px #003232)"
							}}
							variants={draw}
						/>
						<motion.circle
							animate="visible"
							custom={0.4}
							cx="100"
							cy="100"
							initial="hidden"
							r="55"
							stroke="#005252"
							style={{
								filter: "drop-shadow(0px 0px 4px #005252)"
							}}
							variants={draw}
						/>
						<motion.circle
							animate="visible"
							custom={0}
							cx="100"
							cy="100"
							initial="hidden"
							r="30"
							stroke="#0DD69E"
							strokeLinecap="round"
							strokeLinejoin="round"
							style={{
								filter: "drop-shadow(0px 0px 4px #3fffb4)"
							}}
							variants={draw}
						/>
					</motion.svg>
				</Box>
			)}
			<Modal isCentered isOpen={isFirefox} onClose={() => {}}>
				<ModalOverlay
					backdropFilter="blur(6px)"
					backgroundColor="whiteAlpha.100"
				/>
				<ModalContent
					backgroundColor="blackAlpha.500"
					boxShadow="0 22px 70px 4px rgba(13, 214, 158, 0.56), 0 -22px 70px 4px rgba(0, 200, 250, 0.56)"
					rounded="2xl"
				>
					<ModalHeader>Firefox is not (yet) supported.</ModalHeader>
					<ModalBody fontSize="md" pb={4}>
						Keplr Wallet is currently not available to Firefox users. Please use
						any version of Chromium with the Keplr Wallet extension installed to
						use Warpzone.
					</ModalBody>
					<ModalFooter>
						<Button
							_hover={{ textDecoration: "underline" }}
							as="a"
							border="1px solid rgba(255,255,255,0.125)"
							colorScheme="brand"
							fontSize="sm"
							fontWeight="400"
							href="https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap?hl=en"
							px={2}
							py={0}
							rel="noopener noreferrer"
							rightIcon={<ArrowSquareOut size={16} />}
							rounded="xl"
							size="md"
							target="_blank"
							variant="outline"
						>
							<Text>Get Keplr Wallet</Text>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}

export default LoadingScreen
