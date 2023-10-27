'use client';
import React from 'react';
import Editor from './_component/Editor';
import { readAllImages } from '@/lib/actions/writeUps';

type Props = {};

const page = (props: Props) => {
  return (
    <div className="max-w-4xl mx-auto !py-[50px] min-h-screen">
      <Editor />
    </div>
  );
};

export default page;
