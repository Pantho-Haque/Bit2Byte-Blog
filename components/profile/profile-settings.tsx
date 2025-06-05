'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Edit, Key, Upload, Save, User, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ProfileSettingsProps {
  userData: {
    name: string;
    email: string;
    username: string;
    photo: string;
  };
}

export function ProfileSettings({ userData }: ProfileSettingsProps) {
  const [formData, setFormData] = useState({
    name: userData.name,
    username: userData.username,
    password: '',
    confirmPassword: '',
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, you would submit this to your API
      console.log('Form data to submit:', {
        name: formData.name,
        username: formData.username,
        password: formData.password ? formData.password : undefined,
        photo: photoFile
      });
      
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Update failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <Card className="p-6 border-0 shadow-lg overflow-hidden backdrop-blur-sm bg-opacity-40 bg-background">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Profile Settings</h2>
          <p className="text-sm text-muted-foreground">Update your profile information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative group">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage src={photoPreview || userData.photo} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 rounded-full p-2 cursor-pointer">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Upload className="h-6 w-6 text-white" />
                      <input 
                        id="photo-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoChange}
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              {photoPreview && (
                <div className="mt-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetPhoto}
                    className="text-xs"
                  >
                    <X className="h-3 w-3 mr-1" /> Cancel
                  </Button>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-4">
                Click on the avatar to upload a new photo
              </p>
            </div>
            
            <div className="md:w-2/3 space-y-4">
              <div>
                <Label htmlFor="name" className="flex items-center gap-1">
                  <User className="h-4 w-4" /> Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="username" className="flex items-center gap-1">
                  <Edit className="h-4 w-4" /> Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Your username"
                  className="mt-1"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Username cannot be changed
                </p>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" type="button" className="w-full">
                    <Key className="h-4 w-4 mr-2" /> Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter a new password for your account
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="New password"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm new password"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="relative overflow-hidden"
            >
              <motion.div
                animate={isSubmitting ? { x: ["0%", "100%"] } : { x: "0%" }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${isSubmitting ? 'opacity-100' : 'opacity-0'}`}
              />
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
} 