import { describe, expect, it } from 'vitest';
import { colorKeys, content, featureKeys, specs } from './content.js';

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

  it('defines a description for every feature', () => {
    for (const key of featureKeys) {
      expect(content.es[`${key}d`]).toBeTruthy();
      expect(content.en[`${key}d`]).toBeTruthy();
    }
  });

  it('defines a label for every colour', () => {
    for (const key of colorKeys) {
      expect(content.es[`col_${key}`]).toBeTruthy();
      expect(content.en[`col_${key}`]).toBeTruthy();
    }
  });

  it('ships a complete specification table', () => {
    expect(specs.length).toBeGreaterThanOrEqual(8);
    for (const [key, value] of specs) {
      expect(key.trim()).not.toBe('');
      expect(value.trim()).not.toBe('');
    }
  });
});
