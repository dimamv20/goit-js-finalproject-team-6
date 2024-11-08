var x=t=>{throw TypeError(t)};var B=(t,e,o)=>e.has(t)||x("Cannot "+o);var R=(t,e,o)=>(B(t,e,"read from private field"),o?o.call(t):e.get(t)),L=(t,e,o)=>e.has(t)?x("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o);var C=(t,e,o)=>(B(t,e,"access private method"),o);/* empty css                      */import{a as b}from"./assets/vendor-CNNbG8jS.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const F="/goit-js-finalproject-team-6/assets/sprites-CYaLkvxj.svg";var p,y,T;class P{constructor(){L(this,y);L(this,p,b.create({baseURL:"https://your-energy.b.goit.study/api/"}))}async exerciseInfo(e){return C(this,y,T).call(this,`exercises/${e}`)}}p=new WeakMap,y=new WeakSet,T=async function(e){return(await R(this,p).get(e)).data};const I=new P,i={closeModalButton:"[data-modal-close]",modalContainer:"[data-modal]",exerciseModal:".modal",ratingModal:".add-rating-modal",addToFavoritesButton:".btn-modal-add-fav",imgModalExercise:".img-modal-exercise",titleModal:".title-modal",ratingValue:".rating-value",statsList:".stats-list",descText:".desc-text",btnFavText:".btn-fav-text",iconFavBtnUse:".icon-fav-btn-use",openRatingModalButton:"[data-add-rating-open]",closeRatingModalButton:"[data-add-rating-close]",ratingForm:".add-rating-form",addRatingValue:".add-rating-value",iconModalRatingStar:".icon-modal-rating-star",addRatingRadioBtn:".add-rating-radio-btn",openModalButtons:"[data-modal-open]",ratingStars:".rating-stars"},l={visuallyHidden:"visually-hidden",favAdded:"fav-added",modalOpen:"modal-open",gold:"gold"},_=document.querySelector(i.closeModalButton),M=document.querySelector(i.modalContainer),g=document.querySelector(i.exerciseModal),m=document.querySelector(i.ratingModal),A=document.querySelector(i.addToFavoritesButton);async function O(t){const e=await I.exerciseInfo(t);k(e),S(t),V(t),M.classList.toggle(l.visuallyHidden),H(),j()}function w(){document.querySelector(i.imgModalExercise).src="",document.querySelector(i.titleModal).textContent="",document.querySelector(i.ratingValue).textContent="0",document.querySelector(i.statsList).innerHTML="",document.querySelector(i.descText).textContent=""}function k(t){w(),document.querySelector(i.imgModalExercise).src=t.gifUrl,document.querySelector(i.titleModal).textContent=t.name.trim(),document.querySelector(i.descText).textContent=t.description.trim(),document.querySelector(i.ratingValue).textContent=t.rating,K(t.rating),N(t)}function N(t){const e=document.querySelector(i.statsList);e.innerHTML="";let o="";t.target&&(o+=u("Target",t.target)),t.bodyPart&&(o+=u("BodyPart",t.bodyPart)),t.equipment&&(o+=u("Equipment",t.equipment)),t.popularity&&(o+=u("Popular",t.popularity)),t.burnedCalories&&(o+=u("Burned Calories",`${t.burnedCalories}/${t.time} min`)),e.insertAdjacentHTML("beforeend",o)}function u(t,e){return`<li class="stats-item">
    <p class="stats-title">${t}</p>
    <p class="stats-value">${e}</p>
  </li>`}function S(t){const e=E().includes(t);A.classList.toggle(l.favAdded,e),document.querySelector(i.btnFavText).textContent=e?"Remove from favorites":"Add to favorites",document.querySelector(i.iconFavBtnUse).setAttribute("href",`${F}#${e?"trash-bin":"heart"}`)}function V(t){A.addEventListener("click",e=>{const o=e.currentTarget;o.classList.toggle(l.favAdded),o.classList.contains(l.favAdded)?(Y(t),S(t)):(G(t),S(t)),e.stopImmediatePropagation()})}function H(){document.addEventListener("keydown",$),document.body.classList.add(l.modalOpen)}function U(){document.removeEventListener("keydown",$),document.body.classList.remove(l.modalOpen)}function $(t){t.key==="Escape"&&h()}function h(){m.classList.add(l.visuallyHidden),g.classList.remove(l.visuallyHidden),M.classList.add(l.visuallyHidden),U()}_.addEventListener("click",h);M.addEventListener("click",t=>{const e=g.getBoundingClientRect();e.top<=t.clientY&&t.clientY<=e.top+e.height&&e.left<=t.clientX&&t.clientX<=e.left+e.width||h(),t.stopImmediatePropagation()});function j(){const t=document.querySelector(i.openRatingModalButton);let e=0;t.addEventListener("click",a=>{m.classList.remove(l.visuallyHidden),g.classList.add(l.visuallyHidden),H(),n(),a.stopImmediatePropagation()}),document.querySelector(i.closeRatingModalButton).addEventListener("click",a=>{m.classList.add(l.visuallyHidden),g.classList.remove(l.visuallyHidden),r(m.querySelector("form")),a.stopImmediatePropagation()});function r(a){a.elements.email.value="",a.elements.comment.value="",a.elements.radio.forEach(c=>c.checked=!1),document.querySelector(i.addRatingValue).textContent="0",document.querySelectorAll(i.iconModalRatingStar).forEach(c=>c.classList.remove(l.gold))}function n(){document.querySelectorAll(i.addRatingRadioBtn).forEach(c=>{c.addEventListener("click",d=>{e=Number(d.currentTarget.value),document.querySelector(i.addRatingValue).textContent=e,document.querySelectorAll(i.iconModalRatingStar).forEach((f,v)=>{f.classList.toggle(l.gold,v<e)}),d.stopImmediatePropagation()})})}document.querySelector(i.ratingForm).addEventListener("submit",a=>{a.preventDefault();const c=a.target,d=c.elements.email.value,f=c.elements.comment.value;e?d?f?updateData(`exercises/${exerciseId}/rating`,{rate:e,email:d,review:f}).then(()=>{m.classList.add(l.visuallyHidden),r(c),g.classList.remove(l.visuallyHidden)}).catch(v=>{alert(`Error: ${v.message}`)}):alert("Leave a comment"):alert("Enter your email"):alert("Choose your rating"),a.stopImmediatePropagation()})}function J(){document.querySelectorAll(i.openModalButtons).forEach(e=>{e.addEventListener("click",o=>{const r=o.currentTarget.value;O(r)})})}function E(){return JSON.parse(localStorage.getItem("favorites"))||[]}function Y(t){const e=E();e.push(t),localStorage.setItem("favorites",JSON.stringify(e))}function G(t){const e=E(),o=e.indexOf(t);o!==-1&&(e.splice(o,1),localStorage.setItem("favorites",JSON.stringify(e)))}function K(t){const e=document.querySelector(i.ratingStars);e.innerHTML="",e.append(...X(5,t))}function X(t,e){const o=[];for(let r=0;r<t;r++){const n=Math.min(100,Math.max(0,(e-r)*100)),s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttribute("width","18"),s.setAttribute("height","18"),s.setAttribute("class","icon icon-modal-star");const a=`gradient-${r}-${n}`;s.innerHTML=`
      <defs>
        <linearGradient id="${a}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="${n}%" stop-color="var(--accent-color)" />
          <stop offset="${n}%" stop-color="var(--rating-color)" />
        </linearGradient>
      </defs>
      <use href="${F}#star" fill="url(#${a})"></use>
    `,o.push(s)}return o}J();async function q(t="Muscles",e=1,o=12){try{const r=t.replace(/%20/g," "),n=await b.get("https://your-energy.b.goit.study/api/filters",{params:{filter:r,page:e,limit:o}}),s=n.data.results,a=n.data.totalPages;z(s),W(a,t,o,e)}catch(r){console.error("Помилка при завантаженні даних:",r)}}function z(t){const e=document.getElementById("exercises-container");e.innerHTML="",t.forEach(o=>{const r=document.createElement("div");r.classList.add("exercises__col"),r.innerHTML=`
      <div class="exercises__item">
        <img src="${o.imgURL}" alt="Опис зображення" />

        <div class="text-overlay">
          <h5>${o.name}</h5>
          <p>${o.filter}</p>
        </div>
      </div>
    `,e.appendChild(r)})}function Q(){document.querySelectorAll(".exercises-filters ul li").forEach(e=>{e.addEventListener("click",()=>{const o=e.id;q(o),document.querySelectorAll(".exercises-filters__selected").forEach(r=>{r.classList.remove("exercises-filters__selected")}),e.classList.add("exercises-filters__selected")})})}function W(t,e,o=12,r=1){const n=document.querySelector(".exercises-pagination ul");n.innerHTML="";for(let s=1;s<=t;s++){const a=document.createElement("li");a.textContent=s,s===r&&a.classList.add("exercises-pagination__current"),a.addEventListener("click",()=>{document.querySelectorAll(".exercises-pagination li").forEach(c=>{c.classList.remove("exercises-pagination__current")}),a.classList.add("exercises-pagination__current"),q(e,s,o)}),n.appendChild(a)}}q();Q();
//# sourceMappingURL=index.js.map
