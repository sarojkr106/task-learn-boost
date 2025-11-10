import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Flame, Star, PlayCircle, CheckCircle2, Clock, Sparkles, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for lessons
const lessons = [
  {
    id: 1,
    titleEn: "How to Scan QR Codes",
    titleHi: "QR कोड कैसे स्कैन करें",
    duration: "1 min",
    completed: true,
    category: "Digital Basics",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    titleEn: "Voice-to-Text Made Simple",
    titleHi: "वॉयस-टू-टेक्स्ट आसान बनाया",
    duration: "1 min",
    completed: true,
    category: "Digital Basics",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    titleEn: "What is ChatGPT?",
    titleHi: "ChatGPT क्या है?",
    duration: "1 min",
    completed: false,
    category: "AI Basics",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    titleEn: "Using Google Translate",
    titleHi: "Google अनुवाद का उपयोग करना",
    duration: "1 min",
    completed: false,
    category: "Digital Tools",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 5,
    titleEn: "AI Image Recognition",
    titleHi: "AI इमेज पहचान",
    duration: "1 min",
    completed: false,
    category: "AI Basics",
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 6,
    titleEn: "Smart Data Entry Tips",
    titleHi: "स्मार्ट डेटा एंट्री टिप्स",
    duration: "1 min",
    completed: false,
    category: "Work Skills",
    color: "from-teal-500 to-green-500"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const completedCount = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedCount / lessons.length) * 100;
  const streakDays = 3;
  const totalPoints = completedCount * 50;

  const content = {
    en: {
      welcome: "Welcome back",
      subtitle: "Ready to learn something new?",
      progress: "Your Progress",
      streak: "Day Streak",
      lessons: "Completed",
      points: "Points",
      achievements: "Achievements",
      continue: "Continue Learning",
      completed: "Completed",
      start: "Start",
      allLessons: "All Lessons"
    },
    hi: {
      welcome: "वापसी पर स्वागत है",
      subtitle: "कुछ नया सीखने के लिए तैयार हैं?",
      progress: "आपकी प्रगति",
      streak: "दिन की स्ट्रीक",
      lessons: "पूर्ण",
      points: "अंक",
      achievements: "उपलब्धियां",
      continue: "सीखना जारी रखें",
      completed: "पूर्ण",
      start: "शुरू",
      allLessons: "सभी पाठ"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-40 border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex gap-2 bg-muted/50 rounded-full p-1">
            <Button
              variant={language === "en" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("en")}
              className="rounded-full transition-all"
            >
              EN
            </Button>
            <Button
              variant={language === "hi" ? "default" : "ghost"}
              size="sm"
              onClick={() => setLanguage("hi")}
              className="rounded-full transition-all"
            >
              हिं
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Welcome Section */}
        <div className="animate-slide-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 bg-gradient-hero bg-clip-text text-transparent">
            {t.welcome}! 👋
          </h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Card className="p-4 sm:p-6 bg-gradient-achievement shadow-achievement hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-0">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mb-3 animate-pulse-glow">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-achievement-foreground" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-achievement-foreground mb-1">{streakDays}</div>
              <span className="text-xs sm:text-sm text-achievement-foreground/90 font-medium">{t.streak}</span>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-gradient-hero shadow-elevated hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border-0">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-1">{completedCount}</div>
              <span className="text-xs sm:text-sm text-primary-foreground/90 font-medium">{t.lessons}</span>
            </div>
          </Card>

          <Card className="p-4 sm:p-6 bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-achievement/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-achievement/20 transition-colors">
                <Star className="w-6 h-6 sm:w-7 sm:h-7 text-achievement" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{totalPoints}</div>
              <span className="text-xs sm:text-sm text-muted-foreground font-medium">{t.points}</span>
            </div>
          </Card>
        </div>

        {/* Progress Card */}
        <Card className="p-6 sm:p-8 shadow-elevated hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-foreground text-lg">{t.progress}</span>
                <span className="text-sm font-bold text-primary">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {completedCount} of {lessons.length} lessons completed • {lessons.length - completedCount} remaining
          </p>
        </Card>

        {/* Achievements */}
        <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-achievement" />
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t.achievements}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <Card className="px-6 py-4 bg-gradient-achievement shadow-achievement hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-3 whitespace-nowrap border-0">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-achievement-foreground" />
              </div>
              <div>
                <div className="font-semibold text-achievement-foreground">AI Beginner</div>
                <div className="text-xs text-achievement-foreground/80">First AI lesson</div>
              </div>
            </Card>
            <Card className="px-6 py-4 bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-3 whitespace-nowrap">
              <div className="w-10 h-10 bg-achievement/10 rounded-full flex items-center justify-center">
                <Flame className="w-5 h-5 text-achievement" />
              </div>
              <div>
                <div className="font-semibold text-foreground">On Fire!</div>
                <div className="text-xs text-muted-foreground">3 day streak</div>
              </div>
            </Card>
            <Card className="px-6 py-4 bg-card shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-3 whitespace-nowrap">
              <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Quick Learner</div>
                <div className="text-xs text-muted-foreground">2 lessons done</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Lessons */}
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{t.allLessons}</h2>
            </div>
            <Badge variant="secondary" className="font-medium">
              {completedCount}/{lessons.length}
            </Badge>
          </div>
          <div className="grid gap-4 sm:gap-5">
            {lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className="group p-5 sm:p-6 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer hover:scale-[1.02] overflow-hidden relative"
                onClick={() => navigate(`/lesson/${lesson.id}`)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${lesson.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="flex items-center gap-4 relative">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transition-all duration-300 group-hover:scale-110 ${
                    lesson.completed 
                      ? 'bg-gradient-to-br from-success to-success/80' 
                      : `bg-gradient-to-br ${lesson.color}`
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    ) : (
                      <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-foreground text-base sm:text-lg mb-2 group-hover:text-primary transition-colors">
                      {language === "en" ? lesson.titleEn : lesson.titleHi}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {lesson.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      {lesson.completed && (
                        <Badge className="text-xs bg-success/10 text-success hover:bg-success/20 border-0">
                          ✓ {t.completed}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    variant={lesson.completed ? "outline" : "default"}
                    className="hidden sm:flex group-hover:scale-105 transition-transform"
                  >
                    {lesson.completed ? t.completed : t.start}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant={lesson.completed ? "outline" : "default"}
                    className="sm:hidden"
                  >
                    {lesson.completed ? "✓" : "▶"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile */}
      <div className="h-8"></div>
    </div>
  );
};

export default Dashboard;
