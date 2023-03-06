import type Command from '../../Command';
import type { CommandUsage } from '../../../types/command';

export default (command: Command, usage: CommandUsage) => {
	const { instance, commandObject } = command;
	const { guild } = usage;

	if (commandObject.testOnly !== true) {
		return true;
	}

	return instance.testServers.includes(guild?.id || '');
};
