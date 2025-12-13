import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Gamepad2, 
  Shield, 
  Brain, 
  Trophy, 
  Users, 
  Zap,
  ArrowRight,
  Star,
  Target,
  BookOpen
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Mario-Style Learning',
      description: 'Navigate through worlds of knowledge, collect coins, defeat boss levels, and unlock achievements.',
      color: 'from-game-gold to-game-star',
    },
    {
      icon: Shield,
      title: 'Advanced Anti-Cheat',
      description: 'Secure testing with tab detection, fullscreen lock, and comprehensive violation logging.',
      color: 'from-game-mushroom to-destructive',
    },
    {
      icon: Brain,
      title: 'Adaptive Learning',
      description: 'Smart wrong-answer engine that creates personalized retests to strengthen weak areas.',
      color: 'from-game-pipe to-game-pipe-dark',
    },
    {
      icon: Trophy,
      title: 'Leaderboards & Ranks',
      description: 'Compete with peers, climb the rankings, and earn certificates for your achievements.',
      color: 'from-game-boss to-purple-800',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Students' },
    { value: '500+', label: 'Tests Created' },
    { value: '1M+', label: 'Questions Answered' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen bg-game-sky overflow-hidden">
      {/* Decorative Clouds */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-16 bg-game-cloud rounded-full opacity-80 float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-32 right-20 w-40 h-20 bg-game-cloud rounded-full opacity-70 float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-48 left-1/3 w-24 h-12 bg-game-cloud rounded-full opacity-60 float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-16 right-1/3 w-36 h-18 bg-game-cloud rounded-full opacity-75 float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-game-gold to-game-star flex items-center justify-center shadow-pixel">
              <span className="text-primary-foreground font-pixel text-sm">TQ</span>
            </div>
            <span className="font-game font-bold text-2xl text-foreground">TestQuest</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/auth/login">
              <Button variant="ghost" size="lg" className="font-semibold">
                Sign In
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="game" size="lg">
                Get Started
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur rounded-full mb-6 shadow-md">
            <Star className="w-5 h-5 text-game-gold fill-game-gold" />
            <span className="text-sm font-medium">Gamified Online Testing Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-game mb-6 leading-tight">
            Level Up Your
            <span className="block bg-gradient-to-r from-game-gold via-game-star to-game-gold bg-clip-text text-transparent">
              Learning Journey
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The ultimate online test platform that turns assessments into adventures. 
            Create, manage, and take tests with a Mario-style gaming experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/auth/register">
              <Button variant="game" size="xl" className="text-lg">
                <Gamepad2 size={24} />
                Start Your Quest
              </Button>
            </Link>
            <Link to="/auth/login">
              <Button variant="gameOutline" size="xl" className="text-lg">
                <Users size={24} />
                Join as Mentor
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <Card key={stat.label} variant="glass" className="p-4 text-center">
                <div className="text-3xl font-bold font-game text-game-gold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-game mb-4">Power-Ups for Education</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create engaging, secure, and adaptive assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} variant="interactive" className="group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold font-game mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-game mb-4">Choose Your Role</h2>
            <p className="text-xl text-muted-foreground">
              Whether you're teaching or learning, TestQuest has you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <Card variant="game" className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-game-pipe to-game-pipe-dark flex items-center justify-center">
                <Gamepad2 className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold font-game mb-2">Student</h3>
                <p className="text-muted-foreground mb-4">
                  Embark on learning quests, take tests, earn XP, and compete on leaderboards.
                </p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-game-gold" />
                    Gamified test experience
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-game-gold" />
                    Adaptive weak-area retests
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-game-gold" />
                    Achievements & certificates
                  </li>
                </ul>
                <Link to="/auth/register?role=student">
                  <Button variant="gameSecondary" className="w-full">
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Mentor Card */}
            <Card variant="game" className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold font-game mb-2">Mentor</h3>
                <p className="text-muted-foreground mb-4">
                  Create subjects, manage questions, design tests, and track student progress.
                </p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-game-gold" />
                    Full question bank management
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-game-gold" />
                    Flexible test creation
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-game-gold" />
                    Detailed analytics
                  </li>
                </ul>
                <Link to="/auth/register?role=mentor">
                  <Button variant="secondary" className="w-full">
                    Start Teaching
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card variant="game" className="overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-game-boss to-purple-800 flex items-center justify-center">
                <Shield className="w-16 h-16 text-white" />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold font-game mb-2">Admin</h3>
                <p className="text-muted-foreground mb-4">
                  Full system control including user management, settings, and global analytics.
                </p>
                <ul className="text-left text-sm space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-game-gold" />
                    Complete system access
                  </li>
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-game-gold" />
                    User & role management
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-game-gold" />
                    Anti-cheat configuration
                  </li>
                </ul>
                <Link to="/auth/login">
                  <Button variant="outline" className="w-full">
                    Admin Login
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 bg-sidebar text-sidebar-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-pixel text-xs">TQ</span>
              </div>
              <span className="font-game font-bold text-lg">TestQuest</span>
            </div>
            <p className="text-sm text-sidebar-foreground/60">
              © 2024 TestQuest. Gamifying education, one quest at a time.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/auth/login" className="text-sm hover:text-sidebar-primary transition-colors">
                Sign In
              </Link>
              <Link to="/auth/register" className="text-sm hover:text-sidebar-primary transition-colors">
                Register
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
