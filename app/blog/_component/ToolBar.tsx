import { Editor } from '@tiptap/react';
import DropdownOptions from './DropdownOptions';
import {
  IconCaretDown,
  IconStrikethrough,
  IconBraces,
  IconCode,
  IconListNumbers,
  IconList,
  IconBold,
  IconItalic,
  IconUnderline,
  IconPhotoFilled,
  IconQuote,
  IconBrandYoutube,
  IconLink,
} from '@tabler/icons-react';
import Button from './Button';
import InsertLink from './InsertLink';
import { linkOptions } from './LinkForm';
import EmbedYoutube from './EmbedYoutube';

type Props = {
  editor: Editor | null;
  onOpenImage?(): void;
};

const ToolBar = ({ editor, onOpenImage }: Props) => {
  const options = [
    {
      label: 'Paragraph',
      onClick: () => {
        editor?.chain().focus().setParagraph().run();
      },
    },
    {
      label: 'Heading 1',
      onClick: () => {
        editor?.chain().focus().toggleHeading({ level: 1 }).run();
      },
    },
    {
      label: 'Heading 2',
      onClick: () => {
        editor?.chain().focus().toggleHeading({ level: 2 }).run();
      },
    },
    {
      label: 'Heading 3',
      onClick: () => {
        editor?.chain().focus().toggleHeading({ level: 3 }).run();
      },
    },
  ];
  const getLabel = () => {
    if (editor?.isActive('heading', { level: 1 })) return 'Heading 1';

    if (editor?.isActive('heading', { level: 2 })) return 'Heading 2';

    if (editor?.isActive('heading', { level: 3 })) return 'Heading 3';

    return 'Paragraph';
  };
  const Head = () => {
    return (
      <div className="flex item-center">
        <p>{getLabel()}</p>
        <IconCaretDown />
      </div>
    );
  };
  const handleSubmit = ({ url, openInNewTab }: linkOptions) => {
    if (openInNewTab) {
      console.log(url, openInNewTab);
      editor?.commands.setLink({
        href: url,
        target: '_blank',
      });
    } else {
      editor?.commands.setLink({
        href: url,
      });
    }
  };
  const handleEmbedYoutube = (url: string) => {
    editor?.chain().focus().setYoutubeVideo({ src: url }).run();
  };
  if (!editor) return null;
  return (
    <div className="flex items-center">
      <DropdownOptions options={options} head={<Head />} />
      <div className="h-4 w-[1px] bg-gray-700 mx-4" />
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive('bold')}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <IconBold />
        </Button>
        <Button
          active={editor.isActive('strike')}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <IconStrikethrough />
        </Button>
        <Button
          active={editor.isActive('underline')}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <IconUnderline />
        </Button>
        <Button
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <IconItalic />
        </Button>
        <Button
          active={editor.isActive('code')}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <IconCode />
        </Button>
      </div>
      <div className="h-4 w-[1px] bg-gray-400 mx-8" />
      <div className="flex items-center space-x-3">
        <Button
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <IconList />
        </Button>
        <Button
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <IconListNumbers />
        </Button>

        <Button
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <IconQuote />
        </Button>
        <Button
          active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <IconBraces />
        </Button>

        <InsertLink onSubmit={handleSubmit} />
      </div>
      <div className="h-4 w-[1px] bg-gray-400 mx-8" />
      <div className="flex items-center space-x-3">
        <Button onClick={onOpenImage}>
          <IconPhotoFilled />
        </Button>
        <EmbedYoutube onSubmit={handleEmbedYoutube} />
      </div>
    </div>
  );
};

export default ToolBar;
