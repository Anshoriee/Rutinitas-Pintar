import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Crown,
  Medal,
  Users,
  TrendingUp,
  Calendar,
  Award,
  Flame,
  CheckCircle
} from 'lucide-react';

interface GamificationProps {
  user: any;
}

const Gamification: React.FC<GamificationProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'achievements' | 'leaderboard' | 'challenges'>('achievements');

  const achievements = [
    {
      id: 1,
      title: 'Early Bird',
      description: 'Bangun sebelum jam 6 pagi selama 7 hari berturut-turut',
      icon: '🌅',
      progress: 7,
      target: 7,
      completed: true,
      xp: 100,
      category: 'health'
    },
    {
      id: 2,
      title: 'Focus Master',
      description: 'Selesaikan 50 sesi Pomodoro',
      icon: '🧠',
      progress: 35,
      target: 50,
      completed: false,
      xp: 150,
      category: 'productivity'
    },
    {
      id: 3,
      title: 'Hydration Hero',
      description: 'Minum 8 gelas air setiap hari selama seminggu',
      icon: '💧',
      progress: 5,
      target: 7,
      completed: false,
      xp: 75,
      category: 'health'
    },
    {
      id: 4,
      title: 'Streak Champion',
      description: 'Pertahankan streak 30 hari',
      icon: '🔥',
      progress: 21,
      target: 30,
      completed: false,
      xp: 200,
      category: 'consistency'
    },
    {
      id: 5,
      title: 'Mood Tracker',
      description: 'Catat mood harian selama 14 hari',
      icon: '❤️',
      progress: 14,
      target: 14,
      completed: true,
      xp: 80,
      category: 'wellness'
    }
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Alex Johnson',
      avatar: '👨‍💻',
      points: 2850,
      streak: 45,
      badges: 12
    },
    {
      rank: 2,
      name: 'Khulafa Chen',
      avatar: '👩‍🎓',
      points: 2720,
      streak: 38,
      badges: 10
    },
    {
      rank: 3,
      name: 'You',
      avatar: '👤',
      points: 2650,
      streak: 21,
      badges: 8,
      isCurrentUser: true
    },
    {
      rank: 4,
      name: 'Mike Rodriguez',
      avatar: '👨‍🏫',
      points: 2580,
      streak: 33,
      badges: 9
    },
    {
      rank: 5,
      name: 'Emma Wilson',
      avatar: '👩‍💼',
      points: 2410,
      streak: 28,
      badges: 7
    }
  ];

  const challenges = [
    {
      id: 1,
      title: 'Workout Week',
      description: 'Olahraga minimal 30 menit setiap hari selama seminggu',
      duration: '7 hari',
      participants: 847,
      reward: 150,
      difficulty: 'medium',
      category: 'health',
      endDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Digital Detox',
      description: 'Batasi screen time di bawah 4 jam sehari',
      duration: '5 hari',
      participants: 324,
      reward: 100,
      difficulty: 'hard',
      category: 'wellness',
      endDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Reading Marathon',
      description: 'Baca minimal 30 halaman buku setiap hari',
      duration: '10 hari',
      participants: 562,
      reward: 200,
      difficulty: 'easy',
      category: 'learning',
      endDate: '2024-01-18'
    }
  ];

  const stats = {
    totalXP: 2650,
    level: 8,
    xpToNextLevel: 350,
    totalBadges: 8,
    weeklyRank: 3,
    completedChallenges: 12
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'health': return 'bg-green-100 text-green-800';
      case 'productivity': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-purple-100 text-purple-800';
      case 'learning': return 'bg-orange-100 text-orange-800';
      case 'consistency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderAchievements = () => (
    <div className="space-y-4">
      {achievements.map((achievement) => (
        <div key={achievement.id} className={`p-6 rounded-xl border-2 transition-all duration-200 ${
          achievement.completed 
            ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-start space-x-4">
            <div className={`text-3xl ${achievement.completed ? 'grayscale-0' : 'grayscale'}`}>
              {achievement.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                    {achievement.category}
                  </span>
                  {achievement.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">
                      {achievement.progress}/{achievement.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-yellow-600">
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">{achievement.xp} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-4">
      {leaderboard.map((user) => (
        <div key={user.rank} className={`p-4 rounded-xl border-2 transition-all duration-200 ${
          user.isCurrentUser 
            ? 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-200' 
            : 'bg-white border-gray-200 hover:border-gray-300'
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
              user.rank === 2 ? 'bg-gray-300 text-gray-700' :
              user.rank === 3 ? 'bg-orange-400 text-orange-900' :
              'bg-gray-100 text-gray-600'
            }`}>
              {user.rank <= 3 ? <Crown className="w-5 h-5" /> : user.rank}
            </div>
            <div className="text-2xl">{user.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{user.name}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4" />
                    <span>{user.points}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4" />
                    <span>{user.streak}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Medal className="w-4 h-4" />
                    <span>{user.badges}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">{challenge.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{challenge.participants.toLocaleString()} peserta</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(challenge.category)}`}>
                  {challenge.category}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-yellow-600">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">{challenge.reward} XP</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Berakhir: {challenge.endDate}</p>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200">
              Join Challenge
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Level</h3>
            <Zap className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold">{stats.level}</p>
          <p className="text-blue-100 text-sm">{stats.xpToNextLevel} XP to next level</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Total XP</h3>
            <Star className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold">{stats.totalXP.toLocaleString()}</p>
          <p className="text-green-100 text-sm">All time points</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Badges</h3>
            <Award className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold">{stats.totalBadges}</p>
          <p className="text-purple-100 text-sm">Achievements unlocked</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Weekly Rank</h3>
            <Trophy className="w-6 h-6" />
          </div>
          <p className="text-3xl font-bold">#{stats.weeklyRank}</p>
          <p className="text-orange-100 text-sm">This week's position</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
            { id: 'challenges', label: 'Challenges', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'achievements' && renderAchievements()}
          {activeTab === 'leaderboard' && renderLeaderboard()}
          {activeTab === 'challenges' && renderChallenges()}
        </div>
      </div>
    </div>
  );
};

export default Gamification;