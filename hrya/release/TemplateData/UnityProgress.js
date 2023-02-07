function UnityProgress(gameInstance, progress) {
  if (!gameInstance.Module)
    return;
  if (!gameInstance.logo) {
    gameInstance.logo = document.createElement("div");
    //gameInstance.logo.className = "logo " + gameInstance.Module.splashScreenStyle;
    //gameInstance.container.appendChild(gameInstance.logo);
	
	var logoImage = document.createElement("img");
	gameInstance.link = document.createElement("div");
	gameInstance.link = document.createElement('a');
	      var url = "";
	  var ref = "";

    if(self!=top) {
        url = document.referrer;
		ref = url.match(/:\/\/(.[^/]+)/)[1];
    }
	
	gameInstance.link.href = 'http://1000webgames.com/in2.php?id=1&gname=cargo_drive&lplace=loading&refe=' + ref;
	gameInstance.link.target = "_blank";
	gameInstance.link.appendChild(logoImage);	
	logoImage.src = "TemplateData/Logo.Light.png";
	
	gameInstance.link.className = "mylogo " + gameInstance.Module.splashScreenStyle;
	gameInstance.container.appendChild(gameInstance.link);
	
	


	
  }
  if (!gameInstance.progress) {    
    gameInstance.progress = document.createElement("div");
    gameInstance.progress.className = "progress " + gameInstance.Module.splashScreenStyle;
    gameInstance.progress.empty = document.createElement("div");
    gameInstance.progress.empty.className = "empty";
    gameInstance.progress.appendChild(gameInstance.progress.empty);
    gameInstance.progress.full = document.createElement("div");
    gameInstance.progress.full.className = "full";
    gameInstance.progress.appendChild(gameInstance.progress.full);
    gameInstance.container.appendChild(gameInstance.progress);
  }
  gameInstance.progress.full.style.width = (100 * progress) + "%";
  gameInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
  if (progress == 1) {
    gameInstance.progress.style.display = "none";
gameInstance.link.style.display = "none";
gameInstance.logo.style.display = "none";
  }
}