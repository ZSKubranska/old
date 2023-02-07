Level=1;
failed = false;
finished = false;
pause = false;
isDriving = false;
skana = true;

up = false;
down = false;
right = false;
left = false;

var carRotation = 0;
var speed = 0;
var increment = 0;
var posNeg = 1;
var maxSpeed = 14;
var minSpeed = -14;
var acceleration = 0.04;
var brakedelay = 5;

mobile = false;

var bitmap;
var bitmap2;
var point1;
var point2;
var point3;
var point4;
var enemyBitmap;
var enemy2Bitmap;

var colisiondelay = 0;
var gameTime = 10800;
var updateclock = 0;
var night = false;

var tryAgainScreen;
var levelScore = 0;
var totalScore = 0;
var levelScores = [0,0,0,0,0,0,0,0,0,0];

var enemyRotation = 0;
var posNeg2 = 1;
var enemy;
var enemyx = 0;
var enemyy = 0;
var enemySpeed = 2;

var enemy2Rotation = 0;
var posNeg3 = 1;
var enemy2;
var enemy2x = 0;
var enemy2y = 0;
var enemy2Speed = 2;

var labaPuse = 853;
var apaksPuse = 480;

var backgroundSound;
var idleSound;
var engineSound;

if(createjs.Touch.isSupported()) mobile = true;

//var url = document.referrer;
//var ref = url.match(/:\/\/(.[^/]+)/)[1];
	
