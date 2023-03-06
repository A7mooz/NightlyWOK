import type { AnyCommand } from '../types/command';
import type WOK from '../WOK';

class Command {
	private _instance: WOK;
	private _commandName: string;
	private _commandObject: AnyCommand;

	constructor(instance: WOK, commandName: string, commandObject: AnyCommand) {
		this._instance = instance;
		this._commandName = commandName.toLowerCase();
		this._commandObject = commandObject;
	}

	public get instance() {
		return this._instance;
	}

	public get commandName() {
		return this._commandName;
	}

	public get commandObject() {
		return this._commandObject;
	}
}

export default Command;
