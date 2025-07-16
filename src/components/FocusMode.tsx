import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer, 
  Coffee, 
  Brain,
  Volume2,
  VolumeX,
  Settings,
  Target,
  Zap,
  CheckCircle
} from 'lucide-react';

const FocusMode: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [mode, setMode] = useState<'work' | 'break' | 'longBreak'>('work');
  const [cycle, setCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState('nature');

  const modes = {
    work: { duration: 25, label: 'Fokus', color: 'blue', icon: Brain },
    break: { duration: 5, label: 'Istirahat', color: 'green', icon: Coffee },
    longBreak: { duration: 15, label: 'Istirahat Panjang', color: 'purple', icon: Coffee }
  };

  const musicOptions = [
    { id: 'nature', label: 'Suara Alam', description: 'Hujan, ombak, burung' },
    { id: 'classical', label: 'Musik Klasik', description: 'Mozart, Chopin' },
    { id: 'ambient', label: 'Ambient', description: 'Elektronik lembut' },
    { id: 'binaural', label: 'Binaural Beats', description: 'Frekuensi fokus' },
    { id: 'silence', label: 'Sunyi', description: 'Tanpa musik' }
  ];

  const todayStats = {
    focusTime: 142, // minutes
    completedCycles: 6,
    tasks: 8,
    streak: 3
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      setTotalCycles(prev => prev + 1);
      if (cycle % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(modes.longBreak.duration * 60);
      } else {
        setMode('break');
        setTimeLeft(modes.break.duration * 60);
      }
    } else {
      setMode('work');
      setTimeLeft(modes.work.duration * 60);
      setCycle(prev => prev + 1);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(modes[mode].duration * 60);
  };

  const switchMode = (newMode: 'work' | 'break' | 'longBreak') => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration * 60);
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    const totalDuration = modes[mode].duration * 60;
    return ((totalDuration - timeLeft) / totalDuration) * 100;
  };

  const getModeColor = (modeType: string) => {
    switch (modeType) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="space-y-8">
      {/* Timer Section */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - getProgressPercentage() / 100)}`}
                  className="transition-all duration-1000"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {modes[mode].label}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={toggleTimer}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white'
              }`}
            >
              {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span>{isActive ? 'Pause' : 'Start'}</span>
            </button>
            <button
              onClick={resetTimer}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="flex justify-center space-x-2">
            {Object.entries(modes).map(([key, modeInfo]) => (
              <button
                key={key}
                onClick={() => switchMode(key as 'work' | 'break' | 'longBreak')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === key
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {modeInfo.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Music & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Musik Fokus</h3>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {musicOptions.map((music) => (
              <button
                key={music.id}
                onClick={() => setSelectedMusic(music.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedMusic === music.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h4 className="font-medium text-gray-900 mb-1">{music.label}</h4>
                <p className="text-sm text-gray-600">{music.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Statistik Hari Ini</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Waktu Fokus</span>
              </div>
              <span className="font-medium text-gray-900">{todayStats.focusTime}m</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Siklus Selesai</span>
              </div>
              <span className="font-medium text-gray-900">{todayStats.completedCycles}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600">Tugas Selesai</span>
              </div>
              <span className="font-medium text-gray-900">{todayStats.tasks}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Streak</span>
              </div>
              <span className="font-medium text-gray-900">{todayStats.streak} hari</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-8 text-white">
        <div className="flex items-start space-x-4">
          <Brain className="w-8 h-8 text-white flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2">AI Focus Insights</h3>
            <p className="text-blue-100 mb-4">
              Berdasarkan analisis pola fokus kamu, waktu paling produktif adalah pukul 09:00-11:00 dan 14:00-16:00. 
              Disarankan untuk menggunakan teknik Pomodoro 25 menit untuk tugas kreatif.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Rata-rata Fokus</p>
                <p className="text-xl font-bold">87%</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Produktivitas Peak</p>
                <p className="text-xl font-bold">10:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;