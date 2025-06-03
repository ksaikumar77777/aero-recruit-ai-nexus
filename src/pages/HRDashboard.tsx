
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Users, TrendingUp, Calendar, Plus, Filter, Eye, MessageSquare, Star, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HRDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('atsUser');
    if (!userData) {
      navigate('/auth');
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'hr') {
      navigate('/jobseeker/dashboard');
      return;
    }
    
    setUser(parsedUser);
  }, [navigate]);

  const stats = [
    {
      label: "Active Jobs",
      value: "12",
      change: "+3 this month",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Total Applications",
      value: "248",
      change: "+45 this week",
      icon: Users,
      color: "from-emerald-500 to-teal-500"
    },
    {
      label: "Interviews Scheduled",
      value: "18",
      change: "+8 this week",
      icon: Calendar,
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Hire Rate",
      value: "23%",
      change: "+2% this month",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior React Developer",
      department: "Engineering",
      applicants: 34,
      status: "Active",
      posted: "3 days ago",
      priority: "High"
    },
    {
      id: 2,
      title: "Product Designer",
      department: "Design",
      applicants: 28,
      status: "Active",
      posted: "1 week ago",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Marketing Manager",
      department: "Marketing",
      applicants: 19,
      status: "Paused",
      posted: "2 weeks ago",
      priority: "Low"
    }
  ];

  const recentCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior React Developer",
      status: "Interview Scheduled",
      score: 95,
      experience: "5 years",
      location: "San Francisco, CA",
      appliedDate: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Designer",
      status: "Under Review",
      score: 88,
      experience: "3 years",
      location: "New York, NY",
      appliedDate: "2024-01-14"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Marketing Manager",
      status: "Phone Screen",
      score: 92,
      experience: "7 years",
      location: "Austin, TX",
      appliedDate: "2024-01-13"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Paused': return 'bg-yellow-500';
      case 'Interview Scheduled': return 'bg-blue-500';
      case 'Under Review': return 'bg-purple-500';
      case 'Phone Screen': return 'bg-cyan-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

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
            <Link to="/hr/jobs">
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                Manage Jobs
              </Button>
            </Link>
            <Link to="/hr/candidates">
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                Candidates
              </Button>
            </Link>
            <Link to="/ai-tools">
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                AI Tools
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{user.fullName?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.fullName}!</h1>
            <p className="text-slate-400">Manage your recruitment pipeline with ease</p>
          </div>
          <Link to="/hr/jobs/create">
            <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 transition-all duration-300 hover:scale-105">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
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
          {/* Recent Job Postings */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Recent Job Postings
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <Eye className="w-4 h-4 mr-1" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="bg-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-white">{job.title}</h4>
                        <p className="text-slate-400 text-sm">{job.department}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-slate-500 flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {job.applicants} applicants
                          </span>
                          <span className="text-sm text-slate-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {job.posted}
                          </span>
                          <span className={`text-sm ${getPriorityColor(job.priority)}`}>
                            {job.priority} Priority
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`${getStatusColor(job.status)} text-white`}>
                          {job.status}
                        </Badge>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Candidates */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Recent Candidates
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Filter className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                      <Eye className="w-4 h-4 mr-1" />
                      View All
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="bg-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{candidate.name}</h4>
                          <p className="text-slate-400 text-sm">{candidate.position}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                            <span>{candidate.experience} experience</span>
                            <span>{candidate.location}</span>
                            <span>Applied {candidate.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-emerald-400 border-emerald-400">
                            {candidate.score}% match
                          </Badge>
                          <Badge className={`${getStatusColor(candidate.status)} text-white`}>
                            {candidate.status}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 p-1">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-green-400 hover:text-green-300 p-1">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300 p-1">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/hr/jobs/create">
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0">
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                </Link>
                <Link to="/hr/candidates">
                  <Button variant="outline" className="w-full text-white border-slate-600 hover:bg-slate-800/50">
                    <Users className="w-4 h-4 mr-2" />
                    Review Candidates
                  </Button>
                </Link>
                <Link to="/ai-tools">
                  <Button variant="outline" className="w-full text-white border-slate-600 hover:bg-slate-800/50">
                    <Star className="w-4 h-4 mr-2" />
                    AI Resume Matcher
                  </Button>
                </Link>
                <Button variant="outline" className="w-full text-white border-slate-600 hover:bg-slate-800/50">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interviews
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white">New application received</p>
                    <p className="text-xs text-slate-400">Sarah Johnson applied for Senior React Developer</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white">Interview scheduled</p>
                    <p className="text-xs text-slate-400">Michael Chen - Product Designer</p>
                    <p className="text-xs text-slate-500">4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white">Job posting expires soon</p>
                    <p className="text-xs text-slate-400">Marketing Manager expires in 3 days</p>
                    <p className="text-xs text-slate-500">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Applications</span>
                  <span className="text-white font-semibold">248</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Interviews</span>
                  <span className="text-white font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Hires</span>
                  <span className="text-white font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time to Hire</span>
                  <span className="text-green-400 font-semibold">18 days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
