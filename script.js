const cases={
pathable:{kicker:'Product & UX design · Accessibility · July 2026',title:'Waykind',lede:'An accessibility-aware navigation project designed to help people with mobility needs identify practical routes before leaving.',disclosure:'Project details reflect the scope and process of Nhi’s work, including four navigation flows, testing with 50+ participants, and eight usability changes.',role:'Product and UX Designer',tools:'User flows · Prototyping · Accessibility research',focus:'Accessibility · Navigation',challenge:'People with mobility needs need route information that reflects practical accessibility—not only speed or distance.',approach:['Translated accessibility research into four navigation flows.','Tested the prototype with 50+ participants.','Used the feedback to make eight usability changes.'],decisions:'The updated route-planning experience makes accessibility information easier to understand before a trip begins.',next:'Next: document the eight usability changes with before-and-after screens and describe the participant mix when those materials are available.'},
wellbeing:{kicker:'UX research & design · Wellness · May 2026',title:'FitnessWrapped',lede:'A wellness tracker designed to help people understand their progress through clearer content and navigation.',disclosure:'Project details reflect the scope and process of Nhi’s work, including 35 interviews, five themes, four product requirements, and three prototype iterations.',role:'UX Researcher and Designer',tools:'User interviews · Research synthesis · Prototyping',focus:'Wellness · Mobile',challenge:'Wellness information can feel scattered, making it harder for people to understand progress and decide what to do next.',approach:['Interviewed 35 users and synthesized five themes.','Defined four product requirements for an improved wellness experience.','Created three prototype iterations focused on content and navigation.'],decisions:'The design organizes wellness progress into an experience intended to feel personal, useful, and easier to navigate.',next:'Next: show how each research theme shaped a specific requirement and prototype change.'},
credentialflow:{kicker:'Independent UX design · Credentialing · August 2026',title:'Proofline',lede:'A credentialing review concept designed for 35+ reviewers working across 500+ provider records.',disclosure:'Independent portfolio concept informed by Nhi’s Hospital for Special Surgery experience. It is not sponsored, endorsed, or deployed by HSS or Cactus.',role:'Independent UX Designer',tools:'Prototyping · Workflow design · Cactus domain experience',focus:'AI-assisted workflow · Enterprise UX',challenge:'Credentialing reviewers need to find unresolved information and follow-up needs across dense provider records.',approach:['Designed the review concept for 35+ reviewers.','Organized credentialing information across 500+ provider records.','Prototyped an AI-assisted workflow for faster data entry and review.'],decisions:'The concept emphasizes record context and next actions so reviewers can move through verification work with fewer loose ends.',next:'Next: validate the workflow with credentialing reviewers and document how the concept changes review and follow-up steps.'}
};

const questions={
  pathable:'How might someone know a route works for them before they leave?',
  wellbeing:'How can progress feel personal without becoming pressure?',
  credentialflow:'How can reviewers find the one detail that still needs attention?'
};

const nextSteps={
  pathable:[
    'Recruit people with a range of mobility needs and compare route options in think-aloud sessions.',
    'Test whether step-free status, time, and route context are understandable at a glance.',
    'Prototype live rerouting and learn which accessibility details must remain visible while moving.'
  ],
  wellbeing:[
    'Run usability sessions focused on comprehension, motivation, and the emotional tone of the dashboard.',
    'Compare two ways of explaining activity and sleep patterns without turning them into judgments.',
    'Check color contrast, text scaling, and whether the most important daily signal is easy to find.'
  ],
  credentialflow:[
    'Validate the record hierarchy with credentialing specialists using realistic review scenarios.',
    'Measure how quickly reviewers can find missing or unresolved documentation in the concept.',
    'Explore how the design could complement established compliance workflows without disrupting them.'
  ]
};

const projectOrder=['pathable','wellbeing','credentialflow'];

const header=document.querySelector('.site-header');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>10),{passive:true});

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const spotlight=document.querySelector('.spotlight');
addEventListener('pointermove',e=>{spotlight.style.left=e.clientX+'px';spotlight.style.top=e.clientY+'px'},{passive:true});

const typed=document.querySelector('.typed-intro');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(typed){
  const full=typed.dataset.type;
  if(reduceMotion){typed.textContent=full}else{
    let index=0;
    const typeNext=()=>{typed.textContent=full.slice(0,index++);if(index<=full.length)setTimeout(typeNext,index<9?115:48)};
    setTimeout(typeNext,350);
  }
}

if(!reduceMotion&&matchMedia('(hover: hover)').matches){
  let lastStar=0;
  const colors=['#4285f4','#ea4335','#fbbc04','#34a853'];
  addEventListener('pointermove',e=>{
    const now=performance.now();if(now-lastStar<55)return;lastStar=now;
    const star=document.createElement('span');star.className='star-trail';star.textContent='✦';
    star.style.left=e.clientX+'px';star.style.top=e.clientY+'px';star.style.color=colors[Math.floor(now/200)%colors.length];
    document.body.appendChild(star);star.addEventListener('animationend',()=>star.remove());
  },{passive:true});
}

document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');
  const filter=button.dataset.filter;
  document.querySelectorAll('.project').forEach(card=>card.classList.toggle('is-hidden',filter!=='all'&&!card.dataset.tags.includes(filter)));
}));

const dialog=document.querySelector('.case-dialog');
const content=document.querySelector('#dialog-content');
let lastTrigger;
function openCase(key,trigger){
  const c=cases[key];
  if(!c)return;
  lastTrigger=trigger;
  const currentIndex=projectOrder.indexOf(key);
  const nextKey=projectOrder[(currentIndex+1)%projectOrder.length];
  const nextCase=cases[nextKey];
  content.innerHTML=`<article class="case-content">
    <p class="case-kicker">${c.kicker}</p>
    <h2 id="dialog-title">${c.title}</h2>
    <p class="case-question">${questions[key]}</p>
    <p class="case-lede">${c.lede}</p>
    <p class="case-disclosure"><strong>Project context:</strong> ${c.disclosure}</p>
    <div class="case-grid">
      <aside class="case-meta"><p><strong>Role</strong><br>${c.role}</p><p><strong>Tools</strong><br>${c.tools}</p><p><strong>Focus</strong><br>${c.focus}</p></aside>
      <div class="case-story">
        <section><h3>What I noticed</h3><p>${c.challenge}</p></section>
        <div class="case-steps">${c.approach.map((step,i)=>`<div><b>0${i+1}</b><p>${step}</p></div>`).join('')}</div>
        <section><h3>What I chose</h3><p>${c.decisions}</p></section>
        <section class="case-future"><p class="future-label">NEXT RESEARCH ROUND</p><h3>What I’d do next</h3><p>${c.next.replace(/^Next:\s*/,'')}</p><ol>${nextSteps[key].map(step=>`<li>${step}</li>`).join('')}</ol></section>
        <button class="case-next-project" type="button" data-next-project="${nextKey}"><span>Next project</span><strong>${nextCase.title} →</strong><small>${questions[nextKey]}</small></button>
      </div>
    </div>
  </article>`;
  content.querySelector('.case-next-project').addEventListener('click',()=>openCase(nextKey,trigger));
  dialog.showModal();
  document.body.style.overflow='hidden';
}
document.querySelectorAll('.project').forEach(card=>{card.addEventListener('click',e=>{if(!e.target.closest('a'))openCase(card.dataset.project,card)});card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openCase(card.dataset.project,card)}})});
function closeDialog(){dialog.close();document.body.style.overflow='';lastTrigger?.focus()}
document.querySelector('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});
dialog.addEventListener('close',()=>{document.body.style.overflow=''});
