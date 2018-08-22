// Valid Script Config
const config = {
	MAX_PODS : 90,
	OPEN_BAGS : true,
	FORBIDDEN_MONSTERS: [ ],
	AUTO_REGEN: {
	    minLife: 60, // Regeneration if below 60%
	    maxLife: 90, // Regeneration up to 90%
	    items: [ 1737, 528 ], // Items to use for prioritization regeneration
	    store: 200, // Have 200 items total on either after the move to the bank
  	},
	BANK_GET_ITEMS: [
    	{ item: 6964, quantity: 5 } // Get 5 Brakmarian intercity-express potion from bank.
  	],
}

/*
const move = [
	{ map : 88081177, path : "bottom" },
	{ map:"2,-1", path : "bottom" },
	{ map:"2,0", path : "bottom" },
	{ map:"2,1", path : "bottom" },
	{ map:"2,2", path : "bottom" },
	{ map:"2,3", path : "bottom" },
	{ map:"2,4", path : "bottom" },
	{ map:"2,5", path : "bottom" },
	{ map:"2,6", path : "bottom" },
	{ map:"2,7", path : "right" },
	{ map:"3,7", path : "right" },
	{ map:"4,7", path : "right" },
	{ map:"5,7", path : "bottom" },
	{ map:"5,8", path : "bottom" },
	{ map:"5,9", path : "bottom" },
	{ map:"5,10", path : "bottom" },
	{ map:"5,11", path : "bottom" },
	{ map:"5,12", path : "bottom" },
	{ map:"5,13", path : "bottom" },
	{ map:"5,14", path : "bottom" },
	{ map:"5,15", path : "bottom" },
	{ map:"5,16", path : "bottom" },
	{ map:"5,17", path : "bottom" },
	{ map:"5,18", path : "bottom" },
	{ map:88082692, door : 332 },
	{ map:97260033 , path:"183|405" , gather : true},
	{ map:97261059 , path:"417" , gather : true},
	{ map:97261057 , path:"227|421" , gather : true},
	{ map:97259011 , path:"276" , gather : true},
	{ map : 99095051, path : "410" },
]
*/
/*const bank = [
	{ map:"2,-1", path : "top" },
	{ map:"2,0", path : "top" },
	{ map:"2,1", path : "top" },
	{ map:"2,2", path : "top" },
	{ map:"2,3", path : "top" },
	{ map:"2,4", path : "top" },
	{ map:"2,5", path : "top" },
	{ map:"2,6", path : "top" },
	{ map:"2,7", path : "top" },
	{ map:"3,7", path : "left" },
	{ map:"4,7", path : "left" },
	{ map:"5,7", path : "left" },
	{ map:"5,8", path : "top" },
	{ map:"5,9", path : "top" },
	{ map:"5,10", path : "top" },
	{ map:"5,11", path : "top" },
	{ map:"5,12", path : "top" },
	{ map:"5,13", path : "top" },
	{ map:"5,14", path : "top" },
	{ map:"5,15", path : "top" },
	{ map:"5,16", path : "top" },
	{ map:"5,17", path : "top" },
	{ map:"5,18", path : "top" },
	{ map:"5,19", path : "top" },
	{ map : 88081177, door : 216 },
	{ map : 99095051, npcBank : true },
	{ map:97260033 , path:"466" },
	{ map:97261059 , path:"417" },
	{ map:97261057 , path:"227" },
	{ map:97259011 , path:"276" },
]
*/
