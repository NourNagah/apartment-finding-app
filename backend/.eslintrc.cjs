module.exports = {
	env: { node: true, es2021: true },
	extends: ['eslint:recommended'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	rules: {
		'@typescript-eslint/no-unused-vars': 'off'
	}
}