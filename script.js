document.getElementById("year").textContent=new Date().getFullYear();
const lightbox=document.querySelector(".lightbox"), image=document.querySelector(".lightbox-image"), caption=document.querySelector(".lightbox-caption");
function openLightbox(src,alt,text){image.src=src;image.alt=alt;caption.textContent=text||"";lightbox.classList.add("is-open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeLightbox(){lightbox.classList.remove("is-open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow="";image.src=""}
document.querySelector(".identity").addEventListener("click",()=>openLightbox("images/profile.png","Portrait of Rasool Fattahi","Rasool Fattahi"));
document.querySelectorAll(".photo-button").forEach(b=>b.addEventListener("click",()=>openLightbox(b.dataset.src,b.querySelector("img").alt,b.dataset.caption)));
document.querySelector(".lightbox-close").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&lightbox.classList.contains("is-open"))closeLightbox()});
