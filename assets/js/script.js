
/* =====================================================
   HB TRANSPORTS
   Main JavaScript
===================================================== */


/* =====================================================
   MENU MOBILE
===================================================== */


const menuToggle = document.querySelector(".menu-toggle");


const navigation = document.querySelector(".navigation");



if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("active");

        menuToggle.classList.toggle("open");

    });



}



/* Fechar menu ao clicar nos links */


document.querySelectorAll(".navigation a").forEach(link => {

    link.addEventListener("click", () => {

        navigation?.classList.remove("active");

    });

});




/* =====================================================
   HEADER SCROLL
===================================================== */


const header = document.querySelector(".header");


window.addEventListener("scroll", () => {

    if (!header) return;


    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    }
    else {

        header.classList.remove("scrolled");

    }

});




/* =====================================================
   ANIMAÇÕES AO SCROLL
===================================================== */


const elements = document.querySelectorAll(
    ".service-card, .stat-card, .fleet-card, .testimonial"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {

        threshold: .15

    }
);


elements.forEach(element => {

    observer.observe(element);

});




/* =====================================================
   FORMULÁRIO DE CONTATO
===================================================== */


const contactForm = document.querySelector('.contact-form');

if (contactForm) {

    // mensagem inline (acessível)
    let formMessage = contactForm.querySelector('.form-message');
    if (!formMessage) {
        formMessage = document.createElement('div');
        formMessage.className = 'form-message';
        formMessage.setAttribute('role', 'status');
        formMessage.setAttribute('aria-live', 'polite');
        contactForm.appendChild(formMessage);
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');

    const showFormMessage = (text, type = 'info') => {
        formMessage.textContent = text;
        formMessage.classList.remove('success', 'error');
        formMessage.classList.add(type === 'success' ? 'success' : 'error');
    };

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        const dados = (typeof Object.fromEntries === 'function')
            ? Object.fromEntries(formData)
            : Array.from(formData).reduce((acc, [k, v]) => (acc[k] = v, acc), {});

        // Validação básica de campos obrigatórios
        const required = ['nome', 'empresa', 'telefone', 'email', 'origem', 'destino', 'carga', 'mensagem'];
        const missing = required.filter(f => !dados?.[f] || String(dados[f]).trim() === '');

        if (missing.length) {
            showFormMessage('Preencha os campos obrigatórios: ' + missing.join(', '), 'error');
            return;
        }

        // Validação simples de e-mail
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRe.test(dados.email)) {
            showFormMessage('Informe um e-mail válido.', 'error');
            return;
        }

        let origText;
        if (submitBtn) {
            submitBtn.disabled = true;
            origText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
        }

        try {
            const resposta = await fetch('http://localhost:3000/enviar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });

            if (resposta.ok) {
                showFormMessage('Solicitação enviada com sucesso. A equipe HB TRANSPORTS entrará em contato.', 'success');
                contactForm.reset();
            } else {
                showFormMessage('Erro ao enviar solicitação.', 'error');
            }

        } catch (error) {
            console.error(error);
            showFormMessage('Não foi possível enviar. Tente novamente.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = origText;
            }
        }

    });

}



/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */


const backTop = document.createElement("button");


backTop.className =
    "back-top";


backTop.innerHTML =
    "↑";


document.body.appendChild(backTop);



window.addEventListener(
    "scroll",
    () => {


        if (window.scrollY > 500) {


            backTop.classList.add("visible");

        }

        else {


            backTop.classList.remove("visible");

        }


    }
);




backTop.addEventListener(
    "click",
    () => {


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    }
);




/* =====================================================
   COPYRIGHT AUTOMÁTICO
===================================================== */


const copyright =
    document.querySelector(".copyright");


if (copyright) {


    copyright.innerHTML =

        `© ${new Date().getFullYear()} HB TRANSPORTS. Todos os direitos reservados.`;


}


