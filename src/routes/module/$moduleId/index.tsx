import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import data from "@/trainings.json";
import { PauseCircle, PlayCircle, Volume2, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/module/$moduleId/")({
  component: Module,
});

function Module() {
  const { moduleId } = Route.useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasReadInstructions, setHasReadInstructions] = useState(false);
  const [hasListenedAudio, setHasListenedAudio] = useState(false);

  const modules = data.modules;
  const modulebyId = modules.filter((module) => module.id == moduleId);

  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {modulebyId.map((module) => (
        <h1 key={module.id} className="text-3xl font-bold">
          {module.title}
        </h1>
      ))}
      {modulebyId.map((module) => (
        <Card key={module.id}>
          <CardHeader>
            <CardTitle>Instructions and Safety Measures</CardTitle>
            <CardDescription>
              Please read through the written instructions and listen to the audio explanation carefully. Both are
              crucial for your understanding and safety during the practical training.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">1. Overview</h2>
                <p>{module.description.overview}</p>

                <h2 className="text-xl font-semibold">2. General Safety Measures</h2>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Always wear appropriate Personal Protective Equipment (PPE), including welding helmet, gloves, and
                    fire-resistant clothing.
                  </li>
                  <li>Ensure proper ventilation in the welding area to avoid inhaling harmful fumes.</li>
                  <li>Keep a fire extinguisher nearby and know how to use it.</li>
                  <li>Inspect all equipment before use and report any defects immediately.</li>
                </ul>

                <h2 className="text-xl font-semibold">3. Specific Welding Machine Instructions</h2>
                <p>{module.description.specificInstruction}</p>

                <h2 className="text-xl font-semibold">4. Training Goals</h2>
                <p>By the end of this module, you should be able to:</p>
                <p>{module.description.specificInstruction}</p>

                <h2 className="text-xl font-semibold">5. Practical Section Preview</h2>
                <p>The practical section will involve:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Equipment inspection and setup</li>
                  <li>Demonstration of proper welding techniques</li>
                  <li>Supervised practice sessions</li>
                  <li>Safety procedure drills</li>
                </ul>
              </div>
            </ScrollArea>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={hasReadInstructions}
                onCheckedChange={(checked) => setHasReadInstructions(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have read and understood the written instructions
              </label>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Audio Explanation</CardTitle>
                <CardDescription>
                  Listen to the detailed audio instructions for a comprehensive understanding.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <audio ref={audioRef} src="/welding-jsa-instructions.mp3" onEnded={() => setHasListenedAudio(true)} />
                <div className="flex items-center justify-between">
                  <Button onClick={togglePlay} variant="outline" className="w-32">
                    {isPlaying ? (
                      <>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pause
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Play
                      </>
                    )}
                  </Button>
                  <Button onClick={toggleMute} variant="outline" size="icon">
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="audio"
                checked={hasListenedAudio}
                onCheckedChange={(checked) => setHasListenedAudio(checked as boolean)}
              />
              <label
                htmlFor="audio"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I have listened to the complete audio explanation
              </label>
            </div>

            <Button variant="link" asChild>
              <Link
                to="/module/$moduleId/$quizModuleId"
                className={`w-full ${
                  hasReadInstructions && hasListenedAudio ? "" : "cursor-not-allowed text-gray-400"
                }`}
                params={{
                  moduleId: module.id,
                  quizModuleId: module.id,
                }}
              >
                Proceed to Practical Training test
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
