import { db, users, modules } from "./lib/db";

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

interface ModuleContent {
  icon: string;
  recommended?: boolean;
  sections: string[];
}

interface ModuleData {
  id: number;
  trainingId: number;
  title: string;
  description: string;
  order: number;
  duration: number;
  content: ModuleContent;
}

const moduleData: ModuleData[] = [
  {
    id: 1,
    trainingId: 1,
    title: "Welding Machine JSA",
    description: "Job Safety Analysis for welding machine operations",
    order: 1,
    duration: 45,
    content: {
      icon: "Flame",
      recommended: true,
      sections: [
        "Overview of Welding Safety",
        "Required PPE",
        "Pre-operation Checks",
        "Safe Operation Procedures"
      ]
    }
  },
  {
    id: 2,
    trainingId: 1,
    title: "Personal Protective Equipment",
    description: "Proper use and maintenance of PPE",
    order: 2,
    duration: 30,
    content: {
      icon: "HardHat",
      sections: [
        "Types of PPE",
        "When to Use PPE",
        "Proper Fitting and Adjustment",
        "Maintenance and Storage"
      ]
    }
  },
  {
    id: 3,
    trainingId: 1,
    title: "Basic Tool Safety",
    description: "Safe handling of common workshop tools",
    order: 3,
    duration: 30,
    content: {
      icon: "Wrench",
      sections: [
        "Hand Tool Safety",
        "Power Tool Safety",
        "Tool Maintenance",
        "Storage and Organization"
      ]
    }
  },
  {
    id: 4,
    trainingId: 1,
    title: "Electrical Safety",
    description: "Fundamentals of electrical safety in the workplace",
    order: 4,
    duration: 40,
    content: {
      icon: "Zap",
      sections: [
        "Basic Electrical Concepts",
        "Common Hazards",
        "Safety Procedures",
        "Emergency Response"
      ]
    }
  }
];

export async function seedModules() {
  try {
    // Delete existing records if needed
    await db.delete(modules);
    
    // Insert all modules
    for (const module of moduleData) {
      await db.insert(modules).values({
        id: module.id,
        trainingId: module.trainingId,
        title: module.title,
        description: module.description,
        order: module.order,
        duration: module.duration,
        content: JSON.stringify(module.content)
      });
    }
    
    console.log('Successfully seeded modules table');
  } catch (error) {
    console.error('Error seeding modules:', error);
    throw error;
  }
}

seedModules();