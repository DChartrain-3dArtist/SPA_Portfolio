
import { getProjects } from './projects';

describe('Data Functions', () => {
  test('getProjects should return an array of projects', async () => {
    const projects = await getProjects();
    
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
    expect(projects[0]).toHaveProperty('id');
    expect(projects[0]).toHaveProperty('title');
  });
});
