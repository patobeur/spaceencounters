import * as THREE from "three";
import {_ship} from "./ship.js";
import {_controls} from "./controls.js";
import {_newton} from "./newton.js";
export let _engine = {
	on:false,
	engine:false,
	speedyRatio:.005, // pour affiner la vitesse
	power:{cur:0,min:0,max:25},
	rotationZ: 0,
	rotationRatio: 0.2, // pour affiner la rotation lol
	vx: 0,
	vy: 0,
	vz: 0,
	flamme: null,
	setFlamme: function () {
		this.flamme = new THREE.Mesh(
			new THREE.ConeGeometry(1, 3, 3),
			new THREE.MeshBasicMaterial({ color: 0x00FF00 })
		);
		this.flamme.name = "flamme";
		this.flamme.position.set(0,-4,0);
		this.flamme.rotation.z = Math.PI;
		_ship.groupe.add(this.flamme)
	},
	deplacerShip: function () {
		_ship.groupe.position.x += this.vx;
		_ship.groupe.position.y += this.vy;
		_ship.groupe.position.z += this.vz;
		// this.freinage()
	},
	powerUp:function(){
		this.on = true;
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
		_ship.vx *= 0.99;
		_ship.vy *= 0.99;
	},
	changeVitesse: function (dir) {
		if(dir==='up') this.powerUp()
		if(dir==='down') this.powerDown()
		let targetSpeed = this.power.cur * this.speedyRatio;
		// Interpolation linéaire
		this.vx = this.vx + (targetSpeed - this.vx) * 0.1; // 0.1 est le facteur d'interpolation
		this.vy = this.vy + (targetSpeed - this.vy) * 0.1;

		if (this.power.cur>=0) {
			// console.log(this.power)
			this.flamme.visible = true
			let vitesse = this.power.cur * this.speedyRatio;
			// rustine 1 ???
			const angleInRadians = _ship.groupe.rotation.z + _newton.PIHalf;
			const speedX = vitesse * Math.cos(angleInRadians);
			const speedY = vitesse * Math.sin(angleInRadians);
			this.vx = speedX;
			this.vy = speedY;
		}
	},
};