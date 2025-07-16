import React, { useState } from 'react';
import { Brain, Mail, Lock, Eye, EyeOff, User, ArrowRight, CheckCircle, ToggleLeft as Google, Facebook, Apple } from 'lucide-react';

interface AuthPageProps {
  onLogin: (userData: any) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password tidak cocok';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '1',
        name: isLogin ? 'Khulafa' : formData.name,
        email: formData.email,
        avatar: null,
        streak: 7,
        todayMood: 'good',
        energyLevel: 80,
        completedTasks: 8,
        totalTasks: 12,
        joinDate: new Date().toISOString(),
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'id'
        }
      };

      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social login
    setTimeout(() => {
      const userData = {
        id: '1',
        name: 'Khulafa',
        email: `user@${provider}.com`,
        avatar: null,
        streak: 7,
        todayMood: 'good',
        energyLevel: 80,
        completedTasks: 8,
        totalTasks: 12,
        joinDate: new Date().toISOString(),
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'id'
        }
      };

      onLogin(userData);
      setIsLoading(false);
    }, 1500);
  };

  const features = [
    {
      icon: Brain,
      title: 'AI Personal Assistant',
      description: 'Asisten pintar yang memahami kebutuhan harian Anda'
    },
    {
      icon: CheckCircle,
      title: 'Smart Reminders',
      description: 'Pengingat cerdas berdasarkan aktivitas dan lokasi'
    },
    {
      icon: ArrowRight,
      title: 'Progress Tracking',
      description: 'Analisis mendalam untuk meningkatkan produktivitas'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex">
      {/* Left Side - Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-green-600 p-12 flex-col justify-center text-white">
        <div className="max-w-md">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Rutinitas Pintar</h1>
              <p className="text-blue-100">AI Life Assistant</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-6">
            Kelola Hidup Lebih Cerdas dengan AI
          </h2>
          
          <p className="text-blue-100 mb-8 text-lg leading-relaxed">
            Platform berbasis kecerdasan buatan yang membantu Anda menjalani kehidupan 
            sehari-hari dengan lebih terstruktur, sehat, dan produktif.
          </p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Rutinitas Pintar</h1>
            </div>
            <p className="text-gray-600">AI Life Assistant</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Selamat Datang Kembali!' : 'Mulai Perjalanan Anda'}
              </h2>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Masuk ke akun Anda untuk melanjutkan rutinitas pintar' 
                  : 'Daftar sekarang dan rasakan hidup yang lebih terorganisir'
                }
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <Google className="w-5 h-5 text-red-500" />
                <span className="text-gray-700 font-medium">
                  {isLogin ? 'Masuk' : 'Daftar'} dengan Google
                </span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Facebook className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">Facebook</span>
                </button>
                
                <button
                  onClick={() => handleSocialLogin('apple')}
                  disabled={isLoading}
                  className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Apple className="w-5 h-5 text-gray-900" />
                  <span className="text-gray-700 font-medium">Apple</span>
                </button>
              </div>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">atau</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="nama@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Masukkan password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Ulangi password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                  </label>
                  <button type="button" className="text-sm text-blue-600 hover:text-blue-700">
                    Lupa password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-medium rounded-xl hover:from-blue-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memproses...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>{isLogin ? 'Masuk' : 'Daftar Sekarang'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                    setErrors({ name: '', email: '', password: '', confirmPassword: '' });
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? 'Daftar di sini' : 'Masuk di sini'}
                </button>
              </p>
            </div>

            {!isLogin && (
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Dengan mendaftar, Anda menyetujui{' '}
                  <button className="text-blue-600 hover:text-blue-700">Syarat & Ketentuan</button>
                  {' '}dan{' '}
                  <button className="text-blue-600 hover:text-blue-700">Kebijakan Privasi</button>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;