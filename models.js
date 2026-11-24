/* VEINROT: общие модели (low-poly, стиль PS2) */
const PM=(c,e)=>new THREE.MeshPhongMaterial({color:c,flatShading:true,shininess:4,emissive:e||0});
const cy=(a,b,h,c,x,y,z,p,s,e)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(a,b,h,s||6),PM(c,e));m.position.set(x,y,z);p.add(m);return m};
const sp=(r,c,x,y,z,p,sx,sy,sz,e)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,7,5),PM(c,e));m.position.set(x,y,z);m.scale.set(sx||1,sy||1,sz||1);p.add(m);return m};
const co=(r,h,c,x,y,z,p,s,e)=>{const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,s||5),PM(c,e));m.position.set(x,y,z);p.add(m);return m};
const ar=(p,x,y,len,w,c,hc,rz)=>{const g=new THREE.Group();g.position.set(x,y,0);g.rotation.z=rz||0;cy(w,w*.7,len,c,0,-len/2,0,g);if(hc!=null)sp(w*1.3,hc,0,-len,0,g);p.add(g);return g};
const GREEN=new THREE.Color(0x6a8a4a);
function human(c){const G=new THREE.Group(),sk=0xd9a77d,K=c.c;G.arms=[];
cy(.12,.14,.7,0x2b3042,-.13,.35,0,G);cy(.12,.14,.7,0x2b3042,.13,.35,0,G);
cy(.26,.3,.8,K,0,1.1,0,G);sp(.22,sk,0,1.72,0,G,1,1.15,1);
sp(.035,0x111111,-.08,1.76,.19,G);sp(.035,0x111111,.08,1.76,.19,G);
const la=ar(G,-.34,1.45,.72,.09,K,sk),ra=ar(G,.34,1.45,.72,.09,K,sk);G.arms.push([la,0,0],[ra,3,0]);G.ra=ra;
const h=c.h;
if(h=='cap'){cy(.24,.24,.1,K,0,1.92,0,G,8);cy(.2,.2,.04,K,0,1.88,.22,G,8)}
if(h=='long'){sp(.25,0x5a3418,0,1.8,-.04,G,1,1.1,1.05);cy(.2,.2,.6,0x5a3418,0,1.5,-.2,G)}
if(h=='coat')cy(.31,.34,.5,0xeeeeee,0,.9,0,G,8);
if(h=='lamp'){cy(.22,.22,.08,0x333333,0,1.93,0,G,8);sp(.07,0xffffaa,0,1.95,.2,G,1,1,1,0xffffaa)}
if(h=='bun'){sp(.23,0x222222,0,1.86,-.03,G,1,.7,1);sp(.1,0x222222,0,2.05,-.08,G)}
return G}
/* первая стадия: растёт одна рука и зеленеет */
function humanGrow(G,g){const k=Math.min(1,g);G.ra.scale.y=1+k*2.4;G.ra.children.forEach(m=>m.material.color.lerp(GREEN,.03))}
/* уникальный монстр под каждого персонажа */
const MSK=[0x8a9a6a,0x9a8470,0x7a9a9a,0xa09070,0x8a6a90];
function mon(ci){const G=new THREE.Group(),sk=MSK[ci],H=new THREE.Group(),J=new THREE.Group();G.H=H;G.J=J;G.arms=[];G.main=[];G.ex=[];G.legs=[];
[-.13,.13].forEach(x=>G.legs.push(cy(.06,.1,1,0x2a2a35,x,.5,0,G)));
G.add(H);cy(.2,.26,.9,0x3a3a3a,0,.45,0,H);cy(.15,.2,.5,sk,0,.5,.12,H);
sp(.2,sk,0,1.05,.1,H,1,1.3,1.1);sp(.16,0x200000,0,.97,.2,H,1.25,.8,.5);
[-1,1].forEach(s=>sp(.025,0xff2200,s*.07,1.14,.27,H,1,1,1,0xff2200));
H.add(J);J.position.set(0,.93,.12);cy(.14,.1,.07,sk,0,-.06,.1,J);
for(let k=-3;k<=3;k++){co(.02,.1,0xeeeeee,k*.045,0,.2,J,4);const t=co(.02,.1,0xeeeeee,k*.045,.1,.2,H,4);t.position.y=.95;t.rotation.x=Math.PI}
const claw=a=>{for(let k=-1;k<=1;k++){const c=co(.025,.2,0x222211,k*.05,-1.0,.0,a,4);c.rotation.x=Math.PI}};
const M=(x,rz,len,w,ph,ex)=>{const a=ar(H,x,.95,len,w,sk,0x335522,rz);claw(a);G.arms.push([a,ph,rz]);(ex?G.ex:G.main).push(a);return a};
M(-.3,0,.8,.07,0);M(.3,0,.8,.07,3);
M(-.2,-.8,.7,.06,1,1);M(.2,.8,.7,.06,4,1);M(-.15,-2.3,.8,.05,2,1);M(.15,2.3,.8,.05,5,1);
if(ci==0)G.legK=1.35;
if(ci==1)[-.13,.13].forEach(x=>sp(.02,0xff2200,x,1.22,.24,H,1,1,1,0xff2200));
if(ci==2){sp(.3,sk,0,.5,.02,H,1,1.1,.9);[-.2,.2].forEach(x=>cy(.03,.03,.5,0xeeeeee,x,.3,.16,H))}
if(ci==3){cy(.015,.015,.5,0x222222,0,1.4,.12,H);sp(.08,0xffffaa,0,1.67,.3,H,1,1,1,0xffffaa)}
if(ci==4)for(let k=0;k<14;k++)cy(.012,.008,.7,0x111111,Math.sin(k)*.18,.75,Math.cos(k)*.18+.1,H);
G.ex.forEach((a,i)=>{a.visible=false});return G}
function monGrow(G,g){const sy=(1+g*.55)*(G.legK||1);G.legs.forEach(l=>{l.scale.y=sy;l.position.y=.5*sy});G.H.position.y=sy;G.H.rotation.x=.2+g*.45;G.J.rotation.x=.1+g*.9;
G.main.forEach(a=>a.scale.y=1+g*1.9);G.ex[0].visible=G.ex[1].visible=g>.3;G.ex[2].visible=G.ex[3].visible=g>.7;G.ex.forEach(a=>a.scale.y=1+g*1.4)}
