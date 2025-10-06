import { useState, useEffect } from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';

import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import SEOHead from '../components/SEOHead';
import MedhelmLogo from '../assets/medhelm-logo.svg';

const Auth = () => {
  // Simulate loading state for demonstration (replace with actual loading logic if needed)
  const [pageLoading] = useState(false);
  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mt-4 text-medical-body">Loading authentication...</p>
        </div>
      </div>
    );
  }
  const location = useLocation();
  const { user, isLoading, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname === '/signup' ? 'signup' : 'signin');
  }, [location.pathname]);

  // Redirect if already authenticated
  if (user && !isLoading) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      await login(formData.email, formData.password);
      toast.success('Welcome back!', {
        description: 'You have successfully logged in.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Please check your credentials and try again.';

      // Special handling for unverified email
      if (errorMessage.includes('verify your email')) {
        toast.error('Account Not Verified', {
          description: 'Please check your email and click the verification link before logging in.',
        });
      } else {
        toast.error('Login Failed', {
          description: errorMessage,
        });
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        description: 'Please make sure both passwords are identical.',
      });
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
      });
      toast.success('Registration Successful!', {
        description: 'Please check your email and click the verification link to activate your account. You cannot login until verified.',
      });
      // Clear form after success
      setFormData({
        email: '',
        password: '',
        fullName: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Registration Failed', {
        description: error instanceof Error ? error.message : 'Could not register. Please try again or contact support.',
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleGoogleSignIn = () => {
    try {
      // Show loading toast
      toast.loading('Connecting to Google...', {
        description: 'Opening Google sign-in window...',
        duration: 3000
      });

      // Redirect to backend Google OAuth endpoint using BACKEND_URL from .env
      const backendUrl = import.meta.env.VITE_API_URL.replace(/\/api\/v1$/, '');
      window.location.href = `${backendUrl}/api/v1/auth/google`;
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('Sign-in Failed', {
        description: 'Unable to connect to Google. Please try again.',
        duration: 5000
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Sign In - Medhelm Supplies"
        description="Sign in to your Medhelm Supplies account to access your orders, wishlist, and account settings."
        keywords="sign in, login, account, Medhelm Supplies"
      />

      <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src={MedhelmLogo} alt="Medhelm Supplies Logo" className="mx-auto mb-4 h-12" />
            <h1 className="text-3xl font-bold text-primary mb-2">Welcome to Medhelm</h1>
            <p className="text-muted-foreground">Sign in to your account</p>
          </div>

          <Card className="shadow-lg">
            {activeTab === 'signup' && (
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Create Account</CardTitle>
                <CardDescription className="text-center">
                  Join Medhelm Supplies to access exclusive services
                </CardDescription>
              </CardHeader>
            )}

            {activeTab === 'signin' ? (
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-6">
                  <div className="space-y-2 pl-4">
                    <Label htmlFor="signin-email">Email Address</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-6">
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                    <FcGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>

                  <div className="text-center mt-2">
                    <p className="text-sm text-muted-foreground">
                      Don't have an account? <Link to="/signup" className="text-primary hover:underline font-medium">Sign up here</Link>
                    </p>
                  </div>
                </CardFooter>
              </form>
            ) : (
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" required className="form-checkbox h-4 w-4 text-primary" />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the <Link to="/terms" className="text-primary hover:underline">Terms</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-6">
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full hover:bg-[#FFF9E5]" onClick={handleGoogleSignIn}>
                    <FcGoogle className="mr-2 h-4 w-4" />
                    Google
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Already have an account? <Link to="/auth" className="text-primary hover:underline font-medium">Sign in here</Link>
                    </p>
                  </div>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Auth;
