import { createServer } from "node:http";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../public/motion/", import.meta.url));
const port = Number(process.env.MOTION_STUDIO_PORT ?? 3186);
const html = String.raw`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>BeamHub motion studio</title>
<style>body{margin:30px;background:#162b21;color:#eef1df;font:16px Arial}button{padding:14px 20px;margin:15px 0;cursor:pointer}canvas{display:block;width:min(100%,960px);height:auto;border:1px solid #58754b}#result{margin:18px 0}</style></head>
<body><h1>Original BeamHub motion studies</h1><p>Renders three silent 8-second MP4 clips and their WebP posters locally. Keep this tab visible while recording.</p><button id="start">Render original reels</button><div id="result" role="status" data-status="idle">Ready.</div><canvas id="canvas" width="1200" height="750"></canvas>
<script>
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");
const tau = Math.PI * 2;
function background(phase) {
  const g=ctx.createLinearGradient(0,0,1200,750);g.addColorStop(0,"#10271d");g.addColorStop(1,"#284832");ctx.fillStyle=g;ctx.fillRect(0,0,1200,750);
  const glow=ctx.createRadialGradient(858,365,10,858,365,470);glow.addColorStop(0,"#71965442");glow.addColorStop(1,"#71965400");ctx.fillStyle=glow;ctx.fillRect(0,0,1200,750);
  ctx.strokeStyle="#b7d4980e";ctx.lineWidth=1;for(let x=465;x<1200;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,750);ctx.stroke();}for(let y=30;y<750;y+=40){ctx.beginPath();ctx.moveTo(465,y);ctx.lineTo(1200,y);ctx.stroke();}
  ctx.strokeStyle="#b7d49833";ctx.setLineDash([2,9]);ctx.beginPath();ctx.arc(848,363,290,phase*.1,phase*.1+tau);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#c1d7a952";ctx.font="9px monospace";ctx.fillText("A NEW PERSPECTIVE / BEAMHUB",738,701);
}
function path(points,fill,stroke) {ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.stroke();}}
function project(x,y,z,angle) {const a=x*Math.cos(angle)-z*Math.sin(angle),b=x*Math.sin(angle)+z*Math.cos(angle);return [852+a*1.04,373+y*.93+b*.38];}
function cube(x,y,z,w,h,d,angle,opacity) {
  const p=(a,b,c)=>project(x+a,y+b,z+c,angle);
  ctx.globalAlpha=opacity;
  path([p(-w/2,-h/2,-d/2),p(w/2,-h/2,-d/2),p(w/2,-h/2,d/2),p(-w/2,-h/2,d/2)],"#d7e6b946","#b7d49a9c");
  path([p(-w/2,-h/2,d/2),p(w/2,-h/2,d/2),p(w/2,h/2,d/2),p(-w/2,h/2,d/2)],"#84a76d32","#b7d49a85");
  path([p(w/2,-h/2,-d/2),p(w/2,-h/2,d/2),p(w/2,h/2,d/2),p(w/2,h/2,-d/2)],"#91b27825","#b7d49a85");
  ctx.globalAlpha=1;
}
function beam(phase) {
  background(phase);
  const angle=.53+Math.sin(phase)*.16;
  ctx.save();ctx.strokeStyle="#a0c28638";ctx.setLineDash([4,8]);
  for(let i=-2;i<=2;i++){const a=project(-300,145,i*60,angle),b=project(280,145,i*60,angle);ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.stroke();}
  ctx.setLineDash([]);cube(72,0,0,235,237,217,angle,.7);cube(72,0,0,153,154,143,angle,.8);cube(-213,-22,0,76,67,71,angle,1);
  const origin=project(-172,-12,0,angle),a=project(178,-105,-70,angle),b=project(178,107,70,angle);
  const light=ctx.createLinearGradient(origin[0],origin[1],a[0],a[1]);light.addColorStop(0,"#f3b58c9c");light.addColorStop(1,"#e7945812");path([origin,a,b],light,null);
  ctx.strokeStyle="#ffc28da8";ctx.lineWidth=1.3;const end=project(205,0,0,angle);ctx.beginPath();ctx.moveTo(...origin);ctx.lineTo(...end);ctx.stroke();
  for(let i=0;i<21;i++){const progress=((phase/tau+i/21)%1);const pos=project(-163+360*progress,Math.sin(i*3+phase)*14,Math.cos(i+phase)*10,angle);ctx.beginPath();ctx.fillStyle="#ffca96";ctx.shadowBlur=12;ctx.shadowColor="#fba469";ctx.arc(pos[0],pos[1],1.5+(1-progress)*1.2,0,tau);ctx.fill();ctx.shadowBlur=0;}
  ctx.strokeStyle="#b8dba175";ctx.lineWidth=1;const center=project(60,0,0,angle);ctx.beginPath();ctx.arc(center[0],center[1],137,0,tau);ctx.stroke();
  ctx.fillStyle="#d7e6c0";ctx.font="10px monospace";ctx.fillText("01 / FOLLOW THE BEAM",736,588);ctx.fillStyle="#99b487";ctx.font="8px monospace";ctx.fillText("PRINCIPLES. PERSPECTIVE. POSSIBILITY.",705,607);ctx.restore();
}
function plan(phase) {
  background(phase);const cx=858,cy=366;
  ctx.save();ctx.translate(cx,cy);ctx.rotate(Math.sin(phase)*.09);
  const fill=ctx.createRadialGradient(0,0,20,0,0,225);fill.addColorStop(0,"#e696673e");fill.addColorStop(.5,"#d6cb9a18");fill.addColorStop(1,"#cedbae00");ctx.fillStyle=fill;ctx.beginPath();ctx.ellipse(0,0,217,237,0,0,tau);ctx.fill();
  for(let ring=0;ring<8;ring++){ctx.beginPath();const radius=54+ring*23;for(let step=0;step<=180;step++){const a=step/180*tau;const ripple=1+.075*Math.sin(3*a+phase)+.04*Math.cos(5*a-phase);const x=Math.cos(a)*radius*ripple,y=Math.sin(a)*radius*ripple*1.12;step?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.strokeStyle=ring<3?"#eab18ca3":"#adc59970";ctx.lineWidth=ring<3?1.5:1;ctx.stroke();}
  for(let i=0;i<3;i++){const a=i*tau/3+phase;const x=Math.cos(a)*290,y=Math.sin(a)*270;const g=ctx.createLinearGradient(x,y,0,0);g.addColorStop(0,"#edb88512");g.addColorStop(1,"#edb88559");path([[x-13,y-13],[15,-8],[x+13,y+13]],g,null);ctx.strokeStyle="#d9c09275";ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(0,0);ctx.stroke();ctx.fillStyle="#d2dfbc";ctx.beginPath();ctx.arc(x,y,5,0,tau);ctx.fill();}
  ctx.strokeStyle="#c5d6ab63";ctx.setLineDash([4,7]);ctx.beginPath();ctx.moveTo(-247,0);ctx.lineTo(247,0);ctx.moveTo(0,-266);ctx.lineTo(0,266);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle="#f6c8a0";ctx.beginPath();ctx.arc(0,0,6,0,tau);ctx.fill();ctx.restore();
  ctx.strokeStyle="#b2c49a77";ctx.strokeRect(1045,542,102,62);ctx.beginPath();for(let i=0;i<15;i++){const x=1055+i*6,y=585-Math.sin(i*.32+phase)*16-i; i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.strokeStyle="#edb790";ctx.stroke();
  ctx.fillStyle="#d7e6c0";ctx.font="10px monospace";ctx.fillText("02 / A FRESH ANGLE",781,646);
}
function sphere(lat,lon,phase,radius=207) {const angle=lon+phase*.32;const x=Math.cos(lat)*Math.sin(angle),z=Math.cos(lat)*Math.cos(angle);return [851+x*radius,365-Math.sin(lat)*radius,z];}
function connect(phase) {
  background(phase);ctx.save();
  const glow=ctx.createRadialGradient(815,310,5,851,365,212);glow.addColorStop(0,"#aecb8b38");glow.addColorStop(1,"#dce8ba08");ctx.fillStyle=glow;ctx.beginPath();ctx.arc(851,365,208,0,tau);ctx.fill();ctx.strokeStyle="#c3d8a85c";ctx.lineWidth=1;ctx.stroke();
  for(let lat=-1.2;lat<=1.2;lat+=.3){ctx.beginPath();let start=true;for(let i=0;i<=180;i++){const p=sphere(lat,i/180*tau,phase);if(p[2]<0){start=true;continue;}start?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);start=false;}ctx.strokeStyle="#b0ce9452";ctx.stroke();}
  for(let lon=0;lon<tau;lon+=tau/14){ctx.beginPath();let start=true;for(let i=0;i<=90;i++){const p=sphere(-Math.PI/2+i/90*Math.PI,lon,phase);if(p[2]<0){start=true;continue;}start?ctx.moveTo(p[0],p[1]):ctx.lineTo(p[0],p[1]);start=false;}ctx.strokeStyle="#b0ce9452";ctx.stroke();}
  const points=[[.65,-.65],[.22,.4],[-.55,.9],[.88,1.6],[-.31,-.6],[.45,2.3],[-.82,2.8],[.25,3.7],[.65,4.1],[-.44,4.7]].map(p=>sphere(p[0],p[1],phase));
  for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+2)%points.length];if(a[2]<0||b[2]<0)continue;const ctrl=[(a[0]+b[0])/2,(a[1]+b[1])/2-70];ctx.strokeStyle="#edb38068";ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.quadraticCurveTo(ctrl[0],ctrl[1],b[0],b[1]);ctx.stroke();const t=(phase/tau+i*.17)%1;const x=(1-t)*(1-t)*a[0]+2*(1-t)*t*ctrl[0]+t*t*b[0],y=(1-t)*(1-t)*a[1]+2*(1-t)*t*ctrl[1]+t*t*b[1];ctx.fillStyle="#f6c69c";ctx.beginPath();ctx.arc(x,y,2.3,0,tau);ctx.fill();}
  points.forEach((p,i)=>{if(p[2]<0)return;const pulse=7+Math.sin(phase*2+i)*3;ctx.beginPath();ctx.arc(p[0],p[1],pulse,0,tau);ctx.fillStyle="#efbe8a20";ctx.fill();ctx.beginPath();ctx.arc(p[0],p[1],3.3,0,tau);ctx.fillStyle="#f3c99d";ctx.shadowBlur=10;ctx.shadowColor="#efba82";ctx.fill();ctx.shadowBlur=0;});
  ctx.fillStyle="#d7e6c0";ctx.font="10px monospace";ctx.fillText("03 / CONNECT THE DOTS",751,646);ctx.restore();
}
async function save(name,blob) {const response=await fetch("/render/"+name,{method:"PUT",body:blob});if(!response.ok)throw new Error("Could not save "+name+": "+response.status);}
function blobOfCanvas() {return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error("Poster encoding failed.")),"image/webp",.82));}
async function record(id,draw) {
  draw(0);await save(id+".webp",await blobOfCanvas());
  const mime="video/mp4;codecs=avc1.42001E";if(!MediaRecorder.isTypeSupported(mime))throw new Error("This browser cannot encode H.264 MP4. Use a current Chromium browser.");
  const stream=canvas.captureStream(30);const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:1800000});const chunks=[];
  const complete=new Promise((resolve,reject)=>{recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};recorder.onerror=e=>reject(new Error(e.error?.message??"Video encoding failed."));recorder.onstop=()=>resolve(new Blob(chunks,{type:"video/mp4"}));});
  recorder.start();const started=performance.now();
  await new Promise(resolve=>{const frame=now=>{const elapsed=now-started;draw(Math.min(elapsed/8000,1)*tau);if(elapsed<8000)requestAnimationFrame(frame);else{recorder.stop();resolve();}};requestAnimationFrame(frame);});
  const blob=await complete;stream.getTracks().forEach(track=>track.stop());await save(id+".mp4",blob);return {id,bytes:blob.size};
}
document.getElementById("start").addEventListener("click",async event=>{
  event.currentTarget.disabled=true;result.dataset.status="recording";
  try {const clips=[];for(const [id,draw] of [["beam",beam],["plan",plan],["connect",connect]]){result.textContent="Recording "+id+"...";clips.push(await record(id,draw));}result.dataset.status="done";result.textContent=JSON.stringify(clips);}
  catch(error){console.error(error);result.dataset.status="error";result.textContent=error.message;}
  finally{document.getElementById("start").disabled=false;}
});
beam(0);
</script></body></html>`;

