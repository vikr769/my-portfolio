const sendChatBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const chatBox = document.querySelector(".chatbox");
const chatBotToggler = document.querySelector(".chatbot-toggler");
const chatBotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "ADD YOUR API KEY"
// const inputHeight = chatInput.computedStyleMap.scrollHeight;
const inputHeight = chatInput.scrollHeight;


const createChatLi = (message,className) =>{
    const chatLi =document.createElement("Li");
    chatLi.classList.add("chat",className)
    let chatContent = className === 'outgoing' ? 
    `<P></P>` :
    `
    <span class="fa-solid fa-robot"></span>
    <p></p>
    `
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse =(incomingChatLi) =>{
    const API_URL="https://api.openai.com/v1/chat/completions"
    const messageElement= incomingChatLi.querySelector("p");
    const requestOption ={
        method : "post",
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${API_KEY}`
        },
        body :JSON.stringify({

           "model": "gpt-3.5-turbo",
        // "model": "gpt-4",
           "messages": [
             {
                "role":"user",
                "content": userMessage
             }
           ]

        })
    }
    // API_URL
    fetch(API_URL,requestOption)
    .then((res=>res.json()))
    // .then((data)=>{
    //     messageElement.textContent = data.choices[0].message.content;
    // })

    .then((data) => {
  if (data.choices && data.choices.length > 0) {
    messageElement.textContent = data.choices[0].message.content;
  } else {
    messageElement.classList.add("error");
    messageElement.textContent = data.error?.message || "Unexpected API response";
  }
})

    .catch((error)=>{
        messageElement.classList.add("error");
        messageElement.textContent = "Opps ! Something went wrong. please try again."
    })
    .finally(()=>chatBox.scrollTo(0,chatBox.scrollHeight));
}

const handleChat = () =>{
    userMessage=chatInput.value;
    if(!userMessage) return;
    chatInput.value = "";
    chatBox.append(createChatLi(userMessage,'outgoing'))
    chatBox.scrollTo(0,chatBox.scrollHeight);
    setTimeout(()=> {
       const incomingChatLi = createChatLi('Thinking...','incoming');
       chatBox.append(incomingChatLi);
       chatBox.scrollTo(0,chatBox.scrollHeight);
       generateResponse(incomingChatLi);
    },600);
}

sendChatBtn.onclick= () =>{
    handleChat();
}

chatBotToggler.onclick = () =>{
    document.body.classList.toggle('show-chatbot');
}

chatBotCloseBtn.onclick = () =>{
    document.body.classList.remove('show-chatbot');
}

chatInput.oninput = () =>{
    // chatInput.computedStyleMap.height = `${inputHeight}px`;
    // chatInput.computedStyleMap.height = `${chatInput.scrollHeight}px`;

    chatInput.style.height = `${inputHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;

}

chatInput.onkeydown = (e) =>{
   if(e.key=== "Enter" && !e.shiftKey  && window.innerWidth >800)
   {
    e.preventDefault();
    handleChat();
   }
}






'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}