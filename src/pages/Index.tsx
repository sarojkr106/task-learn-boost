import { useState } from "react";
import { Button } from "@/components/ui/button";
import { GraduationCap, Brain, Sparkles, Globe, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const content = {
    en: {
      hero: "Master AI & Digital Skills",
      subhero: "Learn in just 1 minute per day",
      description: "Simple, visual tutorials designed for factory and field workers. Learn digital tools and AI basics in Hindi or English.",
      cta: "Start Learning Free",
      features: {
        title: "Why TaskWise?",
        items: [
          { icon: Brain, title: "Bite-sized Learning", desc: "1-minute lessons that fit your schedule" },
          { icon: Sparkles, title: "Interactive Quizzes", desc: "Test your knowledge instantly" },
          { icon: Globe, title: "Hindi & English", desc: "Learn in your preferred language" },
          { icon: TrendingUp, title: "Track Progress", desc: "Earn badges and build streaks" }
        ]
      }
    },
    hi: {
      hero: "AI और डिजिटल कौशल सीखें",
      subhero: "प्रतिदिन केवल 1 मिनट में सीखें",
      description: "फैक्ट्री और फील्ड कर्मचारियों के लिए सरल, दृश्य ट्यूटोरियल। हिंदी या अंग्रेजी में डिजिटल उपकरण और AI की बुनियादी बातें सीखें।",
      cta: "मुफ्त सीखना शुरू करें",
      features: {
        title: "TaskWise क्यों?",
        items: [
          { icon: Brain, title: "छोटे पाठ", desc: "1 मिनट के पाठ जो आपके समय में फिट हों" },
          { icon: Sparkles, title: "इंटरैक्टिव क्विज़", desc: "तुरंत अपने ज्ञान का परीक्षण करें" },
          { icon: Globe, title: "हिंदी और अंग्रेजी", desc: "अपनी पसंदीदा भाषा में सीखें" },
          { icon: TrendingUp, title: "प्रगति ट्रैक करें", desc: "बैज अर्जित करें और स्ट्रीक बनाएं" }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-card rounded-full p-1 shadow-card">
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="rounded-full"
        >
          EN
        </Button>
        <Button
          variant={language === "hi" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("hi")}
          className="rounded-full"
        >
          हिं
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4">
        <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-pulse-glow"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-bounce-in shadow-card">
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium">TaskWise Learning Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-slide-up">
            {t.hero}
          </h1>
          
          <p className="text-xl md:text-2xl text-primary font-semibold mb-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.subhero}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t.description}
          </p>
          
          <Button
            size="lg"
            onClick={() => navigate("/dashboard")}
            className="text-lg px-8 py-6 shadow-elevated hover:shadow-achievement hover:scale-105 transition-all animate-bounce-in"
            style={{ animationDelay: "0.5s" }}
          >
            {t.cta}
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground animate-fade-in">
            {t.features.title}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-card p-6 rounded-2xl shadow-card hover:shadow-elevated transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-card">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8">
            <div className="animate-bounce-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 hover:scale-110 transition-transform cursor-default">50+</div>
              <div className="text-muted-foreground font-medium">Lessons</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl md:text-5xl font-bold text-achievement mb-2 hover:scale-110 transition-transform cursor-default">10K+</div>
              <div className="text-muted-foreground font-medium">Learners</div>
            </div>
            <div className="animate-bounce-in" style={{ animationDelay: "0.3s" }}>
              <div className="text-4xl md:text-5xl font-bold text-success mb-2 hover:scale-110 transition-transform cursor-default">95%</div>
              <div className="text-muted-foreground font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
