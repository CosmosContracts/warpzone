/* eslint-disable no-negated-condition */
// eslint-disable-next-line canonical/filename-match-exported
import { ChakraProvider, Flex } from "@chakra-ui/react"
import LoadingScreen from "@components/sections/LoadingScreen"
import { queryClient } from "@services/client"
import type { Config } from "@usedapp/core"
import { Mainnet, DAppProvider as EVMProvider } from "@usedapp/core"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useEffect, useState } from "react"
import { QueryClientProvider } from "react-query"
// import { ReactQueryDevtools } from "react-query/devtools"
import { RecoilRoot } from "recoil"
import theme from "../theme"

const Background = dynamic(() => import("@components/sections/Background"), {
	ssr: false
})

const metamaskConfig: Config = {
	readOnlyChainId: Mainnet.chainId,
	readOnlyUrls: {
		[Mainnet.chainId]:
			"https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934"
	}
}

const App = ({ Component, pageProps, router }: AppProps) => {
	const [isLoading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1_600)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Head>
				<title>Warpzone Interface</title>
				<link
					href="/favicon-32x32.png"
					rel="icon"
					sizes="32x32"
					type="image/png"
				/>
				<link
					href="/favicon-16x16.png"
					rel="icon"
					sizes="16x16"
					type="image/png"
				/>
				<link
					href="/apple-touch-icon.png"
					rel="apple-touch-icon"
					sizes="180x180"
				/>
				<link href="/site.webmanifest" rel="manifest" />
				<link color="" href="/safari-pinned-tab.svg" rel="mask-icon" />
				<meta content="#ffffff" name="theme-color" />
				<meta content="initial-scale=1.0, width=device-width" name="viewport" />
				<meta content="" name="description" />
				<meta content="" property="og:title" />
				<meta content="" property="og:image" />
				<meta content="website" property="og:type" />
				<meta content="" property="og:url" />
				<meta content="" property="og:site_name" />
				<meta content="" property="og:description" />
				<meta content="summary_large_image" name="twitter:card" />
				<meta content="" name="twitter:title" />
				<meta content="" name="twitter:description" />
				<meta content="" name="twitter:image" />
				<meta content="" name="twitter:site" />
				<meta content="@vexxvakan" name="twitter:creator" />
			</Head>
			<ChakraProvider theme={theme}>
				<RecoilRoot>
					<EVMProvider config={metamaskConfig}>
						<QueryClientProvider client={queryClient}>
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
		</>
	)
}

export default App
