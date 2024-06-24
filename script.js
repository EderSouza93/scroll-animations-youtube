//Registrar o plugin ScrollTrigger no GSAP
gsap.registerPlugin(ScrollTrigger);

//Seleciona o contêiner principal da página
const pageContainer = document.querySelector(".container")

//Inicializar o locomotive Scroll para rolagem suave
const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true
})

//Atualizar o ScrollTrigger sempre que o Locomotive Scroll é rolado
scroller.on("scroll", ScrollTrigger.update)

//Configurar scrollerProxy para integrar Locomotive Scroll com ScrollTrigger
ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value){
        return arguments.length
        ? scroller.scrollTo(value, 0, 0) //Definir posição de rolagem
        : scroller.scroll.instance.scroll.y // Obter posição de rolagem atual
    },
    getBoundingClientRect(){
        return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        }
    },
    // Definir tipo de fixação baseada em suporte a transformações CSS
    pinType: pageContainer.style.transform ? "transform" : "fixed"
})

// Adicionar evento ao carregar a página 
window.addEventListener("load", function(){
    // Selecionar o elemento a ser fixado
    let pinWrap = document.querySelector(".pin-wrap")
    // Calcular a largura do elemento 
    let pinWrapWidth = pinWrap.offsetWidth;
    // Calcular a extensão da rolagem horizontal
    let horizontalScrollLength = pinWrapWidth - window.innerWidth;

    // Criar animação para rolagem horizontal do elemento fixado 
    gsap.to(".pin-wrap", {
        scrollTrigger:{
            scroller: pageContainer,    // Usar Locomotive Scroll como scroller
            scrub: true,                // Sincronizar animação com a rolagem      
            trigger: "#sectionPin",     // Elemento que dispara a animação 
            pin: true,                  // Fixar o elemento durante a rolagem 
            start:"top top",            // Iniciar animação quando o topo do trigger atinge o topo da viewport
            end: pinWrapWidth,          // Terminar animação ao final da largura do elemento
        },
        x: -horizontalScrollLength      // Mover o elemento horizontalmente
    })

    // Atualizar Locomotive Scroll quando ScrollTrigger é atualizado
    ScrollTrigger.addEventListener("refresh", () => scroller.update())

    // Atualizar ScrollTrigger para garantir que todas as animações estejam sincronizadas
    ScrollTrigger.refresh();
})

// Criar uma linha do tempo para animação do elemento com classe .anima
const tl = gsap.timeline({
    scrollTrigger:{
        trigger: ".anima",          // Elemento que dispara a animação 
        scroller: pageContainer,    // Usar Locomotive Scroll como scroller
        start: "top 50%",           // Iniciar animação quando o topo do trigger atinge 50% da altura da viewport
        end: "bottom 30%",          // Terminar animação quando o fundo do trigger atinge 30% da altura da viewport
        markers: true,              // Mostrar marcadores para depuração
        scrub: 2,                   // Sincronizar animação com a rolagem 
    }
})

// Adicionar animações à linha do tempo
tl.fromTo(".anima", { scale: 1 }, { scale: 2.5})    // Escalar de 1 para 2.5
tl.fromTo(".anima", { opacity: 1 }, { opacity: 0})  // Alterar opacidade de 1 para 0
