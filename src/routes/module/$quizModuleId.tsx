import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
  },
];

export const Route = createFileRoute("/module/$quizModuleId")({
  component: Quiz,
});

function Quiz() {
  const navigate = useNavigate({ from: "/module/$moduleId" });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

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
            <Button onClick={resetQuiz} className="w-full">
              Retake Quiz
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
