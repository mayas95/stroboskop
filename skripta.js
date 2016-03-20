window.addEventListener('load', function() {
	//stran nalozena
	
	//Dodaj novo barvo
	
	var dodajBarvo = function(event) {
		var input = document.createElement('button');
        var picker = new jscolor(input);
        picker.fromRGB(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255))
        document.getElementById("barve").appendChild(input);
  
	}
	
	document.querySelector("#novaBarva") 
		.addEventListener('click', dodajBarvo);
		
	//Odstrani barve
	var odstraniBarve = function(event){
		var el = document.getElementById("barve");
		
		while(el.firstChild){
			el.removeChild(el.firstChild); // ne zbrisemo el, ampak njegov first child in v naslednji iteraciji
		}								// se bo el.FirstChild prenastavu na slednji element

	}
	
	document.querySelector("#odstraniBarve") 
		.addEventListener('click', odstraniBarve);
		
	//Stroboskop
	var vrednosti = [];
	var minCas = 0;
	var maxCas = 0;
	var ustavi = false;
	
//	var novId;
//	var timeout;
	var spremeniBarvo = function(id) {
		document.getElementById("stroboskop").style.backgroundColor = "#"+vrednosti[id];

		if (ustavi) {
			ustavi = false;
		} else {
			var	novId = (id+1) % vrednosti.length;
			var timeout = Math.floor((Math.random() * (maxCas-minCas)) + minCas);
			setTimeout(function() {spremeniBarvo(novId)} , timeout);
		}		
	}
	
	var stop = function(event) {
		ustavi = true;
		var stop = document.querySelector("#start");
		stop.innerHTML = "Zaženi stroboskop";
		stop.addEventListener('click', zagon);
	}

	
	var zagon = function(event) {
		ustavi = false;
		vrednosti = [];
		var barve = document.querySelectorAll("#barve > button");
		var i;
		for (i = 0; i < barve.length; i++) {
			var barva = barve[i];
			vrednosti.push(barva.innerHTML);
		}
		
		minCas = parseInt(document.getElementById("min").value);
		maxCas = parseInt(document.getElementById("max").value);
		spremeniBarvo(0);
		
		var start = document.querySelector("#start");
		start.innerHTML = "Ustavi stroboskop";
		start.removeEventListener('click', zagon);
		start.addEventListener('click', stop);
	}
	
	document.querySelector("#start").addEventListener('click', zagon);
	
});