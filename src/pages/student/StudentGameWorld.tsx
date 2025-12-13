import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { XPBadge, CoinBadge } from '@/components/game/GameBadges';
import { 
  Star, 
  Lock, 
  CheckCircle, 
  Zap,
  Trophy,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock game world data
const mockWorlds = [
  {
    id: '1',
    name: 'Mathematics Kingdom',
    description: 'Master numbers, algebra, and geometry',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/10',
    icon: '🔢',
    progress: 75,
    levels: [
      { id: '1-1', name: 'Basic Arithmetic', status: 'completed', stars: 3, xp: 100 },
      { id: '1-2', name: 'Fractions & Decimals', status: 'completed', stars: 2, xp: 120 },
      { id: '1-3', name: 'Algebra Basics', status: 'current', stars: 0, xp: 150 },
      { id: '1-4', name: 'Geometry', status: 'locked', stars: 0, xp: 180 },
      { id: '1-5', name: 'Boss: Math Master', status: 'locked', stars: 0, xp: 300, isBoss: true },
    ],
  },
  {
    id: '2',
    name: 'Science Lab',
    description: 'Discover physics, chemistry, and biology',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500/10',
    icon: '🔬',
    progress: 40,
    levels: [
      { id: '2-1', name: 'Physics Foundations', status: 'completed', stars: 3, xp: 100 },
      { id: '2-2', name: 'Chemistry Basics', status: 'current', stars: 0, xp: 120 },
      { id: '2-3', name: 'Biology 101', status: 'locked', stars: 0, xp: 150 },
      { id: '2-4', name: 'Lab Experiments', status: 'locked', stars: 0, xp: 180 },
      { id: '2-5', name: 'Boss: Science Champion', status: 'locked', stars: 0, xp: 300, isBoss: true },
    ],
  },
  {
    id: '3',
    name: 'Language Arts Tower',
    description: 'Master grammar, vocabulary, and writing',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/10',
    icon: '📚',
    progress: 20,
    levels: [
      { id: '3-1', name: 'Grammar Basics', status: 'completed', stars: 2, xp: 100 },
      { id: '3-2', name: 'Vocabulary Builder', status: 'locked', stars: 0, xp: 120 },
      { id: '3-3', name: 'Reading Comprehension', status: 'locked', stars: 0, xp: 150 },
      { id: '3-4', name: 'Creative Writing', status: 'locked', stars: 0, xp: 180 },
      { id: '3-5', name: 'Boss: Word Wizard', status: 'locked', stars: 0, xp: 300, isBoss: true },
    ],
  },
  {
    id: '4',
    name: 'History Castle',
    description: 'Journey through time and civilizations',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    icon: '🏰',
    progress: 0,
    levels: [
      { id: '4-1', name: 'Ancient Civilizations', status: 'locked', stars: 0, xp: 100 },
      { id: '4-2', name: 'Medieval Times', status: 'locked', stars: 0, xp: 120 },
      { id: '4-3', name: 'Modern History', status: 'locked', stars: 0, xp: 150 },
      { id: '4-4', name: 'World Wars', status: 'locked', stars: 0, xp: 180 },
      { id: '4-5', name: 'Boss: Time Traveler', status: 'locked', stars: 0, xp: 300, isBoss: true },
    ],
  },
];

interface LevelNodeProps {
  level: {
    id: string;
    name: string;
    status: string;
    stars: number;
    xp: number;
    isBoss?: boolean;
  };
  index: number;
  worldColor: string;
}

function LevelNode({ level, index, worldColor }: LevelNodeProps) {
  const isCompleted = level.status === 'completed';
  const isCurrent = level.status === 'current';
  const isLocked = level.status === 'locked';
  const isBoss = level.isBoss;

  return (
    <Link 
      to={isLocked ? '#' : `/student/test/${level.id}`}
      className={cn(
        "relative group",
        isLocked && "cursor-not-allowed"
      )}
    >
      <div 
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg",
          isCompleted && `bg-gradient-to-br ${worldColor} text-white`,
          isCurrent && "bg-gradient-to-br from-game-gold to-game-star text-primary-foreground animate-pulse-glow",
          isLocked && "bg-muted/50 text-muted-foreground",
          isBoss && isCompleted && "bg-gradient-to-br from-game-boss to-purple-800",
          isBoss && !isCompleted && !isLocked && "bg-gradient-to-br from-game-boss/80 to-purple-800/80 animate-wiggle",
          !isLocked && "hover:scale-110 hover:shadow-xl cursor-pointer"
        )}
      >
        {isLocked ? (
          <Lock className="w-6 h-6" />
        ) : isBoss ? (
          <span className="text-2xl">👑</span>
        ) : isCompleted ? (
          <CheckCircle className="w-8 h-8" />
        ) : (
          <span className="font-bold text-lg">{index + 1}</span>
        )}
      </div>

      {/* Stars */}
      {isCompleted && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-0.5">
          {[1, 2, 3].map((star) => (
            <Star 
              key={star}
              className={cn(
                "w-4 h-4",
                star <= level.stars 
                  ? "text-game-gold fill-game-gold" 
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
      )}

      {/* XP Reward */}
      <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-game-gold text-primary-foreground text-xs font-bold rounded-full shadow">
        +{level.xp}
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
        {level.name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground"></div>
      </div>
    </Link>
  );
}

export default function StudentGameWorld() {
  const [selectedWorld, setSelectedWorld] = useState(mockWorlds[0]);

  return (
    <StudentLayout>
      <div className="min-h-screen bg-game-sky">
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-game flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-game-gold" />
                Game World
              </h1>
              <p className="text-muted-foreground mt-1">
                Navigate through worlds, complete levels, defeat bosses!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <XPBadge xp={2450} level={12} />
              <CoinBadge coins={350} />
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* World Selection */}
            <div className="lg:col-span-1 space-y-3">
              <h2 className="font-bold text-lg mb-4">Select World</h2>
              {mockWorlds.map((world) => (
                <Card 
                  key={world.id}
                  variant={selectedWorld.id === world.id ? "gameHighlight" : "interactive"}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedWorld.id === world.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedWorld(world)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                        world.bgColor
                      )}>
                        {world.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate">{world.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={cn("h-full rounded-full bg-gradient-to-r", world.color)}
                              style={{ width: `${world.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{world.progress}%</span>
                        </div>
                      </div>
                      <ChevronRight className={cn(
                        "w-5 h-5 transition-colors",
                        selectedWorld.id === world.id ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Level Map */}
            <Card variant="glass" className="lg:col-span-3 overflow-hidden">
              <div className={cn(
                "p-6 bg-gradient-to-br",
                selectedWorld.color.replace('from-', 'from-').replace('to-', 'to-'),
                "bg-opacity-10"
              )}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-4xl backdrop-blur">
                    {selectedWorld.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-game text-white drop-shadow-lg">{selectedWorld.name}</h2>
                    <p className="text-white/80">{selectedWorld.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-white/80 mb-2">
                    <span>World Progress</span>
                    <span>{selectedWorld.progress}%</span>
                  </div>
                  <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur">
                    <div 
                      className="h-full bg-gradient-to-r from-game-gold to-game-star rounded-full transition-all duration-500"
                      style={{ width: `${selectedWorld.progress}%` }}
                    />
                  </div>
                </div>

                {/* Level Path */}
                <div className="relative">
                  {/* Path Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-2 bg-white/20 rounded-full -translate-y-1/2 z-0" />
                  
                  {/* Level Nodes */}
                  <div className="relative z-10 flex justify-between items-center py-8">
                    {selectedWorld.levels.map((level, index) => (
                      <LevelNode 
                        key={level.id} 
                        level={level} 
                        index={index}
                        worldColor={selectedWorld.color}
                      />
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm text-white/80">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-game-gold"></div>
                    <span>Current Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Locked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👑</span>
                    <span>Boss Level</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Current Quest */}
          <Card variant="gameHighlight" className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-game-gold to-game-star flex items-center justify-center shadow-glow">
                  <Zap className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-game">Current Quest</h3>
                  <p className="text-muted-foreground">
                    Complete <strong>Algebra Basics</strong> to unlock Geometry!
                  </p>
                </div>
              </div>
              <Button variant="game" size="lg">
                <Trophy className="w-5 h-5" />
                Continue Quest
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
}
