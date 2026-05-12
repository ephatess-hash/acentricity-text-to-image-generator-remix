import { EvaluationMetrics } from '../../../types/research';

export const normalizeScores = (metrics: EvaluationMetrics): number => {
  const scores = [
    metrics.countingScore,
    metrics.spatialScore,
    metrics.realismScore,
    metrics.typographyScore,
    metrics.identityScore,
    metrics.geometryScore
  ];
  
  const validScores = scores.filter(s => s !== undefined && s !== null);
  if (validScores.length === 0) return 0;
  
  return validScores.reduce((a, b) => a + b, 0) / validScores.length;
};

export const generateFailureHeatmap = (metrics: EvaluationMetrics) => {
  // Simplified heatmap: returns a mapping of metric names to a "severity" score (0-10)
  // where higher means more severe failure.
  return {
    counting: Math.max(0, 10 - (metrics.countingScore || 0)),
    spatial: Math.max(0, 10 - (metrics.spatialScore || 0)),
    realism: Math.max(0, 10 - (metrics.realismScore || 0)),
    typography: Math.max(0, 10 - (metrics.typographyScore || 0)),
    identity: Math.max(0, 10 - (metrics.identityScore || 0)),
    geometry: Math.max(0, 10 - (metrics.geometryScore || 0)),
  };
};

export const getOverallPerformance = (evaluations: EvaluationMetrics[]) => {
  if (evaluations.length === 0) return null;

  const sums = evaluations.reduce((acc, curr) => ({
    counting: acc.counting + (curr.countingScore || 0),
    spatial: acc.spatial + (curr.spatialScore || 0),
    realism: acc.realism + (curr.realismScore || 0),
    typography: acc.typography + (curr.typographyScore || 0),
    identity: acc.identity + (curr.identityScore || 0),
    geometry: acc.geometry + (curr.geometryScore || 0),
    overall: acc.overall + (curr.overallScore || 0),
  }), {
    counting: 0,
    spatial: 0,
    realism: 0,
    typography: 0,
    identity: 0,
    geometry: 0,
    overall: 0,
  });

  const count = evaluations.length;
  return {
    counting: sums.counting / count,
    spatial: sums.spatial / count,
    realism: sums.realism / count,
    typography: sums.typography / count,
    identity: sums.identity / count,
    geometry: sums.geometry / count,
    overall: sums.overall / count,
  };
};
