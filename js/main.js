const hamburgerIcon = document.getElementById('header__izq__btn');
const menuDesplegable = document.getElementById('header__menudesplegable');

hamburgerIcon.addEventListener('click', ()=> {
    menuDesplegable.classList.toggle('hidden');
    menuDesplegable.classList.toggle('open');
})