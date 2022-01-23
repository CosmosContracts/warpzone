import { extendTheme } from "@chakra-ui/react"
import breakpoints from "./breakpoints"
import colors from "./colors"
import components from "./components"
import config from "./config"
import shadows from "./shadows"

const theme = extendTheme({
	breakpoints,
	colors,
	components,
	config,
	shadows,
	styles: {
		global: (props) => ({
			a: {
				color: props.colorMode === "dark" ? "teal.300" : "teal.500"
			},
			"html, body": {
				"--react-glitch-font-family": "Megrim",
				"--react-glitch-text-background-color": "transparent",
				"--react-glitch-text-color": "var(--chakra-colors-brand-50)",
				"--react-glitch-text-glitch-color-1": "var(--chakra-colors-brand-300)",
				"--react-glitch-text-glitch-color-2": "var(--chakra-colors-teal-200)",
				color: props.colorMode === "dark" ? "white" : "gray.600",
				fontSize: "lg",
				lineHeight: "tall",
				overflow: "hidden"
			}
		})
	}
})

export default theme
