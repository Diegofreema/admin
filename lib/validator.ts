import * as z from 'zod';

export const errorMessage = {
  INVALID_TITLE: 'Title is missing',
  INVALID_TAGS: 'Tags must be an array of string ',
  INVALID_SLUG: 'Slug is missing',
  INVALID_META: 'Meta description is missing',
  INVALID_CONTENT: 'Post content is missing',
};

export const postSchema = z.object({
  title: z.string().min(1, errorMessage.INVALID_TITLE),
  content: z.string().min(1, errorMessage.INVALID_CONTENT),
  author: z.string().min(1, errorMessage.INVALID_CONTENT),
  slug: z.string().min(1, errorMessage.INVALID_SLUG),
  tags: z.array(z.string()).min(1, errorMessage.INVALID_TAGS).optional(),
  meta: z.string().min(1, errorMessage.INVALID_META),
});

export const validateSchema = (schema: z.ZodType<any>, value: any) => {
  const result = schema.parse(value);
  console.log(result);

  if (result) return result;
};
