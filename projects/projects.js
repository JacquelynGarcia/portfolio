import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const titleElement = document.querySelector('.projects-title');
if (titleElement && projects?.length) {
  titleElement.textContent += ` (${projects.length})`;
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
    if (!Array.isArray(projects) || !containerElement) {
      console.warn('Invalid data or container');
      return;
    }
  
    containerElement.innerHTML = '';
  
    for (const project of projects) {
      const article = document.createElement('article');
  
      const title = project.title ?? 'Untitled';
      const imgSrc = project.image ?? '';
      const desc = project.description ?? '';
  
      article.innerHTML = `
        <${headingLevel}>${title}</${headingLevel}>
        <img src="${imgSrc}" alt="${title}">
        <p>${desc}</p>
      `;
  
      containerElement.appendChild(article);
    }
  
    if (projects.length === 0) {
      containerElement.innerHTML = '<p>No projects available at the moment.</p>';
    }
  }
  