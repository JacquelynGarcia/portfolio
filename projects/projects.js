import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

let query = '';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const searchInput = document.querySelector('.searchBar');

const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
const colors = d3.scaleOrdinal(d3.schemeTableau10);
const sliceGenerator = d3.pie().value((d) => d.value);
const svg = d3.select('#projects-pie-plot');
const legend = d3.select('.legend');

function renderPieChart(projectsGiven) {
  svg.selectAll('path').remove();
  legend.selectAll('li').remove();

  if (!projectsGiven || projectsGiven.length === 0) {
      console.log("No project data to visualize.");
      return;
  }

  let rolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year
  );

  let data = rolledData.map(([year, count]) => {
    return { value: count, label: String(year) };
  });

  let arcData = sliceGenerator(data);

  arcData.forEach((d, i) => {
      svg.append('path')
         .attr('d', arcGenerator(d))
         .attr('fill', colors(i));
  });

  data.forEach((d, i) => {
      const li = legend.append('li');
      li.attr('class', 'legend-item');
      li.attr('style', `--color: ${colors(i)}`);
      li.html(`
          <span class="swatch"></span>
          ${d.label} <em>(${d.value})</em>
      `);
  });
}

renderProjects(projects, projectsContainer, 'h2');
renderPieChart(projects);

searchInput.addEventListener('input', (event) => {
  query = event.target.value.toLowerCase();

  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project)
                       .map(val => String(val))
                       .join('\n')
                       .toLowerCase();
    return values.includes(query);
  });

  renderProjects(filteredProjects, projectsContainer, 'h2');

  renderPieChart(filteredProjects);
});


const titleElement = document.querySelector('.projects-title');
if (titleElement && projects?.length) {
  titleElement.textContent += ` (${projects.length})`;
}