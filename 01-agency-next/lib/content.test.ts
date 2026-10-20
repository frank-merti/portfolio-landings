import { describe, expect, it } from 'vitest';
import { content, translate, type ContentKey } from './content';

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

  it('returns the requested translation', () => {
    expect(translate('es', 'nav_cta')).toBe('Hablemos');
    expect(translate('en', 'nav_cta')).toBe("Let's talk");
  });

  it('falls back to the key when a translation is missing', () => {
    expect(translate('es', 'missing_key' as ContentKey)).toBe('missing_key');
  });
});
