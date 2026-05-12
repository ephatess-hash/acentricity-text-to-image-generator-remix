import { blink } from '../../../lib/blink';
import { Identity } from '../../../types/research';

export class IdentityService {
  static async createIdentity(identity: Omit<Identity, 'id'>): Promise<Identity> {
    const id = crypto.randomUUID();
    const newIdentity = { ...identity, id };
    
    await blink.db.identities.create({
      id,
      name: identity.name,
      description: identity.description,
      basePrompt: identity.basePrompt,
      attributes: JSON.stringify(identity.attributes),
    });

    return newIdentity as Identity;
  }

  static async addReferenceImage(identityId: string, imageUrl: string) {
    await blink.db.identityImages.create({
      id: crypto.randomUUID(),
      identityId,
      imageUrl,
    });
  }

  static async checkConsistency(imageUrl: string, identityId: string): Promise<number> {
    const referenceImages = await blink.db.identityImages.list({
      where: { identityId }
    });

    if (referenceImages.length === 0) return 10; // Nothing to compare against

    const systemPrompt = `Compare the character in the first image with the reference character in the second image.
Rate the identity consistency from 0 to 10 (10 being perfect match).
Consider facial features, hair, clothing (if specified as persistent), and unique marks.

Return ONLY the number.`;

    const scores = await Promise.all(referenceImages.map(async (ref) => {
      const { text } = await blink.ai.generateText({
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: [
              { type: 'text', text: 'Compare character consistency.' },
              { type: 'image', image: imageUrl },
              { type: 'image', image: ref.imageUrl }
            ]
          }
        ]
      });
      return parseFloat(text) || 0;
    }));

    return scores.reduce((a, b) => a + b, 0) / scores.length;
  }
}
