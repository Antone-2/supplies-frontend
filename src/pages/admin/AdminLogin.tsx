import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Shield, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { toast } from 'sonner';
import SEOHead from '@/components/SEOHead';
import MedhelmLogo from '@/assets/medhelm-logo.svg';

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { admin, isLoading, login } = useAdminAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);

    const from = (location.state as { from?: string })?.from || '/admin/dashboard';

    // Redirect if already authenticated
    useEffect(() => {
        if (admin && !isLoading) {
            navigate(from, { replace: true });
        }
    }, [admin, isLoading, navigate, from]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoginLoading(true);

        try {
            await login(formData.email, formData.password);
            navigate(from, { replace: true });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Login failed';

            if (errorMessage.includes('Access denied')) {
                toast.error('Access Denied', {
                    description: 'This login is for administrators only. Please use the main site login for customer access.',
                    duration: 6000,
                });
            } else if (errorMessage.includes('Invalid credentials')) {
                toast.error('Invalid Credentials', {
                    description: 'Please check your email and password and try again.',
                });
            } else {
                toast.error('Login Failed', {
                    description: errorMessage,
                });
            }
        } finally {
            setLoginLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Show nothing while checking auth state
    if (isLoading) {
        return null;
    }

    // Redirect if already logged in
    if (admin) {
        return <Navigate to={from} replace />;
    }

    return (
        <>
            <SEOHead
                title="Admin Login - MEDHELM Supplies"
                description="Administrator login for MEDHELM Supplies management panel"
                keywords="admin, login, management, MEDHELM supplies"
            />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="bg-white p-3 rounded-full shadow-lg">
                                <img src={MedhelmLogo} alt="Medhelm Logo" className="h-8" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
                        <p className="text-gray-600">Sign in to access the management dashboard</p>
                    </div>

                    {/* Admin Warning */}
                    <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-medium text-amber-800">Administrator Access Only</p>
                            <p className="text-sm text-amber-700 mt-1">
                                This portal is restricted to authorized administrators.
                                Customers should use the main website login.
                            </p>
                        </div>
                    </div>

                    <Card className="shadow-xl border-0">
                        <CardHeader className="space-y-1">
                            <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                                <Shield className="h-6 w-6 text-blue-600" />
                                Admin Login
                            </CardTitle>
                            <CardDescription className="text-center">
                                Enter your administrator credentials
                            </CardDescription>
                        </CardHeader>

                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Email Address</Label>
                                    <Input
                                        id="admin-email"
                                        name="email"
                                        type="email"
                                        placeholder="admin@medhelmsupplies.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={loginLoading}
                                        required
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="admin-password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="admin-password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            disabled={loginLoading}
                                            required
                                            autoComplete="current-password"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={togglePasswordVisibility}
                                            disabled={loginLoading}
                                        >
                                            {showPassword ?
                                                <EyeOff className="h-4 w-4" /> :
                                                <Eye className="h-4 w-4" />
                                            }
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="flex flex-col space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={loginLoading}
                                >
                                    {loginLoading ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <Shield className="mr-2 h-4 w-4" />
                                            Sign In as Admin
                                        </>
                                    )}
                                </Button>

                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Not an admin? {' '}
                                        <button
                                            type="button"
                                            onClick={() => navigate('/')}
                                            className="text-blue-600 hover:text-blue-800 font-medium underline"
                                        >
                                            Go to main site
                                        </button>
                                    </p>
                                </div>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* Footer */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>MEDHELM Supplies Ltd © 2024</p>
                        <p>Secure Administrator Portal</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;