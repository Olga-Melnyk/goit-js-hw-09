const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]"),d=document.querySelector("body");console.dir(e);let o=null;t.disabled=!0,e.addEventListener("click",(function(n){e.disabled=!0,t.disabled=!1,o=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(function(d){t.disabled=!0,e.disabled=!1,clearInterval(o)})),console.dir(d);
//# sourceMappingURL=01-color-switcher.f66c89a9.js.map
