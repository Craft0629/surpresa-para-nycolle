// ============================================================
// CONFIGURAÇÕES
// ============================================================

// Data oficial do namoro.
const DATA_INICIO = new Date(2026, 3, 18, 0, 0, 0);

// IDs retirados dos dois links que você me passou.
const MUSICA_PRINCIPAL = "NCzUV95VIEI";
const MUSICA_SECRETA = "EgAOqt8I5ac";


// ============================================================
// ELEMENTOS
// ============================================================

const entrada = document.getElementById("entrada");
const site = document.getElementById("site");
const botaoEntrar = document.getElementById("botaoEntrar");

const easterEgg = document.getElementById("easterEgg");
const mensagemSecreta = document.getElementById("mensagemSecreta");

const abrirCarta = document.getElementById("abrirCarta");
const cartaFechada = document.getElementById("cartaFechada");
const carta = document.getElementById("carta");

const containerCoracoes = document.getElementById("coracoes");


// Bloqueia a página enquanto a surpresa está fechada.
document.body.classList.add("bloqueado");


// ============================================================
// ÁUDIO LOCAL (sem YouTube e sem anúncios)
// ============================================================

const musicaPrincipal = document.getElementById("musicaPrincipal");
const musicaSecreta = document.getElementById("musicaSecreta");

let modoSecreto = false;
let posicaoPrincipal = 0;

musicaPrincipal.volume = 0.35;
musicaSecreta.volume = 0.45;

function tocarPrincipal() {
    musicaSecreta.pause();
    musicaPrincipal.currentTime = posicaoPrincipal || musicaPrincipal.currentTime;
    musicaPrincipal.play().catch(() => {});
}

// ============================================================
// ABRIR SURPRESA
// ============================================================

botaoEntrar.addEventListener("click", () => {

    entrada.classList.add("sumir");
    site.classList.add("visivel");

    document.body.classList.remove("bloqueado");

    // O clique em “Descobrir” autoriza o áudio nos navegadores móveis.
    posicaoPrincipal = 0;
    musicaPrincipal.currentTime = 0;
    musicaPrincipal.play().catch(() => {});


    // Easter egg só aparece depois que o site é aberto.
    setTimeout(() => {

        easterEgg.classList.add("visivel");

    }, 1800);


    criarExplosaoCoracoes(18);

});


// ============================================================
// CONTADOR
// ============================================================

function atualizarContador() {

    const agora = new Date();

    // Caso o site seja aberto antes do começo do namoro
    if (agora < DATA_INICIO) {
        return;
    }


    /*
       Para contar meses corretamente, não usamos simplesmente
       "dias / 30", porque os meses possuem tamanhos diferentes.
    */

    let meses =
        (agora.getFullYear() - DATA_INICIO.getFullYear()) * 12
        + agora.getMonth()
        - DATA_INICIO.getMonth();


    let aniversarioMes = new Date(
        DATA_INICIO.getFullYear(),
        DATA_INICIO.getMonth() + meses,
        DATA_INICIO.getDate(),
        DATA_INICIO.getHours(),
        DATA_INICIO.getMinutes(),
        DATA_INICIO.getSeconds()
    );


    // Se ainda não chegou ao dia 18 do mês atual,
    // remove um mês da conta.
    if (aniversarioMes > agora) {

        meses--;

        aniversarioMes = new Date(
            DATA_INICIO.getFullYear(),
            DATA_INICIO.getMonth() + meses,
            DATA_INICIO.getDate(),
            DATA_INICIO.getHours(),
            DATA_INICIO.getMinutes(),
            DATA_INICIO.getSeconds()
        );

    }


    let diferenca = agora - aniversarioMes;


    const dias = Math.floor(
        diferenca / (1000 * 60 * 60 * 24)
    );

    diferenca -= dias * 1000 * 60 * 60 * 24;


    const horas = Math.floor(
        diferenca / (1000 * 60 * 60)
    );

    diferenca -= horas * 1000 * 60 * 60;


    const minutos = Math.floor(
        diferenca / (1000 * 60)
    );

    diferenca -= minutos * 1000 * 60;


    const segundos = Math.floor(
        diferenca / 1000
    );


    document.getElementById("meses").textContent =
        meses;

    document.getElementById("dias").textContent =
        dias;

    document.getElementById("horas").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutos").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("segundos").textContent =
        String(segundos).padStart(2, "0");

}


