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
}

const BlogContentSchema = new mongoose.Schema<PostInterface>(
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
  },
  {
    timestamps: true,
  }
);

const BlogContent =
  mongoose.models.BlogContent ||
  mongoose.model('BlogContent', BlogContentSchema);

export default BlogContent as Model<PostInterface>;
