'use client';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import React, { FC, useEffect, useState } from 'react';
import slugify from 'slugify';
export interface SeoResult {
  meta: string;
  slug: string;
  tags: any;
}
interface Props {
  title?: string;
  onChange: (result: SeoResult) => void;
  initialValue?: SeoResult;
}
const commonClasses =
  'w-full bg-transparent outline-none focus:!outline-none border-2 border-black hover:border-black/25 transition rounded p-2 ';
const SeoForm: FC<Props> = ({
  title = '',
  onChange,
  initialValue,
}): JSX.Element => {
  const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    let { name, value } = target;
    if (name === 'meta') value = value.substring(0, 150);
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange(newValues);
  };

  const { meta, slug, tags } = values;

  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange(newValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  useEffect(() => {
    if (initialValue) {
      setValues({ ...initialValue, slug: slugify(initialValue.slug) });
    }
  }, [initialValue]);
  return (
    <div className="space-y-4">
      <h1 className="text-black text-xl font-semibold">SEO Section</h1>
      <InputComponent
        onChange={handleChange}
        name="slug"
        value={slug}
        placeholder="slug-goes-here"
      />
      <InputComponent
        onChange={handleChange}
        name="tags"
        placeholder="Tags"
        value={tags}
      />
      <div className="relative">
        <Textarea
          onChange={handleChange}
          name="meta"
          value={meta}
          className={cn(commonClasses, 'text-xl resize-none h-20')}
          placeholder="Meta description"
        ></Textarea>
        <p className="absolute bottom-3 right-3 text-black">
          {meta.length}/150
        </p>
      </div>
    </div>
  );
};

type InputProps = {
  name?: string;
  value?: string;
  placeholder?: string;

  onChange: React.ChangeEventHandler<HTMLInputElement>;
};
const InputComponent = ({
  name,
  value,
  placeholder,

  onChange,
}: InputProps) => {
  return (
    <Input
      type="text"
      placeholder={placeholder}
      className={cn('pl-10 italic', commonClasses)}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default SeoForm;
