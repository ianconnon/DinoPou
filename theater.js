
const speakInitializer = document.getElementById('speak');
const audio = document.getElementById('audio');
let audioInit = false;
microphoneAccess = false;
const audioPlay = '<i class="fa-solid fa-microphone"></i><p>Micrófono</p>';
const audioPause = '<i class="fa-solid fa-microphone-slash"></i><p>Micrófono</p>';

self.AudioContext = (self.AudioContext || self.webkitAudioContext);
async function alien1Transform(audioBuffer) {

  let ctx = new OfflineAudioContext(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate);

  let source = ctx.createBufferSource();
  source.buffer = audioBuffer;

  let oscillator = ctx.createOscillator();
  oscillator.frequency.value = 5;
  oscillator.type = 'sine';

  let oscillatorGain = ctx.createGain();
  oscillatorGain.gain.value = 0.05;

  let delay = ctx.createDelay();
  delay.delayTime.value = 0.05;

  // source --> delay --> ctx.destination
  // oscillator --> oscillatorGain --> delay.delayTime --> ctx.destination

  source.connect(delay);
  delay.connect(ctx.destination);

  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(delay.delayTime);

  oscillator.start();
  source.start();

  let outputAudioBuffer = await ctx.startRendering();
  return outputAudioBuffer;

}


speakInitializer.addEventListener('click', function(){
  if (audioInit == true){
    audio.pause()
    audioInit = false;
    speakInitializer.innerHTML = audioPause
  }else{
    let audioIN = { audio: true };
    if(microphoneAccess == false){
      navigator.mediaDevices.getUserMedia(audioIN)
        .then(function (mediaStreamObj) {
        if ("srcObject" in audio) {
          audio.srcObject = mediaStreamObj;
        }
        audio.play()
        audioInit = true;
        speakInitializer.innerHTML = audioPlay
        microphoneAccess = true;
      })
      .catch(function (err) {
        console.log(err.name, err.message);
        speakInitializer.innerHTML = audioPause
      });
    }else{
      audio.play()
      audioInit = true;
      speakInitializer.innerHTML = audioPlay
    }
  }
})


const brush = document.getElementById('brush');

brush.addEventListener('dragstart', e=>{
  e.dataTransfer.setData('text-plain',e.target.id)
})
// brush.addEventListener('drag',()=>console.log('desplace'))
// brush.addEventListener('dragend',()=>console.log('solte'))

dino.addEventListener('dragenter',e =>{
  dino.style.cssText = "animation: happyDino 3s; animation-iteration-count: infinite;";
})

dino.addEventListener('dragover', e => {
  e.preventDefault()
})
dino.addEventListener('drop', e =>{
  if (e.dataTransfer.getData("text-plain") == 'brush'){
    audiochanges.src = "static/happy-roar.mp3";
    audiochanges.play()
    dino.style.cssText = "animation: happyDino 0s;";
  }
})
dino.addEventListener('dragleave', ()=>{
  dino.style.cssText = "animation: happyDino 0s;";
})