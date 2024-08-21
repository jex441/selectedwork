import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ImagePlus, User, Instagram, Mail } from 'lucide-react';

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    images: [],
    name: '',
    photo: null,
    bio: '',
    instagram: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'images') {
      setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 3));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 1: Add Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label htmlFor="images">Upload Images</Label>
                <Input
                  id="images"
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                />
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from(formData.images).map((file, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded ${index + 1}`}
                        className="h-24 w-full rounded object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </>
        );
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 2: Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="photo">Your Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData.photo && (
                    <img
                      src={URL.createObjectURL(formData.photo)}
                      alt="Profile"
                      className="mt-2 h-24 w-24 rounded-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="bio">Brief Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </CardContent>
          </>
        );
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Step 3: Social and Contact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="instagram">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    placeholder="@yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </>
        );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-lg">
      {renderStep()}
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrev} variant="outline">
            Previous
          </Button>
        )}
        {step < 3 ? (
          <Button onClick={handleNext} className="ml-auto">
            Next
          </Button>
        ) : (
          <Button onClick={() => console.log(formData)} className="ml-auto">
            Finish
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
