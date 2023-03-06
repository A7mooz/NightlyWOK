import { PermissionsBitField } from 'discord.js';

import requiredPermissions from '../../../models/required-permissions-schema';
import type { CommandUsage } from '../../../types/command';
import type Command from '../../Command';

export default async (command: Command, usage: CommandUsage) => {
	const permissions = new PermissionsBitField(
		command.commandObject.permissions
	);
	const { instance, guild, member, message, interaction } = usage;

	if (!member || !instance.isConnectedToDB) {
		return true;
	}

	const document = await requiredPermissions.findById(
		`${guild!.id}-${command.commandName}`
	);
	if (document) {
		for (const permission of document.permissions) {
			if (!permissions.has(permission)) {
				permissions.add(permission);
			}
		}
	}

	const missingPermissions = permissions.missing(member.permissions);

	if (missingPermissions.length) {
		const text = `You are missing the following permissions: "${missingPermissions.join(
			'", "'
		)}"`;

		if (message) message.reply(text);
		else if (interaction) interaction.reply(text);

		return false;
	}

	return true;
};
