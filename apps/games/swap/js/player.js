var player = function() {
	var x,y;
	var prevX, prevY;
	var vx = 0, vy = 0;
	var currentAI;
	var friction = 1.6;
	var trail = [];
	var gridSize;
	// var hitRight = false;
	// var hitLeft = false;
	// var hitUp = false;
	// var hitDown = false;

	var init = function(gSize) {
		gridSize = gSize;
		vx = 0;
		vy = 0;
		this.trail.length = 0;
	}

	var setAI = function(ai){
		this.trail.length = 0;
		this.x = ai.x;
		this.y = ai.y;
		this.currentAI = ai;
	}

	var getAI = function() {
		this.currentAI.x = this.x;
		this.currentAI.y = this.y;
		return this.currentAI;
	}
	var update = function(gridSize) {
		prevX = x;
		prevY = y;
		this.trail.push([this.x, this.y]);
		if (this.trail.length >= 5) this.trail.shift();

		if(input.right) {
            if (vx <= gridSize / 10) vx += (Math.abs(vx) + 1) / friction;
		}
        else if(input.left) {
            if (vx >= -gridSize / 10) vx -= (Math.abs(vx) + 1) / friction;
        }

        if(input.up){
            if (vy >= -gridSize / 10) vy -= (Math.abs(vy) + 1) / friction;
        }
        else if(input.down) {
            if (vy <= gridSize / 10) vy += (Math.abs(vy) + 1) / friction;
        }
        if(!input.right && !input.left) {
        	vx = vx / friction;
        }
        if(!input.up && !input.down) {
        	vy = vy / friction;
        }
        if(vx>8)
        	vx=8;
        else if(vx<-8)
        	vx=-8;
        if(vy>8)
        	vy=8;
        else if(vy<-8)
        	vy=-8;
		this.x += vx;
		this.y += vy;
	}

	var hitWall = function(x, y) {
		if(this.trail[1]) {
			this.x = this.trail[1][0];
			this.y = this.trail[1][1];
		}
		// justHit = true;
		// if(vx*vx>vy*vy) {
		// 	vx=0;
		// 	hitSide = true;
		// }
		// if(vy*vy>vx*vx) {
		// 	vy=0;
		// 	hitUp = true;
		// }

		// if(vx*vx>vy*vy) {
		// 	vx = 0;
		// 	if(this.x>x)
		// 		hitLeft = true;
		// 	else if(this.x<x+gridSize)
		// 		hitRight = true;
		// }
		// if(vy*vy>vx*vx) {
		// 	vy = 0;
		// 	if(this.y>y)
		// 		hitUp = true;
		// 	else if(this.y<y+gridSize)
		// 		hitDown = true;
		// }
		// vx = vx / friction;
		// vy = vy / friction;

		// vx *= -0.3;
		// vy *= -0.3;
	}

	var getVelocity = function() {
		return {
			x:vx,
			y:vy,
		}
	}

	return {
		x: x,
		y: y,
		color: "rgb(125,167,217)",//"rgba(0, 10, 200, 0.4)",
		trail: trail,
		getVelocity: getVelocity,
		init: init,
		setAI: setAI,
		getAI: getAI, 
		update: update,
		hitWall: hitWall,
	}
}();