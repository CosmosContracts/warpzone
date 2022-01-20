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
				"--react-glitch-text-glitch-color-1":
					"var(--chakra-colors-brand-300)",
				"--react-glitch-text-glitch-color-2":
					"var(--chakra-colors-teal-200)",
				"--react-glitch-text-color": "var(--chakra-colors-brand-50)",
				fontSize: "lg",
				color: props.colorMode === "dark" ? "white" : "gray.600",
				backgroundImage:
					"linear-gradient(216deg, rgba(77, 77, 77,0.05) 0%, rgba(77, 77, 77,0.05) 25%,rgba(42, 42, 42,0.05) 25%, rgba(42, 42, 42,0.05) 38%,rgba(223, 223, 223,0.05) 38%, rgba(223, 223, 223,0.05) 75%,rgba(36, 36, 36,0.05) 75%, rgba(36, 36, 36,0.05) 100%),linear-gradient(44deg, rgba(128, 128, 128,0.05) 0%, rgba(128, 128, 128,0.05) 34%,rgba(212, 212, 212,0.05) 34%, rgba(212, 212, 212,0.05) 57%,rgba(25, 25, 25,0.05) 57%, rgba(25, 25, 25,0.05) 89%,rgba(135, 135, 135,0.05) 89%, rgba(135, 135, 135,0.05) 100%),linear-gradient(241deg, rgba(55, 55, 55,0.05) 0%, rgba(55, 55, 55,0.05) 14%,rgba(209, 209, 209,0.05) 14%, rgba(209, 209, 209,0.05) 60%,rgba(245, 245, 245,0.05) 60%, rgba(245, 245, 245,0.05) 69%,rgba(164, 164, 164,0.05) 69%, rgba(164, 164, 164,0.05) 100%),linear-gradient(249deg, rgba(248, 248, 248,0.05) 0%, rgba(248, 248, 248,0.05) 32%,rgba(148, 148, 148,0.05) 32%, rgba(148, 148, 148,0.05) 35%,rgba(202, 202, 202,0.05) 35%, rgba(202, 202, 202,0.05) 51%,rgba(181, 181, 181,0.05) 51%, rgba(181, 181, 181,0.05) 100%), radial-gradient(circle at bottom, rgba(149, 249, 195, 0.35) 0%,rgba(82, 182, 154, 0.35) 20%,rgba(149, 249, 195, 0.25) 40%, #090A0F 75%)",
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
