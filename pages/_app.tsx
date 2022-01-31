/* eslint-disable no-negated-condition */
// eslint-disable-next-line canonical/filename-match-exported
import { ChakraProvider, Flex } from "@chakra-ui/react"
import LoadingScreen from "@components/sections/LoadingScreen"
import type { EmotionCache } from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { queryClient } from "@services/client"
import type { Config } from "@usedapp/core"
import { Mainnet, DAppProvider as EVMProvider } from "@usedapp/core"
import { DefaultSeo } from "next-seo"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useEffect, useState } from "react"
import { QueryClientProvider } from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"
import { RecoilRoot } from "recoil"
import defaultSEOConfig from "../next-seo.config"
import theme from "../theme"
import createEmotionCache from "../theme/createEmotionCache"

const Background = dynamic(() => import("@components/sections/Background"), {
	ssr: false
})

const clientSideEmotionCache = createEmotionCache()

const metamaskConfig: Config = {
	readOnlyChainId: Mainnet.chainId,
	readOnlyUrls: {
		[Mainnet.chainId]:
			"https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934"
	}
}

type WarpzoneAppProps = AppProps & {
	emotionCache?: EmotionCache
}

const App = ({
	Component,
	pageProps,
	router,
	emotionCache = clientSideEmotionCache
}: WarpzoneAppProps) => {
	const [isLoading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1_600)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<CacheProvider value={emotionCache}>
			<ChakraProvider theme={theme}>
				<RecoilRoot>
					<EVMProvider config={metamaskConfig}>
						<QueryClientProvider client={queryClient}>
							<Head>
								<meta
									content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
									name="viewport"
								/>
							</Head>
							<DefaultSeo {...defaultSEOConfig} />
							{isLoading && <LoadingScreen />}
							<Flex className="test" h="100vh" pointerEvents="none" w="100vw">
								<Component key={router.route} {...pageProps} />
								<Background />
								{/* <ReactQueryDevtools initialIsOpen={false} /> */}
							</Flex>
						</QueryClientProvider>
					</EVMProvider>
				</RecoilRoot>
			</ChakraProvider>
		</CacheProvider>
	)
}

App.defaultProps = {
	emotionCache: clientSideEmotionCache
}

export default App
