module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
	},
	'extends': 'google',
	'overrides': [],
	'parserOptions': {
		'ecmaVersion': 'latest',
	},
	'rules': {
		'prefer-rest-params': 0,
		'valid-jsdoc': 0,
		'no-invalid-this': 0,
		'camelcase': 0,
		'max-len': [
			'error',
			{
				'code': 200,
				'ignoreComments': true,
				'ignoreStrings': true,
				'ignoreTemplateLiterals': true,
			},
		],
		'indent': [
			2,
			'tab',
		],
		'no-tabs': [
			'error',
			{
				'allowIndentationTabs': true,
			},
		],
		'require-jsdoc': [
			'error',
			{
				'require': {
					'FunctionDeclaration': false,
					'MethodDefinition': false,
					'ClassDeclaration': false,
					'ArrowFunctionExpression': false,
					'FunctionExpression': false,
				},
			},
		],
		'arrow-parens': [
			'error',
			'as-needed',
		],
		'linebreak-style': 0,
	},

};
