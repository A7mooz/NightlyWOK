import { PermissionFlagsBits, PermissionsString } from 'discord.js';
import { model, Schema } from 'mongoose';

type Type = {
	_id: string;
	permissions: PermissionsString[];
	roles: string[];
};

const requiredPermissionsSchema = new Schema<Type>({
	// guildId-commandName
	_id: {
		type: String,
		required: true,
	},
	permissions: {
		type: [{ type: String, enum: Object.keys(PermissionFlagsBits) }],
		required: true,
	},
	roles: {
		type: [String],
		required: true,
	},
});

const name = 'required-permissions';
export default model<Type>(name, requiredPermissionsSchema);
