import { eq, sql ,and} from "drizzle-orm";
import { db, users, modules, trainings, trainingProgress, moduleProgress, quiz} from "./lib/db";

export async function seedUsers() {
  await db.insert(users).values([
    {
      email: "sample_2@test.com",
      name: "Sample User 2",
    },
    {
      email: "sample_1@test.com",
      name: "Sample User 1",
    },
  ]);
}

const moduleData = [
  {
    title: "Unit 1: Introduction to Job Safety Analysis (JSA)",
    description: JSON.stringify({
      overview: "An overview of Job Safety Analysis (JSA), its purpose, and its benefits in workplace safety.",
      specificInstruction: "Understand the concept of JSA and its importance in identifying hazards.",
      trainingGoals: "Familiarize participants with the basics of JSA and its role in ensuring a safe working environment.",
    }),
    icon: "SafetyIcon", // Replace with your actual icon reference
    recommended: "true",
  },
  {
    title: "Unit 2: Detailed JSA Process for Welding Machines and Gas Cutting",
    description: JSON.stringify({
      overview: "Step-by-step instructions for conducting a JSA specific to welding and gas cutting tasks.",
      specificInstruction: "Focus on hazard identification, control measures, and safety checklists for welding machines and gas cutting equipment.",
      trainingGoals: "Enable participants to conduct effective JSAs for welding and gas cutting tasks.",
    }),
    icon: "WeldingIcon",
    recommended: "true",
  },
  {
    title: "Unit 3: Toolbox Talks and Safety Communication",
    description: JSON.stringify({
      overview: "How to conduct effective toolbox talks and communicate safety protocols to workers.",
      specificInstruction: "Learn methods for engaging teams in safety discussions and reinforcing safety measures.",
      trainingGoals: "Develop communication skills to effectively deliver safety talks and improve team awareness.",
    }),
    icon: "CommunicationIcon",
    recommended: "false",
  },
  {
    title: "Unit 4: Safety Procedures for Welding, Grinding, and Gas Cutting",
    description: JSON.stringify({
      overview: "A guide to safe operating procedures for welding, grinding, and gas cutting activities.",
      specificInstruction: "Understand the safety standards, personal protective equipment (PPE), and emergency protocols for these tasks.",
      trainingGoals: "Ensure workers can safely perform welding, grinding, and gas cutting tasks by following established procedures.",
    }),
    icon: "ProcedureIcon",
    recommended: "true",
  },
  {
    title: "Unit 5: Practical Assessments and Online Simulations",
    description: JSON.stringify({
      overview: "Hands-on assessments and simulations to test knowledge and skills in welding and safety procedures.",
      specificInstruction: "Participate in practical exercises and online simulations to apply safety knowledge.",
      trainingGoals: "Evaluate and improve the ability to safely execute welding and gas cutting tasks.",
    }),
    icon: "AssessmentIcon",
    recommended: "false",
  },
];

// Seed data for trainings table
export const trainingData = [
  {
    title: "Online Quiz",
    description: "Interactive online quiz to assess knowledge on JSA process and safety protocols",
    thumbnail: "https://img.freepik.com/premium-photo/vibrant-thumbnail-template-illustration-quiz-video-background_894279-6612.jpg",
    order: 1,
    duration: 45,
    moduleId: 5
  }
];

// Seed data for training_progress table
export const trainingProgressData = [
  {
    userId: 4,
    trainingId: 1,
    status: "not_started",
    progress: 0,
    startedAt: new Date(),
    completedAt: null,
    lastAccessedAt: new Date()
  }
];

