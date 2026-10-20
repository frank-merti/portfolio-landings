import { describe, expect, it } from 'vitest';
import { content, featureKeys, faqKeys, planKeys, translate, type ContentKey } from './content';

describe('content catalog', () => {
  it('exposes the same keys for every language', () => {
    expect(Object.keys(content.en).sort()).toEqual(Object.keys(content.es).sort());
  });

  it('has no empty strings', () => {
    for (const locale of Object.values(content)) {
      for (const [key, value] of Object.entries(locale)) {
        expect(value.trim(), key).not.toBe('');
      }
    }
  });

  it('has an answer for every question', () => {
    for (const question of faqKeys) {
      const answer = question.replace('q', 'a') as ContentKey;
      expect(translate('es', answer).trim()).not.toBe('');
      expect(translate('en', answer).trim()).not.toBe('');
    }
  });

  it('keeps the feature, plan and faq collections aligned', () => {
    expect(featureKeys).toHaveLength(4);
    expect(planKeys).toHaveLength(3);
    expect(faqKeys).toHaveLength(4);
  });

  it('falls back to the key when a translation is missing', () => {
    expect(translate('en', 'missing_key' as ContentKey)).toBe('missing_key');
  });
});
