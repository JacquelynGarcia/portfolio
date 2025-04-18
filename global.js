console.log('IT’S ALIVE!');

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