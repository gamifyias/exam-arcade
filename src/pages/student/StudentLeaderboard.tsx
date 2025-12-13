import { StudentLayout } from '@/components/layout/StudentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RankBadge, XPBadge } from '@/components/game/GameBadges';
import { Trophy, Medal, Crown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock leaderboard data
const mockLeaderboard = [
  { rank: 1, name: 'Alice Johnson', avatar: '🦊', xp: 12500, level: 25, accuracy: 94, change: 'up' },
  { rank: 2, name: 'Bob Smith', avatar: '🐼', xp: 11800, level: 24, accuracy: 91, change: 'same' },
  { rank: 3, name: 'Charlie Brown', avatar: '🦁', xp: 10950, level: 23, accuracy: 89, change: 'down' },
  { rank: 4, name: 'Diana Prince', avatar: '🦋', xp: 10200, level: 22, accuracy: 87, change: 'up' },
  { rank: 5, name: 'You', avatar: '🎮', xp: 9850, level: 21, accuracy: 85, change: 'up', isCurrentUser: true },
  { rank: 6, name: 'Eve Adams', avatar: '🐰', xp: 9500, level: 20, accuracy: 84, change: 'down' },
  { rank: 7, name: 'Frank Miller', avatar: '🐸', xp: 9100, level: 19, accuracy: 82, change: 'same' },
  { rank: 8, name: 'Grace Lee', avatar: '🦄', xp: 8750, level: 19, accuracy: 81, change: 'up' },
  { rank: 9, name: 'Henry Wilson', avatar: '🐯', xp: 8400, level: 18, accuracy: 79, change: 'down' },
  { rank: 10, name: 'Ivy Chen', avatar: '🐨', xp: 8100, level: 18, accuracy: 78, change: 'same' },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-6 h-6 text-game-gold fill-game-gold" />;
  if (rank === 2) return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />;
  if (rank === 3) return <Medal className="w-6 h-6 text-orange-500 fill-orange-500" />;
  return null;
}

function getChangeIcon(change: string) {
  if (change === 'up') return <TrendingUp className="w-4 h-4 text-game-pipe" />;
  if (change === 'down') return <TrendingDown className="w-4 h-4 text-destructive" />;
  return <Minus className="w-4 h-4 text-muted-foreground" />;
}

export default function StudentLeaderboard() {
  const currentUser = mockLeaderboard.find(u => u.isCurrentUser);

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold font-game flex items-center justify-center gap-2">
            <Trophy className="w-8 h-8 text-game-gold" />
            Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Compete with fellow learners and climb the ranks!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center items-end gap-4 py-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-3xl shadow-lg">
              {mockLeaderboard[1].avatar}
            </div>
            <div className="font-bold">{mockLeaderboard[1].name}</div>
            <div className="text-sm text-muted-foreground">Level {mockLeaderboard[1].level}</div>
            <div className="mt-2 h-24 w-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-white">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="relative">
              <Crown className="w-8 h-8 text-game-gold fill-game-gold absolute -top-4 left-1/2 -translate-x-1/2" />
              <div className="w-24 h-24 mx-auto mb-2 rounded-full bg-gradient-to-br from-game-gold to-game-star flex items-center justify-center text-4xl shadow-glow">
                {mockLeaderboard[0].avatar}
              </div>
            </div>
            <div className="font-bold text-lg">{mockLeaderboard[0].name}</div>
            <div className="text-sm text-muted-foreground">Level {mockLeaderboard[0].level}</div>
            <div className="mt-2 h-32 w-24 bg-gradient-to-t from-game-gold to-game-star rounded-t-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-foreground">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-3xl shadow-lg">
              {mockLeaderboard[2].avatar}
            </div>
            <div className="font-bold">{mockLeaderboard[2].name}</div>
            <div className="text-sm text-muted-foreground">Level {mockLeaderboard[2].level}</div>
            <div className="mt-2 h-20 w-20 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg flex items-center justify-center">
              <span className="text-3xl font-bold text-white">3</span>
            </div>
          </div>
        </div>

        {/* Your Rank Highlight */}
        {currentUser && (
          <Card variant="gameHighlight" className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <RankBadge rank={currentUser.rank} size="lg" />
                <div>
                  <div className="font-bold text-lg">Your Position</div>
                  <div className="text-sm text-muted-foreground">Keep going to reach the top!</div>
                </div>
              </div>
              <XPBadge xp={currentUser.xp} level={currentUser.level} size="lg" />
            </div>
          </Card>
        )}

        {/* Full Leaderboard */}
        <Card variant="default">
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockLeaderboard.map((user) => (
                <div 
                  key={user.rank}
                  className={cn(
                    "flex items-center justify-between p-4 transition-colors hover:bg-muted/50",
                    user.isCurrentUser && "bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank */}
                    <div className="w-10 text-center">
                      {getRankIcon(user.rank) || (
                        <span className="text-lg font-bold text-muted-foreground">#{user.rank}</span>
                      )}
                    </div>

                    {/* Avatar & Name */}
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                        user.rank === 1 && "bg-game-gold/20",
                        user.rank === 2 && "bg-gray-200",
                        user.rank === 3 && "bg-orange-100",
                        user.rank > 3 && "bg-muted"
                      )}>
                        {user.avatar}
                      </div>
                      <div>
                        <div className={cn(
                          "font-medium",
                          user.isCurrentUser && "text-primary font-bold"
                        )}>
                          {user.name}
                          {user.isCurrentUser && <span className="ml-2 text-xs text-primary">(You)</span>}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Level {user.level} • {user.accuracy}% accuracy
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* XP */}
                    <div className="text-right">
                      <div className="font-bold text-game-gold">{user.xp.toLocaleString()} XP</div>
                    </div>

                    {/* Change Indicator */}
                    <div className="w-6">
                      {getChangeIcon(user.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