await mkdir(output, { recursive: true });
const server = createServer(async (request, response) => {
  if (request.method === "GET" && request.url === "/") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    response.end(html);
    return;
  }
  const match = request.url?.match(/^\/render\/(beam|plan|connect)\.(webp|mp4)$/);
  if (request.method === "PUT" && match) {
    const chunks = [];
    let bytes = 0;
    for await (const chunk of request) {
      bytes += chunk.length;
      if (bytes > 16 * 1024 * 1024) {
        response.writeHead(413);
        response.end("Motion asset exceeds the 16 MB limit.");
        return;
      }
      chunks.push(chunk);
    }
    try {
      await writeFile(new URL(`../public/motion/${match[1]}.${match[2]}`, import.meta.url), Buffer.concat(chunks));
      response.writeHead(201);
      response.end("Saved.");
      console.log(`Rendered ${match[1]}.${match[2]} (${bytes} bytes)`);
    } catch (error) {
      console.error("Could not persist the rendered motion asset.", error);
      response.writeHead(500);
      response.end("Could not persist the rendered motion asset.");
    }
    return;
  }
  response.writeHead(404);
  response.end("Not found.");
});
server.listen(port, "127.0.0.1", () => {
  console.log(`Motion studio: http://127.0.0.1:${port}`);
  console.log("Open the studio in a Chromium browser, render the reels, then stop this process.");
});
