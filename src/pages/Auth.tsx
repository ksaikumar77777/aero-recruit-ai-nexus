import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, ArrowRight, Eye, EyeOff, CheckCircle, X, Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'job_seeker' | 'hr' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: ''
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn, signUp, user, loading, userProfile } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user && userProfile) {
      console.log('Redirecting authenticated user with profile:', userProfile);
      if (userProfile.role === 'hr') {
        navigate('/hr/dashboard');
      } else {
        navigate('/jobseeker/dashboard');
      }
    }
  }, [user, loading, navigate, userProfile]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !selectedRole) {
      toast({
        title: "Role Required",
        description: "Please select a role to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting login');
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          console.error('Login error:', error);
          toast({
            title: "Sign In Failed",
            description: error.message || "Invalid email or password",
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Welcome Back!",
          description: "Successfully signed in to your account.",
        });
      } else {
        // Validation for signup
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Password Mismatch",
            description: "Passwords do not match. Please try again.",
            variant: "destructive"
          });
          return;
        }

        if (passwordStrength < 3) {
          toast({
            title: "Weak Password",
            description: "Please create a stronger password with at least 8 characters, uppercase, lowercase, and numbers.",
            variant: "destructive"
          });
          return;
        }

        if (!formData.firstName || !formData.lastName) {
          toast({
            title: "Missing Information",
            description: "Please provide your first and last name.",
            variant: "destructive"
          });
          return;
        }

        if (selectedRole === 'hr' && !formData.companyName) {
          toast({
            title: "Company Name Required",
            description: "Please provide your company name.",
            variant: "destructive"
          });
          return;
        }

        const userData = {
          role: selectedRole,
          first_name: formData.firstName,
          last_name: formData.lastName,
          ...(selectedRole === 'hr' && { company_name: formData.companyName })
        };

        console.log('Attempting signup with userData:', userData);
        const { error } = await signUp(formData.email, formData.password, userData);
        
        if (error) {
          console.error('Signup error:', error);
          toast({
            title: "Sign Up Failed",
            description: error.message || "Failed to create account",
            variant: "destructive"
          });
          return;
        }

        toast({
          title: "Account Created!",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleCards = [
    {
      id: 'job_seeker',
      title: 'Job Seeker',
      description: 'Find your dream job with AI-powered matching',
      icon: User,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Smart Job Matching', 'Application Tracking', 'AI Career Coach']
    },
    {
      id: 'hr',
      title: 'HR Professional',
      description: 'Streamline recruitment with advanced tools',
      icon: Users,
      gradient: 'from-emerald-500 to-teal-500',
      features: ['Candidate Management', 'AI Resume Matching', 'Interview Scheduling']
    }
  ];

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ATS Pro
          </span>
        </Link>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="w-full max-w-6xl">
          {!selectedRole ? (
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Choose Your Path
              </h1>
              <p className="text-xl text-slate-400 mb-12">
                Select your role to access features tailored specifically for you
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {roleCards.map((role) => (
                  <Card
                    key={role.id}
                    className="group cursor-pointer bg-slate-900/50 border-slate-800/50 backdrop-blur-xl transition-all duration-300 hover:bg-slate-800/50 hover:scale-105 hover:shadow-2xl"
                    onClick={() => setSelectedRole(role.id as 'job_seeker' | 'hr')}
                  >
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{role.title}</h3>
                      <p className="text-slate-400 mb-6">{role.description}</p>
                      <div className="space-y-2">
                        {role.features.map((feature) => (
                          <div key={feature} className="flex items-center text-slate-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-8">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRole(null)}
                  className="mb-4 text-slate-400 hover:text-white"
                >
                  ← Back to role selection
                </Button>
                
                <Badge className={`mb-4 px-4 py-2 bg-gradient-to-r ${selectedRole === 'job_seeker' ? 'from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30' : 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30'}`}>
                  {selectedRole === 'job_seeker' ? 'Job Seeker' : 'HR Professional'}
                </Badge>
                
                <h1 className="text-3xl font-bold mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-slate-400">
                  {isLogin ? 'Sign in to your account' : 'Get started with your free account'}
                </p>
              </div>

              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-white">First Name</Label>
                            <Input
                              id="firstName"
                              type="text"
                              placeholder="First name"
                              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-white">Last Name</Label>
                            <Input
                              id="lastName"
                              type="text"
                              placeholder="Last name"
                              className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        {selectedRole === 'hr' && (
                          <div className="space-y-2">
                            <Label htmlFor="companyName" className="text-white">Company Name</Label>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                              <Input
                                id="companyName"
                                type="text"
                                placeholder="Enter your company name"
                                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                                value={formData.companyName}
                                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                required
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 text-slate-400 hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      
                      {!isLogin && formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="flex-1 bg-slate-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                style={{ width: `${(passwordStrength / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-400">{getPasswordStrengthText()}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {!isLogin && (
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                          />
                          {formData.confirmPassword && (
                            <div className="absolute right-3 top-3">
                              {formData.password === formData.confirmPassword ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <X className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          {isLogin ? 'Sign In' : 'Create Account'}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
