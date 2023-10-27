import mongoose, { Model, ObjectId } from 'mongoose';

interface PostInterface {
  title: string;
  content: string;
  author: string;
  meta: string;
  tags: string[];
  slug: string;
  createdAt: Date;
}

const BlogPostSchema = new mongoose.Schema<PostInterface>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: {
      type: String,
    },
    slug: { type: String, required: true, unique: true },
    tags: { type: [String] },
    meta: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const BlogPost =
  mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost as Model<PostInterface>;
