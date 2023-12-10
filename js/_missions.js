import {_colis} from "./colis.js";
export let _missions = {
	id: new Number(0),
	counter: 0,
	missions: {},
	missionIdByName:{},
	// todo
	add(){
		_colis.add({
			planeteNameOrigine:"lune",
			angle:Math.PI,
			color:'red',
			altitudedelivraison:4
		});
	}
};