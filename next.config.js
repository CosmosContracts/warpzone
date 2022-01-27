module.exports = {
	i18n: {
		locales: ["en-US", "de-DE"],
		defaultLocale: "en-US"
	},
	swcMinify: true,
	images: {
		formats: ["image/avif", "image/webp"],
		domains: ["gateway.pinata.cloud"]
	},
	experimental: {
    concurrentFeatures: true,
  },
}
