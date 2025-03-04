'use client';

import { useState, useEffect } from 'react';
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
import { Trash2Icon } from '../../../assets/svgs';
import {
  saveCVSections,
  deleteCVSection,
  deleteCVSectionBulletPoint,
} from '../../../lib/data';
import { ICVPage } from '../../../interfaces/ICVPage';
import { useToast } from '@/hooks/use-toast';

import PDF from './PDF';
export default function Component({ data }: { data: ICVPage }) {
  const { toast } = useToast();

  const [selectedSection, setSelectedSection] = useState('education');
  const [workExperience, setWorkExperience] = useState<
    {
      unsaved: boolean;
      id: number | null;
      category: string;
      categoryId: string;
      title: string;
      organization: string;
      location: string;
      startDate: string;
      endDate: string;
      bulletPoints: string[];
    }[]
  >(data[selectedSection]);

  useEffect(() => {
    setWorkExperience(data[selectedSection]);
  }, [selectedSection]);

  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        unsaved: true,
        id: null,
        categoryId: selectedSection,
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

  const handleDeleteWorkExperience = async (
    index: number,
    id: number | null,
  ) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience.splice(index, 1);
    setWorkExperience(updatedWorkExperience);
    if (id) {
      const res = await deleteCVSection(id);
      res && setWorkExperience(res[selectedSection]);
      toast({
        title: 'Experience deleted successfully',
      });
    }
  };

  const handleUpdateWorkExperience = (
    index: number,
    field: string,
    value: string,
    id: number | null,
  ) => {
    const updatedWorkExperience = workExperience.map((exp, idx) => {
      if (idx === index) {
        return { ...exp, id: id, [field]: value, unsaved: true };
      } else {
        return exp;
      }
    });
    setWorkExperience(updatedWorkExperience);
  };

  const handleAddBulletPoint = (index: number) => {
    const updatedWorkExperience = [...workExperience];
    if (updatedWorkExperience[index].bulletPoints.length < 3) {
      updatedWorkExperience[index].bulletPoints.push('');
    }
    setWorkExperience(updatedWorkExperience);
  };

  const handleDeleteBulletPoint = (
    index: number,
    bulletPointIndex: number,
    workExperienceId: number | null,
  ) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index].bulletPoints.splice(bulletPointIndex, 1);
    setWorkExperience(updatedWorkExperience);
    if (workExperienceId) {
      deleteCVSectionBulletPoint(workExperienceId, bulletPointIndex);
      toast({
        title: 'CV Section Updated',
      });
    }
  };

  const handleUpdateBulletPoint = (
    workExperienceIndex: number,
    bulletPointIndex: number,
    value: string,
  ) => {
    const updatedWorkExperience = workExperience.map((exp, idx) => {
      if (idx === workExperienceIndex) {
        exp.bulletPoints[bulletPointIndex] = value;
        return { ...exp, unsaved: true };
      } else {
        return exp;
      }
    });
    setWorkExperience(updatedWorkExperience);
  };

  const handleSaveSection = async () => {
    const data = workExperience.filter(
      (experience) => experience.unsaved === true,
    );
    const res = await saveCVSections(data);
    res && setWorkExperience(res[selectedSection]);
    toast({
      title: 'Changes saved',
      description: 'Changes to your CV saved successfully',
    });
  };

  return (
    <div className="flex h-full w-full flex-row justify-center">
      <div className="grid flex-1 grid-cols-12 gap-6 px-6">
        <div className="col-span-12">
          <div>
            <div className="sticky right-0 top-0 flex h-20 items-center justify-between gap-4 border-b-2 bg-white/90 bg-blend-overlay">
              <div className="flex items-center gap-4">
                <Select
                  value={selectedSection}
                  onValueChange={(val) => setSelectedSection(val)}
                >
                  <h1 className="text-xl font-bold">CV</h1>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue defaultValue={'Education'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>CV Categories</SelectLabel>
                      <SelectItem value="education">Education</SelectItem>

                      <SelectItem value="soloExhibitions">
                        Solo Exhibitions
                      </SelectItem>
                      <SelectItem value="groupExhibitions">
                        Group Exhibitions
                      </SelectItem>
                      <SelectItem value="awards">Awards</SelectItem>
                      <SelectItem value="press">Press</SelectItem>
                      <SelectItem value="Teaching">Teaching</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button
                  className="fixed bottom-10 right-5 h-12 w-12 rounded-full text-lg lg:right-10"
                  onClick={handleAddWorkExperience}
                >
                  +
                </Button>
              </div>
              <PDF data={data} />
              <Button onClick={handleSaveSection}>Save</Button>
            </div>
            <div className="space-y-4 pt-6">
              {workExperience.map((experience, index) => (
                <div
                  key={index}
                  className="border-1 rounded-lg border bg-background p-4 pb-0 shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Input
                      value={experience.title}
                      onChange={(e) =>
                        handleUpdateWorkExperience(
                          index,
                          'title',
                          e.target.value,
                          experience.id,
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
                          experience.id,
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
                          experience.id,
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
                          experience.id,
                        )
                      }
                      className="w-1/4"
                      placeholder="Start (YYYY)"
                    />
                    <Input
                      value={experience.endDate}
                      onChange={(e) =>
                        handleUpdateWorkExperience(
                          index,
                          'endDate',
                          e.target.value,
                          experience.id,
                        )
                      }
                      className="w-1/4"
                      placeholder="End (YYYY)"
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
                              handleDeleteBulletPoint(
                                index,
                                bulletPointIndex,
                                experience.id,
                              )
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
                      onClick={() =>
                        handleDeleteWorkExperience(index, experience.id)
                      }
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
