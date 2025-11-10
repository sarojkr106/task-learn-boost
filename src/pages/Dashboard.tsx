import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Flame, Star, PlayCircle, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for lessons
const lessons = [
  {
    id: 1,
    titleEn: "How to Scan QR Codes",
    titleHi: "QR कोड कैसे स्कैन करें",
    duration: "1 min",
    completed: true,
    category: "Digital Basics"
  },
  {
    id: 2,
    titleEn: "Voice-to-Text Made Simple",
    titleHi: "वॉयस-टू-टेक्स्ट आसान बनाया",
    duration: "1 min",
    completed: true,
    category: "Digital Basics"
  },
  {
    id: 3,
    titleEn: "What is ChatGPT?",
    titleHi: "ChatGPT क्या है?",
    duration: "1 min",
    completed: false,
    category: "AI Basics"
  },
  {
    id: 4,
    titleEn: "Using Google Translate",
    titleHi: "Google अनुवाद का उपयोग करना",
    duration: "1 min",
    completed: false,
    category: "Digital Tools"
  },
  {
    id: 5,
    titleEn: "AI Image Recognition",
    titleHi: "AI इमेज पहचान",
    duration: "1 min",
    completed: false,
    category: "AI Basics"
  },
  {
    id: 6,
    titleEn: "Smart Data Entry Tips",
    titleHi: "स्मार्ट डेटा एंट्री टिप्स",
    duration: "1 min",
    completed: false,
    category: "Work Skills"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedCount / lessons.length) * 100;
  const streakDays = 3;

  const content = {
    en: {
      welcome: "Welcome back!",
      progress: "Your Progress",
      streak: "Day Streak",
      lessons: "Lessons Completed",
      points: "Points Earned",
      achievements: "Recent Achievements",
      continue: "Continue Learning",
      completed: "Completed",
      start: "Start Lesson"
    },
    hi: {
      welcome: "वापसी पर स्वागत है!",
      progress: "आपकी प्रगति",
      streak: "दिन की स्ट्रीक",
      lessons: "पाठ पूर्ण",
      points: "अंक अर्जित",
      achievements: "हाल की उपलब्धियां",
      continue: "सीखना जारी रखें",
      completed: "पूर्ण",
      start: "पाठ शुरू करें"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
            >
              EN
            </Button>
            <Button
              variant={language === "hi" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("hi")}
            >
              हिं
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.welcome}</h1>
          <p className="text-muted-foreground">{t.progress}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-achievement shadow-achievement">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-achievement-foreground" />
              <span className="text-achievement-foreground font-semibold text-sm">{t.streak}</span>
            </div>
            <div className="text-3xl font-bold text-achievement-foreground">{streakDays}</div>
          </Card>

          <Card className="p-4 bg-gradient-hero shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-semibold text-sm">{t.lessons}</span>
            </div>
            <div className="text-3xl font-bold text-primary-foreground">{completedCount}/{lessons.length}</div>
          </Card>

          <Card className="p-4 bg-card shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-achievement" />
              <span className="text-foreground font-semibold text-sm">{t.points}</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{completedCount * 50}</div>
          </Card>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-foreground">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </Card>

        {/* Achievements */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-achievement" />
            {t.achievements}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Badge variant="secondary" className="px-4 py-2 text-sm whitespace-nowrap">
              <Star className="w-4 h-4 mr-1 text-achievement" />
              AI Beginner
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm whitespace-nowrap">
              <Flame className="w-4 h-4 mr-1 text-achievement" />
              3 Day Streak
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm whitespace-nowrap">
              <CheckCircle2 className="w-4 h-4 mr-1 text-success" />
              First Lesson
            </Badge>
          </div>
        </div>

        {/* Lessons */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">{t.continue}</h2>
          <div className="space-y-3">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="p-4 shadow-card hover:shadow-elevated transition-all cursor-pointer"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    lesson.completed ? 'bg-success' : 'bg-gradient-hero'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <PlayCircle className="w-6 h-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {language === "en" ? lesson.titleEn : lesson.titleHi}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {lesson.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant={lesson.completed ? "secondary" : "default"}
                  >
                    {lesson.completed ? t.completed : t.start}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
