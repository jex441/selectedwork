'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageUpload from 'next/image';

export default function Component() {
  const [selectedSection, setSelectedSection] = useState('work-experience');
  const [workExperience, setWorkExperience] = useState([
    {
      jobTitle: 'Software Engineer',
      company: 'Acme Inc.',
      location: 'San Francisco, CA',
      startDate: '2020-01-01',
      endDate: '2022-12-31',
      bulletPoints: [
        'Developed and maintained web applications using React and Node.js',
        'Collaborated with cross-functional teams to deliver high-quality software',
        'Implemented new features and bug fixes in a timely manner',
      ],
    },
    {
      jobTitle: 'Intern',
      company: 'Globex Corporation',
      location: 'San Francisco, CA',
      startDate: '2019-06-01',
      endDate: '2019-08-31',
      bulletPoints: [
        'Assisted with front-end development using HTML, CSS, and JavaScript',
        'Participated in agile development processes and daily stand-ups',
        'Gained experience in a professional software development environment',
      ],
    },
  ]);
  const [headerImage, setHeaderImage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template-1');
  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        bulletPoints: [],
      },
    ]);
  };
  const handleDeleteWorkExperience = (index) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience.splice(index, 1);
    setWorkExperience(updatedWorkExperience);
  };
  const handleUpdateWorkExperience = (index, field, value) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index][field] = value;
    setWorkExperience(updatedWorkExperience);
  };
  const handleAddBulletPoint = (index) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[index].bulletPoints.push('');
    setWorkExperience(updatedWorkExperience);
  };
  const handleDeleteBulletPoint = (workExperienceIndex, bulletPointIndex) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[workExperienceIndex].bulletPoints.splice(
      bulletPointIndex,
      1,
    );
    setWorkExperience(updatedWorkExperience);
  };
  const handleUpdateBulletPoint = (
    workExperienceIndex,
    bulletPointIndex,
    value,
  ) => {
    const updatedWorkExperience = [...workExperience];
    updatedWorkExperience[workExperienceIndex].bulletPoints[bulletPointIndex] =
      value;
    setWorkExperience(updatedWorkExperience);
  };
  const handleUploadHeaderImage = (file) => {
    setHeaderImage(file);
  };
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
  };
  const handleDeletePage = () => {};
  const handleArchivePage = () => {};
  const handleSaveChanges = () => {};
  const handleDiscardChanges = () => {};
  return (
    <div className="flex h-full flex-row ">
      <div className="bg-background p-4 shadow-md">
        <h2 className="mb-4 text-lg font-bold">Categories</h2>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer ${
              selectedSection === 'work_experience'
                ? 'font-bold text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setSelectedSection('work_experience')}
          >
            Work Experience
          </li>
          <li
            className={`cursor-pointer ${
              selectedSection === 'education'
                ? 'font-bold text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setSelectedSection('education')}
          >
            Education
          </li>
          <li
            className={`cursor-pointer ${
              selectedSection === 'skills'
                ? 'font-bold text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setSelectedSection('skills')}
          >
            Skills
          </li>
          <li
            className={`cursor-pointer ${
              selectedSection === 'certifications'
                ? 'font-bold text-primary'
                : 'text-muted-foreground'
            }`}
            onClick={() => setSelectedSection('certifications')}
          >
            Certifications
          </li>
        </ul>
      </div>
      <div className="grid flex-1 grid-cols-12 gap-6 bg-gray-100/40 p-6">
        <div className="col-span-12">
          {selectedSection === 'work-experience' && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Work Experience</h2>
                <Button onClick={handleAddWorkExperience}>
                  Add Work Experience
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
                        value={experience.jobTitle}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'jobTitle',
                            e.target.value,
                          )
                        }
                        className="w-1/4"
                        placeholder="Title"
                      />
                      <Input
                        value={experience.company}
                        onChange={(e) =>
                          handleUpdateWorkExperience(
                            index,
                            'company',
                            e.target.value,
                          )
                        }
                        className="w-1/4"
                        placeholder="Organization"
                      />
                      <Input
                        value={experience.company}
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

function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
