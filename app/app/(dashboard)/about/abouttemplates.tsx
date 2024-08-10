import React from 'react'

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';


export default function AboutTemplates() {
  return (
    <div className="space-y-2">
      <Label>Template Selection</Label>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <div className="overflow-hidden rounded-md border">
          <Image
            src="https://generated.vusercontent.net/placeholder.svg"
            width={200}
            height={150}
            alt="Template 1"
            className="h-auto w-full"
          />
          <div className="bg-muted p-4">
            <h3 className="text-lg font-bold">Template 1</h3>
            <p className="text-sm text-muted-foreground">
              A simple two-column layout
            </p>
            <Button variant="outline" className="mt-4 w-full">
              Select
            </Button>
          </div>
        </div>
        </div>
    </div>
  )
}
