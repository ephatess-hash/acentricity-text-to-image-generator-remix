import { blink } from '../../../lib/blink';
import { Experiment, ExperimentConfig } from '../../../types/research';

export class ExperimentService {
  static async createExperiment(experiment: Omit<Experiment, 'id' | 'createdAt'>): Promise<Experiment> {
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    
    await blink.db.experiments.create({
      id,
      userId: experiment.userId,
      name: experiment.name,
      description: experiment.description,
      config: JSON.stringify(experiment.config),
    });

    return { ...experiment, id, createdAt } as Experiment;
  }

  static async getExperiments(userId: string): Promise<Experiment[]> {
    const experiments = await blink.db.experiments.list({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return experiments.map(exp => ({
      ...exp,
      config: typeof exp.config === 'string' ? JSON.parse(exp.config) : exp.config
    })) as unknown as Experiment[];
  }

  static async deleteExperiment(id: string) {
    await blink.db.experiments.delete(id);
  }

  static async getExperiment(id: string): Promise<Experiment | null> {
    const exp = await blink.db.experiments.get(id);
    if (!exp) return null;

    return {
      ...exp,
      config: typeof exp.config === 'string' ? JSON.parse(exp.config) : exp.config
    } as unknown as Experiment;
  }
}
