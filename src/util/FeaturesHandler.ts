import type { Client } from 'discord.js';
import type WOK from '../index';
import getAllFiles from './get-all-files';

class FeaturesHandler {
	constructor(instance: WOK, featuresDir: string, client: Client) {
		this.readFiles(instance, featuresDir, client);
	}

	private async readFiles(
		instance: WOK,
		featuresDir: string,
		client: Client
	) {
		const files = getAllFiles(featuresDir);

		for (const file of files) {
			let func = await import(file.filePath);
			func = func.default || func;

			if (func instanceof Function) {
				await func(instance, client);
			}
		}
	}
}

export default FeaturesHandler;
