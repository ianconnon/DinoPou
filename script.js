
const audiochanges = document.getElementById('audiochanges')

const dino = document.getElementById('dino');

dino.addEventListener('click', function() {

  blow = document.getElementById('blow');
  blow.play()
  audiochanges.src = "static/angry-roar.mp3";
  audiochanges.play()
  dino.style.cssText = 'filter: saturate(50%); filter: blur(1px);filter: sepia(.3);   -webkit-transform: rotateY(180deg);-webkit-transform-style: preserve-3d;transform: rotateY(180deg);transform-style: preserve-3d;';
  setTimeout(function(){
    dino.style.cssText = 'filter: saturate(0%); filter: blur(0);filter: sepia(0);'
  },150)

})
