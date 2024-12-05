import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a Job Safety Analysis (JSA)?",
    answer:
      "A Job Safety Analysis (JSA) is a step-by-step process to identify potential hazards in specific tasks and implement measures to eliminate or control those risks.",
  },
  {
    question: "Why is JSA important for welding operations?",
    answer:
      "JSA is crucial for welding as it helps identify and mitigate risks like electric shocks, burns, toxic fumes, and fire hazards, ensuring worker safety.",
  },
  {
    question: "What are the key hazards associated with welding machines?",
    answer:
      "Key hazards include electric shock, fire hazards, toxic fumes, burns, eye injuries from UV radiation, and noise hazards.",
  },
  {
    question: "Who is responsible for conducting the JSA?",
    answer:
      "Supervisors, safety officers, or trained personnel are typically responsible for conducting the JSA, with input from workers familiar with the tasks.",
  },
  {
    question: "What are the steps in a JSA for welding machines?",
    answer:
      "The steps include breaking down the task, identifying hazards, determining controls, implementing controls, and regularly reviewing and updating the JSA.",
  },
  {
    question: "What personal protective equipment (PPE) is required for welding?",
    answer:
      "Required PPE includes welding helmets, fire-resistant gloves and clothing, safety goggles, respirators, steel-toed boots, and hearing protection.",
  },
  {
    question: "How can I ensure electrical safety while using a welding machine?",
    answer:
      "Ensure proper grounding, inspect cables regularly, avoid wet conditions, and disconnect power during maintenance.",
  },
];

export const Route = createFileRoute("/faq")({
  component: FAQ,
});

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      <div>
        <Input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filteredFaqs.length === 0 && <p className="text-center text-gray-500 mt-4">No matching questions found.</p>}
      </div>
    </div>
  );
}
