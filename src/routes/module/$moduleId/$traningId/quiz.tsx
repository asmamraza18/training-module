import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import db, { quiz, trainingProgress, moduleProgress, users } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { AuthContext } from "@/context/AuthProvider";

export const Route = createFileRoute("/module/$moduleId/$traningId/quiz")({
  component: Quiz,
  loader: async () => await db.select().from(quiz),
});

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const { traningId, moduleId } = Route.useParams();
  const { user } = useContext(AuthContext);
  const quiz = Route.useLoaderData();
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.length).fill(-1));
  const navigate = useNavigate();

  const dataQuiz = quiz.map((question) => {
    const options = JSON.parse(question.options); // Parse the JSON description
    return {
      id: question.id,
      trainingId: question.trainingId,
      question: question.question,
      options: options,
      correctAnswer: question.correctAnswer,
    };
  });

  const handleAnswerSelection = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quiz.length).fill(-1));
    setShowResults(false);
  };

  const insertResultQuiz = async (id: number, quizResult: number) => {
    try {
      // Check if a record already exists
      const existingRecord = await db.select().from(users).where(eq(users.id, id)).get();

      if (existingRecord) {
        //Insert quizResult
        await db
          .update(users)
          .set({
            quizResult: quizResult,
          })
          .where(and(eq(users.id, user.id)))
          .run();
        return { type: "update", id: existingRecord.id };
      }
    } catch (error) {
      console.error("Error in insertResultQuiz:", error);
      throw error;
    }
  };

  const upsertTrainingProgress = async (data: {
    userId: number;
    trainingId: number;
    status?: "not_started" | "in_progress" | "completed";
    progress?: number;
    startedAt?: Date;
    completedAt?: Date;
    lastAccessedAt?: Date;
  }) => {
    try {
      // Check if a record already exists
      const existingRecord = await db
        .select()
        .from(trainingProgress)
        .where(and(eq(trainingProgress.userId, data.userId), eq(trainingProgress.trainingId, data.trainingId)))
        .get();

      if (existingRecord) {
        // If record exists, update it
        await db
          .update(trainingProgress)
          .set({
            status: data.status ?? existingRecord.status,
            progress: data.progress ?? existingRecord.progress,
            startedAt: data.startedAt ?? existingRecord.startedAt,
            completedAt: data.completedAt ?? existingRecord.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .where(and(eq(trainingProgress.userId, data.userId), eq(trainingProgress.trainingId, data.trainingId)))
          .run();

        return { type: "update", id: existingRecord.id };
      } else {
        // If no record exists, insert a new one
        const inserted = await db
          .insert(trainingProgress)
          .values({
            userId: data.userId,
            trainingId: data.trainingId,
            status: data.status ?? "not_started",
            progress: data.progress ?? 0,
            startedAt: data.startedAt,
            completedAt: data.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .returning(); // Note: Depending on your Drizzle version, you might need to adjust this

        return { type: "insert", id: inserted[0].id };
      }
    } catch (error) {
      console.error("Error in upsertTrainingProgress:", error);
      throw error;
    }
  };

  const upsertModuleProgress = async (data: {
    userId: number;
    moduleId: number;
    status?: "not_started" | "in_progress" | "completed";
    progress?: number;
    startedAt?: Date;
    completedAt?: Date;
    lastAccessedAt?: Date;
  }) => {
    try {
      // Check if a record already exists
      const existingRecord = await db
        .select()
        .from(moduleProgress)
        .where(and(eq(moduleProgress.userId, data.userId), eq(moduleProgress.moduleId, data.moduleId)))
        .get();

      if (existingRecord) {
        // If record exists, update it
        await db
          .update(moduleProgress)
          .set({
            status: data.status ?? existingRecord.status,
            progress: data.progress ?? existingRecord.progress,
            startedAt: data.startedAt ?? existingRecord.startedAt,
            completedAt: data.completedAt ?? existingRecord.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .where(and(eq(moduleProgress.userId, data.userId), eq(moduleProgress.moduleId, data.moduleId)))
          .run();

        return { type: "update", id: existingRecord.id };
      } else {
        // If no record exists, insert a new one
        const inserted = await db
          .insert(moduleProgress)
          .values({
            userId: data.userId,
            moduleId: data.moduleId,
            status: data.status ?? "not_started",
            progress: data.progress ?? 0,
            startedAt: data.startedAt,
            completedAt: data.completedAt,
            lastAccessedAt: data.lastAccessedAt ?? new Date(),
          })
          .returning();

        return { type: "insert", id: inserted[0].id };
      }
    } catch (error) {
      console.error("Error in upsertModuleProgress:", error);
      throw error;
    }
  };

  const handleTrainingProgress = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const quizResult = await insertResultQuiz(
        user.id, // first argument: id
        calculateScore() // second argument: quizResult
      );
      console.log("Quiz Result:", quizResult);
      // Upsert Training Progress
      const trainingProgressResult = await upsertTrainingProgress({
        userId: user.id,
        trainingId: parseInt(traningId),
        status: "completed",
        progress: 100, // You can adjust this initial progress
        lastAccessedAt: new Date(),
      });
      console.log("Training Progress Result:", trainingProgressResult);
      // Upsert Module Progress
      const moduleProgressResult = await upsertModuleProgress({
        userId: user.id,
        moduleId: parseInt(moduleId), // from the current page's module ID
        status: "completed",
        progress: 100, // You can adjust this initial progress
        lastAccessedAt: new Date(),
      });
      console.log("Module Progress Result:", moduleProgressResult);

      // Navigate to regular training route
      toast.success("Training Completed!", {
        description: "You completed this training",
        duration: 3000,
        position: "top-right",
        icon: "👏",
      });
      navigate({ to: "/dashboard" });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to upsert training progress:", error.message);
        // Handle the error appropriately (e.g., show user-friendly message)
      }
    }
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
                Question {currentQuestion + 1} of {quiz.length}
              </h2>
              <p className="mb-4">{quiz[currentQuestion].question}</p>
              <RadioGroup
                value={selectedAnswers[currentQuestion].toString()}
                onValueChange={(value) => handleAnswerSelection(parseInt(value))}
              >
                {dataQuiz[currentQuestion].options.map((option: any, index: any) => (
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
                You scored {calculateScore()} out of {quiz.length}
              </p>
              {dataQuiz.map((question, index) => (
                <div key={question.id} className="mb-4">
                  <p
                    className={cn(
                      "font-medium",
                      selectedAnswers[index] === question.correctAnswer ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {index + 1}. {question.question}
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
                {currentQuestion === dataQuiz.length - 1 ? "Finish" : "Next"}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={resetQuiz}>Retake Quiz</Button>
              <Button disabled={calculateScore() <= 10} onClick={(e) => handleTrainingProgress(e)}>
                Complete Training
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
