const btn=document.getElementById("uploadBtn"),app=document.getElementById("app"),caption=document.getElementById("caption");let busy=false,pressed=false;
function label(t){btn.querySelector(".label").textContent=t}
function particles(){const box=app.querySelector(".particles");box.innerHTML="";for(let i=0;i<18;i++){let p=document.createElement("i"),a=i*Math.PI*2/18,d=45+Math.random()*65;p.style.setProperty("--x",Math.cos(a)*d+"px");p.style.setProperty("--y",Math.sin(a)*d+"px");box.appendChild(p)}}
function reset(){app.classList.remove("uploading","uploaded","finish");btn.classList.remove("pressed","loading","success");btn.disabled=false;label("Upload");caption.textContent="UPLOAD TO CLOUD";busy=false;pressed=false}
function start(){if(busy)return;busy=true;pressed=false;btn.classList.remove("pressed");btn.classList.add("loading");btn.disabled=true;label("Uploading");caption.textContent="PREPARING UPLOAD";app.classList.add("uploading");particles();
setTimeout(()=>caption.textContent="MOVING TO CLOUD",650);
setTimeout(()=>{btn.classList.remove("loading");btn.classList.add("success");label("Uploaded");app.classList.add("uploaded","finish");caption.textContent="UPLOAD COMPLETE"},1850);
setTimeout(reset,4600)}
btn.addEventListener("pointerdown",()=>{if(busy)return;pressed=true;btn.classList.add("pressed");label("Release")});
btn.addEventListener("pointerup",()=>{if(pressed&&!busy)start()});
btn.addEventListener("pointercancel",()=>{pressed=false;btn.classList.remove("pressed");label("Upload")});
btn.addEventListener("pointerleave",()=>{if(!busy&&pressed){pressed=false;btn.classList.remove("pressed");label("Upload")}});
btn.addEventListener("keydown",e=>{if((e.key===" "||e.key==="Enter")&&!busy&&!e.repeat){e.preventDefault();btn.classList.add("pressed");label("Release")}});
btn.addEventListener("keyup",e=>{if(e.key===" "||e.key==="Enter"){e.preventDefault();if(!busy&&btn.classList.contains("pressed"))start()}});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&busy)reset()});
btn.addEventListener("pointermove",e=>{if(busy)return;const r=btn.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;btn.style.setProperty("--mx",x*.08+"px");btn.style.setProperty("--my",y*.08+"px")});
btn.addEventListener("pointerleave",()=>{btn.style.setProperty("--mx","0px");btn.style.setProperty("--my","0px")});