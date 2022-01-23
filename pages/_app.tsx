// eslint-disable-next-line canonical/filename-match-exported
import { ChakraProvider, Flex } from "@chakra-ui/react"
import { Background } from "@components/sections"
import { queryClient } from "@services/client"
import type { Config } from "@usedapp/core"
import { Mainnet, DAppProvider as EVMProvider } from "@usedapp/core"
import type { AppProps } from "next/app"
import Head from "next/head"
import { QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { RecoilRoot } from "recoil"
import { config, SdkProvider as KeplrProvider } from "../services"
import theme from "../theme"

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
					<KeplrProvider config={config}>
						<EVMProvider config={metamaskConfig}>
							<QueryClientProvider client={queryClient}>
								<Flex direction="column" flex={1} h="100vh">
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
