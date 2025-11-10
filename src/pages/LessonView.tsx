import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "@/components/Quiz";

// Mock lesson data
const lessonData = {
  1: {
    titleEn: "How to Scan QR Codes",
    titleHi: "QR कोड कैसे स्कैन करें",
    steps: [
      {
        titleEn: "Step 1: Open Camera",
        titleHi: "चरण 1: कैमरा खोलें",
        descEn: "Open your phone's camera app or a QR scanner app",
        descHi: "अपने फोन का कैमरा ऐप या QR स्कैनर ऐप खोलें",
        icon: "📱"
      },
      {
        titleEn: "Step 2: Point at QR Code",
        titleHi: "चरण 2: QR कोड पर इंगित करें",
        descEn: "Hold your phone steady and point the camera at the QR code",
        descHi: "अपने फोन को स्थिर रखें और कैमरे को QR कोड की ओर इंगित करें",
        icon: "🎯"
      },
      {
        titleEn: "Step 3: Wait for Recognition",
        titleHi: "चरण 3: पहचान की प्रतीक्षा करें",
        descEn: "The phone will automatically detect and read the QR code",
        descHi: "फोन स्वचालित रूप से QR कोड का पता लगाएगा और पढ़ेगा",
        icon: "✨"
      },
      {
        titleEn: "Step 4: Tap the Notification",
        titleHi: "चरण 4: सूचना पर टैप करें",
        descEn: "Tap the notification or link that appears to open the content",
        descHi: "सामग्री खोलने के लिए दिखाई देने वाली सूचना या लिंक पर टैप करें",
        icon: "👆"
      }
    ],
    quiz: {
      questionEn: "What should you do after pointing your camera at a QR code?",
      questionHi: "QR कोड पर अपना कैमरा इंगित करने के बाद आपको क्या करना चाहिए?",
      options: [
        { en: "Shake your phone", hi: "अपना फोन हिलाएं" },
        { en: "Wait for automatic detection", hi: "स्वचालित पहचान की प्रतीक्षा करें" },
        { en: "Take a photo", hi: "एक तस्वीर लें" },
        { en: "Close the camera", hi: "कैमरा बंद करें" }
      ],
      correctIndex: 1
    }
  },
  3: {
    titleEn: "What is ChatGPT?",
    titleHi: "ChatGPT क्या है?",
    steps: [
      {
        titleEn: "Step 1: Understanding AI",
        titleHi: "चरण 1: AI को समझना",
        descEn: "ChatGPT is an AI assistant that can answer questions and help with tasks",
        descHi: "ChatGPT एक AI सहायक है जो सवालों के जवाब दे सकता है और कार्यों में मदद कर सकता है",
        icon: "🤖"
      },
      {
        titleEn: "Step 2: How to Use",
        titleHi: "चरण 2: कैसे उपयोग करें",
        descEn: "Simply type your question or request in plain language",
        descHi: "बस अपना सवाल या अनुरोध सरल भाषा में टाइप करें",
        icon: "💬"
      },
      {
        titleEn: "Step 3: Get Instant Answers",
        titleHi: "चरण 3: तुरंत उत्तर प्राप्त करें",
        descEn: "ChatGPT will provide helpful responses in seconds",
        descHi: "ChatGPT सेकंड में सहायक प्रतिक्रियाएं प्रदान करेगा",
        icon: "⚡"
      }
    ],
    quiz: {
      questionEn: "What is ChatGPT best described as?",
      questionHi: "ChatGPT को सबसे अच्छा क्या कहा जा सकता है?",
      options: [
        { en: "A social media app", hi: "एक सोशल मीडिया ऐप" },
        { en: "An AI assistant", hi: "एक AI सहायक" },
        { en: "A video game", hi: "एक वीडियो गेम" },
        { en: "A calculator", hi: "एक कैलकुलेटर" }
      ],
      correctIndex: 1
    }
  }
};

const LessonView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [currentStep, setCurrentStep] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completed, setCompleted] = useState(false);

  const lessonId = parseInt(id || "1");
  const lesson = lessonData[lessonId as keyof typeof lessonData] || lessonData[1];
  const totalSteps = lesson.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const currentStepData = lesson.steps[currentStep];

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center px-4">
        <Card className="max-w-md w-full p-8 sm:p-10 text-center shadow-elevated border-0 animate-bounce-in">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-achievement rounded-full flex items-center justify-center mx-auto mb-6 shadow-achievement animate-pulse-glow">
              <CheckCircle2 className="w-12 h-12 text-achievement-foreground" />
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 text-4xl animate-float">
              🎉
            </div>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {language === "en" ? "Lesson Complete!" : "पाठ पूरा!"}
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            {language === "en" 
              ? "Congratulations!" 
              : "बधाई हो!"}
          </p>
          <div className="bg-gradient-achievement/10 rounded-2xl p-4 mb-6">
            <div className="text-4xl font-bold text-achievement mb-1">+50</div>
            <div className="text-sm text-muted-foreground">
              {language === "en" ? "Points Earned" : "अंक अर्जित"}
            </div>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="w-full" size="lg">
            {language === "en" ? "Back to Dashboard" : "डैशबोर्ड पर वापस जाएं"}
          </Button>
        </Card>
      </div>
    );
  }

  if (showQuiz) {
    return (
      <Quiz
        question={language === "en" ? lesson.quiz.questionEn : lesson.quiz.questionHi}
        options={lesson.quiz.options.map(opt => language === "en" ? opt.en : opt.hi)}
        correctIndex={lesson.quiz.correctIndex}
        language={language}
        onComplete={handleQuizComplete}
        onBack={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dashboard")}
              className="hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2 bg-muted/50 rounded-full p-1">
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
          </div>
          
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-foreground mb-3">
              {language === "en" ? lesson.titleEn : lesson.titleHi}
            </h1>
            <div className="flex items-center gap-3">
              <Progress value={progress} className="flex-1 h-3 shadow-sm" />
              <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap bg-muted px-3 py-1 rounded-full">
                {currentStep + 1}/{totalSteps}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Step Indicators */}
        <div className="flex justify-center gap-2 mb-6 sm:mb-8">
          {lesson.steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep 
                  ? 'w-8 bg-primary' 
                  : index < currentStep 
                  ? 'w-2 bg-success' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        <Card className="p-6 sm:p-10 shadow-elevated border-0 min-h-[500px] flex flex-col justify-between animate-scale-in">
          <div>
            <div className="text-6xl sm:text-7xl mb-6 animate-bounce-in text-center">
              {currentStepData.icon}
            </div>
            
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === "en" ? `Step ${currentStep + 1}` : `चरण ${currentStep + 1}`}
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {language === "en" ? currentStepData.titleEn : currentStepData.titleHi}
              </h2>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {language === "en" ? currentStepData.descEn : currentStepData.descHi}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  size="lg"
                  className="flex-1 hover:scale-105 transition-transform"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === "en" ? "Back" : "पीछे"}
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                size="lg"
                className="flex-1 hover:scale-105 transition-transform shadow-elevated"
              >
                {currentStep === totalSteps - 1
                  ? (language === "en" ? "Take Quiz" : "क्विज़ लें")
                  : (language === "en" ? "Next" : "अगला")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {/* Progress hint */}
            <p className="text-center text-sm text-muted-foreground">
              {currentStep + 1} of {totalSteps} steps completed
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LessonView;
