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
    // Fetch the JSON file from the given URL
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