import { useState, useEffect } from 'react';
import { Benchmark, EvaluationMetrics, Identity, SceneGraph } from '@/types/research';

export function useResearch() {
  const [loading, setLoading] = useState(true);

  // Mock data
  const benchmarks: Benchmark[] = [
    {
      id: 'bench-1',
      category: 'counting',
      difficulty: 'medium',
      prompt: 'A photo of exactly three red apples on a wooden table.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'bench-2',
      category: 'spatial',
      difficulty: 'hard',
      prompt: 'A small blue cube placed behind a large yellow sphere, with a green pyramid to the left of the sphere.',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'bench-3',
      category: 'typography',
      difficulty: 'adversarial',
      prompt: 'A neon sign that says "QUANTUM DYNAMICS" in a futuristic font.',
      createdAt: new Date().toISOString(),
    },
  ];

  const metrics: EvaluationMetrics = {
    countingScore: 85,
    spatialScore: 72,
    realismScore: 94,
    typographyScore: 65,
    identityScore: 88,
    geometryScore: 78,
    overallScore: 80.3,
    failureExplanations: [
      'Failed to render exactly three apples in 20% of test cases.',
      'Spatial relationships "behind" and "left of" were occasionally swapped.',
      'Typography rendering shows artifacts on complex characters.',
    ],
    detectedIssues: {
      counting: { accuracy: 0.82, variance: 0.05 },
      spatial: { precision: 0.74, recall: 0.68 },
    },
  };

  const identities: Identity[] = [
    {
      id: 'id-1',
      name: 'Dr. Evelyn Vance',
      description: 'Senior AI researcher with a penchant for cyberpunk aesthetics.',
      basePrompt: 'A middle-aged woman with short silver hair, wearing sharp hexagonal glasses and a lab coat.',
      attributes: { hair: 'silver', eyewear: 'hexagonal glasses', age: '45-50' },
      referenceImages: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'],
    },
  ];

  const sceneGraph: SceneGraph = {
    nodes: [
      { id: 'node-1', label: 'Apples', type: 'object', attributes: { color: 'red', count: 3 } },
      { id: 'node-2', label: 'Table', type: 'surface', attributes: { material: 'wood' } },
    ],
    edges: [
      { source: 'node-1', target: 'node-2', relation: 'above' },
    ],
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    loading,
    benchmarks,
    metrics,
    identities,
    sceneGraph,
  };
}
