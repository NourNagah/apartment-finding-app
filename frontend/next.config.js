/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: { ignoreDuringBuilds: true },
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '**' },
			{ protocol: 'http', hostname: '**' }
		]
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: { and: [/\.(ts|tsx|js|jsx|mdx)$/] },
			use: [{ loader: '@svgr/webpack', options: { icon: true } }]
		})
		return config
	},
	async redirects() {
		return [
			{ source: '/', destination: '/home', permanent: false }
		]
	}
}

module.exports = nextConfig