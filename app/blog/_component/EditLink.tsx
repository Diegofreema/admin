'use client';
import { FC, useCallback, useState } from 'react';

import { IconEdit, IconExternalLink, IconLinkOff } from '@tabler/icons-react';
import { BubbleMenu, Editor } from '@tiptap/react';
import LinkForm, { linkOptions } from './LinkForm';
import { set } from 'mongoose';

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const [showEditor, setShowEditor] = useState(false);
  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes('link');
    if (href) window.open(href, '_blank');
  }, [editor]);

  const handleLinkEditClick = () => {
    setShowEditor(true);
  };

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };

  const handleSubmit = ({ openInNewTab, url }: linkOptions) => {
    editor
      .chain()
      .focus()
      .unsetLink()
      .setLink({ href: url, target: openInNewTab ? '_blank' : '' })
      .run();
    setShowEditor(false);
  };
  const getInitialState = useCallback(() => {
    const { href, target } = editor.getAttributes('link');
    return {
      url: href,
      openInNewTab: target ? true : false,
    };
  }, [editor]);

  return (
    <BubbleMenu
      shouldShow={({ editor }) => {
        return editor.isActive('link');
      }}
      editor={editor}
      tippyOptions={{
        onHide: () => {
          setShowEditor(false);
        },
      }}
    >
      <LinkForm
        visible={showEditor}
        onSubmit={handleSubmit}
        initialState={getInitialState()}
      />
      {!showEditor && (
        <div className="rounded bg-purple-900  text-white  shadow-secondary-dark shadow-md p-3 flex items-center space-x-6 z-50">
          <button onClick={handleOnLinkOpenClick}>
            <IconExternalLink />
          </button>

          <button onClick={handleLinkEditClick}>
            <IconEdit />
          </button>

          <button onClick={handleUnlinkClick}>
            <IconLinkOff />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
};

export default EditLink;
