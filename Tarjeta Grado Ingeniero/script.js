/* ==========================================
   CONTADOR
========================================== */

const targetDate = new Date("April 17, 2026 00:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const countdown = document.getElementById("countdown");
const graduated = document.getElementById("graduated");

function updateCountdown(){

const now = new Date().getTime();
const diff = targetDate - now;

if(diff <= 0){

countdown.style.display="none";
graduated.style.display="block";
return;

}

days.innerText = Math.floor(diff/(1000*60*60*24));
hours.innerText = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
minutes.innerText = Math.floor((diff%(1000*60*60))/(1000*60));
seconds.innerText = Math.floor((diff%(1000*60))/1000);

}

setInterval(updateCountdown,1000);
updateCountdown();



/* ==========================================
   MUSICA
========================================== */

const music = document.getElementById("music");
const btn = document.getElementById("musicBtn");

if(btn){

btn.onclick = ()=>{

if(music.paused){
music.play();
btn.innerText="🔇 Pausar";
}else{
music.pause();
btn.innerText="🎵 Música";
}

}

}



/* ==========================================
   CANVAS BACKGROUND
========================================== */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



/* ==========================================
   MOUSE
========================================== */

let mouse = {x:0,y:0};

window.addEventListener("mousemove",(e)=>{

mouse.x = e.clientX;
mouse.y = e.clientY;

});



/* ==========================================
   NODOS TECNOLOGICOS
========================================== */

let nodes = [];

for(let i=0;i<70;i++){

nodes.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height

})

}



/* ==========================================
   CONEXIONES CIRCUITOS
========================================== */

let lines = [];

nodes.forEach(n1=>{

nodes.forEach(n2=>{

let dist = Math.hypot(n1.x-n2.x,n1.y-n2.y);

if(dist < 180){

lines.push({

x1:n1.x,
y1:n1.y,
x2:n2.x,
y2:n2.y

})

}

})

});



/* ==========================================
   FLUJO DE DATOS
========================================== */

let dataParticles = [];

for(let i=0;i<90;i++){

dataParticles.push({

line:lines[Math.floor(Math.random()*lines.length)],
progress:Math.random(),
speed:Math.random()*0.002+0.001

})

}



/* ==========================================
   PARTICULAS MOUSE
========================================== */

let mouseParticles=[];

for(let i=0;i<40;i++){

mouseParticles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5)*1,
vy:(Math.random()-0.5)*1

})

}



/* ==========================================
   CODIGO BINARIO
========================================== */

let binary=[];

for(let i=0;i<40;i++){

binary.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
value:Math.random()>0.5?"0":"1",
speed:Math.random()*0.4+0.1

})

}



/* ==========================================
   RECTANGULOS TECNOLOGICOS
========================================== */

let rectangles=[];

for(let i=0;i<30;i++){

rectangles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
size:Math.random()*80+20,
speed:Math.random()*0.2

})

}



/* ==========================================
   BIRRETES CAIENDO
========================================== */

let caps=[];

function spawnCaps(){

for(let i=0;i<25;i++){

caps.push({

x:Math.random()*window.innerWidth,
y:-Math.random()*200,
size:Math.random()*20+15,
speed:Math.random()*2+1

})

}

}

spawnCaps();



/* ==========================================
   DIBUJAR CIRCUITOS
========================================== */

function drawCircuits(){

lines.forEach(line=>{

ctx.beginPath();

ctx.moveTo(line.x1,line.y1);
ctx.lineTo(line.x2,line.y2);

ctx.strokeStyle="rgba(0,200,255,0.25)";
ctx.lineWidth=1;

ctx.shadowColor="#00e5ff";
ctx.shadowBlur=6;

ctx.stroke();

})

}



/* ==========================================
   FLUJO DE DATOS
========================================== */

function drawDataFlow(){

dataParticles.forEach(p=>{

let x = p.line.x1 + (p.line.x2 - p.line.x1)*p.progress;
let y = p.line.y1 + (p.line.y2 - p.line.y1)*p.progress;

ctx.beginPath();
ctx.arc(x,y,2.5,0,Math.PI*2);

ctx.fillStyle="#00e5ff";
ctx.shadowColor="#00e5ff";
ctx.shadowBlur=15;

ctx.fill();

p.progress += p.speed;

if(p.progress>1){

p.line = lines[Math.floor(Math.random()*lines.length)];
p.progress = 0;

}

})

}



/* ==========================================
   PARTICULAS MOUSE
========================================== */

function drawMouseParticles(){

mouseParticles.forEach(p=>{

let dist = Math.hypot(mouse.x-p.x,mouse.y-p.y);

if(dist<120){

p.x += (mouse.x-p.x)*0.02;
p.y += (mouse.y-p.y)*0.02;

}

ctx.beginPath();
ctx.arc(p.x,p.y,2,0,Math.PI*2);

ctx.fillStyle="#00c3ff";
ctx.fill();

p.x+=p.vx;
p.y+=p.vy;

})

}



/* ==========================================
   BINARIO
========================================== */

function drawBinary(){

ctx.font="12px monospace";

binary.forEach(b=>{

ctx.fillStyle="rgba(0,255,200,0.15)";

ctx.fillText(b.value,b.x,b.y);

b.y += b.speed;

if(b.y>canvas.height){

b.y=0;
b.x=Math.random()*canvas.width;

}

})

}



/* ==========================================
   RECTANGULOS
========================================== */

function drawRectangles(){

rectangles.forEach(r=>{

ctx.beginPath();
ctx.rect(r.x,r.y,r.size,r.size);

ctx.strokeStyle="rgba(0,150,255,0.15)";
ctx.stroke();

r.y+=r.speed;

if(r.y>canvas.height){

r.y=-r.size;
r.x=Math.random()*canvas.width;

}

})

}



/* ==========================================
   BIRRETES
========================================== */

function drawCaps(){

caps.forEach(c=>{

ctx.font=c.size+"px serif";
ctx.fillText("🎓",c.x,c.y);

c.y+=c.speed;

})

}



/* ==========================================
   ANIMACION
========================================== */

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

drawBinary();
drawRectangles();
drawCircuits();
drawDataFlow();
drawMouseParticles();
drawCaps();

requestAnimationFrame(animate);

}

animate();



/* ==========================================
   RESPONSIVE
========================================== */

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});