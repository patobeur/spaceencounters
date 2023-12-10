import {_ship} from "./_ship.js";
import {_controls} from "./_controls.js";
export let _engine = {
	engine:false,
	speedyRatio:.005, // pour affiner la vitesse
	power:{cur:0,min:0,max:25},
	rotationZ: 0,
	rotationRatio: 0.2, // pour affiner la rotation lol
	powerUp:function(){
		this.power.cur += 1
		this.applyPowerLimits()
		_controls.controls.up=false;
	},
	powerDown:function(){
		this.power.cur += -1;
		this.applyPowerLimits()
		_controls.controls.down=false;
	},
	applyPowerLimits:function(){
		if(this.power.cur>this.power.max){this.power.cur=this.power.max+0}
		if(this.power.cur<this.power.min){this.power.cur=this.power.min+0}
	},
	appliquerRotation: function () {
		_ship.groupe.rotation.z += this.rotationZ * this.rotationRatio;
		this.rotationZ = 0;
		// this.power.cur = 0;
		_controls.controls.right=false;
		_controls.controls.left=false;
	},
	freinage:function(){
		// Amortissement du mouvement
		_ship.vx *= 0.99; // 0.99 est le facteur d'amortissement
		_ship.vy *= 0.99;
	}

};