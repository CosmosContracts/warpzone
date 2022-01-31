/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable canonical/filename-match-exported */
/* eslint-disable react/jsx-props-no-spreading */
import createEmotionServer from "@emotion/server/create-instance"
import type { DocumentContext } from "next/document"
import Document, { Html, Head, Main, NextScript } from "next/document"
import * as React from "react"
import createEmotionCache from "theme/createEmotionCache"

const APP_NAME = "nextarter-chakra"

class MyDocument extends Document {
	static async getInitialProps(context: DocumentContext) {
		const originalRenderPage = context.renderPage
		const cache = createEmotionCache()

		// eslint-disable-next-line @typescript-eslint/unbound-method
		const { extractCriticalToChunks } = createEmotionServer(cache)

		context.renderPage = () =>
			originalRenderPage({
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				enhanceApp: (App: any) => (props) =>
					<App emotionCache={cache} {...props} />
			})

		const initialProps = await Document.getInitialProps(context)

		const emotionStyles = extractCriticalToChunks(initialProps.html)
		const emotionStyleTags = emotionStyles.styles.map((style) => (
			<style
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: style.css }}
				data-emotion={`${style.key} ${style.ids.join(" ")}`}
				// eslint-disable-next-line react/no-danger
				key={style.key}
			/>
		))

		return {
			...initialProps,
			styles: [
				...React.Children.toArray(initialProps.styles),
				...emotionStyleTags
			]
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta content={APP_NAME} name="application-name" />
					<meta content="yes" name="apple-mobile-web-app-capable" />
					<meta
						content="default"
						name="apple-mobile-web-app-status-bar-style"
					/>
					<meta content={APP_NAME} name="apple-mobile-web-app-title" />
					<meta content="telephone=no" name="format-detection" />
					<meta content="yes" name="mobile-web-app-capable" />
					<meta content="#FFFFFF" name="theme-color" />
					<link href="/manifest.json" rel="manifest" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
