'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

import { IUser } from '@/app/interfaces/IUser';
import { updateUserTemplate } from '@/app/lib/data';
import template1 from '/public/template1.png';
import template2 from '/public/template2.png';
import template3 from '/public/template3.png';

export default function TemplateForm({ data }: { data: IUser }) {
  const { toast } = useToast();

  interface Template {
    id: string;
    title: string;
    imageUrl: any;
  }

  const templates: Template[] = [
    {
      id: '1',
      title: 'Grid Layout',
      imageUrl: template1,
    },
    {
      id: '2',
      title: 'Side Nav Layout',
      imageUrl: template2,
    },
    {
      id: '3',
      title: 'Carousel Layout',
      imageUrl: template3,
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<string>(
    String(data.template),
  );

  const updateUserTemplateHandler = async () => {
    await updateUserTemplate(selectedTemplate).then((res) => {
      if (!res || res.status === 500) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Error updating template',
        });
      } else if (res.status === 200) {
        toast({
          title: 'Success',
          description: 'Template updated successfully',
        });
      }
    });
  };

  return (
    <form onSubmit={updateUserTemplateHandler}>
      <Card>
        <CardHeader>
          <CardTitle>Template</CardTitle>
          <CardDescription>Change your site's template here.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <RadioGroup name="template" value={selectedTemplate as string}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <Card
                  onClick={() => setSelectedTemplate(template.id)}
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary'
                      : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex w-full justify-center">
                      <Image
                        className="cursor-pointer rounded-md border-2 border-gray-200"
                        src={template.imageUrl}
                        height="200"
                        width="250"
                        alt="Template 1"
                      />
                    </div>
                    <div className="my-4 flex items-center justify-between">
                      <Label
                        htmlFor={`template-${template.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {template.title}
                      </Label>
                      <input
                        type="radio"
                        value={template.id}
                        id={template.id}
                        className="sr-only"
                      />
                      <div
                        className={`h-4 w-4 rounded-full border ${
                          selectedTemplate === template.id
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {selectedTemplate === template.id && (
                          <div className="mx-auto mt-1 h-2 w-2 rounded-full bg-primary-foreground" />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={String(data.template) === selectedTemplate}
          >
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
