
const speakInitializer = document.getElementById('speak');

let rec;
if (!("webkitSpeechRecognition" in window)) {
	alert("disculpas, no puedes usar la API");
} else {
	rec = new webkitSpeechRecognition();
	rec.lang = "es-AR";
	rec.continuous = true;
	rec.interim = true;
	rec.addEventListener("audioend", function(){
		rec.addEventListener("result",init);
	})
}
function speak(str){
    speechSynthesis.speak(new SpeechSynthesisUtterance(str));
}
function init(event){
	for (let i = event.resultIndex; i < event.results.length; i++){
         document.getElementById('game').innerHTML = event.results[i][0].transcript;
         speak(event.results[i][0].transcript)
	}
}

speakInitializer.addEventListener('click', function(){
	rec.start();
})