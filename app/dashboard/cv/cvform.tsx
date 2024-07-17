'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectValue,
} from '@/components/ui/select';
import { Trash2Icon, PlusIcon } from '../../assets/svgs';
import { getCVPageData, saveCVSections } from '../../lib/data';
import {ICVPage} from "../../interfaces/ICVPage";

export default  function Component({data}: {data: ICVPage}) {
  const [selectedSection, setSelectedSection] = useState('work-experience');
  const [workExperience, setWorkExperience] = useState<{unsaved: boolean, id: number | null, category: string, title: string, organization: string, location: string, startDate: string, endDate: string, bulletPoints: string[]}[]>([]);
 console.log('data', data)
  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        unsaved: true,
        id: null,
        category: '',
        title: '',
        organization: '',
        location: '',
        startDate: '',
        endDate: '',
        bulletPoints: [],
      },
    ]);
  };

  const handleDeleteWorkExperience = (index: number) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience.splice(index, 1);
    setWorkExperience(updatedWorkExperience);
  };

  const handleUpdateWorkExperience = (
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedWorkExperience = workExperience.map((exp, idx) => {
      if (idx === index) {
        return { ...exp, [field]: value };
      } else {
        return exp;
      }
    });
    setWorkExperience(updatedWorkExperience);
  };

  const handleAddBulletPoint = (index: number) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index].bulletPoints.push('');
    setWorkExperience(updatedWorkExperience);
  };

  const handleDeleteBulletPoint = (
    workExperienceIndex: number,
    bulletPointIndex: number,
  ) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[workExperienceIndex].bulletPoints.splice(
      bulletPointIndex,
      1,
    );
    setWorkExperience(updatedWorkExperience);
  };
  
  const handleUpdateBulletPoint = (
    workExperienceIndex: number,
    bulletPointIndex: number,
    value: string,
  ) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[workExperienceIndex].bulletPoints[bulletPointIndex] =
      value;
    setWorkExperience(updatedWorkExperience);
  };

  const handleSaveSection = async () => {
    const data = workExperience.filter((experience) => experience.unsaved);
    console.log('data', data)  
    await saveCVSections(data);
  };

  return (
    <div className="flex h-full flex-row ">
      <div className="grid flex-1 grid-cols-12 gap-6 bg-gray-100/40 p-6">
        <div className="col-span-12">
          {selectedSection === 'work-experience' && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>CV Categories</SelectLabel>
                      <SelectItem value="education">Education</SelectItem>
                     
                      <SelectItem value="soloExhibitions">Solo Exhibitions</SelectItem>
                      <SelectItem value="groupExhibitions">
                        Group Exhibitions
                      </SelectItem>
                      <SelectItem value="awards">
                        Awards
                      </SelectItem>
                      <SelectItem value="press">
                        Press
                      </SelectItem>
                      <SelectItem value="Teaching">
                        Teaching
                      </SelectItem>
                      
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddWorkExperience}>
                  Add Work Experience
                </Button>
                <Button onClick={handleSaveSection}>
                  Save
                </Button>
              </div>
              <div className="space-y-4">
                {workExperience.map((experience, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-background p-4 pb-0 shadow"
                  >
                    <div className="mb-2 flex items-center gap-2">
                      <Input
                        value={experience.title}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'title',
                            e.target.value,
                          )
                        }
                        className="w-1/4"
                        placeholder="Title"
                      />
                      <Input
                        value={experience.organization}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'organization',
                            e.target.value,
                          )
                        }
                        className="w-1/4"
                        placeholder="Organization"
                      />
                      <Input
                        value={experience.location}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'location',
                            e.target.value,
                          )
                        }
                        className="w-1/4"
                      />
                      <Input
                        value={experience.startDate}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'startDate',
                            e.target.value,
                          )
                        }
                        type="date"
                        className="w-1/4"
                        placeholder="Location"
                      />
                      <Input
                        value={experience.endDate}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'endDate',
                            e.target.value,
                          )
                        }
                        type="date"
                        className="w-1/4"
                      />
                    </div>
                    <div className="space-y-2">
                      {experience.bulletPoints.map(
                        (bulletPoint, bulletPointIndex) => (
                          <div
                            key={bulletPointIndex}
                            className="flex items-center justify-between"
                          >
                            <Input
                              value={bulletPoint}
                              onChange={(e) =>
                                handleUpdateBulletPoint(
                                  index,
                                  bulletPointIndex,
                                  e.target.value,
                                )
                              }
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                handleDeleteBulletPoint(index, bulletPointIndex)
                              }
                            >
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </div>
                        ),
                      )}
                      <Button
                        variant="ghost"
                        onClick={() => handleAddBulletPoint(index)}
                      >
                        Add Bullet Point
                      </Button>
                    </div>
                    <div className="m-1 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteWorkExperience(index)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
