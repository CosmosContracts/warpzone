import { getAppConfig } from "."
import type { AppConfig, NetworkConfigs } from "."

export const testnet: AppConfig = {
	addressPrefix: "juno",
	chainId: "uni-1",
	chainName: "UNI TESTNET",
	contract: "",
	gasPrice: 0.025,
	httpUrl: "https://lcd.uni.juno.deuslabs.fi",
	rpcUrl: "https://rpc.uni.juno.deuslabs.fi",
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
