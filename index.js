#!/usr/bin/env node

/**
 * ntl-focal-migrate
 * Find all your sites that don’t use the new Focal build image and migrate them.
 *
 * @author Jason Lengstorf <https://jason.af>
 */
const execa = require('execa');
const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

async function loadSites() {
	const { stdout } = await execa.command(`netlify sites:list --json`);
	const sites = JSON.parse(stdout);

	const filtered = sites
		.filter(site => {
			const accountMatch = flags.account
				? flags.account === site.account_name
				: true;
			const needsUpgrade = site.build_image !== 'focal';

			return accountMatch && needsUpgrade;
		})
		.map(site => ({
			id: site.id,
			url: site.url,
			account_name: site.account_name
		}))
		.slice(0, flags.limit);

	return filtered;
}

async function updateSites(sites) {
	sites.forEach(async site => {
		await execa('netlify', [
			'api',
			'updateSite',
			'--data',
			`{"site_id":"${site.id}","body":{"build_image":"focal"}}`
		]);
	});
}

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	if (flags.list) {
		const sites = await loadSites();
		console.log(sites);
	}

	if (flags.update) {
		const sites = await loadSites();

		await updateSites(sites);
	}

	debug && log(flags);
})();
