import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, ArrowLeft, Brain } from "lucide-react";

interface QuizProps {
  question: string;
  options: string[];
  correctIndex: number;
  language: "en" | "hi";
  onComplete: (passed: boolean) => void;
  onBack: () => void;
}

const Quiz = ({ question, options, correctIndex, language, onComplete, onBack }: QuizProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const content = {
    en: {
      title: "Quick Quiz",
      subtitle: "Test your understanding",
      submit: "Submit Answer",
      correct: "Excellent! You got it right! 🎉",
      incorrect: "Not quite. Let's try again! 💪",
      continue: "Continue",
      retry: "Try Again",
      selectPrompt: "Select an answer to continue"
    },
    hi: {
      title: "त्वरित क्विज़",
      subtitle: "अपनी समझ का परीक्षण करें",
      submit: "उत्तर जमा करें",
      correct: "बहुत बढ़िया! आपने सही किया! 🎉",
      incorrect: "बिल्कुल सही नहीं। फिर से कोशिश करें! 💪",
      continue: "जारी रखें",
      retry: "पुनः प्रयास करें",
      selectPrompt: "जारी रखने के लिए एक उत्तर चुनें"
    }
  };

  const t = content[language];

  const handleSubmit = () => {
    if (selectedIndex !== null) {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setShowResult(false);
  };

  const isCorrect = selectedIndex === correctIndex;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="glass-effect border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="text-center mb-8 animate-slide-up">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-hero rounded-full mb-4 shadow-elevated">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card className="p-6 sm:p-10 shadow-elevated border-0 animate-scale-in">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-8 leading-relaxed">{question}</h2>

          <div className="space-y-3 sm:space-y-4 mb-8">
            {options.map((option, index) => {
              const isSelected = selectedIndex === index;
              const isCorrectOption = index === correctIndex;
              const showCorrect = showResult && isCorrectOption;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedIndex(index)}
                  disabled={showResult}
                  className={`w-full p-5 sm:p-6 rounded-2xl text-left transition-all duration-300 transform ${
                    showCorrect
                      ? "bg-success/20 border-2 border-success scale-105 shadow-lg"
                      : showIncorrect
                      ? "bg-destructive/20 border-2 border-destructive"
                      : isSelected
                      ? "bg-primary/10 border-2 border-primary scale-105 shadow-card"
                      : "bg-card hover:bg-muted/50 border-2 border-border hover:border-primary/50 hover:scale-102"
                  } ${!showResult && 'hover:shadow-elevated'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        showCorrect 
                          ? "bg-success text-success-foreground" 
                          : showIncorrect 
                          ? "bg-destructive text-destructive-foreground"
                          : isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium text-base sm:text-lg">{option}</span>
                    </div>
                    {showCorrect && <CheckCircle2 className="w-6 h-6 text-success animate-bounce-in" />}
                    {showIncorrect && <XCircle className="w-6 h-6 text-destructive animate-scale-in" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <Card className={`p-6 sm:p-8 mb-6 border-0 shadow-elevated animate-bounce-in ${
              isCorrect 
                ? "bg-gradient-to-br from-success/10 to-success/5" 
                : "bg-gradient-to-br from-destructive/10 to-destructive/5"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCorrect ? 'bg-success' : 'bg-destructive'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  ) : (
                    <XCircle className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className={`text-lg font-bold mb-1 ${isCorrect ? "text-success" : "text-destructive"}`}>
                    {isCorrect ? t.correct : t.incorrect}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isCorrect 
                      ? (language === "en" ? "You're making great progress!" : "आप बढ़िया प्रगति कर रहे हैं!")
                      : (language === "en" ? "Review the lesson and try again." : "पाठ की समीक्षा करें और पुनः प्रयास करें।")}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {!showResult ? (
            <div className="space-y-3">
              <Button
                onClick={handleSubmit}
                disabled={selectedIndex === null}
                className="w-full shadow-elevated hover:scale-105 transition-transform"
                size="lg"
              >
                {t.submit}
              </Button>
              {selectedIndex === null && (
                <p className="text-center text-sm text-muted-foreground animate-fade-in">
                  {t.selectPrompt}
                </p>
              )}
            </div>
          ) : isCorrect ? (
            <Button
              onClick={() => onComplete(true)}
              className="w-full shadow-elevated hover:scale-105 transition-transform"
              size="lg"
            >
              {t.continue}
            </Button>
          ) : (
            <Button
              onClick={handleRetry}
              variant="outline"
              className="w-full hover:scale-105 transition-transform"
              size="lg"
            >
              {t.retry}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
