
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, Users, TrendingUp, Calendar, Plus, Filter, Eye, MessageSquare, Star, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const HRDashboard = () => {
  const { user, userProfile, signOut, loading } = useAuth();
  const [jobPostings, setJobPostings] = useState<any[]>([]);
  const [recentCandidates, setRecentCandidates] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    interviewsScheduled: 0,
    hireRate: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || userProfile?.role !== 'hr')) {
      navigate('/auth');
      return;
    }

    if (user && userProfile?.role === 'hr') {
      fetchJobPostings();
      fetchRecentCandidates();
    }
  }, [user, userProfile, loading, navigate]);

  const fetchJobPostings = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching job postings:', error);
      } else {
        setJobPostings(data || []);
        const activeJobs = data?.filter(job => job.is_active).length || 0;
        const totalApplications = data?.reduce((sum, job) => sum + (job.application_count || 0), 0) || 0;
        setStats(prev => ({
          ...prev,
          activeJobs,
          totalApplications
        }));
      }
    } catch (error) {
      console.error('Error fetching job postings:', error);
    }
  };

  const fetchRecentCandidates = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('candidates')
        .select(`
          *,
          job_postings!inner (
            id,
            title,
            created_by
          ),
          profiles!candidates_candidate_id_fkey (
            first_name,
            last_name
          )
        `)
        .eq('job_postings.created_by', user.id)
        .order('applied_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching candidates:', error);
      } else {
        setRecentCandidates(data || []);
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'paused': return 'bg-yellow-500';
      case 'selected': return 'bg-blue-500';
      case 'interviewed': return 'bg-purple-500';
      case 'shortlisted': return 'bg-cyan-500';
      case 'reviewing': return 'bg-orange-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || userProfile?.role !== 'hr') {
    return null;
  }

  const statsData = [
    {
      label: "Active Jobs",
      value: stats.activeJobs.toString(),
      change: `+${stats.activeJobs} total`,
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Total Applications",
      value: stats.totalApplications.toString(),
      change: `+${stats.totalApplications} total`,
      icon: Users,
      color: "from-emerald-500 to-teal-500"
    },
    {
      label: "Interviews Scheduled",
      value: "0",
      change: "+0 this week",
      icon: Calendar,
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Hire Rate",
      value: "0%",
      change: "No hires yet",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

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
            <Link to="/ai-tools">
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                AI Tools
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-slate-800/50"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{userProfile?.first_name?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile?.first_name}!</h1>
            <p className="text-slate-400">Manage your recruitment pipeline with ease</p>
          </div>
          <CreateJobButton />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
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
                  <CreateJobButton variant="ghost" size="sm" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {jobPostings.length > 0 ? (
                  jobPostings.map((job) => (
                    <div key={job.id} className="bg-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{job.title}</h4>
                          <p className="text-slate-400 text-sm">{job.company_name}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-slate-500 flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {job.application_count || 0} applicants
                            </span>
                            <span className="text-sm text-slate-500 flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(job.posted_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(job.is_active ? 'active' : 'paused')} text-white`}>
                            {job.is_active ? 'Active' : 'Paused'}
                          </Badge>
                          <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No job postings yet. Create your first job posting!</p>
                    <CreateJobButton className="mt-4" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Candidates */}
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl mt-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Recent Candidates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCandidates.length > 0 ? (
                  recentCandidates.map((candidate) => (
                    <div key={candidate.id} className="bg-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {candidate.profiles?.first_name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              {candidate.profiles?.first_name} {candidate.profiles?.last_name}
                            </h4>
                            <p className="text-slate-400 text-sm">{candidate.job_postings?.title}</p>
                            <div className="flex items-center space-x-4 mt-1 text-xs text-slate-500">
                              <span>Applied {new Date(candidate.applied_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className={`${getStatusColor(candidate.status)} text-white`}>
                            {candidate.status}
                          </Badge>
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
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No candidates yet. Your job postings will attract candidates soon!</p>
                  </div>
                )}
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
                <CreateJobButton className="w-full" />
                <Button variant="outline" className="w-full text-white border-slate-600 hover:bg-slate-800/50">
                  <Users className="w-4 h-4 mr-2" />
                  Review Candidates
                </Button>
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
                {recentCandidates.length > 0 ? (
                  recentCandidates.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white">New application received</p>
                        <p className="text-xs text-slate-400">
                          {candidate.profiles?.first_name} applied for {candidate.job_postings?.title}
                        </p>
                        <p className="text-xs text-slate-500">{new Date(candidate.applied_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-slate-400 text-sm">No recent activity</p>
                  </div>
                )}
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
                  <span className="text-white font-semibold">{stats.totalApplications}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Interviews</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Hires</span>
                  <span className="text-white font-semibold">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time to Hire</span>
                  <span className="text-green-400 font-semibold">-- days</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Job Button Component
const CreateJobButton = ({ className = "", variant = "default", size = "default" }: any) => {
  const navigate = useNavigate();
  
  const handleCreateJob = () => {
    // For now, we'll show a simple alert. Later this can be a proper form modal or page
    navigate('/create-job');
  };

  return (
    <Button 
      className={`bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 transition-all duration-300 hover:scale-105 ${className}`}
      variant={variant}
      size={size}
      onClick={handleCreateJob}
    >
      <Plus className="w-4 h-4 mr-2" />
      Post New Job
    </Button>
  );
};

export default HRDashboard;
