'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios from 'axios';

export default function Video() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const MAX_FILE = 70 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;
    if (file.size > MAX_FILE) {
      console.log('File size exceeds the maximum limit of 70MB');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('originalSize', file.size.toString());

    try {
      const response = await axios.post('/api/video-upload', formData);

      if (response.status === 200) {
        console.log('File uploaded successfully');
      } else {
        console.log('File upload failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div></div>
  );
}
