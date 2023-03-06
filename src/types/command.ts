import type {
	ApplicationCommandOption,
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	Client,
	Guild,
	GuildMember,
	Message,
	PermissionResolvable,
	TextChannel,
	User,
} from 'discord.js';
import type Command from '../command-handler/Command';
import type CommandType from '../enums/CommandType';
import type WOK from '../index';
import type { CooldownUsage } from './cooldown';

interface BaseCommandUsage {
	client: Client;
	instance: WOK;
	args: string[];
	text: string;
	guild?: Guild | null;
	member?: GuildMember;
	user: User;
	channel?: TextChannel;
	cancelCooldown?: Function;
	updateCooldown?: (expires: Date) => unknown;
}

interface LegacyCommandUsage extends BaseCommandUsage {
	message: Message;
}

interface SlashCommandUsage extends BaseCommandUsage {
	interaction: ChatInputCommandInteraction;
}

interface BothCommandUsage extends BaseCommandUsage {
	message?: Message | null;
	interaction?: ChatInputCommandInteraction | null;
}

interface BaseCommandObject {
	type: CommandType;
	init?: (client: Client, instance: WOK) => unknown;
	description?: string;
	aliases?: string[];
	testOnly?: boolean;
	guildOnly?: boolean;
	ownerOnly?: boolean;
	permissions?: PermissionResolvable;
	deferReply?: 'ephemeral' | boolean;
	cooldowns?: CooldownUsage;
	minArgs?: number;
	maxArgs?: number;
	correctSyntax?: string;
	expectedArgs?: string;
	options?: ApplicationCommandOption[];
	autocomplete?: (
		command: Command,
		argument: string,
		interaction: AutocompleteInteraction
	) => unknown;
	reply?: boolean;
	delete?: boolean;
}

interface LegacyCommandObject extends BaseCommandObject {
	type: CommandType.LEGACY;
	callback: (commandUsage: LegacyCommandUsage) => unknown;
}

interface SlashCommandObject extends BaseCommandObject {
	type: CommandType.SLASH;
	callback: (commandUsage: SlashCommandUsage) => unknown;
}

interface BothCommandObject extends BaseCommandObject {
	type: CommandType.BOTH;
	callback: (commandUsage: BothCommandUsage) => unknown;
}

interface AnyCommand extends BaseCommandObject {
	type: CommandType;
	callback: (commandUsage: BothCommandUsage) => unknown;
}

type CommandObject =
	| BothCommandObject
	| LegacyCommandObject
	| SlashCommandObject;

export { AnyCommand, CommandObject, BothCommandUsage as CommandUsage };
