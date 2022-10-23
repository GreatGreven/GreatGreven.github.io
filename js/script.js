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

window.addEventListener("load", () => {
  preloader = document.getElementById("preloader")
  setTimeout(() => {
    fadeEffect = setInterval(() => {
      if (!preloader.style.opacity) {
        preloader.style.opacity = 1
      }
      if (preloader.style.opacity > 0) {
        preloader.style.opacity -= 0.01
      } else {
        clearInterval(fadeEffect)
        preloader.style.display = "none"
      } 
    }, 10)
  }, 1000)
  
  fetch('https://api.github.com/users/greatgreven/repos')
  .then(res => res.json())
  .then(data => {
    portfolio = document.getElementById("portfolio")
    data.map((repo, i) => {
      title = document.createElement('h3')
      titleText = document.createTextNode(repo.name)
      title.appendChild(titleText)

      repoLink = document.createElement('a')
      linkText = document.createTextNode("Read more")
      repoLink.appendChild(linkText)
      repoLink.href = repo.link
      repoLink.target = '_blank'
      repoLink.rel = 'noopener noreferrer'
      
      card = document.createElement('div')
      card.className += "card"
      card.appendChild(title)
      if (repo.description) {
        description = document.createElement('blockquote')
        descriptionText = document.createTextNode(repo.description)
        description.appendChild(descriptionText)
        card.appendChild(description)
      }
      card.appendChild(repoLink)

      portfolio.appendChild(card)

    })
  })
})



