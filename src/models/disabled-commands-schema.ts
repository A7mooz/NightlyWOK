import { model, Schema } from 'mongoose';

const disabledCommandSchema = new Schema({
	// guildId-commandName
	_id: {
		type: String,
		required: true,
	},
});

const name = 'disabled-commands';
export default model(name, disabledCommandSchema);
