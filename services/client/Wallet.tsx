/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import { createStandaloneToast } from "@chakra-ui/react"
import type {
	CosmWasmClient,
	SigningCosmWasmClient
} from "@cosmjs/cosmwasm-stargate"
import type { OfflineSigner } from "@cosmjs/proto-signing"
import type { Coin } from "@cosmjs/stargate"
import * as React from "react"
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react"
import theme from "theme"
import type { AppConfig } from "../config"
import { createClient, createSimpleClient } from "./sdk"

type CosmWasmContextType = {
	readonly address: string
	readonly balance: readonly Coin[]
	readonly changeConfig: (updates: Partial<AppConfig>) => void
	readonly changeSigner: (newSigner: OfflineSigner) => void
	readonly clear: () => void
	readonly client: CosmWasmClient | undefined
	readonly config: Partial<AppConfig>
	readonly disconnect: () => void
	readonly getSignClient: () => SigningCosmWasmClient | undefined
	readonly getSigner: () => OfflineSigner | undefined
	readonly init: (signer: OfflineSigner) => void
	readonly initialized: boolean
	readonly refreshBalance: () => Promise<void>
}

const throwNotInitialized = () => {
	throw new Error("Not yet initialized")
}

const defaultContext: CosmWasmContextType = {
	address: "",
	balance: [],
	changeConfig: throwNotInitialized,
	changeSigner: throwNotInitialized,
	clear: throwNotInitialized,
	client: undefined,
	config: {},
	disconnect: () => {},
	getSignClient: () => {
		return undefined
	},
	getSigner: () => {
		return undefined
	},
	init: throwNotInitialized,
	initialized: false,
	refreshBalance: throwNotInitialized
}

const CosmWasmContext = createContext<CosmWasmContextType>(defaultContext)

export const useSdk = (): CosmWasmContextType => {
	return useContext(CosmWasmContext)
}

type SdkProviderProps = React.HTMLAttributes<HTMLOrSVGElement> & {
	readonly config: AppConfig
}

export const SdkProvider = ({
	config: configProperty,
	children
}: SdkProviderProps): JSX.Element => {
	const [config, setConfig] = useState(configProperty)
	const [signer, setSigner] = useState<OfflineSigner>()
	const [client, setClient] = useState<CosmWasmClient>()
	const [signClient, setSignClient] = useState<SigningCosmWasmClient>()

	const customToast = createStandaloneToast({ theme })

	const contextWithInit = useMemo(() => {
		return { ...defaultContext, init: setSigner }
	}, [])
	const [value, setValue] = useState<CosmWasmContextType>(contextWithInit)

	const clear = useCallback(() => {
		setValue({ ...contextWithInit })
		setClient(undefined)
		setSigner(undefined)
	}, [contextWithInit])

	const changeConfig = (updates: Partial<AppConfig>): void => {
		setConfig((config) => {
			return { ...config, ...updates }
		})
	}

	const disconnect = useCallback(async () => {
		setValue({ ...contextWithInit })
	}, [contextWithInit])

	const refreshBalance = useCallback(
		async (address: string, balance: Coin[]): Promise<void> => {
			if (!client) return

			// eslint-disable-next-line no-param-reassign
			balance.length = 0
			const coin = await client.getBalance(
				address,
				config.token.coinMinimalDenom
			)
			if (coin) balance.push(coin)
		},
		[client, config]
	)

	useEffect(() => {
		;(async (): Promise<void> => {
			try {
				const client = await createSimpleClient(config)
				setClient(client)
				setValue({ ...contextWithInit, client })
			} catch {
				customToast({
					description:
						"Maybe our RPC is offline or the chain is not available.",
					// TODO: re-add duration to toast
					duration: 0,
					isClosable: true,
					status: "error",
					title: "Error: #SadCat",
					variant: "subtle"
				})
			}
		})()
	}, [contextWithInit, config])

	useEffect(() => {
		if (!signer) return
		;(async (): Promise<void> => {
			try {
				const client = await createClient(config, signer)
				setSignClient(client)
			} catch {
				customToast({
					description: "CoolCat couldn't connect to your wallet.",
					duration: 0,
					isClosable: true,
					status: "error",
					title: "Error: #LostCat",
					variant: "subtle"
				})
			}
		})()
	}, [signer, config])

	useEffect(() => {
		if (!signer || !client || !signClient) return

		const balance: Coin[] = []
		;(async (): Promise<void> => {
			const address = (await signer.getAccounts())[0].address

			await refreshBalance(address, balance)

			setValue({
				address,
				balance,
				changeConfig,
				changeSigner: setSigner,
				clear,
				client,
				config,
				disconnect,
				getSignClient: () => {
					return signClient
				},
				getSigner: () => {
					return signer
				},
				init: () => {},
				initialized: true,
				refreshBalance: refreshBalance.bind(null, address, balance)
			})
		})()
	}, [signClient, signer, clear, client, config, refreshBalance, disconnect])

	return (
		<CosmWasmContext.Provider value={value}>
			{children}
		</CosmWasmContext.Provider>
	)
}
