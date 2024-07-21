import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
	{
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		likes: [{
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: false,
		}],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const Post = model ('Post', PostSchema);
export default Post;