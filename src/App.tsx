import React, { useState, useEffect } from 'react';
import AuthPage from './components/AuthPage';
import { 
  Brain, 
  Calendar, 
  BarChart3, 
  Target, 
  Timer, 
  MessageCircle, 
  Trophy,
  Settings,
  Bell,
  Sun,
  Moon,
  Activity,
  Heart,
  Zap,
  CheckCircle,
  Plus
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import MoodTracker from './components/MoodTracker';
import Analytics from './components/Analytics';
import FocusMode from './components/FocusMode';
import SmartCalendar from './components/SmartCalendar';
import VoiceAssistant from './components/VoiceAssistant';
import Gamification from './components/Gamification';
import SmartNotifications from './components/SmartNotifications';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    name: 'Khulafa',
    streak: 7,
    todayMood: 'good',
    energyLevel: 80,
    completedTasks: 8,
    totalTasks: 12
  });

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('rutinitas_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('rutinitas_user');
      }
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('rutinitas_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({
      name: '',
      streak: 0,
      todayMood: 'neutral',
      energyLevel: 50,
      completedTasks: 0,
      totalTasks: 0
    });
    localStorage.removeItem('rutinitas_user');
    setCurrentView('dashboard');
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Brain },
    { id: 'mood', label: 'Mood Tracker', icon: Heart },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'focus', label: 'Focus Mode', icon: Timer },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'voice', label: 'AI Assistant', icon: MessageCircle },
    { id: 'gamification', label: 'Achievements', icon: Trophy },
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'mood':
        return <MoodTracker user={user} setUser={setUser} />;
      case 'analytics':
        return <Analytics user={user} />;
      case 'focus':
        return <FocusMode />;
      case 'calendar':
        return <SmartCalendar />;
      case 'voice':
        return <VoiceAssistant />;
      case 'gamification':
        return <Gamification user={user} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-xl border-r border-gray-100 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Rutinitas Pintar</h1>
                <p className="text-xs text-gray-500">AI Life Assistant</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    currentView === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    currentView === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.streak} days streak</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 hover:text-red-700 mt-1"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-100 px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {navigationItems.find(item => item.id === currentView)?.label}
                </h2>
                <p className="text-gray-600 mt-1">
                  {new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <SmartNotifications />
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="p-8">
            {renderCurrentView()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;