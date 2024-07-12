import React from 'react'
import { Input } from '@/components/ui/input';

import {
    LinkIcon,
  } from '../../assets/svgs';

export default function LinkInput({linkText, linkSrc, textName, urlName} : {linkText: string, linkSrc: string, textName: string, urlName: string}) {
  return (
    <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <LinkIcon className="h-8 w-8 text-muted-foreground" />
            <Input placeholder="Enter Link Text" defaultValue={linkText ?? ""} name={textName} />
            <Input placeholder="https://example.com" defaultValue={linkSrc ?? ""} name={urlName} />
          </div>
        </div>
  )
}
