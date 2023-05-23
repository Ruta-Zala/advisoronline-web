import { argv } from 'node:process';
import { basename, dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';

const files = argv.slice(2);

files.forEach((file) => {
	const path = resolve(file);
	const name = basename(path);
	const dir = dirname(path);
	const sorted = `${dir}/sorted-${name}`;

	execSync(`./node_modules/node-jq/bin/jq --sort-keys . ${path} > ${sorted}`);
	execSync(`mv ${sorted} ${path}`);
});
