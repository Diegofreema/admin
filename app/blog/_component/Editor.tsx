'use client';
import { useEditor, EditorContent, getMarkRange, Range } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import ToolBar from './ToolBar';
import { ChangeEventHandler, useEffect, useState } from 'react';
import EditLink from './EditLink';
import GalleryModal, { ImageResult } from './GalleryModal';
import { Input } from '@/components/ui/input';
import SeoForm, { SeoResult } from './SeoForm';
import ActionButton from './ActionButton';
import { createPost, editPost } from '@/lib/actions/post';
import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from '@/utils/uploadthing';
import Img from 'next/image';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
export interface Props extends SeoResult {
  title: string;
  content: string;
  id?: string;
}

interface Post {
  initialValue?: Props;
  btnTitle?: string;
  busy?: boolean;
}

const Editor = ({ btnTitle = 'Submit', busy = false, initialValue }: Post) => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const router = useRouter();
  const [showGallery, setShowGallery] = useState(false);
  const [seoInitial, setSeoInitial] = useState<SeoResult>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [post, setPost] = useState<Props>({
    title: '',
    content: '',
    slug: '',
    tags: '',
    meta: '',
  });

  const [thumbnail, setThumbnail] = useState<string | undefined>('');

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setPost({
      ...post,
      title: target.value,
    });
  };
  const updateSeoValue = (result: SeoResult) => {
    setPost({
      ...post,
      ...result,
    });
  };
  const handleSubmit = async () => {
    if (!editor) return;
    if (post.title === '') {
      toast({
        variant: 'destructive',
        title: 'Title is required',
        description: 'Please fill required fields',
      });
      return;
    }

    if (post.slug === '') {
      toast({
        variant: 'destructive',
        title: 'Slug is required',
        description: 'Please fill required fields',
      });
      return;
    }

    if (post.meta === '') {
      toast({
        variant: 'destructive',
        title: 'Meta description is required',
        description: 'Please fill required fields',
      });
      return;
    }
    setLoading(true);
    console.log(post?.tags);

    try {
      if (initialValue) {
        await editPost({
          ...post,
          content: editor.getHTML(),
          author: 'admin',

          thumbnail,
          id: initialValue?.id,
        });
        router.push('/post');
      } else {
        const formattedTags = post?.tags
          .split(',')
          .map((tag: any) => tag.trim());

        await createPost({
          ...post,
          content: editor.getHTML(),
          author: 'admin',
          tags: formattedTags,
          thumbnail,
        });
        router.push('/post');
      }

      toast({
        variant: 'success',
        title: 'Success',
        description: initialValue ? 'Post Updated' : 'Post Created',
      });
      setPost({
        title: '',
        content: '',
        slug: '',
        tags: '',
        meta: '',
      });
      setThumbnail('');
      router.refresh();
    } catch (error: any) {
      // const errorMessages = error?.message?.map((e: any) => e)
      console.log(error);

      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: error?.message,
      });
    } finally {
      setLoading(false);
    }
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'mx-auto ',
        },
      }),
      Youtube.configure({
        width: 840,
        height: 472.5,
        HTMLAttributes: {
          class: 'mx-auto rounded',
        },
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: '',
        },
      }),
      Placeholder.configure({
        placeholder: 'Type something...',
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class:
          'prose prose-lg focus:outline-none dark:prose-invert maz-w-full mx-auto h-full',
      },
    },
  });
  useEffect(() => {
    if (editor && selectionRange) {
      editor.chain().setTextSelection(selectionRange);
    }
  }, [selectionRange, editor]);
  const handleImageSelection = (result: ImageResult) => {
    editor?.chain().focus().setImage({ src: result.src }).run();
  };
  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      editor?.commands.setContent(initialValue.content);
      const { slug, tags, meta } = initialValue;
      setSeoInitial({ slug, tags, meta });
    }
  }, [initialValue, editor]);
  const showThumbnail = () => {
    if (thumbnail) {
      return (
        <div className="w-[100px] min-h-[100px] relative flex items-center justify-center">
          <X
            className="absolute top-0 right-1 z-10 text-red-500  cursor-pointer"
            onClick={() => setThumbnail('')}
            size={20}
          />
          <Img fill src={thumbnail} alt="Upload" className="object-cover" />
        </div>
      );
    }

    return (
      <UploadButton
        endpoint="thumbnail"
        onClientUploadComplete={(res) => setThumbnail(res?.[0]?.url)}
        onUploadError={(err) => console.log(err)}
      />
    );
  };
  const buttonTitle = initialValue ? 'Edit' : 'Submit';
  return (
    <div className="pb-24">
      <div className="p-3 ">
        <div className="sticky top-0 z-10 bg-white rounded-md p-2">
          <div className="flex justify-between items-center !my-5">
            <div className="space-x-3 flex flex-col items-center">
              <p>Thumbnail</p>
              {showThumbnail()}
            </div>
            <Button variant="purple" disabled={loading} onClick={handleSubmit}>
              {buttonTitle}
            </Button>
          </div>
          <Input
            placeholder="Title"
            type="text"
            value={post.title}
            className="bg-transparent focus-visible:!ring-0 w-full border-0 border-b-[1px] !rounded-none border-gray-500 text-black text-3xl font-bold italic  mb-3 py-2 outline-none focus:!outline-none focus:!ring-0 "
            onChange={handleTitleChange}
          />
          <ToolBar editor={editor} onOpenImage={() => setShowGallery(true)} />
          <div className="h-[1px] w-full my-3  bg-gray-500 " />
        </div>
        {editor && <EditLink editor={editor} />}
        <EditorContent editor={editor} className="min-h-[300px]" />
        <div className="h-[1px] w-full my-3  bg-gray-500 " />
        <SeoForm
          onChange={updateSeoValue}
          title={post.title}
          initialValue={seoInitial}
        />
      </div>

      <GalleryModal
        visible={showGallery}
        onClose={() => setShowGallery(false)}
        onImageSelect={(image) => {}}
        onSelection={handleImageSelection}
      />
    </div>
  );
};

export default Editor;
