var world = function() {
	var aiEntities = [];
	var floor = [];
	var gridSize;
	var curLevel;
	var deaths = 0;
	var intervalId;
	var fps = 30;
	var hitSpace = false;
	var dialogue = "";
	var hasDied = false;
	var prevTime;
	var hasWon = false;

	var init = function(level, canvasId, hudId, tipId) {
		renderer.init(canvasId, hudId, tipId);
		initLevel(level);
		createDialogue("Welcome to Swap");
		prevTime = Date.now();
	}

	var initLevel = function(level) {
		hasDied = false;
		hasWon = false;
		if(intervalId)
			clearInterval(intervalId); //makes sure we don't run dual loops

		curLevel = level;
		if(level==levels.length) {
			// alert("That's all folks!");
			createDialogue("That's all folks");
			return;
		}

		renderer.initLevel(levels[level]);
		gridSize = renderer.gridSize;

		player.init(gridSize);
		input.gameMode();
		input.reset();
				
		loadLevel(level);
		renderer.renderText(deaths, curLevel, levels[curLevel].tip);

		intervalId = setInterval(run, 1000 / fps);
		run();
	}

	var victory = function() {
		if(!hasWon) {
			// alert("You win!");
			createDialogue("You won!");
			// initLevel(curLevel+1);
			curLevel++;
		}
		hasWon = true;
	}

	var death = function() {
		// alert("You died! :O");
		createDialogue("You died!");
		clearInterval(intervalId);
		if(!hasDied) 
			deaths++; 
		hasDied = true;
		renderer.renderText(deaths, curLevel, levels[curLevel].tip);
		// initLevel(curLevel);
	}

	var loadLevel = function(index) {
		// loads level from level file
		var currentLevel = levels[index];
		floor.length = 0;
		aiEntities.length = 0;
		for (var y = 0; y < currentLevel.sizeY; y++) {
			floor.push([]);
			for (var x = 0; x < currentLevel.sizeX; x++) {
				if (currentLevel.tiles[y][x] >= 0) {
					floor[y].push(getTile(x*gridSize, y*gridSize, currentLevel.tiles[y][x]));
				}
				else {
					floor[y].push(getTile(0));	
					if(x==currentLevel.startX && y==currentLevel.startY)
						player.setAI(getAI(x*gridSize+gridSize/2, y*gridSize+gridSize/2, currentLevel.tiles[y][x]));
					else {
						aiEntities.push(getAI(x*gridSize+gridSize/2, y*gridSize+gridSize/2, currentLevel.tiles[y][x]));
					}
				}
			}
		}
	}

	var run = function() {
		// var deltaTime = (Date.now() - prevTime);
		// prevTime = Date.now();
		// console.log(deltaTime);
		if (!dialogue)	update();
		renderer.draw(aiEntities, floor);
		if (dialogue) {
			input.dialogueMode();
			renderer.showDialogue(dialogue);
		}
	}	

	var update = function() {
		for(var y=0; y<floor.length; y++) {
			for(var x=0; x<floor[y].length; x++) {
				floor[y][x].update();
			}
		}

		//update player and player collision
		player.update(gridSize);
		var touchingTiles = collide(player).tiles;
		for(var i=0; i<touchingTiles.length; i++) {
			if(touchingTiles[i].blocksMovement || touchingTiles[i].blocksOnlyPlayer) {
				player.hitWall(touchingTiles[i].x, touchingTiles[i].y);
			}
			touchingTiles[i].onCollide(player);
		}

		//update AIs and AI collisions
		for(var i=0; i<aiEntities.length; i++) {
			aiEntities[i].update(gridSize);
			var touchingTiles = collide(aiEntities[i]).tiles;
			for(var j=0; j<touchingTiles.length; j++) {
				aiEntities[i].onCollide(touchingTiles[j]);
				touchingTiles[j].onCollide(aiEntities[i])
			}
		}

	}

	var collide = function(ai) {
		var touching = {
			tiles: [],
		}
		var x = (ai.x - gridSize/2) + 5;
		var y = (ai.y - gridSize/2) + 5;
		addToArray(touching.tiles, floor[coordToGrid(x, y).y][coordToGrid(x, y).x]);
		addToArray(touching.tiles, floor[coordToGrid(x+gridSize-10, y).y][coordToGrid(x+gridSize-10, y).x]);
		addToArray(touching.tiles, floor[coordToGrid(x, y+gridSize-10).y][coordToGrid(x, y+gridSize-10).x]);
		addToArray(touching.tiles, floor[coordToGrid(x+gridSize-10, y+gridSize-10).y][coordToGrid(x+gridSize-10, y+gridSize-10).x]);
		return touching;
	}	

	var coordToGrid = function(x, y) {
		var grid = {};
		grid.x = Math.round((x-gridSize/2)/gridSize);
		grid.y = Math.round((y-gridSize/2)/gridSize);
		return grid;
	}

	var addToArray = function(array, obj) {
		if(array.indexOf(obj)==-1) 
			array.push(obj);
	}

	var cyclePlayer = function() {
		aiEntities.push(player.getAI());		
		player.setAI(aiEntities.shift());
	}

	var createDialogue = function(info) {
		input.dialogueMode();
		dialogue = info;
	}

	var closeDialogue = function() {
		input.gameMode();
		dialogue = "";
		initLevel(curLevel);
	}

	var resetLevel = function() {
		createDialogue("Level Reset!");
		initLevel(curLevel);
	}

	return {
		init: init,
		victory: victory,
		cyclePlayer: cyclePlayer,
		death: death,
		closeDialogue: closeDialogue,
		resetLevel: resetLevel,
	}
}();