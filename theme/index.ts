import { extendTheme } from "@chakra-ui/react"
import breakpoints from "./breakpoints"
import colors from "./colors"
import components from "./components"
import shadows from "./shadows"
import config from "./config"
import fonts from "./fonts"

const theme = extendTheme({
	breakpoints,
	config,
	colors,
	fonts,
	shadows,
	components,
	styles: {
		global: (props) => ({
			"html, body": {
				"--react-glitch-text-background-color": "transparent",
				"--react-glitch-font-family": "Megrim",
				"--react-glitch-text-glitch-color-1": "var(--chakra-colors-brand-300)",
				"--react-glitch-text-glitch-color-2": "var(--chakra-colors-teal-200)",
				"--react-glitch-text-color": "var(--chakra-colors-brand-50)",
				fontSize: "lg",
				color: props.colorMode === "dark" ? "white" : "gray.600",
				lineHeight: "tall",
				overflow: "hidden"
			},
			a: {
				color: props.colorMode === "dark" ? "teal.300" : "teal.500"
			}
		})
	}
})

export default theme
