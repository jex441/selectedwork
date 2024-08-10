import React from 'react';
import { Input } from '@/components/ui/input';

import { LinkIcon } from '../../../../../assets/svgs';

export default function LinkInput({
  linkText,
  linkSrc,
  textName,
  urlName,
  error,
}: {
  linkText: string;
  linkSrc: string;
  textName: string;
  urlName: string;
  error: string[] | string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <LinkIcon className="h-8 w-8 text-muted-foreground" />
        <Input
          placeholder="Enter Link Text"
          defaultValue={linkText ?? ''}
          name={textName}
        />
        <Input
          placeholder="https://example.com"
          defaultValue={linkSrc ?? ''}
          name={urlName}
          className={error && 'border-red-500'}
        />
      </div>
    </div>
  );
}
