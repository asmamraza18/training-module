import { QuizItem, Column } from './types'

export const columns: Column[] = [
    { id: 'task', title: 'Task' },
    { id: 'hazard', title: 'Hazard' },
    { id: 'control', title: 'Control Measures' },
    { id: 'ppe', title: 'PPE Required' },
  ]

export const quizItems: QuizItem[] = [
    {
      id: 'setup',
      content: 'Set up welding area',
      type: 'task',
      stepNumber: 1,
    },
    {
      id: 'inspect',
      content: 'Inspect welding equipment',
      type: 'task',
      stepNumber: 2,
    },
    {
      id: 'perform',
      content: 'Perform welding task',
      type: 'task',
      stepNumber: 3,
    },
    {
      id: 'inspect-weld',
      content: 'Inspect the weld after task',
      type: 'task',
      stepNumber: 4,
    },
    {
      id: 'fire',
      content: 'Fire or explosion',
      type: 'hazard',
      stepNumber: 1,
    },
    {
      id: 'shock',
      content: 'Electric shock',
      type: 'hazard',
      stepNumber: 2,
    },
    {
      id: 'fumes',
      content: 'Exposure to welding fumes',
      type: 'hazard',
      stepNumber: 3,
    },
    {
      id: 'burns',
      content: 'Burns from hot metal',
      type: 'hazard',
      stepNumber: 4,
    },
    {
      id: 'clear',
      content: 'Clear the area of all flammable materials',
      type: 'control',
      stepNumber: 1,
    },
    {
      id: 'cables',
      content: 'Inspect cables for damage, ensure grounding',
      type: 'control',
      stepNumber: 2,
    },
    {
      id: 'ventilation',
      content: 'Use local exhaust ventilation or respirators',
      type: 'control',
      stepNumber: 3,
    },
    {
      id: 'cool-down',
      content: 'Allow the weld to cool down before handling',
      type: 'control',
      stepNumber: 4,
    },
    {
      id: 'flame-resistant',
      content: 'Flame-resistant gloves, welding helmet',
      type: 'ppe',
      stepNumber: 1,
    },
    {
      id: 'rubber-gloves',
      content: 'Rubber gloves, insulated boots',
      type: 'ppe',
      stepNumber: 2,
    },
    {
      id: 'respirator',
      content: 'Respirator, face shield',
      type: 'ppe',
      stepNumber: 3,
    },
    {
      id: 'heat-resistant',
      content: 'Heat-resistant gloves',
      type: 'ppe',
      stepNumber: 4,
    },
  ]

