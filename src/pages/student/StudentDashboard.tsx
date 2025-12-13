import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { LevelProgress, XPBadge, CoinBadge, StreakBadge, RankBadge } from '@/components/game/GameBadges';
import { 
  Gamepad2, 
  ClipboardList, 
  Target, 
  Trophy,
  ArrowRight,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Star,
  BookOpen
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock data - will be replaced with real data from Supabase
const mockStats = {
  xp: 2450,
  level: 12,
  coins: 350,
  streak: 7,
  rank: 5,
  xpForNextLevel: 3000,
  testsCompleted: 24,
  averageScore: 78,
  weakTopics: 3,
};

const upcomingTests = [
  { id: '1', name: 'Mathematics Chapter 5', subject: 'Mathematics', dueIn: '2 hours', difficulty: 'medium' },
  { id: '2', name: 'Physics: Motion', subject: 'Physics', dueIn: '1 day', difficulty: 'hard' },
  { id: '3', name: 'English Grammar', subject: 'English', dueIn: '3 days', difficulty: 'easy' },
];

const recentActivity = [
  { type: 'test', name: 'Chemistry Basics', score: 85, xpEarned: 120, timeAgo: '2 hours ago' },
  { type: 'achievement', name: 'First Perfect Score', xpEarned: 50, timeAgo: '1 day ago' },
  { type: 'level', name: 'Reached Level 12', xpEarned: 100, timeAgo: '2 days ago' },
];

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-game">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Adventurer'}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready for your next learning quest?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <RankBadge rank={mockStats.rank} />
            <StreakBadge days={mockStats.streak} />
          </div>
        </div>

        {/* Level Progress */}
        <Card variant="gameHighlight" className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <LevelProgress 
                currentXP={mockStats.xp} 
                xpForNextLevel={mockStats.xpForNextLevel} 
                level={mockStats.level} 
              />
            </div>
            <div className="flex items-center gap-3">
              <CoinBadge coins={mockStats.coins} size="lg" />
              <Link to="/student/game">
                <Button variant="game" size="lg">
                  <Gamepad2 size={20} />
                  Enter Game World
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="interactive">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-game-pipe to-game-pipe-dark flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold font-game">{mockStats.testsCompleted}</div>
              <div className="text-sm text-muted-foreground">Tests Completed</div>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-game-gold to-game-star flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-2xl font-bold font-game">{mockStats.averageScore}%</div>
              <div className="text-sm text-muted-foreground">Average Score</div>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-game-mushroom to-destructive flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold font-game">{mockStats.weakTopics}</div>
              <div className="text-sm text-muted-foreground">Weak Areas</div>
            </CardContent>
          </Card>

          <Card variant="interactive">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-game-boss to-purple-800 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold font-game">#{mockStats.rank}</div>
              <div className="text-sm text-muted-foreground">Leaderboard</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upcoming Tests */}
          <Card variant="default" className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                Upcoming Tests
              </CardTitle>
              <Link to="/student/tests">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight size={16} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTests.map((test) => (
                <div 
                  key={test.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{test.name}</h4>
                      <p className="text-sm text-muted-foreground">{test.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      test.difficulty === 'easy' ? 'bg-game-pipe/20 text-game-pipe' :
                      test.difficulty === 'medium' ? 'bg-game-gold/20 text-game-gold' :
                      'bg-game-mushroom/20 text-game-mushroom'
                    }`}>
                      {test.difficulty}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock size={14} />
                      {test.dueIn}
                    </div>
                    <Link to={`/student/test/${test.id}`}>
                      <Button variant="gameSecondary" size="sm">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card variant="default">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-game-gold" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'test' ? 'bg-game-pipe/20' :
                    activity.type === 'achievement' ? 'bg-game-gold/20' :
                    'bg-game-boss/20'
                  }`}>
                    {activity.type === 'test' && <CheckCircle className="w-4 h-4 text-game-pipe" />}
                    {activity.type === 'achievement' && <Star className="w-4 h-4 text-game-gold" />}
                    {activity.type === 'level' && <Zap className="w-4 h-4 text-game-boss" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.name}</p>
                    {activity.score && (
                      <p className="text-xs text-muted-foreground">Score: {activity.score}%</p>
                    )}
                    <p className="text-xs text-game-gold">+{activity.xpEarned} XP</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.timeAgo}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/student/game" className="block">
            <Card variant="game" className="h-full hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <Gamepad2 className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h3 className="font-bold">Game World</h3>
                <p className="text-sm text-muted-foreground">Explore & Learn</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/student/tests" className="block">
            <Card variant="game" className="h-full hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <ClipboardList className="w-10 h-10 mx-auto mb-3 text-secondary" />
                <h3 className="font-bold">My Tests</h3>
                <p className="text-sm text-muted-foreground">View All Tests</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/student/weak-tests" className="block">
            <Card variant="game" className="h-full hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <Target className="w-10 h-10 mx-auto mb-3 text-destructive" />
                <h3 className="font-bold">Weak Areas</h3>
                <p className="text-sm text-muted-foreground">Practice More</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/student/leaderboard" className="block">
            <Card variant="game" className="h-full hover:scale-105 transition-transform cursor-pointer">
              <CardContent className="p-6 text-center">
                <Trophy className="w-10 h-10 mx-auto mb-3 text-game-gold" />
                <h3 className="font-bold">Leaderboard</h3>
                <p className="text-sm text-muted-foreground">Check Rankings</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </StudentLayout>
  );
}
