var AI = {
	x:0,
	y:0,
	vx:0,
	vy:0,
	color: "rgb(125,167,217)",//"rgba(0, 10, 200, 0.4)",
	init: function(x, y) {
		this.x = x;
		this.y = y;
	},
	update: function(gridSize) {
		if(!this.hitWall) {
			if(this.vx!=0)
				this.x += gridSize / this.vx;
			if(this.vy!=0)
				this.y += gridSize / this.vy;
		}
		this.hitWall = false;
	}, 
	onCollide: function(tile) {
		if(tile.blocksMovement)
			this.hitWall = true;
	},
};

// STATIONARY AI 
var StationaryAI = function(x, y) {
	this.init(x, y);
}
StationaryAI.prototype = Object.create(AI);

// RIGHT AI
var RightAI = function(x, y) {
	this.init(x, y);
	this.vx = 7;
	this.hitWall = false;
}
RightAI.prototype = Object.create(AI);

// BOUNCE AI (RIGHT) (starts right, reverses direction on walls)
var RightBounceAI = function(x, y) {
	this.init(x, y);
	this.vx = 7;
	this.hitWall = false;
}
RightBounceAI.prototype = Object.create(AI);
RightBounceAI.prototype.onCollide = function(tile) {
	if(tile.blocksMovement && !this.hitWall) {
		this.vx *= -1;
		this.hitWall = true;
	}
}
RightBounceAI.prototype.update = function(gridSize) {
	this.hitWall = false;

	if(this.vx!=0)
		this.x += gridSize/this.vx;
	if(this.vy!=0)
		this.y += gridSize/this.vy; 
}

// FOLLOW AI (follows player movements)
var FollowAI = function(x, y) {
	this.init(x, y);
}
FollowAI.prototype = Object.create(AI);
FollowAI.prototype.update = function(gridSize) {
	if (!this.hitWall) {
		this.prevX = this.x;
		this.prevY = this.y;
		this.x += player.getVelocity().x;
		this.y += player.getVelocity().y;
	}
	this.hitWall = false;
}
FollowAI.prototype.onCollide = function(tile) {
	if(tile.blocksMovement) {
		this.hitWall = true;
		this.x = this.prevX; 
		this.y = this.prevY;
	}
}

// LEFT TURN AI (RIGHT) (starts right, turns left on walls)
var LeftTurnRightAI = function(x, y) {
	this.init(x, y);
	this.vx = 7;
}
LeftTurnRightAI.prototype = Object.create(AI);
LeftTurnRightAI.prototype.update = function(gridSize) {
	this.prevX = this.x;
	this.prevY = this.y;
	if(this.vx!=0)
		this.x += gridSize/this.vx;
	if(this.vy!=0)
		this.y += gridSize/this.vy; 
	this.hitWall = false;
}
LeftTurnRightAI.prototype.onCollide = function(tile) {
	if(tile.blocksMovement && !this.hitWall) {
		this.x = this.prevX;
		this.y = this.prevY;
		this.vxo = this.vx;
		this.vyo = this.vy;
		this.vx = 0;
		this.vy = 0;
		if (this.vxo > 0) this.vy = -7;
		else if (this.vxo < 0) this.vy = 7; 
		else if (this.vyo > 0) this.vx = 7;
		else if (this.vyo < 0) this.vx = -7;
		this.hitWall = true;
	}
}

// UP AI
var UpAI = function(x, y) {
	this.init(x, y);
	this.vy = -7;
	this.hitWall = false;
}
UpAI.prototype = Object.create(AI);


var getAI = function(x, y, id) {
	switch(id) {
		case -1:
			return new StationaryAI(x, y);
		case -2:
			return new RightAI(x, y);
		case -3:
			return new RightBounceAI(x, y);
		case -4: 
			return new FollowAI(x, y);
		case -5:
			return new LeftTurnRightAI(x, y);
		case -6:
			return new UpAI(x, y);
	}
}
