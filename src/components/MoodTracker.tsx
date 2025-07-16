import React, { useState } from 'react';
import { 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  Zap, 
  Brain,
  Coffee,
  Moon,
  Sun,
  Activity,
  Lightbulb,
  Music
} from 'lucide-react';

interface MoodTrackerProps {
  user: any;
  setUser: (user: any) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ user, setUser }) => {
  const [selectedMood, setSelectedMood] = useState(user.todayMood);
  const [energyLevel, setEnergyLevel] = useState(user.energyLevel);
  const [sleepQuality, setSleepQuality] = useState(7);
  const [stressLevel, setStressLevel] = useState(4);

  const moodOptions = [
    { id: 'excellent', label: 'Sangat Baik', icon: Smile, color: 'text-green-500', bg: 'bg-green-100' },
    { id: 'good', label: 'Baik', icon: Smile, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'neutral', label: 'Netral', icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-100' },
    { id: 'bad', label: 'Buruk', icon: Frown, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'terrible', label: 'Sangat Buruk', icon: Frown, color: 'text-red-500', bg: 'bg-red-100' }
  ];

  const aiRecommendations = [
    {
      icon: Coffee,
      title: 'Minum Teh Herbal',
      description: 'Berdasarkan mood kamu, teh chamomile bisa membantu rileks'
    },
    {
      icon: Activity,
      title: 'Olahraga Ringan',
      description: 'Jalan kaki 15 menit bisa meningkatkan mood secara alami'
    },
    {
      icon: Music,
      title: 'Dengarkan Musik',
      description: 'Musik klasik atau jazz bisa membantu menenangkan pikiran'
    },
    {
      icon: Lightbulb,
      title: 'Journaling',
      description: 'Tulis 3 hal yang kamu syukuri hari ini'
    }
  ];

  const handleMoodSubmit = () => {
    setUser({
      ...user,
      todayMood: selectedMood,
      energyLevel: energyLevel
    });
    // Here you would typically save to backend
    alert('Mood berhasil disimpan! AI akan memberikan rekomendasi yang sesuai.');
  };

  const getMoodAnalysis = () => {
    switch (selectedMood) {
      case 'excellent':
        return {
          message: 'Luar biasa! Kamu dalam kondisi optimal hari ini.',
          color: 'text-green-600',
          recommendation: 'Manfaatkan energi positif ini untuk menyelesaikan tugas-tugas penting.'
        };
      case 'good':
        return {
          message: 'Mood kamu cukup baik. Pertahankan semangat ini!',
          color: 'text-blue-600',
          recommendation: 'Waktu yang tepat untuk aktivitas kreatif dan bersosialisasi.'
        };
      case 'neutral':
        return {
          message: 'Mood kamu netral. Mari kita tingkatkan sedikit!',
          color: 'text-yellow-600',
          recommendation: 'Coba aktivitas yang kamu sukai untuk meningkatkan mood.'
        };
      case 'bad':
        return {
          message: 'Sepertinya hari ini kurang menyenangkan.',
          color: 'text-orange-600',
          recommendation: 'Istirahatlah sejenak dan lakukan self-care.'
        };
      case 'terrible':
        return {
          message: 'Kamu butuh dukungan ekstra hari ini.',
          color: 'text-red-600',
          recommendation: 'Prioritaskan kesehatan mental dan jangan ragu minta bantuan.'
        };
      default:
        return {
          message: 'Pilih mood kamu untuk mendapatkan rekomendasi AI.',
          color: 'text-gray-600',
          recommendation: ''
        };
    }
  };

  const analysis = getMoodAnalysis();

  return (
    <div className="space-y-8">
      {/* Mood Selection */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bagaimana Perasaan Kamu Hari Ini?</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {moodOptions.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(mood.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                selectedMood === mood.id 
                  ? `${mood.bg} border-current ${mood.color}` 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <mood.icon className={`w-8 h-8 mx-auto mb-2 ${
                selectedMood === mood.id ? mood.color : 'text-gray-400'
              }`} />
              <p className={`text-sm font-medium ${
                selectedMood === mood.id ? mood.color : 'text-gray-600'
              }`}>
                {mood.label}
              </p>
            </button>
          ))}
        </div>

        {/* Energy Level Slider */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Tingkat Energi: {energyLevel}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={energyLevel}
            onChange={(e) => setEnergyLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Sangat Lelah</span>
            <span>Berenergi Tinggi</span>
          </div>
        </div>

        {/* Sleep and Stress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Kualitas Tidur (1-10): {sleepQuality}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={sleepQuality}
              onChange={(e) => setSleepQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tingkat Stress (1-10): {stressLevel}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleMoodSubmit}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-200"
        >
          Simpan & Dapatkan Rekomendasi AI
        </button>
      </div>

      {/* AI Analysis */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-8 text-white">
        <div className="flex items-start space-x-4">
          <Brain className="w-8 h-8 text-white flex-shrink-0" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Analisis AI</h3>
            <p className="text-purple-100 mb-4">{analysis.message}</p>
            {analysis.recommendation && (
              <p className="text-purple-100 italic">{analysis.recommendation}</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Rekomendasi Berdasarkan Mood</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <rec.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-600">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Riwayat Mood Minggu Ini</h3>
        <div className="flex items-center justify-between">
          {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day, index) => (
            <div key={day} className="text-center">
              <p className="text-sm text-gray-600 mb-2">{day}</p>
              <div className={`w-8 h-8 rounded-full mx-auto ${
                index === 3 ? 'bg-blue-500' : 'bg-green-400'
              }`}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;