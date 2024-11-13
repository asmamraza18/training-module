import data from "../trainings.json";

export interface Data {
  modules: TrainingModule[];
  users: User[];
}

export interface TrainingModule {
  id: string;
  title: string;
  description: Description;
  category: string;
  course: Course;
}

export interface Description {
  overview: string;
  specificInstruction: string;
  trainingGoals: string;
}

export interface Course {
  videoLecture: string;
  duration: string;
  quiz: Quiz;
}

export interface Quiz {
  quiz1: string;
  quiz2: string;
  quiz3: string;
}

export interface User {
  profile: Profile;
  courseProgress: CourseProgress[];
  completedCourse: CompletedCourse[];
}

export interface Profile {
  name: string;
  email: string;
  password: string;
}

export interface CourseProgress {
  courseId: number;
  progress: number;
}

export interface CompletedCourse {
  courseId: number;
}

export function addModule(trainingModule: TrainingModule) {
  data.modules.push(trainingModule);
}

export function addUser(user: User) {
  data.users.push(user);
}

export function getModules() {
  return data.modules;
}

export function getUsers() {
  return data.users;
}

export function getModuleById(id: string) {
  return data.modules.find((module) => module.id === id);
}

export function getUserByEmail(email: string) {
  return data.users.find((user) => user.profile.email === email);
}

export function getCourseProgressByUserId(userId: string) {
  const user = data.users.find((user) => user.profile.email === userId);
  return user?.courseProgress;
}

export function getCompletedCourseByUserId(userId: string) {
  const user = data.users.find((user) => user.profile.email === userId);
  return user?.completedCourse;
}

export function updateCourseProgress(
  userId: string,
  courseId: number,
  progress: number
) {
  const user = data.users.find((user) => user.profile.email === userId);
  const courseProgress = user?.courseProgress.find(
    (course) => course.courseId === courseId
  );
  if (courseProgress) {
    courseProgress.progress = progress;
  } else {
    user?.courseProgress.push({ courseId, progress });
  }
}

export function updateCompletedCourse(userId: string, courseId: number) {
  const user = data.users.find((user) => user.profile.email === userId);
  user?.completedCourse.push({ courseId });
}

export function removeModule(id: string) {
  const index = data.modules.findIndex((module) => module.id === id);
  data.modules.splice(index, 1);
}

export function removeUser(email: string) {
  const index = data.users.findIndex((user) => user.profile.email === email);
  data.users.splice(index, 1);
}

export function updateModule(id: string, trainingModule: TrainingModule) {
  const index = data.modules.findIndex((module) => module.id === id);
  data.modules[index] = trainingModule;
}

export function updateUser(email: string, user: User) {
  const index = data.users.findIndex((user) => user.profile.email === email);
  data.users[index] = user;
}
