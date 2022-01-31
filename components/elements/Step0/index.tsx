import { Text, Button, ButtonGroup, Stack } from "@chakra-ui/react"
import { activePlanetState, activeStepState } from "@state/atoms/ui"
import { motion } from "framer-motion"
import { ArrowsClockwise, Parachute } from "phosphor-react"
import { useRecoilState } from "recoil"

const Step0 = () => {
	const [[activeStep], setActiveStep] = useRecoilState(activeStepState)
	const [, setActivePlanet] = useRecoilState(activePlanetState)

	const paginate = (newDirection: number) => {
		setActiveStep([activeStep + newDirection, newDirection])

		switch (activeStep + newDirection) {
			case 1:
				setActivePlanet("juno")
				break
			case 2:
				setActivePlanet("ethereum")
				break
			case 3:
				setActivePlanet("warpTop")
				break
			default:
				setActivePlanet("")
				break
		}
	}

	return (
		<ButtonGroup
			colorScheme="brand"
			h="20rem"
			p={6}
			spacing={6}
			variant="outline"
			w="20rem"
		>
			<Button
				as={motion.button}
				h="full"
				key="ConvertButton"
				onClick={() => {
					setActivePlanet("juno")
					paginate(1)
				}}
				rounded="xl"
			>
				<Stack align="center" direction="column" p={4}>
					<ArrowsClockwise size={42} weight="duotone" />
					<Text>Convert</Text>
				</Stack>
			</Button>
			<Button
				as={motion.button}
				disabled
				h="full"
				key="AirdropButton"
				rounded="xl"
			>
				<Stack align="center" direction="column" p={4}>
					<Parachute size={42} weight="duotone" />
					<Text>Airdrop</Text>
				</Stack>
			</Button>
		</ButtonGroup>
	)
}

export default Step0
