
// Button click animation
const btn = document.querySelector('.btn');
btn.addEventListener('mousedown', () => btn.style.transform = 'scale(0.95)');
btn.addEventListener('mouseup', () => btn.style.transform = 'scale(1)');

// Seleciona o botão de hambúrguer e o menu
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// Adiciona um ouvinte de evento para abrir e fechar o menu
hamburger.addEventListener('click', () => {
    // Alterna a visibilidade do menu e anima o ícone do hambúrguer
    menu.classList.toggle('show');
    hamburger.classList.toggle('open');
});

// Fecha o menu ao clicar fora do menu (opcional)
document.addEventListener('click', (event) => {
    if (!hamburger.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('show');
        hamburger.classList.remove('open');
    }
});