// ------------------------------------------------------------------------------------
function startGame() {
//window.focus();
pause = true;
night = false;

var fade = new lib.fadeout();
exportRoot.addChild(fade);
gameTime = 10800;
levelScore =  0;
exportRoot.gmenu.leveltxt.text = "Level: "+ Level;

failed = false;
finished = false;
isDriving = true;
up = false;
down = false;
right = false;
left = false;

speed = 0;
increment = 0;

	if(Level == 1) {bitmap = new createjs.Bitmap("images/collider1.png");exportRoot.level = exportRoot.level1;}
	if(Level == 2) {bitmap = new createjs.Bitmap("images/collider2.png");exportRoot.level = exportRoot.level2;}
	if(Level == 3) {bitmap = new createjs.Bitmap("images/collider3.png");exportRoot.level = exportRoot.level3;}
	if(Level == 4) {bitmap = new createjs.Bitmap("images/collider4.png");exportRoot.level = exportRoot.level4;}
	if(Level == 5) {bitmap = new createjs.Bitmap("images/collider5.png");exportRoot.level = exportRoot.level5;night = true;}
	if(Level == 6) {bitmap = new createjs.Bitmap("images/collider6.png");exportRoot.level = exportRoot.level6;}
	if(Level == 7) {bitmap = new createjs.Bitmap("images/collider7.png");exportRoot.level = exportRoot.level7;}
	if(Level == 8) {bitmap = new createjs.Bitmap("images/collider8.png");exportRoot.level = exportRoot.level8;}
	if(Level == 9) {bitmap = new createjs.Bitmap("images/collider9.png");exportRoot.level = exportRoot.level9;}
	if(Level == 10) {bitmap = new createjs.Bitmap("images/collider10.png");exportRoot.level = exportRoot.level10;}

	
	bitmap.scaleX = 1 / exportRoot.level.collider.scaleX;
	bitmap.scaleY = 1 / exportRoot.level.collider.scaleY;	
	exportRoot.level.collider.addChild(bitmap);
	
	bitmap2 = new createjs.Bitmap("images/truck.png");
	bitmap2.x = -26.75; // car bildes atrasanas vieta ieks moviclip
	bitmap2.y = -75;
	bitmap2.scaleX = 53 / bitmap2.image.naturalWidth;
	bitmap2.scaleY = bitmap2.scaleX;// taka pivot punkts ir nobidits nevar pareizi nolasit car augstumu
	bitmap2.visible = false;
	exportRoot.level.car.addChild(bitmap2);
	
	point1 = new createjs.Bitmap("images/parkingpoint.png");	
	point1.x = exportRoot.level.parking.p1.x;
	point1.y = exportRoot.level.parking.p1.y;
	exportRoot.level.parking.addChild(point1);
	
	point2 = new createjs.Bitmap("images/parkingpoint.png");	
	point2.x = exportRoot.level.parking.p2.x;
	point2.y = exportRoot.level.parking.p2.y;
	exportRoot.level.parking.addChild(point2);
	
	point3 = new createjs.Bitmap("images/parkingpoint.png");	
	point3.x = exportRoot.level.parking.p3.x;
	point3.y = exportRoot.level.parking.p3.y;
	exportRoot.level.parking.addChild(point3);
	
	point4 = new createjs.Bitmap("images/parkingpoint.png");	
	point4.x = exportRoot.level.parking.p4.x;
	point4.y = exportRoot.level.parking.p4.y;
	exportRoot.level.parking.addChild(point4);
	
	if(exportRoot.level.enemy) {
	enemyBitmap = new createjs.Bitmap("images/enemy.png");
	enemyBitmap.scaleX = exportRoot.level.enemy.nominalBounds.width / enemyBitmap.image.naturalWidth;
	enemyBitmap.scaleY = enemyBitmap.scaleX;// taka pivot punkts ir nobidits nevar pareizi nolasit car augstumu
	enemyBitmap.visible = false;
	exportRoot.level.enemy.addChild(enemyBitmap);
	
	enemy = exportRoot.level.enemy;
	enemyRotation = enemy.rotation;
	if (enemy.rotation < 180 && enemy.rotation > 0) posNeg2=1;			
	if ((enemy.rotation < 0)&&(enemy.rotation > -180)) {enemyRotation = -1 * enemy.rotation;posNeg2=-1;}
	enemyx = enemy.x;
	enemyy = enemy.y;
	exportRoot.level.enemyshadow.rotation = enemy.rotation;
	if(Level == 6) {enemySpeed = 1.2;enemyRotation -=4;}
	if(Level == 7) {enemySpeed = 1.75;enemyRotation -=4;}
	if(Level == 8) {enemySpeed = 1.75;enemyRotation -=3.5;}
	if(Level == 9) {enemySpeed = 2;enemyRotation -=3;}
	if(Level == 10) {enemySpeed = 3;enemyRotation -=1;}
	
	setTimeout(stopit,10);
	function stopit() {
	var randomenemy = Math.floor(Math.random()*9);
	enemy.gotoAndStop(randomenemy);
	exportRoot.level.enemyshadow.gotoAndStop(randomenemy);
	}
	
	}
	
		if(exportRoot.level.enemy2) {
	enemy2Bitmap = new createjs.Bitmap("images/enemy.png");
	enemy2Bitmap.scaleX = exportRoot.level.enemy2.nominalBounds.width / enemy2Bitmap.image.naturalWidth;
	enemy2Bitmap.scaleY = enemy2Bitmap.scaleX;// taka pivot punkts ir nobidits nevar pareizi nolasit car augstumu
	enemy2Bitmap.visible = false;
	exportRoot.level.enemy2.addChild(enemy2Bitmap);
	
	enemy2 = exportRoot.level.enemy2;
	enemy2Rotation = enemy2.rotation;
	if (enemy2.rotation < 180 && enemy2.rotation > 0) posNeg3=1;			
	if ((enemy2.rotation < 0)&&(enemy2.rotation > -180)) {enemy2Rotation = -1 * enemy2.rotation;posNeg3=-1;}
	enemy2x = enemy2.x;
	enemy2y = enemy2.y;
	exportRoot.level.enemyshadow2.rotation = enemy2.rotation;
	if(Level == 8) {enemy2Speed = 1.5;enemy2Rotation +=3;}
	if(Level == 9) {enemy2Speed = 3;enemy2Rotation +=4;}
	if(Level == 10) {enemy2Speed = 4;enemy2Rotation +=2;}
	
	setTimeout(stopit2,10);
	function stopit2() {
	var randomenemy2 = Math.floor(Math.random()*9);
	enemy2.gotoAndStop(randomenemy2);
	exportRoot.level.enemyshadow2.gotoAndStop(randomenemy2);
	}
	}

	
	
		
if(mobile) {
			
createjs.Touch.enable(stage, false, false);
	
exportRoot.gmenu.buttons.left.addEventListener( 'mousedown', leftDown);
exportRoot.gmenu.buttons.left.addEventListener( 'pressup', leftUp);
exportRoot.gmenu.buttons.right.addEventListener( 'mousedown', rightDown);
exportRoot.gmenu.buttons.right.addEventListener( 'pressup', rightUp);
exportRoot.gmenu.buttons.accelerate.addEventListener( 'mousedown', accDown);
exportRoot.gmenu.buttons.accelerate.addEventListener( 'pressup', accUp);
exportRoot.gmenu.buttons.brake.addEventListener( 'mousedown', brakeDown);
exportRoot.gmenu.buttons.brake.addEventListener( 'pressup', brakeUp);

} else {
	
exportRoot.gmenu.buttons.visible = false;	 
document.addEventListener('keydown', keyIsDown);
document.addEventListener('keyup', keyIsUp);
}
update();

}
// ----------------------------------------------------------------------------
function leftDown(event) {event.nativeEvent.preventDefault();left = true;}
function leftUp(event) {event.nativeEvent.preventDefault();left = false;right = false;}
function rightDown(event) {event.nativeEvent.preventDefault();right = true;}
function rightUp(event) {event.nativeEvent.preventDefault();right = false;left = false;}
function accDown(event) {event.nativeEvent.preventDefault();up = true;}
function accUp(event) {event.nativeEvent.preventDefault();up = false;}
function brakeDown(event) {event.nativeEvent.preventDefault();down = true;}
function brakeUp(event) {event.nativeEvent.preventDefault();down = false;}
// ----------------------------------------------------------------------------
function keyIsUp(event) {
	event.preventDefault();
	 if (event.keyCode == 38 || event.keyCode == 87) {
	up = false;
  } else if (event.keyCode == 40 || event.keyCode == 83){
    down = false;
  }
    if (event.keyCode == 39 || event.keyCode == 68) {
	right = false;
  } else if (event.keyCode == 37 || event.keyCode == 65){
    left = false;
  }
}
// ----------------------------------------------------------------------------
function keyIsDown(event) {
	event.preventDefault();
	  if (event.keyCode == 38 || event.keyCode == 87) { // up
	up = true;	
  } else if (event.keyCode == 40 || event.keyCode == 83){ // down
    down = true;
  }
    if (event.keyCode == 39 || event.keyCode == 68) { // right
	right = true;
  } else if (event.keyCode == 37 || event.keyCode == 65){ // left
    left = true;
  }
}
// ----------------------------------------------------------------------------
function update() {
if(!pause) {
drive();
hittest();
showTime();
if(exportRoot.level.enemy) enemydrive();
}
if (!failed && !finished && isDriving) requestAnimationFrame(update);
}
// ----------------------------------------------------------------------------
function drive() {
	
			if(brakedelay > 0) {
				brakedelay --;
				exportRoot.level.car.brake.visible = true;
			} else {
				exportRoot.level.car.brake.visible = false;
			}
	
			var oldX = exportRoot.level.car.x;
			carRotation=exportRoot.level.car.rotation;
			speed = Math.round((increment)*5);

			if ((exportRoot.level.car.rotation < 180)&&(exportRoot.level.car.rotation >= 0)) {
				carRotation=exportRoot.level.car.rotation;
				posNeg=1;
			}
			if ((exportRoot.level.car.rotation < 0)&&(exportRoot.level.car.rotation > -180)) {
				carRotation=-1*exportRoot.level.car.rotation;
				posNeg=-1;
			}

			if (right) {
				
				if (exportRoot.level.car.tireL.rotation < 20){
				exportRoot.level.car.tireL.rotation+=2;
				exportRoot.level.car.tireR.rotation+=2;				
				}
				exportRoot.level.car.rotation+=((.5 * exportRoot.level.car.tireL.rotation)/20) * increment;
			}

			if (left) {
					
				if (exportRoot.level.car.tireL.rotation > -20){
				exportRoot.level.car.tireL.rotation-=2;
				exportRoot.level.car.tireR.rotation-=2;
				
				}
				exportRoot.level.car.rotation+=((.5 * exportRoot.level.car.tireL.rotation)/20) * increment;
			}

			if (!left && !right) {
				
				if (exportRoot.level.car.tireL.rotation > 0) {
					exportRoot.level.car.tireL.rotation-=2;
					exportRoot.level.car.tireR.rotation-=2;
				}
				if (exportRoot.level.car.tireL.rotation < 0) {
					exportRoot.level.car.tireL.rotation+=2;
					exportRoot.level.car.tireR.rotation+=2;
				}
				exportRoot.level.car.rotation+=((.5 * exportRoot.level.car.tireL.rotation)/20) * increment;
			}

			if(exportRoot.level.car.rotation > 180) exportRoot.level.car.rotation -= 360;
			if(exportRoot.level.car.rotation < -180) exportRoot.level.car.rotation += 360;
			
		if (up) {
				if (speed < maxSpeed && brakedelay < 1) {
			increment += acceleration;
		}
		
			if (increment < 0){
			increment += (acceleration * 2);
			if(increment > 0) increment = 0;
			brakedelay = 20;
		}
		if (increment == .5){
			//increment += (acceleration * 2);
		}
		
		exportRoot.level.car.y -= ((90-carRotation)/90)*increment;
			
		if (((exportRoot.level.car.rotation > 90)&&(exportRoot.level.car.rotation < 180))||((exportRoot.level.car.rotation < -90)&&(exportRoot.level.car.rotation > -180))) {
				exportRoot.level.car.x += posNeg * (((((1-(carRotation/360))*360)-180)/90)*increment);
		}
		if (((exportRoot.level.car.rotation <= 90)&&(exportRoot.level.car.rotation > 0))||((exportRoot.level.car.rotation >= -90)&&(exportRoot.level.car.rotation < -1))) {			
				exportRoot.level.car.x += posNeg * ((carRotation)/90)*increment;
		}

		}
	
		else if (down) {
		if (speed > minSpeed && brakedelay < 1) {
			increment -= acceleration;
		}
		
		if (increment > 0){
			increment -= (acceleration * 2);
			if(increment < 0) increment = 0;
			brakedelay = 20;
		} else {
			if(night) exportRoot.level.car.lukturi.gotoAndPlay(1);
		}
		exportRoot.level.car.y -= ((90-carRotation)/90)*increment;
			
		if (((exportRoot.level.car.rotation > 90 )&& (exportRoot.level.car.rotation < 180)) || ((exportRoot.level.car.rotation < -90) && (exportRoot.level.car.rotation > -180))) {
				exportRoot.level.car.x += posNeg * (((((1-(carRotation/360))*360)-180)/90)*increment);
		}
		if (((exportRoot.level.car.rotation <= 90)&&(exportRoot.level.car.rotation > 0))||((exportRoot.level.car.rotation >= -90)&&(exportRoot.level.car.rotation < -1))) {			
				exportRoot.level.car.x += posNeg * ((carRotation)/90)*increment;
		}

		
	}	
   
		else if (increment > 0) {
			exportRoot.level.car.y -= ((90-carRotation)/90)*increment;
			
			if (((exportRoot.level.car.rotation > 90) && (exportRoot.level.car.rotation < 180)) || ((exportRoot.level.car.rotation < -90) && (exportRoot.level.car.rotation > -180))) {
				exportRoot.level.car.x += posNeg * (((((1-(carRotation/360))*360)-180)/90)*increment);
			}
			if (((exportRoot.level.car.rotation <= 90)&&(exportRoot.level.car.rotation > 0))||((exportRoot.level.car.rotation >= -90)&&(exportRoot.level.car.rotation < -1))) {
				exportRoot.level.car.x += posNeg * ((carRotation)/90)*increment;
			}
			if (!up && !down) increment -= 1.5*acceleration;
			if (increment < .1){
				increment = 0;
			}

		}
		
	 else if (increment < 0) {
			exportRoot.level.car.y -= ((90-carRotation)/90)*increment;
			
			if (((exportRoot.level.car.rotation > 90)&&(exportRoot.level.car.rotation < 180))||((exportRoot.level.car.rotation < -90)&&(exportRoot.level.car.rotation > -180))) {
				exportRoot.level.car.x += posNeg * (((((1-(carRotation/360))*360)-180)/90)*increment);
			}
			if (((exportRoot.level.car.rotation <= 90)&&(exportRoot.level.car.rotation > 0))||((exportRoot.level.car.rotation >= -90)&&(exportRoot.level.car.rotation < -1))) {
				exportRoot.level.car.x += posNeg * ((carRotation)/90)*increment;
			}
			if (!up && !down) increment += 1.5*acceleration;
				if (increment > -.1){
				increment = 0;
			}
		}		
		
		else {
			increment = 0;
	}
	
	
	var engineLoudness = Math.abs(increment) / 2.72;	
	engineSound.volume = engineLoudness;
	idleSound.volume = 1 - engineLoudness;
	
	if(night) {
		
	} else {
	exportRoot.level.shadow.x = exportRoot.level.car.x + 3;
	exportRoot.level.shadow.y = exportRoot.level.car.y + 5;
	exportRoot.level.shadow.rotation = exportRoot.level.car.rotation;
	}
}
// ----------------------------------------------------------------------------
function enemydrive() {
	
enemy.y -= ((90-enemyRotation)/90)*enemySpeed;
						
			if (((enemy.rotation > 90)&&(enemy.rotation < 180))||((enemy.rotation < -90)&&(enemy.rotation > -180))) {
				enemy.x += posNeg2 * (((((1-(enemyRotation/360))*360)-180)/90)*enemySpeed);
			}
			if (((enemy.rotation <= 90)&&(enemy.rotation > 0))||((enemy.rotation >= -90)&&(enemy.rotation < -1))) {			
				enemy.x += posNeg2 * ((enemyRotation)/90)*enemySpeed;
			}
			
			if ((enemyx < 0 && enemy.x > labaPuse + 150) || (enemyx > labaPuse && enemy.x < -150) || (enemyy < 0 && enemy.y > apaksPuse + 150) || (enemyy > apaksPuse && enemy.y < -150)) {
				var enemyframe = Math.floor(Math.random()*9);
				enemy.gotoAndStop(enemyframe);
				exportRoot.level.enemyshadow.gotoAndStop(enemyframe);
				enemy.x = enemyx;
				enemy.y = enemyy;
			}
			exportRoot.level.enemyshadow.x = enemy.x + 3;
			exportRoot.level.enemyshadow.y = enemy.y + 5;
			
	if(exportRoot.level.enemy2) {
		
		enemy2.y -= ((90-enemy2Rotation)/90)*enemy2Speed;
						
			if (((enemy2.rotation > 90)&&(enemy2.rotation < 180))||((enemy2.rotation < -90)&&(enemy2.rotation > -180))) {
				enemy2.x += posNeg3 * (((((1-(enemy2Rotation/360))*360)-180)/90)*enemy2Speed);
			}
			if (((enemy2.rotation <= 90)&&(enemy2.rotation > 0))||((enemy2.rotation >= -90)&&(enemy2.rotation < -1))) {			
				enemy2.x += posNeg3 * ((enemy2Rotation)/90)*enemy2Speed;
			}
			
			if ((enemy2x < 0 && enemy2.x > labaPuse + 150) || (enemy2x > labaPuse && enemy2.x < -150) || (enemy2y < 0 && enemy2.y > apaksPuse + 150) || (enemy2y > apaksPuse && enemy2.y < -150)) {
				var enemy2frame = Math.floor(Math.random()*9);
				enemy2.gotoAndStop(enemy2frame);
				exportRoot.level.enemyshadow2.gotoAndStop(enemy2frame);
				enemy2.x = enemy2x;
				enemy2.y = enemy2y;
				
			}
			exportRoot.level.enemyshadow2.x = enemy2.x + 3;
			exportRoot.level.enemyshadow2.y = enemy2.y + 5;								
	}
}
// ----------------------------------------------------------------------------
function hittest() {


colisiondelay ++;

if(colisiondelay == 1) {
var collision = ndgmr.checkPixelCollision(bitmap2,bitmap,1);
if(collision) {
	var dumi = new lib.dums();
	var points = exportRoot.level.globalToLocal(collision.x, collision.y);
	dumi.x = points.x;
	dumi.y = points.y;
	exportRoot.level.addChild(dumi);
	if(isDriving) levelFailed(); // isDriving obligati savadak parladejot var izmest failed logu
	
}
} else if(colisiondelay == 2 && exportRoot.level.enemy) {
var collision2 = ndgmr.checkPixelCollision(bitmap2,enemyBitmap,1);
if(collision2) {
	var dumi = new lib.dums();
	var points = exportRoot.level.globalToLocal(collision2.x, collision2.y);
	dumi.x = points.x;
	dumi.y = points.y;
	exportRoot.level.addChild(dumi);
	if(isDriving) levelFailed(); // isDriving obligati savadak parladejot var izmest failed logu
	
}
} else if (colisiondelay == 3) {
	
	if (ndgmr.checkPixelCollision(point1,bitmap2,0)) {
		if (ndgmr.checkPixelCollision(point2,bitmap2,0)) {
			if (ndgmr.checkPixelCollision(point3,bitmap2,0)) {
				if (ndgmr.checkPixelCollision(point4,bitmap2,0)) {
					
					if (isDriving) levelComplete();					
				}
			}
		}
	}		
} else if(colisiondelay == 4 && exportRoot.level.enemy2) {
var collision3 = ndgmr.checkPixelCollision(bitmap2,enemy2Bitmap,1);
if(collision3) {
	var dumi = new lib.dums();
	var points = exportRoot.level.globalToLocal(collision3.x, collision3.y);
	dumi.x = points.x;
	dumi.y = points.y;
	exportRoot.level.addChild(dumi);
	if(isDriving) levelFailed(); // isDriving obligati savadak parladejot var izmest failed logu
	
}
}

if (colisiondelay >= 4) colisiondelay = 0;
}
// -----------------------------------------------------------------------------
function levelFailed() {
	failed = true;
	createjs.Sound.play("bum");
	exportRoot.gmenu.buttons.visible = false;
	tryAgainScreen = new lib.tryagain();
	exportRoot.addChild(tryAgainScreen);
	
if (idleSound) idleSound.stop();
if (engineSound) engineSound.stop();
	
}
// -----------------------------------------------------------------------------
function timeOver() {
	failed = true;
	exportRoot.gmenu.buttons.visible = false;
	tryAgainScreen = new lib.timeover();
	exportRoot.addChild(tryAgainScreen);
	
if (idleSound) idleSound.stop();
if (engineSound) engineSound.stop();
	
}
// ------------------------------------------------------------------------------
function levelComplete() {
	
	if (idleSound) idleSound.stop();
if (engineSound) engineSound.stop();
	
	createjs.Sound.play("bi");
	
	var parkinglights = new lib.parkinglight();
	exportRoot.level.car.addChild(parkinglights);
	
	levelScore = Math.floor((Level * 50) + (gameTime / 14));
	if (levelScore > levelScores[Level - 1]) levelScores[Level - 1] = levelScore;
	
	totalScore = 0;
	for (i = 0; i < levelScores.length; i++) {
    totalScore += levelScores[i];
	}
	writeMemory();
	
	finished = true;
	exportRoot.gmenu.buttons.visible = false;
	if(Level == 10) {
	tryAgainScreen = new lib.levelcompletefinal();
	} else {
		tryAgainScreen = new lib.levelcomplete();
	}
	exportRoot.addChild(tryAgainScreen);
}
// ------------------------------------------------------------------------------
function showTime() {
	gameTime --;
	if(gameTime < 0) gameTime = 0;
	updateclock ++;
	if(updateclock >= 60) {
		updateclock = 0;
		
		var seconds = Math.floor(gameTime/60);
		var minutes = Math.floor(seconds/60);
		seconds -= minutes*60;
		exportRoot.gmenu.timetext.text = minutes+" : "+String(seconds+100).substr(1,2);
		if(gameTime <= 0) timeOver();
	}
}
// ------------------------------------------------------------------------------
function resetgame() {

if(mobile) {
	exportRoot.gmenu.buttons.left.removeEventListener( 'mousedown', leftDown);
	exportRoot.gmenu.buttons.left.removeEventListener( 'pressup', leftUp);
	exportRoot.gmenu.buttons.right.removeEventListener( 'mousedown', rightDown);
	exportRoot.gmenu.buttons.right.removeEventListener( 'pressup', rightUp);
	exportRoot.gmenu.buttons.accelerate.removeEventListener( 'mousedown', accDown);
	exportRoot.gmenu.buttons.accelerate.removeEventListener( 'pressup', accUp);
	exportRoot.gmenu.buttons.brake.removeEventListener( 'mousedown', brakeDown);
	exportRoot.gmenu.buttons.brake.removeEventListener( 'pressup', brakeUp);
} else {
	document.removeEventListener('keydown', keyIsDown);
	document.removeEventListener('keyup', keyIsUp);
}
	isDriving = false;
	
	stage.removeChild(exportRoot);
	exportRoot = new lib.timetoparkhtml5(); // parlade visu lai restartejot masina butu sakuma punkta
	stage.addChild(exportRoot);
}
// ------------------------------------------------------------------------------
function readMemory() {
	
	for (i = 0; i < levelScores.length; i++) {
		if(localStorage.getItem('levelscore' + i) == null) localStorage.setItem('levelscore' + i, 0);
    levelScores[i] = parseInt(localStorage.getItem('levelscore' + i));
	}
}
// ------------------------------------------------------------------------------
function writeMemory() {
		for (i = 0; i < levelScores.length; i++) {
    localStorage.setItem('levelscore' + i, levelScores[i]);
	}
}

$(window).focus(function() { 
    // Unpause when window gains focus 
    if(skana) createjs.Sound.muted = false;
}).blur(function() { 
    // Pause when window loses focus 
    createjs.Sound.muted = true; 
}); 