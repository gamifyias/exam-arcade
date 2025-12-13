// User & Auth Types
export type UserRole = 'admin' | 'mentor' | 'student';

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Subject & Topic Types
export interface Subject {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  color: string;
  icon: string;
  order: number;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Topic {
  id: string;
  subject_id: string;
  name: string;
  description?: string;
  image_url?: string;
  order: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Question Types
export type QuestionType = 'mcq_single' | 'mcq_multiple' | 'true_false' | 'numeric';
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  id: string;
  text: string;
  image_url?: string;
  is_correct: boolean;
}

export interface Question {
  id: string;
  subject_id: string;
  topic_id: string;
  question_type: QuestionType;
  question_text: string;
  question_image_url?: string;
  options: QuestionOption[];
  correct_answer?: string; // For numeric type
  explanation: string;
  difficulty: DifficultyLevel;
  marks: number;
  negative_marks: number;
  randomize_options: boolean;
  tags: string[];
  created_by: string;
  created_at: string;
  updated_at: string;
}

// Test Types
export type TestStatus = 'draft' | 'scheduled' | 'active' | 'completed' | 'archived';
export type TestMode = 'fixed' | 'random' | 'adaptive';

export interface TestSettings {
  allow_navigation: boolean;
  allow_revisit: boolean;
  show_question_numbers: boolean;
  randomize_questions: boolean;
  randomize_options: boolean;
  enable_anti_cheat: boolean;
  show_watermark: boolean;
  auto_submit: boolean;
  show_results_immediately: boolean;
  show_correct_answers: boolean;
  show_explanations: boolean;
}

export interface Test {
  id: string;
  name: string;
  description?: string;
  subject_id?: string;
  topic_ids: string[];
  test_mode: TestMode;
  status: TestStatus;
  duration_minutes: number;
  total_marks: number;
  passing_marks: number;
  question_count: number;
  difficulty_distribution: {
    easy: number;
    medium: number;
    hard: number;
  };
  start_time?: string;
  end_time?: string;
  max_attempts: number;
  settings: TestSettings;
  instructions?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TestQuestion {
  id: string;
  test_id: string;
  question_id: string;
  order: number;
  marks_override?: number;
  negative_marks_override?: number;
}

export interface TestAssignment {
  id: string;
  test_id: string;
  student_id?: string;
  group_id?: string;
  is_public: boolean;
  assigned_by: string;
  assigned_at: string;
}

// Attempt Types
export type AttemptStatus = 'in_progress' | 'submitted' | 'auto_submitted' | 'disqualified';

export interface StudentTestAttempt {
  id: string;
  test_id: string;
  student_id: string;
  attempt_number: number;
  status: AttemptStatus;
  started_at: string;
  submitted_at?: string;
  time_spent_seconds: number;
  total_score: number;
  total_marks: number;
  correct_count: number;
  incorrect_count: number;
  unanswered_count: number;
  is_passed: boolean;
  anti_cheat_violations: number;
}

export interface StudentAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  selected_options: string[];
  numeric_answer?: number;
  is_correct: boolean;
  marks_obtained: number;
  time_spent_seconds: number;
  answered_at: string;
}

export interface StudentWeakQuestion {
  id: string;
  student_id: string;
  question_id: string;
  topic_id: string;
  wrong_count: number;
  correct_count: number;
  last_attempted_at: string;
  is_mastered: boolean;
}

// Anti-Cheat Types
export type ViolationType = 
  | 'tab_switch'
  | 'fullscreen_exit'
  | 'page_reload'
  | 'devtools_open'
  | 'time_tampering'
  | 'storage_tampering'
  | 'network_disconnect'
  | 'copy_paste'
  | 'right_click'
  | 'text_selection'
  | 'javascript_disabled';

export interface AntiCheatLog {
  id: string;
  attempt_id: string;
  student_id: string;
  test_id: string;
  violation_type: ViolationType;
  violation_details?: string;
  timestamp: string;
  ip_address?: string;
  user_agent?: string;
}

// Analytics Types
export interface StudentAnalytics {
  student_id: string;
  total_tests_taken: number;
  total_score: number;
  total_marks: number;
  average_accuracy: number;
  topic_performance: {
    topic_id: string;
    topic_name: string;
    accuracy: number;
    tests_taken: number;
  }[];
  difficulty_performance: {
    difficulty: DifficultyLevel;
    accuracy: number;
    questions_attempted: number;
  }[];
  weak_topics: string[];
  xp_earned: number;
  level: number;
  rank?: number;
}

// Gamification Types
export interface StudentProgress {
  student_id: string;
  xp: number;
  level: number;
  coins: number;
  completed_topics: string[];
  completed_subjects: string[];
  achievements: string[];
  streak_days: number;
  last_active_at: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  coin_reward: number;
  condition_type: string;
  condition_value: number;
}

export interface LeaderboardEntry {
  rank: number;
  student_id: string;
  student_name: string;
  avatar_url?: string;
  xp: number;
  level: number;
  accuracy: number;
}

// Certificate Types
export interface Certificate {
  id: string;
  student_id: string;
  test_id: string;
  attempt_id: string;
  certificate_number: string;
  issued_at: string;
  template_id: string;
  pdf_url?: string;
}
