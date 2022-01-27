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
			canvas: {
				opacity: 0.4
			},
			"html, body": {
				color: props.colorMode === "dark" ? "white" : "gray.600",
				fontSize: "lg",
				lineHeight: "tall",
				overflow: "hidden"
			}
		})
	}
})

export default theme
