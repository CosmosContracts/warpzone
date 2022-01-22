import { ChakraProvider, Flex } from "@chakra-ui/react"
import { AppProps } from "next/app"
import Head from "next/head"
import { config, SdkProvider as KeplrProvider } from "../services"
import theme from "../theme"
import { Mainnet, DAppProvider as EVMProvider, Config } from "@usedapp/core"
import { QueryClientProvider } from "react-query"
import { queryClient } from "@services/client"
import { RecoilRoot } from "recoil"

import { ReactQueryDevtools } from "react-query/devtools"
import { Background } from "@components/sections"

const metamaskConfig: Config = {
	readOnlyChainId: Mainnet.chainId,
	readOnlyUrls: {
		[Mainnet.chainId]:
			"https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934"
	}
}

const App = ({ Component, pageProps, router }: AppProps) => {
	return (
		<>
			<Head>
				<title>Warpzone Interface</title>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="" />
				<meta name="theme-color" content="#ffffff" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content="" />
				<meta property="og:title" content="" />
				<meta property="og:image" content="" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="" />
				<meta property="og:site_name" content="" />
				<meta property="og:description" content="" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content="" />
				<meta name="twitter:description" content="" />
				<meta name="twitter:image" content="" />
				<meta name="twitter:site" content="" />
				<meta name="twitter:creator" content="@vexxvakan" />
			</Head>
			<ChakraProvider theme={theme}>
				<RecoilRoot>
					<KeplrProvider config={config}>
						<EVMProvider config={metamaskConfig}>
							<QueryClientProvider client={queryClient}>
								<Flex h="100vh" flex={1} direction="column">
									<Component key={router.route} {...pageProps} />
									<ReactQueryDevtools initialIsOpen={false} />
								</Flex>
								<Background />
							</QueryClientProvider>
						</EVMProvider>
					</KeplrProvider>
				</RecoilRoot>
			</ChakraProvider>
		</>
	)
}

export default App
