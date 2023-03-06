import type { Client } from 'discord.js';
import mongoose from 'mongoose';
import { Cooldowns } from './classes';
import CommandHandler from './command-handler/CommandHandler';
import type { DefaultCommands } from './enums';
import type { CooldownConfig, Events } from './types';
import FeaturesHandler from './util/FeaturesHandler';

export default class WOKCommands {
	private _client: Client<true>;
	private _testServers: string[];
	private _botOwners: string[];
	private _cooldowns?: Cooldowns;
	private _disabledDefaultCommands!: DefaultCommands[];
	private _validations: Validations;
	private _commandHandler: CommandHandler;
	private _isConnectedToDB = false;

	constructor(options: Options) {
		this._client = options.client;
		this._testServers = options.testServers ?? [];
		this._botOwners = options.botOwners ?? [];
		this._disabledDefaultCommands = options.disabledDefaultCommands ?? [];
		this._validations = options.validations ?? {};
		this._commandHandler = this._commandHandler = new CommandHandler(
			this,
			options.commandsDir ?? '',
			this._client
		);

		this.init(options);
	}

	private async init(options: Options) {
		const {
			client,
			mongoUri,
			featuresDir,
			botOwners = [],
			cooldownConfig,
			events = {},
		} = options;

		if (!client) {
			throw new Error('A client is required.');
		}

		if (mongoUri) {
			await this.connectToMongo(mongoUri);
		}

		if (botOwners.length === 0) {
			await client.application?.fetch();
			const ownerId = client.application?.owner?.id;
			if (ownerId && botOwners.indexOf(ownerId) === -1) {
				botOwners.push(ownerId);
			}
		}

		this._cooldowns = new Cooldowns(this, {
			errorMessage: 'Please wait {TIME} before doing that again.',
			botOwnersBypass: false,
			dbRequired: 300, // 5 minutes
			...cooldownConfig,
		});

		if (featuresDir) {
			new FeaturesHandler(this, featuresDir, client);
		}
	}

	get client() {
		return this._client;
	}

	get testServers() {
		return this._testServers;
	}

	get botOwners() {
		return this._botOwners;
	}

	get cooldowns() {
		return this._cooldowns;
	}

	get disabledDefaultCommands() {
		return this._disabledDefaultCommands;
	}

	public get commandHandler() {
		return this._commandHandler;
	}

	get validations() {
		return this._validations;
	}

	get isConnectedToDB(): boolean {
		return this._isConnectedToDB;
	}

	private async connectToMongo(mongoUri: string) {
		await mongoose.connect(mongoUri, {
			keepAlive: true,
		});

		this._isConnectedToDB = true;
	}
}

export interface Options {
	client: Client;
	mongoUri?: string;
	commandsDir?: string;
	featuresDir?: string;
	testServers?: string[];
	botOwners?: string[];
	cooldownConfig?: CooldownConfig;
	disabledDefaultCommands?: DefaultCommands[];
	events?: Events;
	validations?: Validations;
}

export interface Validations {
	runtime?: string;
	syntax?: string;
}
