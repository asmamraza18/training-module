import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const questions = [
  {
    id: 1,
    text: "What is the primary safety precaution when operating a welding machine?",
    options: [
      "Wear protective gloves and helmet",
      "Avoid reading the instruction manual",
      "Operate near flammable materials",
      "Use wet gloves for better grip",
    ],
    correctAnswer: 0, // "Wear protective gloves and helmet"
  },
  {
    id: 2,
    text: "Which type of fire extinguisher is recommended for electrical fires during welding?",
    options: ["Water-based extinguisher", "CO2 extinguisher", "Foam extinguisher", "Sand or dirt only"],
    correctAnswer: 1, // "CO2 extinguisher"
  },
  {
    id: 3,
    text: "What is the purpose of grounding the welding machine?",
    options: [
      "Increase welding efficiency",
      "Prevent electrical shock",
      "Enhance arc brightness",
      "Reduce machine noise",
    ],
    correctAnswer: 1, // "Prevent electrical shock"
  },
];

export const Route = createFileRoute("/module/$moduleId/$traningId/$quizModuleId")({
  component: Quiz,
});

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleAnswerSelection = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>E-Learning Quiz</CardTitle>
          <CardDescription>Test your knowledge after watching the video</CardDescription>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="mb-4">{questions[currentQuestion].text}</p>
              <RadioGroup
                value={selectedAnswers[currentQuestion].toString()}
                onValueChange={(value) => handleAnswerSelection(parseInt(value))}
              >
                {questions[currentQuestion].options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
              <p className="mb-4">
                You scored {calculateScore()} out of {questions.length}
              </p>
              {questions.map((question, index) => (
                <div key={question.id} className="mb-4">
                  <p
                    className={cn(
                      "font-medium",
                      selectedAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {index + 1}. {question.text}
                  </p>
                  <p>Your answer: {question.options[selectedAnswers[index]]}</p>
                  <p>Correct answer: {question.options[question.correctAnswer]}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {!showResults ? (
            <>
              <Button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button onClick={handleNextQuestion} disabled={selectedAnswers[currentQuestion] === -1}>
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={resetQuiz}>Retake Quiz</Button>
              <Button
                disabled={calculateScore() != 3}
                onClick={() => {
                  toast.success("Training Completed!", {
                    description: "You completed this training",
                    duration: 3000,
                    position: "top-right",
                    icon: "👏",
                  });
                  navigate({ to: "/dashboard" });
                }}
              >
                Complete Training
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
