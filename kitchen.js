
let countFoodEat = 0;

function eat(n,e){
	e.dataTransfer.setData("id",n);
}

const foods = document.querySelector('.foods');

dino.addEventListener("dragover",(e)=>{
	e.preventDefault();
})

dino.addEventListener("drop", (e)=>{
	let n = e.dataTransfer.getData('id');
	if(countFoodEat >= 4){
		audiochanges.src = "static/angry-roar.mp3";
		audiochanges.play()
		dino.style.cssText = 'filter: saturate(50%); filter: blur(1px);filter: sepia(.3);   -webkit-transform: rotateY(180deg);-webkit-transform-style: preserve-3d;transform: rotateY(180deg);transform-style: preserve-3d;';
		setTimeout(function(){
		  dino.style.cssText = 'filter: saturate(0%); filter: blur(0);filter: sepia(0);'
		},150)
	}else{
		foods.removeChild(document.getElementById('food'+n));
		audiochanges.src = "static/eat.mp3";
		audiochanges.play()
		countFoodEat++;
	}
})

for (let i = 1; i < foods.children.length + 1; i++){
	document.getElementById('food'+i+'img').addEventListener('dragstart',(e)=>eat(i,e));
}