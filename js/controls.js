import {_engine} from "./engine.js";
import {_ship} from "./ship.js";
export let _controls = {
	controls:{up:false,down:false,left:false,right:false},
	controlsKeys:{
		up:'KeyW',ArrowUp:'ArrowUp',
		down:'KeyS',ArrowDown:'ArrowDown',
		left:'KeyA',ArrowLeft:'ArrowLeft',
		right:'KeyD',ArrowRight:'ArrowRight'
	},
	checkKeyboard:function () {
		if(_controls.controls.left) {_engine.rotationZ = 1;}
		if(_controls.controls.right) {_engine.rotationZ = -1;}
		if(_controls.controls.down) {_ship.changeVitesse('down');}
		if(_controls.controls.up) {_ship.changeVitesse('up');}
		// Interpolation pour la rotation
		let targetRotation = 0;
		if (_controls.controls.left) { targetRotation = 1; }
		if (_controls.controls.right) { targetRotation = -1; }
	
		_engine.rotationZ += (targetRotation - _engine.rotationZ) * 0.1; // 0.1 est le facteur d'interpolation
	}
};