import { getAppConfig } from "."
import type { AppConfig, NetworkConfigs } from "."

export const testnet: AppConfig = {
	addressPrefix: "juno",
	chainId: "uni-2",
	chainName: "uni-2 (testnet)",
	contract: "",
	gasPrice: 0.025,
	httpUrl: "https://lcd.juno.giansalex.dev:443",
	rpcUrl: "https://rpc.juno.giansalex.dev:443",
	token: {
		coinDecimals: 6,
		coinDenom: "Juno",
		coinMinimalDenom: "ujunox"
	}
}

export type Token = {
	readonly decimals: number
	readonly denom: string
	readonly logo?: string
	readonly name: string
}

export const coins: Token[] = [
	{
		decimals: 6,
		denom: "ujunox",
		name: "Juno"
	}
]

const configs: NetworkConfigs = { testnet }
export const config = getAppConfig(configs)
