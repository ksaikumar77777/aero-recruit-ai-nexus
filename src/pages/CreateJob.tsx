
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import type { Database } from '@/integrations/supabase/types';

type JobType = Database['public']['Enums']['job_type'];
type ExperienceLevel = Database['public']['Enums']['experience_level'];

const CreateJob = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company_name: userProfile?.hr_profiles?.[0]?.company_name || '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: '',
    location: '',
    salary_min: '',
    salary_max: '',
    job_type: '' as JobType,
    experience_level: '' as ExperienceLevel,
    remote_allowed: false,
    application_deadline: ''
  });

  // Redirect if not HR user
  if (!user || userProfile?.role !== 'hr') {
    navigate('/auth');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.job_type || !formData.experience_level) {
      toast({
        title: "Error",
        description: "Please select job type and experience level.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const jobData = {
        title: formData.title,
        company_name: formData.company_name,
        description: formData.description,
        requirements: formData.requirements || null,
        responsibilities: formData.responsibilities || null,
        benefits: formData.benefits || null,
        location: formData.location || null,
        salary_min: formData.salary_min ? parseFloat(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseFloat(formData.salary_max) : null,
        job_type: formData.job_type,
        experience_level: formData.experience_level,
        remote_allowed: formData.remote_allowed,
        application_deadline: formData.application_deadline || null,
        created_by: user.id,
        is_active: true
      };

      const { error } = await supabase
        .from('job_postings')
        .insert(jobData);

      if (error) {
        console.error('Error creating job:', error);
        toast({
          title: "Error",
          description: "Failed to create job posting. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Job Posted!",
          description: "Your job posting has been successfully created.",
        });
        navigate('/hr/dashboard');
      }
    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ATS Pro
            </span>
          </Link>
          
          <Link to="/hr/dashboard">
            <Button variant="ghost" className="text-white hover:bg-slate-800/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create New Job Posting</h1>
          <p className="text-slate-400">Fill in the details to post a new job opportunity</p>
        </div>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Job Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior Frontend Developer"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company_name" className="text-white">Company Name *</Label>
                  <Input
                    id="company_name"
                    placeholder="Your company name"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Job Type and Experience */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-white">Job Type *</Label>
                  <Select value={formData.job_type} onValueChange={(value: JobType) => handleInputChange('job_type', value)} required>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full_time">Full Time</SelectItem>
                      <SelectItem value="part_time">Part Time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Experience Level *</Label>
                  <Select value={formData.experience_level} onValueChange={(value: ExperienceLevel) => handleInputChange('experience_level', value)} required>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level</SelectItem>
                      <SelectItem value="mid">Mid Level</SelectItem>
                      <SelectItem value="senior">Senior Level</SelectItem>
                      <SelectItem value="executive">Executive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location and Remote */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Remote Work</Label>
                  <Select 
                    value={formData.remote_allowed ? 'yes' : 'no'} 
                    onValueChange={(value) => handleInputChange('remote_allowed', value === 'yes')}
                  >
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">Office Only</SelectItem>
                      <SelectItem value="yes">Remote Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Salary Range */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="salary_min" className="text-white">Minimum Salary (Annual in $)</Label>
                  <Input
                    id="salary_min"
                    type="number"
                    placeholder="e.g. 80000"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                    value={formData.salary_min}
                    onChange={(e) => handleInputChange('salary_min', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary_max" className="text-white">Maximum Salary (Annual in $)</Label>
                  <Input
                    id="salary_max"
                    type="number"
                    placeholder="e.g. 120000"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
                    value={formData.salary_max}
                    onChange={(e) => handleInputChange('salary_max', e.target.value)}
                  />
                </div>
              </div>

              {/* Application Deadline */}
              <div className="space-y-2">
                <Label htmlFor="application_deadline" className="text-white">Application Deadline (Optional)</Label>
                <Input
                  id="application_deadline"
                  type="date"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  value={formData.application_deadline}
                  onChange={(e) => handleInputChange('application_deadline', e.target.value)}
                />
              </div>

              {/* Job Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Job Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, what the candidate will be doing, and what makes this opportunity exciting..."
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              {/* Requirements */}
              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-white">Requirements</Label>
                <Textarea
                  id="requirements"
                  placeholder="List the required skills, experience, education, etc..."
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 min-h-[100px]"
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                />
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <Label htmlFor="responsibilities" className="text-white">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="What will this person be responsible for day-to-day..."
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 min-h-[100px]"
                  value={formData.responsibilities}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                />
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <Label htmlFor="benefits" className="text-white">Benefits & Perks</Label>
                <Textarea
                  id="benefits"
                  placeholder="Health insurance, 401k, flexible PTO, remote work, etc..."
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 min-h-[100px]"
                  value={formData.benefits}
                  onChange={(e) => handleInputChange('benefits', e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <Link to="/hr/dashboard">
                  <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800/50">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating...
                    </div>
                  ) : (
                    'Post Job'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateJob;
