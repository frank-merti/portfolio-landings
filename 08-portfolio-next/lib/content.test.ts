import { describe, expect, it } from 'vitest';
import {
  articles,
  content,
  experience,
  projects,
  schoolProjects,
  skills,
  translate,
  type ContentKey
} from './content';

describe('portfolio content', () => {
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

  it('lists every project with complete metadata', () => {
    expect(projects.length).toBeGreaterThanOrEqual(10);
    for (const project of projects) {
      expect(project.title.trim()).not.toBe('');
      expect(project.description.trim()).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.href).toMatch(/^\.\.\/\d\d-/);
    }
  });

  it('keeps project titles unique', () => {
    const titles = projects.map((project) => project.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it('exposes skills, experience and articles', () => {
    expect(skills.length).toBeGreaterThan(0);
    expect(experience.length).toBeGreaterThan(0);
    expect(articles.length).toBeGreaterThan(0);
  });

  it('describes every school project in both languages', () => {
    expect(schoolProjects.length).toBeGreaterThanOrEqual(10);
    for (const project of schoolProjects) {
      expect(project.name.trim()).not.toBe('');
      expect(project.technologies.length).toBeGreaterThan(0);
      expect(project.url).toMatch(/^https:\/\/github\.com\//);
      for (const language of ['es', 'en'] as const) {
        expect(project.description[language].trim(), `${project.name}/${language}`).not.toBe('');
      }
    }
  });

  it('keeps school project names unique', () => {
    const names = schoolProjects.map((project) => project.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('falls back to the key when a translation is missing', () => {
    expect(translate('en', 'missing_key' as ContentKey)).toBe('missing_key');
  });
});
