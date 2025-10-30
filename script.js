const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-link');
const spy=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        const id=entry.target.getAttribute('id');
        const link=document.querySelector(`.nav a[href="#${id}"]`);
        if(entry.isIntersecting){
            navLinks.forEach(a=>a.classList.remove('active'));
            link?.classList.add('active');
        }
    });
},{ rootMargin:"-40% 0px -55% 0px", threshold:[0,.2,.6] });
sections.forEach(s=>spy.observe(s));

const reveals=document.querySelectorAll('.reveal');
const revealIO=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting){
            e.target.classList.add('show');
            revealIO.unobserve(e.target);
        }
    })
},{threshold:.15});
reveals.forEach(el=>revealIO.observe(el));

const bars=document.querySelectorAll('.bar');
const barIO=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
        if(e.isIntersecting){
            const target=e.target.querySelector('span');
            const lvl=e.target.dataset.level||70;
            requestAnimationFrame(()=>{
                target.style.width=lvl+'%';
            });
            barIO.unobserve(e.target);
        }
    })
},{threshold:.6});
bars.forEach(b=>barIO.observe(b));

const form=document.getElementById('contactForm');
const note=document.getElementById('formNote');
form.addEventListener('submit',(ev)=>{
    ev.preventDefault();
    if(!form.checkValidity()){
        note.textContent='Please fill all fields correctly.';
        note.style.color='var(--danger)';
        return;
    }
    note.textContent='Thanks! Your message has been queued.';
    note.style.color='var(--ok)';
    form.reset();
});

const toTop=document.getElementById('toTop');
const showTop=new IntersectionObserver(([e])=>{
    toTop.style.display=e.isIntersecting?'none':'inline-block';
});
showTop.observe(document.querySelector('header'));

document.getElementById('year').textContent=new Date().getFullYear();