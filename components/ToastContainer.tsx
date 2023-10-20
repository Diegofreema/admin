'use client';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react';

export default function ToastContainer({}) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return <Toaster />;
}
