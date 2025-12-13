import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudentLayout } from '@/components/layout/StudentLayout';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  Calendar,
  Timer,
  Target,
  Star,
  Play
} from 'lucide-react';

// Mock data
const mockTests = {
  available: [
    { id: '1', name: 'Mathematics Chapter 5', subject: 'Mathematics', questions: 20, duration: 30, difficulty: 'medium', dueDate: '2024-12-15', attempts: { used: 0, max: 3 } },
    { id: '2', name: 'Physics: Motion & Forces', subject: 'Physics', questions: 25, duration: 45, difficulty: 'hard', dueDate: '2024-12-16', attempts: { used: 1, max: 2 } },
    { id: '3', name: 'English Grammar Test', subject: 'English', questions: 30, duration: 40, difficulty: 'easy', dueDate: '2024-12-20', attempts: { used: 0, max: 1 } },
  ],
  completed: [
    { id: '4', name: 'Chemistry Basics', subject: 'Chemistry', score: 85, totalMarks: 100, date: '2024-12-10', passed: true },
    { id: '5', name: 'Biology: Cell Structure', subject: 'Biology', score: 72, totalMarks: 100, date: '2024-12-08', passed: true },
    { id: '6', name: 'History: Ancient Rome', subject: 'History', score: 45, totalMarks: 100, date: '2024-12-05', passed: false },
  ],
  inProgress: [
    { id: '7', name: 'Geography Basics', subject: 'Geography', progress: 60, timeRemaining: '15:30', started: '2024-12-12' },
  ],
};

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'easy': return 'bg-game-pipe/20 text-game-pipe border-game-pipe/30';
    case 'medium': return 'bg-game-gold/20 text-game-gold border-game-gold/30';
    case 'hard': return 'bg-game-mushroom/20 text-game-mushroom border-game-mushroom/30';
    default: return 'bg-muted text-muted-foreground';
  }
}

export default function StudentTests() {
  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-game flex items-center gap-2">
            <ClipboardList className="w-8 h-8 text-secondary" />
            My Tests
          </h1>
          <p className="text-muted-foreground mt-1">
            View, take, and track all your assigned tests
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockTests.available.length}</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-game-gold/20 flex items-center justify-center">
                <Timer className="w-5 h-5 text-game-gold" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockTests.inProgress.length}</div>
                <div className="text-sm text-muted-foreground">In Progress</div>
              </div>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-game-pipe/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-game-pipe" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockTests.completed.filter(t => t.passed).length}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
            </CardContent>
          </Card>
          <Card variant="default">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">{mockTests.completed.filter(t => !t.passed).length}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="available" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="available" className="gap-2">
              <ClipboardList size={16} />
              Available
            </TabsTrigger>
            <TabsTrigger value="inProgress" className="gap-2">
              <Timer size={16} />
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle size={16} />
              Completed
            </TabsTrigger>
          </TabsList>

          {/* Available Tests */}
          <TabsContent value="available" className="space-y-4">
            {mockTests.available.map((test) => (
              <Card key={test.id} variant="interactive">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{test.name}</h3>
                        <Badge variant="outline" className={getDifficultyColor(test.difficulty)}>
                          {test.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{test.subject}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Target size={14} />
                          {test.questions} questions
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {test.duration} mins
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          Due: {test.dueDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={14} />
                          Attempts: {test.attempts.used}/{test.attempts.max}
                        </span>
                      </div>
                    </div>
                    <Link to={`/student/test/${test.id}`}>
                      <Button variant="game" size="lg">
                        <Play size={18} />
                        Start Test
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* In Progress */}
          <TabsContent value="inProgress" className="space-y-4">
            {mockTests.inProgress.length > 0 ? (
              mockTests.inProgress.map((test) => (
                <Card key={test.id} variant="gameHighlight">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2">{test.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{test.subject}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{test.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-game-gold to-game-star rounded-full"
                              style={{ width: `${test.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-game-gold">{test.timeRemaining}</div>
                          <div className="text-sm text-muted-foreground">remaining</div>
                        </div>
                        <Link to={`/student/test/${test.id}`}>
                          <Button variant="game" size="lg">
                            <ArrowRight size={18} />
                            Continue
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card variant="default">
                <CardContent className="p-12 text-center">
                  <Timer className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No tests in progress</h3>
                  <p className="text-muted-foreground">Start a test from the Available tab</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed */}
          <TabsContent value="completed" className="space-y-4">
            {mockTests.completed.map((test) => (
              <Card key={test.id} variant="default">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{test.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={test.passed 
                            ? 'bg-game-pipe/20 text-game-pipe border-game-pipe/30' 
                            : 'bg-destructive/20 text-destructive border-destructive/30'
                          }
                        >
                          {test.passed ? 'Passed' : 'Failed'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{test.subject}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar size={14} />
                        Completed: {test.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${test.passed ? 'text-game-pipe' : 'text-destructive'}`}>
                          {test.score}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {test.score}/{test.totalMarks}
                        </div>
                      </div>
                      <Link to={`/student/results/${test.id}`}>
                        <Button variant="outline">
                          View Details
                          <ArrowRight size={16} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
