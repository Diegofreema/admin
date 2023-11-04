import mongoose, { Model, ObjectId } from 'mongoose';

interface PostInterface {
  title: string;
  content: string;
  author: string;
  meta: string;
  tags: string[];
  slug: string;
  createdAt: Date;
  thumbnail: string;
  likes: ObjectId[];
}

const ArticleSchema = new mongoose.Schema<PostInterface>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: String,
    },
    slug: { type: String, required: true, unique: true },
    tags: { type: [String] },
    meta: { type: String, required: true },
    thumbnail: { type: String },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model('Article', ArticleSchema);

export default Article as Model<PostInterface>;
