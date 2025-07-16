import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  MessageCircle,
  Bot,
  User,
  Zap,
  Calendar,
  Target,
  Heart,
  Settings,
  HelpCircle
} from 'lucide-react';

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [conversation, setConversation] = useState([
    {
      id: 1,
      type: 'assistant',
      message: 'Halo! Saya adalah AI Assistant Rutinitas Pintar. Bagaimana saya bisa membantu kamu hari ini?',
      timestamp: new Date(Date.now() - 5000)
    },
    {
      id: 2,
      type: 'user',
      message: 'Ingatkan saya untuk minum air setiap 2 jam',
      timestamp: new Date(Date.now() - 3000)
    },
    {
      id: 3,
      type: 'assistant',
      message: 'Tentu! Saya sudah mengatur pengingat untuk minum air setiap 2 jam mulai dari sekarang. Kamu akan menerima notifikasi pada 14:00, 16:00, dan seterusnya. Apakah ada yang ingin kamu ubah dari pengingat ini?',
      timestamp: new Date(Date.now() - 1000)
    }
  ]);

  const quickActions = [
    {
      id: 'schedule',
      icon: Calendar,
      label: 'Atur Jadwal',
      command: 'Atur jadwal belajar jam 7 malam',
      color: 'blue'
    },
    {
      id: 'reminder',
      icon: Target,
      label: 'Buat Pengingat',
      command: 'Ingatkan saya olahraga besok pagi',
      color: 'green'
    },
    {
      id: 'mood',
      icon: Heart,
      label: 'Cek Mood',
      command: 'Bagaimana cara meningkatkan mood?',
      color: 'pink'
    },
    {
      id: 'focus',
      icon: Zap,
      label: 'Mode Fokus',
      command: 'Mulai sesi fokus 25 menit',
      color: 'purple'
    }
  ];

  const suggestions = [
    'Atur rutinitas pagi saya',
    'Analisis produktivitas minggu ini',
    'Rekomendasi aktivitas untuk mood baik',
    'Bagaimana cara tidur lebih berkualitas?',
    'Buat jadwal olahraga yang konsisten'
  ];

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setMessage('Ingatkan saya untuk istirahat setiap 30 menit');
        setIsListening(false);
      }, 3000);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: conversation.length + 1,
        type: 'user' as const,
        message: message.trim(),
        timestamp: new Date()
      };
      
      setConversation([...conversation, newMessage]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: conversation.length + 2,
          type: 'assistant' as const,
          message: 'Baik! Saya akan mengingatkan kamu untuk istirahat setiap 30 menit. Pengingat pertama akan muncul dalam 30 menit dari sekarang. Apakah kamu ingin saya tambahkan saran aktivitas istirahat juga?',
          timestamp: new Date()
        };
        setConversation(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleQuickAction = (command: string) => {
    setMessage(command);
    handleSendMessage();
  };

  const getActionColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'green': return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'pink': return 'bg-pink-100 text-pink-700 hover:bg-pink-200';
      case 'purple': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
      default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Voice Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">AI Voice Assistant</h2>
              <p className="text-sm text-gray-600">
                {isListening ? 'Sedang mendengarkan...' : 'Siap membantu kamu'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                isVoiceEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.command)}
              className={`p-4 rounded-xl transition-all duration-200 ${getActionColor(action.color)}`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-96">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Chat dengan AI</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversation.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                }`}>
                  {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div>
                  <div className={`p-3 rounded-xl ${
                    msg.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isListening && (
            <div className="flex justify-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-xl p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVoiceToggle}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ketik pesan atau gunakan voice..."
              className="flex-1 px-4 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Saran Pertanyaan</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setMessage(suggestion)}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;