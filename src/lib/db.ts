import { JSONFilePreset } from "lowdb/node";

interface Post {
  id: string;
  title: string;
  description: {
    overview: string;
    specificInstruction: string;
    trainingGoals: string;
  };
  category: string;
  course: {
    videoLecture: string;
    duration: string;
    quiz: {
      quiz1: string;
      quiz2: string;
      quiz3: string;
    };
  };
}

interface User {
  profile: {
    name: string;
    email: string;
    password: string;
  };
  courseProgress: {
    courseId: number;
    progress: number;
  }[];
  completedCourse: {
    courseId: number;
  }[];
}

interface DB {
  modules: Post[];
  users: User[];
}

// Read or create db.json
const defaultData: DB = {
  modules: [
    {
      id: "1",
      title: "Introduction to Data Science",
      description: {
        overview:
          "A beginner's guide to understanding data science, its applications, and career opportunities.",
        specificInstruction:
          "Focus on understanding basic concepts and terminologies used in data science.",
        trainingGoals:
          "Develop foundational knowledge in data science and be prepared for more advanced topics.",
      },
      category: "Data Science",
      course: {
        videoLecture: "intro_data_science.mp4",
        duration: "45 minutes",
        quiz: {
          quiz1: "What is data science?",
          quiz2: "Identify key fields within data science.",
          quiz3: "Name three applications of data science.",
        },
      },
    },
    {
      id: "2",
      title: "Python for Beginners",
      description: {
        overview:
          "An introductory course to Python programming, suitable for complete beginners.",
        specificInstruction:
          "Learn the basics of Python syntax, variables, and simple data types.",
        trainingGoals:
          "Gain the ability to write simple Python scripts and understand basic coding logic.",
      },
      category: "Programming",
      course: {
        videoLecture: "python_basics.mp4",
        duration: "1 hour",
        quiz: {
          quiz1: "What is a variable in Python?",
          quiz2: "How do you define a function in Python?",
          quiz3: "What is the output of print(3 + 5)?",
        },
      },
    },
    {
      id: "3",
      title: "Machine Learning Fundamentals",
      description: {
        overview:
          "This course covers the basics of machine learning, algorithms, and model training.",
        specificInstruction:
          "Focus on understanding the types of learning and basic algorithms.",
        trainingGoals:
          "Gain an understanding of machine learning concepts and types of algorithms.",
      },
      category: "Machine Learning",
      course: {
        videoLecture: "ml_fundamentals.mp4",
        duration: "1.5 hours",
        quiz: {
          quiz1: "What is supervised learning?",
          quiz2: "Name one common machine learning algorithm.",
          quiz3: "What is the purpose of training a model?",
        },
      },
    },
    {
      id: "4",
      title: "Cybersecurity Essentials",
      description: {
        overview:
          "An essential course on cybersecurity principles and practices for protecting data.",
        specificInstruction:
          "Learn the basics of network security, encryption, and best practices.",
        trainingGoals:
          "Understand cybersecurity fundamentals and basic protection techniques.",
      },
      category: "Cybersecurity",
      course: {
        videoLecture: "cybersecurity_essentials.mp4",
        duration: "50 minutes",
        quiz: {
          quiz1: "What is encryption?",
          quiz2: "Name one common type of cybersecurity threat.",
          quiz3: "What is the purpose of a firewall?",
        },
      },
    },
    {
      id: "5",
      title: "Digital Marketing Basics",
      description: {
        overview:
          "An introductory course on the key areas of digital marketing, including SEO and social media.",
        specificInstruction:
          "Focus on understanding various digital marketing channels and techniques.",
        trainingGoals:
          "Gain basic knowledge of digital marketing principles and tools.",
      },
      category: "Marketing",
      course: {
        videoLecture: "digital_marketing_basics.mp4",
        duration: "40 minutes",
        quiz: {
          quiz1: "What is SEO?",
          quiz2: "Name a popular social media platform for marketing.",
          quiz3: "What does PPC stand for in digital marketing?",
        },
      },
    },
    {
      id: "6",
      title: "Time Management Skills",
      description: {
        overview:
          "Learn strategies to improve time management and boost productivity.",
        specificInstruction:
          "Apply time management techniques to balance workloads effectively.",
        trainingGoals:
          "Develop effective time management habits and improve productivity.",
      },
      category: "Productivity",
      course: {
        videoLecture: "time_management_skills.mp4",
        duration: "30 minutes",
        quiz: {
          quiz1: "What is prioritization?",
          quiz2: "Name one technique for managing distractions.",
          quiz3: "What is the benefit of setting deadlines?",
        },
      },
    },
  ],

  users: [
    {
      profile: {
        name: "",
        email: "",
        password: "",
      },
      courseProgress: [
        {
          courseId: 1,
          progress: 20,
        },
      ],
      completedCourse: [
        {
          courseId: 1,
        },
      ],
    },
  ],
};
const db = await JSONFilePreset("./db.json", defaultData);

export default db;

// Update db.json
// await db.update(({ modules }) =>
//   modules.push({ content: "Hello", title: "World" })
// );

// Alternatively you can call db.write() explicitely later
// to write to db.json
// db.data.posts.push({ title: "Hello", content: "World" });
// await db.write();
