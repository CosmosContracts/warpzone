const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true"
})

module.exports = withBundleAnalyzer({
	i18n: {
		locales: ["en-US", "de-DE"],
		defaultLocale: "en-US"
	},
	swcMinify: true,
	images: {
		formats: ["image/avif", "image/webp"],
		domains: ["gateway.pinata.cloud"]
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.module.rules.push({
			test: /\.(frag|vert|glsl)$/,
			use: [
				{
					loader: "ts-shader-loader",
					options: {}
				}
			]
		})
		return config
	}
})
