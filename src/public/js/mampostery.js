const typeWriter = document.getElementById('typewriter-text');
const text = 'Bienvenidos a HomeBanking App.';

typeWriter.innerHTML = text;
typeWriter.style.setProperty('--characters', text.length);

const typeWriter2 = document.getElementById('typewriter-text2');
const text2 = 'Tu mundo financiero mas simple.';
 
typeWriter2.innerHTML = text2;
typeWriter2.style.setProperty('--characters', text2.length);