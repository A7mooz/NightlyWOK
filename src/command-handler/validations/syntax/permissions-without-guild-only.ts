import { PermissionsBitField } from 'discord.js';
import type Command from '../../Command';

export default (command: Command) => {
	const { commandObject, commandName } = command;
	const { guildOnly } = commandObject;
	const permissions = new PermissionsBitField(commandObject.permissions);

	if (guildOnly !== true && permissions.toArray().length) {
		throw new Error(
			`Command "${commandName}" is not a guildOnly command, but permissions are specified.`
		);
	}
};
