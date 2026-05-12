import { blink } from '../../../lib/blink';
import { EvaluationMetrics, SceneGraph } from '../../../types/research';

export class EvaluationService {
  static async evaluateImage(imageUrl: string, prompt: string): Promise<EvaluationMetrics> {
    const systemPrompt = `You are an advanced AI vision system used for evaluating the output of image generation models.
Analyze the provided image based on the user's prompt: "${prompt}".

Rate the following metrics from 0 to 10:
1. Object counting accuracy
2. Spatial reasoning (left/right, above/below adherence)
3. Optical realism (lighting, shadows, reflections)
4. Typography accuracy (if text is present)
5. Identity persistence (if applicable)
6. Geometry consistency (perspective, architectural integrity)

Provide the evaluation in JSON format with the following structure:
{
  "countingScore": number,
  "spatialScore": number,
  "realismScore": number,
  "typographyScore": number,
  "identityScore": number,
  "geometryScore": number,
  "overallScore": number,
  "failureExplanations": string[],
  "detectedIssues": object
}`;

    const { object } = await blink.ai.generateObject({
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: 'Evaluate this image.' },
            { type: 'image', image: imageUrl }
          ]
        }
      ],
      schema: {
        type: 'object',
        properties: {
          countingScore: { type: 'number' },
          spatialScore: { type: 'number' },
          realismScore: { type: 'number' },
          typographyScore: { type: 'number' },
          identityScore: { type: 'number' },
          geometryScore: { type: 'number' },
          overallScore: { type: 'number' },
          failureExplanations: { type: 'array', items: { type: 'string' } },
          detectedIssues: { type: 'object' }
        },
        required: ['countingScore', 'spatialScore', 'realismScore', 'typographyScore', 'identityScore', 'geometryScore', 'overallScore', 'failureExplanations']
      }
    });

    return object as EvaluationMetrics;
  }

  static async generateSceneGraph(imageUrl: string): Promise<SceneGraph> {
    const systemPrompt = `Analyze the image and generate a scene graph showing objects and their spatial relationships.
Include relationships like: left_of, right_of, behind, in_front_of, between, above, below, overlapping.

Provide JSON output:
{
  "nodes": [{ "id": "obj1", "label": "cup", "type": "object", "attributes": {} }],
  "edges": [{ "source": "obj1", "target": "obj2", "relation": "left_of" }]
}`;

    const { object } = await blink.ai.generateObject({
      messages: [
        { role: 'system', content: systemPrompt },
        { 
          role: 'user', 
          content: [
            { type: 'text', text: 'Generate scene graph for this image.' },
            { type: 'image', image: imageUrl }
          ]
        }
      ],
      schema: {
        type: 'object',
        properties: {
          nodes: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                label: { type: 'string' },
                type: { type: 'string' },
                attributes: { type: 'object' }
              },
              required: ['id', 'label', 'type']
            }
          },
          edges: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                source: { type: 'string' },
                target: { type: 'string' },
                relation: { type: 'string', enum: ['left_of', 'right_of', 'behind', 'in_front_of', 'between', 'above', 'below', 'overlapping'] }
              },
              required: ['source', 'target', 'relation']
            }
          }
        },
        required: ['nodes', 'edges']
      }
    });

    return object as SceneGraph;
  }
}
