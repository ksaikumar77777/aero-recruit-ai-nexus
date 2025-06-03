
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Clock, Briefcase, DollarSign, Filter, BookmarkIcon, Eye, Star, Building, Users, Calendar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [salaryRange, setSalaryRange] = useState([50000, 200000]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('atsUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Hybrid'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "Senior Level",
      salary: "$120K - $160K",
      posted: "2 days ago",
      description: "Join our team to build next-generation web applications using React, TypeScript, and modern tools.",
      requirements: ["5+ years React experience", "TypeScript proficiency", "GraphQL knowledge"],
      benefits: ["Health insurance", "401k matching", "Flexible PTO"],
      applicants: 23,
      match: 95,
      logo: "TC",
      remote: true,
      urgent: false
    },
    {
      id: 2,
      title: "Product Manager",
      company: "Innovation Labs",
      location: "New York, NY",
      type: "Full-time",
      experience: "Mid Level",
      salary: "$130K - $170K",
      posted: "1 day ago",
      description: "Lead product strategy and work with cross-functional teams to deliver amazing user experiences.",
      requirements: ["3+ years product management", "Data-driven mindset", "B2B SaaS experience"],
      benefits: ["Stock options", "Health insurance", "Learning budget"],
      applicants: 45,
      match: 88,
      logo: "IL",
      remote: false,
      urgent: true
    },
    {
      id: 3,
      title: "UX Designer",
      company: "Design Studio",
      location: "Remote",
      type: "Contract",
      experience: "Mid Level",
      salary: "$85K - $115K",
      posted: "3 days ago",
      description: "Create beautiful and intuitive user experiences for our mobile and web applications.",
      requirements: ["UX/UI design experience", "Figma proficiency", "User research skills"],
      benefits: ["Flexible schedule", "Remote work", "Design tools provided"],
      applicants: 31,
      match: 92,
      logo: "DS",
      remote: true,
      urgent: false
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      experience: "Senior Level",
      salary: "$140K - $180K",
      posted: "5 days ago",
      description: "Build and maintain scalable infrastructure using modern DevOps practices and cloud technologies.",
      requirements: ["AWS/Azure experience", "Kubernetes knowledge", "CI/CD expertise"],
      benefits: ["Stock options", "Health insurance", "Conference budget"],
      applicants: 18,
      match: 85,
      logo: "CT",
      remote: false,
      urgent: false
    }
  ];

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
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJobType = selectedJobTypes.length === 0 || selectedJobTypes.includes(job.type);
    const matchesExperience = selectedExperience.length === 0 || selectedExperience.includes(job.experience);
    
    return matchesSearch && matchesJobType && matchesExperience;
  });

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
                <Link to={user.role === 'jobseeker' ? '/jobseeker/dashboard' : '/hr/dashboard'}>
                  <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                    Dashboard
                  </Button>
                </Link>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{user.fullName?.charAt(0) || 'U'}</span>
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
                          <span className="text-slate-300">{type}</span>
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
                          <span className="text-slate-300">{level}</span>
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
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Sort by:</span>
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
              Relevance
            </Button>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <Card
              key={job.id}
              className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {job.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{job.title}</h3>
                          {job.urgent && (
                            <Badge className="bg-red-500 text-white">Urgent</Badge>
                          )}
                          {job.remote && (
                            <Badge className="bg-green-500 text-white">Remote</Badge>
                          )}
                        </div>
                        <p className="text-slate-400 font-medium">{job.company}</p>
                        <div className="flex items-center space-x-6 mt-2 text-sm text-slate-500">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.salary}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applicants} applicants
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 mb-4 leading-relaxed">{job.description}</p>

                    <div className="flex items-center space-x-4 text-sm">
                      <Badge variant="outline" className="text-slate-300 border-slate-600">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-slate-300 border-slate-600">
                        {job.experience}
                      </Badge>
                      {user && user.role === 'jobseeker' && (
                        <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                          {job.match}% match
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 mt-4 lg:mt-0 lg:ml-6">
                    {user && user.role === 'jobseeker' ? (
                      <>
                        <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105">
                          Apply Now
                        </Button>
                        <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800/50">
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
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="text-white border-slate-600 hover:bg-slate-800/50"
          >
            Load More Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
