var input = {
	right: false,
	left: false,
	up: false,
	down: false,
	reset: function() {
		input.right = false;
		input.left = false;
		input.up = false;
		input.down = false;
	},
	dialogueMode: function() {
		keypress.reset();
		keypress.register_many(combos_dialogue);
	},
	gameMode: function() {
		keypress.reset();
		keypress.register_many(combos_inGame);
	},
};

combos_dialogue = [
{
	"keys": "space",
	"on_keyup": function() {
		world.closeDialogue();
	},
	"prevent_default": true,
}
];

combos_inGame = [
{
	"keys": "up",
	"on_keydown": function() {
		input.up = true;
	},
	"on_keyup": function() {
		input.up = false;
	},
	"prevent_default": true,
},
{
	"keys": "k",
	"on_keydown": function() {
		input.up = true;
	},
	"on_keyup": function() {
		input.up = false;
	},
	"prevent_default": true,
}, 
{
	"keys": "left",
	"on_keydown": function() {
		input.left = true;
	},
	"on_keyup": function() {
		input.left = false;
	}
},
{
	"keys": "h",
	"on_keydown": function() {
		input.left = true;
	},
	"on_keyup": function() {
		input.left = false;
	}
},
{
	"keys": "right",
	"on_keydown": function() {
		input.right = true;
	},
	"on_keyup": function() {
		input.right = false;
	}
},
{
	"keys": "l",
	"on_keydown": function() {
		input.right = true;
	},
	"on_keyup": function() {
		input.right = false;
	}
},
{
	"keys": "down",
	"on_keydown": function() {
		input.down = true;
	},
	"on_keyup": function() {
		input.down = false;
	},
	"prevent_default": true,
},
{
	"keys": "j",
	"on_keydown": function() {
		input.down = true;
	},
	"on_keyup": function() {
		input.down = false;
	},
	"prevent_default": true,
},
{
	"keys": "w",
	"on_keydown": function() {
		input.up = true;
	},
	"on_keyup": function() {
		input.up = false;
	}
}, 
{
	"keys": "a",
	"on_keydown": function() {
		input.left = true;
	},
	"on_keyup": function() {
		input.left = false;
	}
},
{
	"keys": "d",
	"on_keydown": function() {
		input.right = true;
	},
	"on_keyup": function() {
		input.right = false;
	}
},
{
	"keys": "s",
	"on_keydown": function() {
		input.down = true;
	},
	"on_keyup": function() {
		input.down = false;
	}
},
{
	"keys": "space",
	"on_keyup": function() {
		world.cyclePlayer();
	},
	"prevent_default": true,
},
{
	"keys": "r",
	"on_keyup": function() {
		world.resetLevel();
	}
},
{
	"keys": "up up down down left right left right b a enter", 
	"on_keyup": function() {
		world.victory();
	},
	"is_sequence": true,
},
];




