export interface QuizItem {
    id: string
    content: string
    type: 'task' | 'hazard' | 'control' | 'ppe'
    stepNumber: number
  }
  
  export interface Column {
    id: string
    title: string
  }
  
  
  