atualizarContador();

setInterval(atualizarContador, 1000);


// ============================================================
// ANIMAÇÕES AO ROLAR
// ============================================================

const elementosReveal = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);


const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("ativo");

            }

        });

    },

    {
        threshold: 0.15
    }

);


elementosReveal.forEach((elemento) => {

    observer.observe(elemento);

});


// ============================================================
// ESTRELAS
// ============================================================

const estrelasContainer =
    document.getElementById("estrelas");


for (let i = 0; i < 70; i++) {

    const estrela = document.createElement("span");

    estrela.classList.add("estrela");

    estrela.style.left =
        Math.random() * 100 + "%";

    estrela.style.top =
        Math.random() * 75 + "%";

    estrela.style.animationDelay =
        Math.random() * 3 + "s";

    estrela.style.animationDuration =
        (1.5 + Math.random() * 2.5) + "s";

    const tamanho =
        1 + Math.random() * 2;

    estrela.style.width =
        tamanho + "px";

    estrela.style.height =
        tamanho + "px";

    estrelasContainer.appendChild(estrela);

}


// ============================================================
// ABRIR CARTA
// ============================================================

abrirCarta.addEventListener("click", () => {

    cartaFechada.style.display = "none";

    carta.classList.add("aberta");

    criarExplosaoCoracoes(30);


    setTimeout(() => {

        carta.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 150);

});


// ============================================================
// CORAÇÕES
// ============================================================

function criarCoracao() {

    const coracao = document.createElement("span");

    coracao.classList.add("coracao-flutuante");

    coracao.textContent = "♥";


    coracao.style.left =
        Math.random() * 100 + "vw";


    const tamanho =
        8 + Math.random() * 16;

    coracao.style.fontSize =
        tamanho + "px";


    coracao.style.animationDuration =
        (4 + Math.random() * 4) + "s";


    containerCoracoes.appendChild(coracao);


    setTimeout(() => {

        coracao.remove();

    }, 8500);

}


function criarExplosaoCoracoes(quantidade) {

    for (let i = 0; i < quantidade; i++) {

        setTimeout(() => {

            criarCoracao();

        }, i * 100);

    }

}


// ============================================================
// EASTER EGG 💚
// ============================================================

easterEgg.addEventListener("click", () => {

    if (!modoSecreto) {
        modoSecreto = true;
        easterEgg.classList.add("ativo");

        posicaoPrincipal = musicaPrincipal.currentTime;
        musicaPrincipal.pause();
        musicaSecreta.currentTime = 0;
        musicaSecreta.play().catch(() => {});

        mensagemSecreta.classList.add("mostrar");
        setTimeout(() => mensagemSecreta.classList.remove("mostrar"), 2800);

        for (let i = 0; i < 12; i++) {
            setTimeout(() => criarCoracaoVerde(), i * 80);
        }
    } else {
        modoSecreto = false;
        easterEgg.classList.remove("ativo");

        musicaSecreta.pause();
        musicaSecreta.currentTime = 0;
        musicaPrincipal.currentTime = posicaoPrincipal;
        musicaPrincipal.play().catch(() => {});
    }

});


// ============================================================
// CORAÇÃO VERDE DO SEGREDO
// ============================================================

function criarCoracaoVerde() {

    const coracao = document.createElement("span");

    coracao.classList.add("coracao-flutuante");

    coracao.textContent = "♥";


    // Nasce perto do canto inferior direito
    coracao.style.left =
        (92 + Math.random() * 6) + "vw";


    coracao.style.color =
        "#37c96b";


    coracao.style.fontSize =
        (8 + Math.random() * 10) + "px";


    coracao.style.animationDuration =
        (3 + Math.random() * 2) + "s";


    containerCoracoes.appendChild(coracao);


    setTimeout(() => {

        coracao.remove();

    }, 6000);

}


// ============================================================
// PEQUENO EFEITO NO TÍTULO DA ABA
// ============================================================

const tituloNormal =
    "Eduardo & Nycolle ❤️";

const tituloSaudade =
    "Volta aqui, Nycolle 🥺";


document.addEventListener(
    "visibilitychange",
    () => {

        if (document.hidden) {

            document.title = tituloSaudade;

        }

        else {

            document.title = tituloNormal;

        }

    }
);