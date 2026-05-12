import { blink } from '../../../lib/blink';
import { Benchmark, BenchmarkCategory, Difficulty } from '../../../types/research';

export class StressTestingService {
  static async generateDifficultPrompt(category: BenchmarkCategory, difficulty: Difficulty): Promise<string> {
    const systemPrompt = `You are an AI research assistant specializing in stress-testing image generation models.
Generate a single, highly specific image generation prompt that targets the following weakness: ${category}.
Difficulty level: ${difficulty}.

Focus on:
- For counting: exact numbers (e.g. "exactly 7 distinct red apples").
- For spatial: precise relative positions (e.g. "a small key to the left of a blue bottle, which is behind a glass sphere").
- For geometry: complex architectural or reflective tasks.
- For typography: specific words with correct spelling and alignment.
- For identity: describing a character with highly specific persistent traits.

Return ONLY the prompt text.`;

    const { text } = await blink.ai.generateText({
      messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: 'Generate a prompt.' }],
    });

    return text.trim();
  }

  static async seedBenchmarks() {
    const categories: BenchmarkCategory[] = ['counting', 'spatial', 'geometry', 'realism', 'typography', 'identity'];
    const difficulties: Difficulty[] = ['easy', 'medium', 'hard', 'adversarial'];

    for (const category of categories) {
      for (const difficulty of difficulties) {
        const prompt = await this.generateDifficultPrompt(category, difficulty);
        await blink.db.benchmarks.create({
          id: crypto.randomUUID(),
          category,
          difficulty,
          prompt,
        });
      }
    }
  }

  static async getBenchmarks(): Promise<Benchmark[]> {
    return await blink.db.benchmarks.list({ orderBy: { createdAt: 'desc' } });
  }
}
