import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  Users,
  Bell,
  Repeat,
  Brain,
  Zap,
  Target,
  Coffee
} from 'lucide-react';

const SmartCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const events = [
    {
      id: 1,
      title: 'Meeting Tim Proyek',
      time: '09:00 - 10:30',
      type: 'work',
      location: 'Ruang Rapat A',
      participants: ['John', 'Sarah', 'Mike'],
      aiSuggestion: 'Siapkan agenda dan materi presentasi'
    },
    {
      id: 2,
      title: 'Olahraga Pagi',
      time: '06:00 - 07:00',
      type: 'health',
      location: 'Gym',
      aiSuggestion: 'Energi optimal untuk cardio'
    },
    {
      id: 3,
      title: 'Belajar Python',
      time: '19:00 - 21:00',
      type: 'learning',
      location: 'Rumah',
      aiSuggestion: 'Fokus pada praktik coding'
    },
    {
      id: 4,
      title: 'Makan Siang',
      time: '12:00 - 13:00',
      type: 'daily',
      location: 'Restoran Favorit',
      aiSuggestion: 'Pilih menu sehat untuk energy siang'
    }
  ];

  const aiRecommendations = [
    {
      time: '08:00',
      activity: 'Deep Work Session',
      reason: 'Waktu fokus terbaik berdasarkan pola kamu',
      duration: '2 jam'
    },
    {
      time: '15:00',
      activity: 'Istirahat & Stretching',
      reason: 'Mencegah kelelahan sore hari',
      duration: '15 menit'
    },
    {
      time: '17:30',
      activity: 'Review Harian',
      reason: 'Evaluasi progres dan planning besok',
      duration: '30 menit'
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'health': return 'bg-green-100 text-green-800 border-green-200';
      case 'learning': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'daily': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'work': return Target;
      case 'health': return Zap;
      case 'learning': return Brain;
      case 'daily': return Coffee;
      default: return Calendar;
    }
  };

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-200">
                <Plus className="w-4 h-4" />
                <span>Tambah Acara</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-3 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => (
              <button
                key={index}
                onClick={() => day && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                className={`p-3 text-center text-sm transition-all duration-200 hover:bg-gray-100 rounded-lg ${
                  day === null
                    ? 'cursor-default'
                    : isToday(day)
                    ? 'bg-blue-500 text-white font-bold'
                    : isSelected(day)
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Today's Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acara Hari Ini</h3>
            <div className="space-y-3">
              {events.map((event) => {
                const Icon = getEventIcon(event.type);
                return (
                  <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <p className="text-xs text-gray-600 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-600 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Rekomendasi AI</h3>
            </div>
            <div className="space-y-3">
              {aiRecommendations.map((rec, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm">{rec.activity}</p>
                    <span className="text-xs text-purple-100">{rec.time}</span>
                  </div>
                  <p className="text-xs text-purple-100">{rec.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Scheduling */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Penjadwalan Pintar</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Waktu Optimal</h4>
            <p className="text-sm text-blue-700">
              AI merekomendasikan slot waktu terbaik berdasarkan pola produktivitas kamu
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Auto Sync</h4>
            <p className="text-sm text-green-700">
              Sinkronisasi otomatis dengan Google Calendar dan aplikasi lainnya
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Conflict Detection</h4>
            <p className="text-sm text-purple-700">
              Deteksi otomatis konflik jadwal dan saran alternatif
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCalendar;