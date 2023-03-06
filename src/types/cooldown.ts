import type CooldownTypes from '../enums/CooldownTypes';

export interface InternalCooldownConfig {
	cooldownType: CooldownTypes;
	userId: string;
	actionId: string;
	guildId?: string;
	duration?: string;
	errorMessage?: string;
}

export interface CooldownUsage {
	errorMessage?: string;
	type: CooldownTypes;
	duration: string;
}

export interface CooldownConfig {
	errorMessage: string;
	botOwnersBypass: boolean;
	dbRequired: number;
}
