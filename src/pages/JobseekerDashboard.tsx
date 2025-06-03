
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Briefcase, MapPin, Clock, Star, TrendingUp, BookmarkIcon, Eye, Send, CheckCircle, AlertCircle, Calendar, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const JobseekerDashboard = () => {
  const { user, userProfile, signOut, loading } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [profileCompletion, setProfileCompletion] = useState(75);
  const [stats, setStats] = useState({
    applicationsSent: 0,
    interviewInvites: 0,
    profileViews: 0,
    savedJobsCount: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || userProfile?.role !== 'job_seeker')) {
      navigate('/auth');
      return;
    }

    if (user && userProfile?.role === 'job_seeker') {
      fetchApplications();
      fetchSavedJobs();
    }
  }, [user, userProfile, loading, navigate]);

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('candidates')
        .select(`
          *,
          job_postings (
            id,
            title,
            company_name,
            location,
            salary_min,
            salary_max
          )
        `)
        .eq('candidate_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) {
        console.error('Error fetching applications:', error);
      } else {
        setApplications(data || []);
        setStats(prev => ({ ...prev, applicationsSent: data?.length || 0 }));
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const fetchSavedJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select(`
          *,
          job_postings (
            id,
            title,
            company_name,
            location,
            salary_min,
            salary_max,
            posted_at
          )
        `)
        .eq('user_id', user.id)
        .order('saved_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved jobs:', error);
      } else {
        setSavedJobs(data || []);
        setStats(prev => ({ ...prev, savedJobsCount: data?.length || 0 }));
      }
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selected': return 'bg-green-500';
      case 'interviewed': return 'bg-blue-500';
      case 'shortlisted': return 'bg-purple-500';
      case 'reviewing': return 'bg-yellow-500';
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

  if (!user || userProfile?.role !== 'job_seeker') {
    return null;
  }

  const statsData = [
    { label: "Applications Sent", value: stats.applicationsSent.toString(), icon: Send, change: "+5 this week" },
    { label: "Interview Invites", value: "0", icon: Calendar, change: "+0 this week" },
    { label: "Profile Views", value: "0", icon: Eye, change: "+0 this week" },
    { label: "Saved Jobs", value: stats.savedJobsCount.toString(), icon: BookmarkIcon, change: `+${stats.savedJobsCount} total` }
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
            <Button 
              variant="ghost" 
              className="text-white hover:bg-slate-800/50"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{userProfile?.first_name?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userProfile?.first_name}!</h1>
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
          {statsData.map((stat, index) => (
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
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <div key={app.id} className="bg-slate-800/50 rounded-xl p-4 transition-all duration-300 hover:bg-slate-700/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                            {app.job_postings?.company_name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{app.job_postings?.title}</h4>
                            <p className="text-slate-400">{app.job_postings?.company_name}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {app.job_postings?.location}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="w-4 h-4 mr-1" />
                                ${app.job_postings?.salary_min}k - ${app.job_postings?.salary_max}k
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(app.status)} text-white`}>
                          {app.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Applied {new Date(app.applied_at).toLocaleDateString()}</span>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-400">No applications yet. Start applying to jobs!</p>
                  </div>
                )}
                
                <Link to="/jobs">
                  <Button className="w-full bg-slate-800/50 hover:bg-slate-700/50 text-white border-slate-700">
                    Browse More Jobs
                  </Button>
                </Link>
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
                {savedJobs.length > 0 ? (
                  savedJobs.slice(0, 3).map((savedJob) => (
                    <div key={savedJob.id} className="bg-slate-800/50 rounded-lg p-4 transition-all duration-300 hover:bg-slate-700/50">
                      <h4 className="font-medium text-white text-sm">{savedJob.job_postings?.title}</h4>
                      <p className="text-slate-400 text-sm">{savedJob.job_postings?.company_name}</p>
                      <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                        <span>{savedJob.job_postings?.location}</span>
                        <span>{new Date(savedJob.job_postings?.posted_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-slate-400 text-sm">No saved jobs yet</p>
                  </div>
                )}
                
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