export const quizData = [
  {
    trainingId: 11,
    question: "What is the most common hazard in grinding operations?",
    options: JSON.stringify([
      "Electrical equipment failures",
      "Flying debris and sparks",
      "Noise pollution", 
      "Chemical exposure"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "Describe the control measures required to prevent burns during welding.",
    options: JSON.stringify([
      "Wear loose clothing",
      "Use appropriate fire-resistant PPE and protective gear",
      "Ignore safety guidelines",
      "Work without protective equipment"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "How do you perform a leak test on gas cutting hoses?",
    options: JSON.stringify([
      "Visual inspection only",
      "Apply soapy water and check for bubble formation",
      "Ignore potential leaks",
      "Use open flame to detect leaks"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "What Personal Protective Equipment (PPE) is essential for gas cutting operations?",
    options: JSON.stringify([
      "Baseball cap and t-shirt",
      "Welding helmet, flame-resistant gloves, and protective clothing",
      "Sunglasses and shorts",
      "No special protective gear needed"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "Explain the steps for setting up a safe welding area.",
    options: JSON.stringify([
      "No preparation necessary",
      "Clear area, use fire-resistant barriers, inspect equipment",
      "Work in confined spaces",
      "Ignore surrounding flammable materials"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "What should you check for when inspecting welding cables before starting work?",
    options: JSON.stringify([
      "Cable color",
      "Signs of damage, fraying, or exposed wires",
      "Cable length",
      "Cable manufacturer"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "Describe the potential hazards associated with TIG welding.",
    options: JSON.stringify([
      "No specific hazards exist",
      "UV radiation, electric shock, and toxic fumes",
      "Only noise pollution",
      "Minimal risk of injury"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "What should be done if an electric shock occurs during welding?",
    options: JSON.stringify([
      "Ignore it and continue working",
      "Immediately stop work and seek medical attention",
      "Continue welding",
      "Use the same equipment"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "Why is ventilation important in welding operations, and how can it be ensured?",
    options: JSON.stringify([
      "Ventilation is not necessary",
      "Prevent toxic fume buildup using local exhaust ventilation",
      "Only needed in outdoor settings",
      "Use fans to blow fumes towards workers"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "What are the correct PPE items for grinding tasks, and why are they needed?",
    options: JSON.stringify([
      "No PPE required",
      "Safety glasses, face shield, gloves, and hearing protection",
      "Regular clothing",
      "Sunglasses only"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "Describe the procedure for safely shutting down gas cutting equipment.",
    options: JSON.stringify([
      "Leave equipment running",
      "Close valves, release pressure, and disconnect gas supply",
      "Ignore shutdown procedures",
      "Quickly disconnect without proper steps"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "What are the key fire prevention measures to take before starting a welding task?",
    options: JSON.stringify([
      "No preparation needed",
      "Clear area, remove flammable materials, have fire extinguisher ready",
      "Work near combustible materials",
      "Ignore fire risks"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "Explain the purpose of a 'ring test' when inspecting grinding discs.",
    options: JSON.stringify([
      "To check disc color",
      "To detect cracks or damage by listening to disc sound",
      "To measure disc diameter",
      "To check disc temperature"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "What steps should be followed to handle a gas leak during gas cutting?",
    options: JSON.stringify([
      "Continue working",
      "Evacuate area, shut off gas supply, ventilate",
      "Ignore the leak",
      "Use open flame to detect leak"
    ]),
    correctAnswer: 1
  },
  {
    trainingId: 11,
    question: "List three common hazards in welding, grinding, and gas cutting, and describe a control measure for each.",
    options: JSON.stringify([
      "No hazards exist",
      "Identify hazards like UV radiation, flying debris, and toxic fumes, use appropriate PPE and procedures",
      "Ignore safety measures",
      "Use minimal protection"
    ]),
    correctAnswer: 1
  }
];



// Seed the `modules` table
export async function seedModules() {
  await db.insert(modules).values(moduleData);
}
// Seed the `trainings` table
export async function seedTrainings() {
  await db.insert(trainings).values(trainingData);
}
// Seed the `trainings` table
export async function seedQuiz() {
  await db.insert(quiz).values(quizData);
}

//resetData
export async function resetData() {
  await db.delete(quiz);
}

seedQuiz();

console.log("Table seeded successfully!");