'use client';

export default function myImageLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  return `https://example.com/cdn-cgi/image/${params.join(',')}/${src}`;
}
