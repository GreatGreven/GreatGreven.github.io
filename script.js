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

let skillBars = document.querySelectorAll('div.level-bar')
for (let i = 0; i < skillBars.length; i++) {
  let firstChild = skillBars[i].children[0]
  let skillLevel = firstChild.getAttribute('data-skill-level')
  let color = firstChild.getAttribute('data-bar-color')
  firstChild.style.width = skillLevel
  firstChild.style.backgroundColor = color
}

