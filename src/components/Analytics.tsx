import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target, 
  Activity,
  Zap,
  Heart,
  Trophy,
  Users,
  ChevronDown
} from 'lucide-react';

interface AnalyticsProps {
  user: any;
}

const Analytics: React.FC<AnalyticsProps> = ({ user }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('productivity');

  const periods = [
    { id: 'week', label: 'Minggu Ini' },
    { id: 'month', label: 'Bulan Ini' },
    { id: 'quarter', label: '3 Bulan' },
    { id: 'year', label: 'Tahun Ini' }
  ];

  const metrics = [
    { id: 'productivity', label: 'Produktivitas', icon: Target, color: 'blue' },
    { id: 'mood', label: 'Mood', icon: Heart, color: 'pink' },
    { id: 'energy', label: 'Energi', icon: Zap, color: 'yellow' },
    { id: 'focus', label: 'Fokus', icon: Activity, color: 'green' }
  ];

  const weeklyData = [
    { day: 'Sen', productivity: 85, mood: 7, energy: 80, focus: 75 },
    { day: 'Sel', productivity: 92, mood: 8, energy: 85, focus: 88 },
    { day: 'Rab', productivity: 78, mood: 6, energy: 70, focus: 65 },
    { day: 'Kam', productivity: 88, mood: 7, energy: 82, focus: 80 },
    { day: 'Jum', productivity: 95, mood: 9, energy: 90, focus: 92 },
    { day: 'Sab', productivity: 70, mood: 8, energy: 75, focus: 68 },
    { day: 'Min', productivity: 60, mood: 7, energy: 65, focus: 55 }
  ];

  const insights = [
    {
      title: 'Waktu Produktif Terbaik',
      value: '09:00 - 11:00',
      description: 'Kamu paling fokus dan produktif di pagi hari',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Konsistensi Mingguan',
      value: '87%',
      description: 'Peningkatan 12% dari minggu lalu',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Mood Rata-rata',
      value: '7.4/10',
      description: 'Mood stabil dengan tren positif',
      trend: 'up',
      color: 'pink'
    },
    {
      title: 'Streak Terlama',
      value: '21 hari',
      description: 'Rekor pribadi dalam rutinitas harian',
      trend: 'up',
      color: 'purple'
    }
  ];

  const habits = [
    { name: 'Olahraga Pagi', completion: 85, streak: 12 },
    { name: 'Minum Air 2L', completion: 92, streak: 18 },
    { name: 'Meditasi', completion: 78, streak: 8 },
    { name: 'Journaling', completion: 65, streak: 5 },
    { name: 'Membaca', completion: 88, streak: 15 }
  ];

  const getMetricColor = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600';
      case 'pink': return 'from-pink-500 to-pink-600';
      case 'yellow': return 'from-yellow-500 to-yellow-600';
      case 'green': return 'from-green-500 to-green-600';
      case 'purple': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const renderChart = () => {
    const maxValue = Math.max(...weeklyData.map(d => d[selectedMetric as keyof typeof d] as number));
    
    return (
      <div className="h-64 flex items-end justify-between space-x-2">
        {weeklyData.map((data, index) => {
          const value = data[selectedMetric as keyof typeof data] as number;
          const height = (value / maxValue) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center space-y-2">
              <div className="text-xs text-gray-600 font-medium">{value}%</div>
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                style={{ height: `${height}%` }}
              />
              <div className="text-xs text-gray-500">{data.day}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                selectedMetric === metric.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <metric.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{metric.label}</span>
            </button>
          ))}
        </div>
        
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periods.map((period) => (
              <option key={period.id} value={period.id}>
                {period.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Analisis {metrics.find(m => m.id === selectedMetric)?.label}
          </h3>
          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">+12% minggu ini</span>
          </div>
        </div>
        {renderChart()}
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">{insight.title}</h4>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{insight.value}</p>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Habits Performance */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Performa Kebiasaan</h3>
        <div className="space-y-4">
          {habits.map((habit, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{habit.name}</p>
                  <p className="text-sm text-gray-600">{habit.streak} hari berturut-turut</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${habit.completion}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 min-w-[40px]">
                  {habit.completion}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-8 text-white">
        <div className="flex items-start space-x-4">
          <Trophy className="w-8 h-8 text-white flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Ringkasan Mingguan</h3>
            <p className="text-blue-100 mb-4">
              Minggu ini kamu menunjukkan peningkatan yang konsisten! Produktivitas meningkat 12%, 
              mood stabil di level baik, dan berhasil mempertahankan 5 kebiasaan positif.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Tugas Diselesaikan</p>
                <p className="text-xl font-bold">47/52</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-sm text-blue-100">Waktu Fokus</p>
                <p className="text-xl font-bold">18.5 jam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;