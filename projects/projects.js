import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');

const projectsContainer = document.querySelector('.projects');

renderProjects(projects, projectsContainer, 'h2');

const titleElement = document.querySelector('.projects-title');
if (titleElement && projects?.length) {
  titleElement.textContent += ` (${projects.length})`;
}

let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

// let arc = arcGenerator({
//  startAngle: 0,
//  endAngle: 2 * Math.PI,
//});

// d3.select('svg').append('path').attr('d', arc).attr('fill', 'red');

let data = [1, 2, 3, 4, 5, 5];
let colors = d3.scaleOrdinal(d3.schemeTableau10);
let sliceGenerator = d3.pie();
let arcData = sliceGenerator(data);

const svg = d3.select('#projects-pie-plot');

arcData.forEach((d, i) => {
    svg.append('path')
       .attr('d', arcGenerator(d))
       .attr('fill', colors(i));
});

  