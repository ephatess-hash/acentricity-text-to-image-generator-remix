export type BenchmarkCategory = 'counting' | 'spatial' | 'geometry' | 'realism' | 'typography' | 'identity';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'adversarial';

export interface Benchmark {
  id: string;
  category: BenchmarkCategory;
  difficulty: Difficulty;
  prompt: string;
  expectedResults?: string;
  createdAt: string;
}

export interface EvaluationMetrics {
  countingScore: number;
  spatialScore: number;
  realismScore: number;
  typographyScore: number;
  identityScore: number;
  geometryScore: number;
  overallScore: number;
  failureExplanations: string[];
  detectedIssues: any;
}

export interface SceneNode {
  id: string;
  label: string;
  type: string;
  attributes: Record<string, any>;
}

export interface SceneEdge {
  source: string;
  target: string;
  relation: 'left_of' | 'right_of' | 'behind' | 'in_front_of' | 'between' | 'above' | 'below' | 'overlapping';
}

export interface SceneGraph {
  nodes: SceneNode[];
  edges: SceneEdge[];
}

export interface Identity {
  id: string;
  name: string;
  description: string;
  basePrompt: string;
  attributes: Record<string, any>;
  referenceImages: string[];
}

export interface Experiment {
  id: string;
  userId: string;
  name: string;
  description: string;
  config: ExperimentConfig;
  createdAt: string;
}

export interface ExperimentConfig {
  prompts: string[];
  models: string[];
  iterations: number;
  parameters: Record<string, any>;
}
