import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const titleElement = document.querySelector('.projects-title');
if (titleElement && projects?.length) {
  titleElement.textContent += ` (${projects.length})`;
}

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
    containerElement.innerHTML = '';
  
    projects.forEach(project => {
      const article = document.createElement('article');
      const headingTag = document.createElement(headingLevel);
      headingTag.textContent = project.title;
  
      const image = document.createElement('img');
      image.src = project.image;
      image.alt = project.title;
  
      const description = document.createElement('p');
      description.textContent = project.description;
  
      article.appendChild(headingTag);
      article.appendChild(image);
      article.appendChild(description);
      containerElement.appendChild(article);
    });
  }
  