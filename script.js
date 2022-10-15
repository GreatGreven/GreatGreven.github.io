const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

document.getElementById('themeButton').onclick = () => {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];
  
  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

let articleTitles = document.querySelectorAll('div.articleTitle')
for (let i = 0; i < articleTitles.length; i++) {
  articleTitles[i].addEventListener('click', (e) => {
    e.target === e.currentTarget ? e.target.parentNode.classList.toggle('closed') : e.target.parentNode.parentNode.classList.toggle('closed')
  }, false)
}

