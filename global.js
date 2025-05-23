console.log('IT’S ALIVE!');

document.body.insertAdjacentHTML(
    'afterbegin',
    `
      <label class="color-scheme">
        Theme:
        <select>
          <option value="light dark">Automatic</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    `
  );
  
  const select = document.querySelector('.color-scheme select');
  
  function setColorScheme(scheme) {
    document.documentElement.style.setProperty('color-scheme', scheme);
    select.value = scheme;
  }
  
  if ("colorScheme" in localStorage) {
    setColorScheme(localStorage.colorScheme);
  }
  
  select.addEventListener('input', function (event) {
    const scheme = event.target.value;
    setColorScheme(scheme);
    localStorage.colorScheme = scheme;
  });


let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'cv/', title: 'CV' },
    { url: 'meta/', title: 'Meta'},
    { url: 'https://github.com/JacquelynGarcia', title: 'GitHub' },
  ];
  
  const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
    ? "/" 
    : "/portfolio/";
  
  let nav = document.createElement('nav');
  document.body.prepend(nav);
  
  for (let p of pages) {
    let url = !p.url.startsWith('http') ? BASE_PATH + p.url : p.url;
    let a = document.createElement('a');
    a.href = url;
    a.textContent = p.title;
  
    
    a.classList.toggle(
      'current',
      a.host === location.host && a.pathname === location.pathname
    );
  
    
    a.target = (a.host !== location.host) ? "_blank" : "_self";
  
    nav.append(a);
  }

  const form = document.querySelector('form');

form?.addEventListener('submit', function(event) {
  event.preventDefault();

  const data = new FormData(form);
  const params = [];

  for (let [name, value] of data) {
    params.push(`${name}=${encodeURIComponent(value)}`);
  }

  const query = params.join('&');
  const url = `${form.action}?${query}`;

  location.href = url;
});

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
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

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('project-text-content');

    textWrapper.appendChild(description);

    if (project.year) {
      const yearElement = document.createElement('p');
      yearElement.textContent = `c. ${project.year}`;
      yearElement.classList.add('project-year');
      textWrapper.appendChild(yearElement);
    }

    const linkContainer = document.createElement('div');
    linkContainer.classList.add('project-link-container');

    if (project.link) {
      const projectLink = document.createElement('a');
      projectLink.href = project.link;
      projectLink.textContent = 'View Project';
      projectLink.target = '_blank';
      projectLink.classList.add('project-link');
      linkContainer.appendChild(projectLink);
      textWrapper.appendChild(linkContainer);
    }

    article.appendChild(headingTag);
    article.appendChild(image);
    article.appendChild(textWrapper);
    containerElement.appendChild(article);
  });
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}