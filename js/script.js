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
    data.forEach((repo) => {
      title = document.createElement('h3')
      titleText = document.createTextNode(repo.name)
      title.className += 'break-word'
      title.appendChild(titleText)

      repoLink = document.createElement('a')
      linkText = document.createTextNode("Read more")
      repoLink.appendChild(linkText)
      repoLink.href = repo.html_url
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach(element => observer.observe(element))

const sendButton = document.querySelector('#contact #send-button');
const contactFormFeedbackBanner = document.querySelector('#contact #feedback');
const contactFormInput = document.querySelectorAll('#contact .input');
contactFormInput.forEach(inputNode => {
  inputNode.addEventListener('change', event => updateForm(event));
  inputNode.addEventListener('focusout', event => updateForm(event));
})

function updateForm(event) {
  setContactFormFeedback('', '');
  updateSendButton(event)
}

function updateSendButton(event) {
  if (!isInputNodeValid(event.target)) {
    setContactFormFeedback()
    sendButton.disabled = true;
  } else if (isContactFormValid()) {
    sendButton.disabled = false;
  } else {
    setContactFormFeedback()
  }
}

function setContactFormFeedback() {
  let [message, statusClass] = findFirstContactFormFeedback()
  setFeedback(message, statusClass)
}

function findFirstContactFormFeedback() {
  for (let node of contactFormInput.values()) {
    if (!isInputNodeValid(node)) {
      return [ 'Please enter your ' + node.name, 'ERROR' ];
    };
    if (node.type == 'email' && !isValidEmailInInputNode(node)) {
      return [ 'Please enter a valid email', 'ERROR'];
    };
  };
  return [ '', '' ]
}

function setFeedback(message, statusClass) {
  contactFormFeedbackBanner.classList = [ statusClass ]
  contactFormFeedbackBanner.innerText = message
}

const EMAIL_REGEX = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function isContactFormValid() {
  let nodes = Array.from(contactFormInput.values())
  let isValid = nodes.every((node) => { 
    let validity = isInputNodeValid(node) && (node.type == 'email' ? isValidEmailInInputNode(node) : true)
    return validity
  }) 
  console.log('all is valid = ' + isValid)
  return isValid
}

function isInputNodeValid(node) {
  return Boolean(node.value) 
}

function isValidEmailInInputNode(node){
  return Boolean(node.value.match(EMAIL_REGEX))
}

function isContactFormReset() {
  for (let node in contactFormInput.values()) {
    if (node.value) {
      return false
    }
  }
  return true
}

function assembleFormValues() {
  let values = {};
  for ( let node of contactFormInput.values()) {
    values[node.id] = node.value
  }
  return values
}

const contactForm = document.querySelector('#contact form')
contactForm.addEventListener('submit', (event) => {
  event.preventDefault()
  if (isContactFormValid()) {
    let templateParameters = assembleFormValues();
    console.log('Sending email', templateParameters);
    emailjs.send(
        'service_ba9woqk',
        'template_rail0ba',
        templateParameters,
        'yxbay7TPzfzUivDQX')
    .then(response => {
       console.log('SUCCESS!', response.status, response.text);
       setFeedback('Your message was sent!', 'OK')
    }, error => {
       console.log('FAILED...', error);
       setFeedback('Failed sending message.', 'ERROR')
    });
  } else {
    setContactFormFeedback()
  }
})

