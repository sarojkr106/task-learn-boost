import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, ArrowLeft } from "lucide-react";

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
      correct: "Correct! Well done!",
      incorrect: "Not quite right. Try again!",
      continue: "Continue",
      retry: "Try Again"
    },
    hi: {
      title: "त्वरित क्विज़",
      subtitle: "अपनी समझ का परीक्षण करें",
      submit: "उत्तर जमा करें",
      correct: "सही! अच्छा किया!",
      incorrect: "बिल्कुल सही नहीं। पुनः प्रयास करें!",
      continue: "जारी रखें",
      retry: "पुनः प्रयास करें"
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 shadow-card">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Card className="p-8 shadow-elevated">
          <h2 className="text-xl font-semibold text-foreground mb-6">{question}</h2>

          <div className="space-y-3 mb-8">
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
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    showCorrect
                      ? "bg-success/20 border-2 border-success"
                      : showIncorrect
                      ? "bg-destructive/20 border-2 border-destructive"
                      : isSelected
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted hover:bg-muted/80 border-2 border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrect && <CheckCircle2 className="w-5 h-5 text-success" />}
                    {showIncorrect && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <Card className={`p-6 mb-6 ${isCorrect ? "bg-success/10" : "bg-destructive/10"}`}>
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
                ) : (
                  <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                )}
                <p className={`text-lg font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
                  {isCorrect ? t.correct : t.incorrect}
                </p>
              </div>
            </Card>
          )}

          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedIndex === null}
              className="w-full"
              size="lg"
            >
              {t.submit}
            </Button>
          ) : isCorrect ? (
            <Button
              onClick={() => onComplete(true)}
              className="w-full"
              size="lg"
            >
              {t.continue}
            </Button>
          ) : (
            <Button
              onClick={handleRetry}
              variant="outline"
              className="w-full"
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
