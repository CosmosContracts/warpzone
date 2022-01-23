// eslint-disable-next-line canonical/filename-match-exported
import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Head, Html, Main, NextScript } from "next/document"
import theme from "../theme"

export default class Document extends NextDocument {
	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	render() {
		return (
			<Html lang="en">
				<Head />
				<body>
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}
