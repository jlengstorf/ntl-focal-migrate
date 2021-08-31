const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	account: {
		type: 'string',
		desc: 'Filter sites to a certain account'
	},
	list: {
		type: 'boolean',
		default: false,
		desc: 'List sites that need to upgrade'
	},
	limit: {
		type: 'number',
		default: Infinity,
		desc: 'Limit the number of sites to list or update.'
	},
	update: {
		type: 'boolean',
		default: false,
		desc: 'Update all sites to the Focal build image'
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `ntl-focal-migrate`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
