var images = {}

loadImage("leftArm");
loadImage("legs");
loadImage("torso");
loadImage("rightArm");
loadImage("head");
loadImage("leftArm-jump");
loadImage("legs-jump");
loadImage("rightArm-jump");

function loadImage(name){
	images[name] = new Image();
	images[name].onload = function(){
		resourceLoaded();
	}
	images[name].src = "images/" + name + ".png";
}

var totalResources = 8;
var numResourcesLoaded = 0;
var fps = 30;

var jumping = false;

$("canvas").click(function(){
	jump();
});

function jump(){
	if (!jumping){
		jumping = true;
		setTimeout(land, 500);
	}
}

function land(){
	jumping = false;
}

function resourceLoaded(){
	numResourcesLoaded += 1;
	if(numResourcesLoaded === totalResources){
		setInterval(redraw, 1000/fps);
	}
}

var context = document.getElementById('canvas').getContext("2d");

var charX = 150;
var charY = 300;


function redraw(){

	var x = charX;
	var y = charY;
	var jumpHeight = 45;

	canvas.width = canvas.width; // clears the canvas

	if(jumping){
		drawEllipse(x + 40, y + 29, 100 - breathAmt, 4);
	}else{
		drawEllipse(x + 40, y + 29, 160 - breathAmt, 6);
	}

	if(jumping){
		y -= jumpHeight;
	}

	

	if(jumping){
		context.drawImage(images["leftArm-jump"], x + 40, y - 42 - breathAmt);
	}else{
		context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);	
	}
	if(jumping){
		context.drawImage(images["legs-jump"], x, y - 6);
	}else{
		context.drawImage(images["legs"], x, y);	
	}
	context.drawImage(images["torso"], x, y - 50);
	if(jumping){
		context.drawImage(images["rightArm-jump"], x - 35, y - 42 - breathAmt);
	}else{
		context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);	
	}
	context.drawImage(images["head"], x - 15, y - 125 - breathAmt);

		

	
}

function drawEllipse(centerX, centerY, width, height){

	context.beginPath();

	context.moveTo(centerX, centerY - height/2);

	context.bezierCurveTo(
		centerX + width/2, centerY - height/2,
		centerX + width/2, centerY + height/2,
		centerX, centerY + height/2);

	context.bezierCurveTo(
		centerX - width/2, centerY + height/2,
		centerX - width/2, centerY - height/2,
		centerX, centerY - height/2);

	context.fillStyle = "black";
	context.fill();
	context.closePath();
}

var breathInc = .1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000/fps);
// var rayStartX = 225
// var rayStartY = 226

function updateBreath(){
	if (breathDir === 1){ // breath in

		// rayStartX +=15
		// rayStartY -=3
		// drawRay(rayStartX, rayStartY, 30, 10);

		breathAmt -= breathInc;
		if(breathAmt < -breathMax){
			breathDir = -1
		}
	}else { // breath out

		// rayStartX = 225
		// rayStartY = 226

		breathAmt += breathInc;
		if(breathAmt > breathMax){
			breathDir = 1
		}
	}
}


// function drawRay(x, y, width, height){
// 	context.beginPath();
//       context.moveTo(x, y);
//       context.lineTo(x - 50, y + 10);
//       context.lineWidth = 10;

//       // set line color
//       context.strokeStyle = '#ff0000';
//       context.stroke();
// }



