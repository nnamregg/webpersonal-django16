// NAVBAR

// Esconder/mostrar navbar al scrollear
window.onscroll = function(e) { 
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.getElementById('navbar');
    var logo = document.getElementById('navbarLogo');

    const navAnimIn = () => {
        header.style.transform = "translateY(0)"
        logo.style.transform = "rotate(0)"
    }
    
    const navAnimOut = () => {
        header.style.transform = "translateY(-100%)"
        logo.style.transform = "rotate(180deg)"
    }

    scrollY <= this.lastScroll
        ? navAnimIn()
        : navAnimOut();

    scrollY > 0
        ? header.classList.add('bg-dark','shadow')
        : header.classList.remove('bg-dark','shadow');

    this.lastScroll = scrollY ;
}

// Clases dinámicas para link actual de navbar
const navLinks = document.querySelectorAll(".nav-link")

for (let link of navLinks) {
    if (link.href == window.location.href) {
       link.classList.add('active')
       link.setAttribute('aria-current','page')
    }
}

//  FORM

window.addEventListener('load', () => {
    const form = document.querySelector('#formulario');
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const email = document.getElementById('email');
    const tel = document.getElementById('tel');
    const msg = document.getElementById('msg');
    const resetBtn = document.querySelector('.form-btn-reset');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        cleanForm();
        validaCampos();
    })

    const cleanForm = () => {
        const okClass = document.querySelectorAll('.ok');
        const fallaClass = document.querySelectorAll('.falla');
        okClass.forEach((el) => {
            console.log('okClass: ' + okClass)
            el.classList.remove('ok');
        });
        fallaClass.forEach((el) => {
            console.log('fallaClass: ' + fallaClass)
            el.classList.remove('falla');
        });
    }

    resetBtn.addEventListener('click', () => {
        cleanForm();
        form.reset();
    })

    const validaCampos = () => {
        //capturar los valores ingresados por el usuario
        const nombreValor = nombre.value.trim();
        const apellidoValor = apellido.value.trim();
        const emailValor = email.value.trim();
        const telValor = tel.value.trim();
        const msgValor = msg.value.trim();

        //validar nombre
        if (!nombreValor) {
            validaFalla(nombre, 'Campo vacío');
        } else {
            validaOk(nombre);
        }

        // validar apellido
        if (!apellidoValor) {
            validaFalla(apellido, 'Campo vacío');
        } else {
            validaOk(apellido);
        }

        //validando campo email
        if (!emailValor) {
            validaFalla(email, 'Campo vacío');
        } else if (!validaEmail(emailValor)) {
            validaFalla(email, 'El e-mail no es válido');
        } else {
            validaOk(email);
        }

        // validar telefono
        if (!telValor) {
            validaFalla(tel, 'Campo vacío');
        } else if (!validaTel(telValor)) {
            validaFalla(tel, 'El nro. de teléfono no es válido');
        } else {
            validaOk(tel);
        }

        // validar mensaje (textarea)
        if (!msgValor) {
            validaFalla(msg, 'Campo vacío');
        } else {
            validaOk(msg);
        }

    }

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement;
        const aviso = formControl.querySelector('p');
        aviso.innerText = msje;
        console.log(aviso)
        formControl.classList.add('falla');
    }
    const validaOk = (input, msje) => {
        const formControl = input.parentElement;
        console.log(formControl)
        formControl.classList.add('ok');
    }

    const validaTel = (tel) => {
        return !/\D/.test(tel);
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

})
  