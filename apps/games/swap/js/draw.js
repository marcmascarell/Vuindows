var renderer = function() {
	var canvas;
	var ctx;
	var gridSize;
	var width, height;
	var tipDisplay;
	var hud;

	var init = function(canvasId, hudId, tipId) {
		canvas = document.getElementById(canvasId);
		tipDisplay = document.getElementById(tipId);
		hud = document.getElementById(hudId);
		ctx = canvas.getContext("2d");
		width = canvas.width;
		height = canvas.height;
	}

	var initLevel = function(level) {
		var sizeX = level.sizeX;
		var sizeY = level.sizeY;
		this.gridSize = width/sizeX<height/sizeY ? width/sizeX : height/sizeY;

		canvas.width = this.gridSize * sizeX;
		canvas.height = this.gridSize * sizeY;
		ctx.clearRect(0, 0, width, height);
	}

	var renderText = function(deaths, level, tip) {
		hud.innerHTML = deaths + " Deaths " + " | Level " + (level+1) + " / " + levels.length + " <sup><a style='font-size: 12px; text-decoration: none;' href='#"+(level+1)+"'>(link)</a></sup>";
		tipDisplay.innerHTML =  "<em>" + tip + "</em>";
	}

	var draw = function(aiEntities, floor) {
		//iterate through and draw tiles first, then entities
		var gridSize = this.gridSize;
		ctx.globalAlpha = 1;
		ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
		ctx.lineWidth = 0.25;
		for (var y = 0; y < floor.length; y++) {
			for (var x = 0; x < floor[y].length; x++) {
				ctx.fillStyle = floor[y][x].color;
				ctx.fillRect(x*gridSize, y*gridSize, gridSize, gridSize);
				ctx.strokeRect(x*gridSize, y*gridSize, gridSize, gridSize);
				clearShadows();
			}
		}
		for (var i = 0; i < aiEntities.length; i++) {
			ctx.globalAlpha = 0.65;
			ctx.fillStyle = aiEntities[i].color;
			// ctx.fillRect(aiEntities[i].x, aiEntities[i].y, gridSize-5, gridSize-5);
			ctx.beginPath();
			ctx.arc(aiEntities[i].x, aiEntities[i].y, gridSize / 2 - 5, 0, 2*Math.PI);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
		var trail = player.trail;
		for (var i = 0; i < trail.length; i++) { 
			ctx.globalAlpha = 1 - ((trail.length - i) / trail.length);		
			ctx.fillStyle = player.color;
			// ctx.fillRect(trail[i][0], trail[i][1], gridSize-5, gridSize-5);

			ctx.beginPath();
			ctx.arc(trail[i][0], trail[i][1], gridSize / 2 - (trail.length - i) - 5, 0, 2*Math.PI);
			ctx.fill();
		}
		ctx.globalAlpha = 1;
		if (player) {
			ctx.fillStyle = player.color;
			// ctx.fillRect(player.x, player.y, gridSize-5, gridSize-5);

			ctx.beginPath();
			ctx.arc(player.x, player.y, (gridSize / 2) - 5, 0, 2*Math.PI);
			ctx.fill();
			//highlight player
			// ctx.lineWidth = 3;
			// ctx.strokeStyle = '#FF8000';
			// ctx.stroke();
		}
		else {
			console.log("Fiddlesticks -- no player instance! Check level for startX and startY?");
		}
	}

	var showDialogue = function(info) {
		ctx.fillStyle = "rgba(255, 255, 255, 1)";
		ctx.strokeStyle = "black";
		ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
		ctx.shadowBlur = 15;
		ctx.fillRect(width / 2 - 150, canvas.height / 2 - 150, 300, 300);
		ctx.strokeRect(width / 2 - 150, canvas.height / 2 - 150, 300, 300);
		clearShadows();   
		ctx.fillStyle = "black";
		ctx.font = "600 32px Open Sans";
		ctx.textAlign = "center";
		ctx.fillText(info, canvas.width / 2, canvas.height / 2);  
		ctx.fillStyle = "rgba(0, 0, 0, 0.65)";  
		ctx.font = "20px Open Sans";
		ctx.fillText("Space to continue", canvas.width/2, canvas.height/2+35);    
	}

	var clearShadows = function() {
		ctx.shadowColor = 0;
		ctx.shadowBlur = 0;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
	}

	return {
		init: init,
		initLevel: initLevel,
		renderText: renderText,
		draw: draw,
		gridSize: gridSize,
		showDialogue: showDialogue,
	}
}();

