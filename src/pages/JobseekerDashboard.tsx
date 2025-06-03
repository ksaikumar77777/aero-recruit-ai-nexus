
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Briefcase, MapPin, Clock, Star, TrendingUp, BookmarkIcon, Eye, Send, CheckCircle, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const JobseekerDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profileCompletion, setProfileCompletion] = useState(75);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('atsUser');
    if (!userData) {
      navigate('/auth');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'jobseeker') {
      navigate('/hr/dashboard');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const applications = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15",
      status: "Interview Scheduled",
      statusColor: "bg-blue-500",
      salary: "$120K - $160K",
      logo: "TC"
    },
    {
      id: 2,
      jobTitle: "React Developer",
      company: "Startup Hub",
      location: "Remote",
      appliedDate: "2024-01-12",
      status: "Under Review",
      statusColor: "bg-yellow-500",
      salary: "$90K - $130K",
      logo: "SH"
    },
    {
      id: 3,
      jobTitle: "Full Stack Engineer",
      company: "Innovation Labs",
      location: "New York, NY",
      appliedDate: "2024-01-10",
      status: "Rejected",
      statusColor: "bg-red-500",
      salary: "$110K - $150K",
      logo: "IL"
    }
  ];

  const savedJobs = [
    {
      id: 1,
      title: "Product Manager",
      company: "Future Tech",
      location: "Austin, TX",
      salary: "$130K - $170K",
      posted: "2 days ago",
      match: 95
    },
    {
      id: 2,
      title: "UX Designer",
      company: "Design Studio",
      location: "Los Angeles, CA",
      salary: "$85K - $115K",
      posted: "1 week ago",
      match: 88
    }
  ];

  const stats = [
    { label: "Applications Sent", value: "23", icon: Send, change: "+5 this week" },
    { label: "Interview Invites", value: "8", icon: Calendar, change: "+2 this week" },
    { label: "Profile Views", value: "156", icon: Eye, change: "+23 this week" },
    { label: "Saved Jobs", value: "12", icon: BookmarkIcon, change: "+3 this week" }
  ];

  if (!user) return null;

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
            <Link to="/jobs">
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                Browse Jobs
              </Button>
            </Link>
            <Link to="/ai-tools">
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                AI Tools
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{user.fullName?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.fullName}!</h1>
          <p className="text-slate-400">Track your applications and discover new opportunities</p>
        </div>

        {/* Profile Completion */}
        <Card className="mb-8 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Complete Your Profile</h3>
                <p className="text-slate-300">Boost your visibility to employers</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{profileCompletion}%</div>
                <div className="text-sm text-slate-300">Complete</div>
              </div>
            </div>
            <Progress value={profileCompletion} className="mb-4" />
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
              Complete Profile
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-green-400">{stat.change}</div>
                  </div>
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Send className="w-5 h-5 mr-2" />
                  Recent Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {app.logo}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{app.jobTitle}</h4>
                          <p className="text-slate-400">{app.company}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {app.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {app.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${app.statusColor} text-white`}>
                        {app.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Applied {app.appliedDate}</span>
                      <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full bg-slate-800/50 hover:bg-slate-700/50 text-white border-slate-700">
                  View All Applications
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Jobs */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookmarkIcon className="w-5 h-5 mr-2" />
                  Saved Jobs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {savedJobs.map((job) => (
                  <div key={job.id} className="bg-slate-800/50 rounded-lg p-4 transition-all duration-300 hover:bg-slate-700/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{job.title}</h4>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {job.match}% match
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">{job.company}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>{job.location}</span>
                      <span>{job.posted}</span>
                    </div>
                  </div>
                ))}
                
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                  View All Saved
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/jobs">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                    <Search className="w-4 h-4 mr-2" />
                    Find New Jobs
                  </Button>
                </Link>
                <Button variant="outline" className="w-full text-white border-slate-600 hover:bg-slate-800/50">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Update Resume
                </Button>
                <Link to="/ai-tools">
                  <Button variant="outline" className="w-full text-white border-slate-600 hover:bg-slate-800/50">
                    <Star className="w-4 h-4 mr-2" />
                    AI Career Coach
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobseekerDashboard;
