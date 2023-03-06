import { model, Schema } from 'mongoose';

const guildPrefixSchema = new Schema({
	// guild ID
	_id: {
		type: String,
		required: true,
	},
	prefix: {
		type: String,
		required: true,
	},
});

const name = 'guild-prefixes';
export default model(name, guildPrefixSchema);
