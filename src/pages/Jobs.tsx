
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Clock, Briefcase, DollarSign, Filter, BookmarkIcon, Eye, Star, Building, Users, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [salaryRange, setSalaryRange] = useState([50000, 200000]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const jobTypes = ['full_time', 'part_time', 'contract', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'executive'];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('is_active', true)
        .order('posted_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: "Error",
          description: "Failed to load jobs. Please try again.",
          variant: "destructive"
        });
      } else {
        setJobs(data || []);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleJobType = (type: string) => {
    setSelectedJobTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const toggleExperience = (level: string) => {
    setSelectedExperience(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.job_type);
    const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experience_level);
    
    return matchesSearch && matchesJobType && matchesExperience;
  });

  const handleApply = async (jobId: string) => {
    if (!user || userProfile?.role !== 'job_seeker') {
      navigate('/auth');
      return;
    }

    try {
      // Check if already applied
      const { data: existingApplication } = await supabase
        .from('candidates')
        .select('id')
        .eq('job_id', jobId)
        .eq('candidate_id', user.id)
        .single();

      if (existingApplication) {
        toast({
          title: "Already Applied",
          description: "You have already applied to this job.",
          variant: "destructive"
        });
        return;
      }

      // Create application
      const { error } = await supabase
        .from('candidates')
        .insert({
          job_id: jobId,
          candidate_id: user.id,
          resume_url: userProfile?.job_seekers?.[0]?.resume_url || '',
          status: 'applied'
        });

      if (error) {
        console.error('Error applying to job:', error);
        toast({
          title: "Application Failed",
          description: "Failed to submit application. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Application Submitted!",
          description: "Your application has been successfully submitted.",
        });
        
        // Refresh jobs to update application count
        fetchJobs();
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  const handleSaveJob = async (jobId: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({
          user_id: user.id,
          job_id: jobId
        });

      if (error) {
        if (error.code === '23505') { // unique violation
          toast({
            title: "Already Saved",
            description: "This job is already in your saved jobs.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to save job. Please try again.",
            variant: "destructive"
          });
        }
      } else {
        toast({
          title: "Job Saved!",
          description: "Job added to your saved jobs.",
        });
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const formatJobType = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatExperienceLevel = (level: string) => {
    return level.charAt(0).toUpperCase() + level.slice(1) + ' Level';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to={userProfile?.role === 'job_seeker' ? '/jobseeker/dashboard' : '/hr/dashboard'}>
                  <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                    Dashboard
                  </Button>
                </Link>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{userProfile?.first_name?.charAt(0) || 'U'}</span>
                </div>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Discover Your Next Opportunity
          </h1>
          <p className="text-xl text-slate-400">Find jobs that match your skills and aspirations</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search jobs, companies, or keywords..."
                className="pl-12 bg-slate-900/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="text-white border-slate-600 hover:bg-slate-800/50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Panel */}
          {isFilterOpen && (
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl mb-6">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Salary Range */}
                  <div>
                    <Label className="text-white mb-4 block">Salary Range</Label>
                    <div className="px-2">
                      <Slider
                        value={salaryRange}
                        onValueChange={setSalaryRange}
                        max={300000}
                        min={30000}
                        step={5000}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>${salaryRange[0].toLocaleString()}</span>
                        <span>${salaryRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Job Type */}
                  <div>
                    <Label className="text-white mb-4 block">Job Type</Label>
                    <div className="space-y-2">
                      {jobTypes.map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedJobTypes.includes(type)}
                            onChange={() => toggleJobType(type)}
                            className="mr-2 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-slate-300">{formatJobType(type)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <Label className="text-white mb-4 block">Experience Level</Label>
                    <div className="space-y-2">
                      {experienceLevels.map(level => (
                        <label key={level} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedExperience.includes(level)}
                            onChange={() => toggleExperience(level)}
                            className="mr-2 rounded border-slate-600 bg-slate-800 text-blue-500 focus:ring-blue-500"
                          />
                          <span className="text-slate-300">{formatExperienceLevel(level)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">{filteredJobs.length} Jobs Found</h2>
            <p className="text-slate-400">Showing the best matches for your search</p>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <Card
                key={job.id}
                className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {job.company_name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-xl font-bold text-white">{job.title}</h3>
                            {job.remote_allowed && (
                              <Badge className="bg-green-500 text-white">Remote</Badge>
                            )}
                          </div>
                          <p className="text-slate-400 font-medium">{job.company_name}</p>
                          <div className="flex items-center space-x-6 mt-2 text-sm text-slate-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </span>
                            {job.salary_min && job.salary_max && (
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                ${job.salary_min}k - ${job.salary_max}k
                              </span>
                            )}
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(job.posted_at).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {job.application_count || 0} applicants
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-300 mb-4 leading-relaxed">{job.description}</p>

                      <div className="flex items-center space-x-4 text-sm">
                        <Badge variant="outline" className="text-slate-300 border-slate-600">
                          {formatJobType(job.job_type)}
                        </Badge>
                        <Badge variant="outline" className="text-slate-300 border-slate-600">
                          {formatExperienceLevel(job.experience_level)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 mt-4 lg:mt-0 lg:ml-6">
                      {user && userProfile?.role === 'job_seeker' ? (
                        <>
                          <Button 
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105"
                            onClick={() => handleApply(job.id)}
                          >
                            Apply Now
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-white border-slate-600 hover:bg-slate-800/50"
                            onClick={() => handleSaveJob(job.id)}
                          >
                            <BookmarkIcon className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                        </>
                      ) : (
                        <Link to="/auth">
                          <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105">
                            Sign in to Apply
                          </Button>
                        </Link>
                      )}
                      <Button variant="ghost" className="text-slate-400 hover:text-white">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No jobs found matching your criteria.</p>
              <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
