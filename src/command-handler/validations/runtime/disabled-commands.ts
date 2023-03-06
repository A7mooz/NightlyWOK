import type Command from '../../Command';
import type { CommandUsage } from '../../../types/command';

export default async (command: Command, usage: CommandUsage) => {
	const { commandName, instance } = command;
	const { guild, message, interaction } = usage;

	if (!guild || !instance.isConnectedToDB) {
		return true;
	}

	if (
		instance.commandHandler?.disabledCommands.isDisabled(
			guild.id,
			commandName
		)
	) {
		const text = 'This command is disabled';

		if (message) message.channel.send(text);
		else if (interaction) interaction.reply(text);

		return false;
	}

	return true;
};
