

export interface Trainings {
    modules: Module[];
    users:   User[];
}

export interface Module {
    id:          string;
    title:       string;
    description: string;
    course:      Course;
}

export interface Course {
    videoLecture: string;
    quiz:         Quiz;
}

export interface Quiz {
    quiz1: string;
    quiz2: string;
    quiz3: string;
}

export interface User {
    profile:         Profile;
    courseProgress:  CourseProgress[];
    completedCourse: CompletedCourse[];
}

export interface CompletedCourse {
    courseId: number;
}

export interface CourseProgress {
    courseId: number;
    progress: number;
}

export interface Profile {
    name:     string;
    email:    string;
    password: string;
}
