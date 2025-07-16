import React from 'react';
import { 
  CheckCircle, 
  TrendingUp, 
  Clock, 
  Target, 
  Activity, 
  Heart,
  Sun,
  Droplets,
  Calendar,
  Zap,
  Award,
  Plus
} from 'lucide-react';

interface DashboardProps {
  user: {
    name: string;
    streak: number;
    todayMood: string;
    energyLevel: number;
    completedTasks: number;
    totalTasks: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const quickStats = [
    { label: 'Tasks Completed', value: `${user.completedTasks}/${user.totalTasks}`, icon: CheckCircle, color: 'green' },
    { label: 'Energy Level', value: `${user.energyLevel}%`, icon: Zap, color: 'yellow' },
    { label: 'Streak Days', value: user.streak, icon: Award, color: 'blue' },
    { label: 'Focus Time', value: '2h 30m', icon: Clock, color: 'purple' },
  ];

  const todayRecommendations = [
    {
      id: 1,
      title: 'Minum Air Putih',
      description: 'Kamu belum minum air selama 1.5 jam. Saatnya hidrasi!',
      priority: 'high',
      icon: Droplets,
      time: '10 menit lagi'
    },
    {
      id: 2,
      title: 'Stretching Ringan',
      description: 'Duduk terlalu lama dapat menyebabkan kekakuan. Lakukan stretching 5 menit.',
      priority: 'medium',
      icon: Activity,
      time: '15 menit lagi'
    },
    {
      id: 3,
      title: 'Review Jurnal Harian',
      description: 'Waktu yang tepat untuk refleksi dan menulis jurnal hari ini.',
      priority: 'low',
      icon: Heart,
      time: '30 menit lagi'
    }
  ];

  const upcomingSchedule = [
    { time: '14:00', task: 'Meeting Tim Proyek', type: 'work' },
    { time: '15:30', task: 'Olahraga Ringan', type: 'health' },
    { time: '17:00', task: 'Belajar Skill Baru', type: 'personal' },
    { time: '19:00', task: 'Makan Malam', type: 'daily' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatColor = (color: string) => {
    switch (color) {
      case 'green': return 'from-green-500 to-green-600';
      case 'yellow': return 'from-yellow-500 to-yellow-600';
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Pagi';
    if (hour < 15) return 'Siang';
    if (hour < 18) return 'Sore';
    return 'Malam';
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Selamat {getGreeting()}, {user.name}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Kamu sudah menyelesaikan {user.completedTasks} tugas hari ini. Tetap semangat!
            </p>
          </div>
          <div className="text-right">
            <Sun className="w-16 h-16 text-yellow-300 mb-2" />
            <p className="text-sm text-blue-100">Cuaca: Cerah</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatColor(stat.color)} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Recommendations */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Rekomendasi Hari Ini</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Lihat Semua
              </button>
            </div>
            <div className="space-y-4">
              {todayRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <rec.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <p className="text-xs text-blue-600 font-medium">{rec.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Jadwal Mendatang</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingSchedule.map((schedule, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{schedule.task}</p>
                  <p className="text-xs text-gray-500">{schedule.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium">
            Tambah Jadwal
          </button>
        </div>
      </div>

      {/* AI Daily Brief */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">AI Daily Brief</h3>
            <p className="text-purple-100 leading-relaxed">
              Berdasarkan analisis aktivitas kamu, hari ini adalah waktu yang tepat untuk fokus pada tugas kreatif. 
              Mood kamu sedang baik dan energi tinggi. Jangan lupa istirahat sejenak di sore hari untuk menjaga produktivitas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;