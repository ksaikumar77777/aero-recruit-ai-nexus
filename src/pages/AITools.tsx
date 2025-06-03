
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Brain, Upload, FileText, MessageSquare, BarChart3, Zap, Star, CheckCircle, AlertTriangle, TrendingUp, Users, Clock, Download } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AITools = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('resume-matcher');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('atsUser');
    if (!userData) {
      navigate('/auth');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const tools = [
    {
      id: 'resume-matcher',
      title: 'Resume Matcher AI',
      description: 'Match resumes to job descriptions with AI precision',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      access: 'all'
    },
    {
      id: 'interview-summary',
      title: 'Interview Summary Generator',
      description: 'Generate structured summaries from interview transcripts',
      icon: FileText,
      color: 'from-emerald-500 to-teal-500',
      access: 'hr'
    },
    {
      id: 'chat-summarizer',
      title: 'Candidate Chat Summarizer',
      description: 'Extract key insights from candidate communications',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      access: 'hr'
    },
    {
      id: 'bias-detector',
      title: 'Bias Detector',
      description: 'Identify and prevent unconscious bias in hiring',
      icon: BarChart3,
      color: 'from-orange-500 to-red-500',
      access: 'hr'
    }
  ];

  const mockResults = {
    'resume-matcher': [
      { name: 'Sarah Johnson', score: 95, match: 'Excellent fit - All key requirements met', skills: ['React', 'TypeScript', 'Node.js'], experience: '5 years' },
      { name: 'Michael Chen', score: 88, match: 'Very good fit - Minor skill gaps', skills: ['React', 'JavaScript', 'Python'], experience: '3 years' },
      { name: 'Emily Davis', score: 82, match: 'Good fit - Some training needed', skills: ['Vue.js', 'JavaScript', 'CSS'], experience: '4 years' }
    ]
  };

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setUploadProgress(0);
    
    // Simulate file upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setTimeout(() => {
      setIsProcessing(false);
      setUploadProgress(0);
    }, 1000);
  };

  const renderTool = () => {
    const tool = tools.find(t => t.id === activeTab);
    if (!tool) return null;

    switch (activeTab) {
      case 'resume-matcher':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Job Description Upload */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Job Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste your job description here..."
                    className="min-h-32 bg-slate-900/50 border-slate-700 text-white placeholder-slate-400"
                  />
                  <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                    Analyze Requirements
                  </Button>
                </CardContent>
              </Card>

              {/* Resume Upload */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Resumes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-300 mb-2">Drop resume files here or click to browse</p>
                    <p className="text-slate-500 text-sm">PDF, DOC, DOCX up to 10MB each</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload">
                      <Button className="mt-4 bg-slate-700 hover:bg-slate-600 text-white" asChild>
                        <span>Choose Files</span>
                      </Button>
                    </label>
                  </div>
                  {isProcessing && (
                    <div className="mt-4">
                      <Progress value={uploadProgress} className="mb-2" />
                      <p className="text-sm text-slate-400">Processing resumes...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Matching Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockResults['resume-matcher'].map((result, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4 transition-all duration-300 hover:bg-slate-800/50">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{result.name}</h4>
                          <p className="text-slate-400 text-sm">{result.experience} experience</p>
                        </div>
                        <Badge className={`${result.score >= 90 ? 'bg-green-500' : result.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'} text-white`}>
                          {result.score}% match
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm mb-3">{result.match}</p>
                      <div className="flex items-center space-x-2">
                        {result.skills.map(skill => (
                          <Badge key={skill} variant="outline" className="text-blue-400 border-blue-400 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'interview-summary':
        return (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Interview Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste interview transcript or notes here..."
                  className="min-h-40 bg-slate-900/50 border-slate-700 text-white placeholder-slate-400"
                />
                <div className="flex gap-4 mt-4">
                  <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0">
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Summary
                  </Button>
                  <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800/50">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Audio
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">AI Generated Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Key Strengths</h4>
                    <ul className="space-y-1 text-slate-300">
                      <li>• Strong technical background in React and TypeScript</li>
                      <li>• Excellent communication and problem-solving skills</li>
                      <li>• Demonstrated leadership experience</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Areas of Concern</h4>
                    <ul className="space-y-1 text-slate-300">
                      <li>• Limited experience with large-scale systems</li>
                      <li>• May need mentoring on advanced architecture patterns</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Overall Recommendation</h4>
                    <p className="text-green-400">Strongly recommend for hire - excellent cultural fit with room for growth</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'bias-detector':
        return (
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Bias Analysis Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-white">Low Risk</h4>
                    <p className="text-slate-400">Gender bias</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="w-8 h-8 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold text-white">Medium Risk</h4>
                    <p className="text-slate-400">Age bias</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <AlertTriangle className="w-8 h-8 text-red-400" />
                    </div>
                    <h4 className="font-semibold text-white">High Risk</h4>
                    <p className="text-slate-400">Educational bias</p>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white border-0">
                  View Detailed Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-8 text-center">
              <p className="text-slate-400">Select a tool to get started</p>
            </CardContent>
          </Card>
        );
    }
  };

  const filteredTools = tools.filter(tool => 
    tool.access === 'all' || (user && tool.access === user.role)
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-800/50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              ATS Pro AI
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to={user.role === 'jobseeker' ? '/jobseeker/dashboard' : '/hr/dashboard'}>
              <Button variant="ghost" className="text-white hover:bg-slate-800/50">
                Dashboard
              </Button>
            </Link>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">{user.fullName?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            AI-Powered Tools
          </h1>
          <p className="text-xl text-slate-400">Leverage artificial intelligence to streamline your recruitment process</p>
        </div>

        {/* Tool Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredTools.map((tool) => (
            <Card
              key={tool.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                activeTab === tool.id 
                  ? 'bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-blue-500/50' 
                  : 'bg-slate-900/50 border-slate-800/50 hover:bg-slate-800/50'
              }`}
              onClick={() => setActiveTab(tool.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center justify-center mb-4 mx-auto transition-all duration-300 ${activeTab === tool.id ? 'scale-110' : ''}`}>
                  <tool.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{tool.title}</h3>
                <p className="text-slate-400 text-sm">{tool.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tool Content */}
        <div className="mb-8">
          {renderTool()}
        </div>

        {/* Usage Stats */}
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Usage Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">156</div>
                <p className="text-slate-400">Resumes Analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">89%</div>
                <p className="text-slate-400">Accuracy Rate</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">2.3x</div>
                <p className="text-slate-400">Faster Screening</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">12hrs</div>
                <p className="text-slate-400">Time Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AITools;
