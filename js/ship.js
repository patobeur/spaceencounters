import * as THREE from "three";
import {_engine} from "./engine.js";
import {_planetes} from "./planetes.js";
import {_htmlFront} from "./htmlFront.js";
import {_newton} from "./newton.js";
export let _ship = {
	id:0,
	groupe: new THREE.Group(),
	ship: null,
	flamme: null,
	mass: .5,
	height:4,
	radius:2,
	// ombre: null,
	limiteInfrascture:1,
	vx: 0,
	vy: 0,
	vz: 0,
	startingPlaneteName:'mars',
    /**
     * Change la vitesse de la ship en fonction de la direction.
     * @param {string} dir - Direction ('up' ou 'down').
     */
	changeVitesse: function (dir) {
		if(dir==='up') _engine.powerUp()
		if(dir==='down') _engine.powerDown()

		let targetSpeed = _engine.power.cur * _engine.speedyRatio;
		// Interpolation linéaire
		this.vx = this.vx + (targetSpeed - this.vx) * 0.1; // 0.1 est le facteur d'interpolation
		this.vy = this.vy + (targetSpeed - this.vy) * 0.1;

		if (_engine.power.cur>=0) {
			// console.log(_engine.power)
			this.flamme.visible = true
			let vitesse = _engine.power.cur * _engine.speedyRatio;
			// rustine 1 ???
			const angleInRadians = this.groupe.rotation.z + _newton.PIHalf;
			const speedX = vitesse * Math.cos(angleInRadians);
			const speedY = vitesse * Math.sin(angleInRadians);
			this.vx = speedX;
			this.vy = speedY;
		}
	},
	teleportationScotty:function(planeteName) {
		console.log(planeteName)
		let id = _planetes.planetesIdByName[planeteName];
		console.log(_planetes.planetes[id].position)
		console.log(this.groupe.position)

		this.groupe.position.x = _planetes.planetes[id].position.x +0
		// this.groupe.position.y = _planetes.planetes[id].position.y + _planetes.planetes[id].radius + (_planetes.planetes[id].radius/3)
		this.groupe.position.y = _planetes.planetes[id].position.y + _planetes.planetes[id].radius + 5

	},
	/**
	* Met à jour la position de la ship lors du prochain frame.
	*/
	nextFrame: function () {
		if(_engine.rotationZ!=0) _engine.appliquerRotation();
		// this.appliquerVitesses();
		this.deplacerShip();
		// this.deplacerOmbre();
		_htmlFront.refresh(this, _planetes.currentPack);
		if(_engine.power.cur<=0) this.flamme.visible = false
	},
	deplacerShip: function () {
		// Mise à jour de la position en fonction de vx, vy, et vz
		this.groupe.position.x += this.vx;
		this.groupe.position.y += this.vy;
		this.groupe.position.z += this.vz;
		_engine.freinage()
	},
	setFlamme: function () {
		this.flamme = new THREE.Mesh(
			new THREE.ConeGeometry(1, 3, 3),
			new THREE.MeshBasicMaterial({ color: 0x00FF00 })
		);
		this.flamme.name = "flamme";
		this.flamme.position.set(0,-4,0);
		this.flamme.rotation.z = Math.PI;
		this.groupe.add(this.flamme)
	},
	setGroupe: function () {

		this.groupe.name = "grp_ship";

		this.ship = new THREE.Mesh(
			new THREE.ConeGeometry(2, this.height, 4),
			new THREE.MeshBasicMaterial({ color: 0xff0000 })
		);

		this.ship.vitesse = new THREE.Vector3((0, 0, 0));
		this.ship.name = "ship";
		this.ship.rotation.set(0, 0, 0);
		
		this.groupe.add(this.ship)

		this.groupe.position.set(
			_planetes.currentPack.position.x,
			_planetes.currentPack.position.y+_planetes.currentPack.radius+6,
			0);
		this.groupe.rotation.set(0, 0, 0);
		this.setFlamme();
	},
	init: function (startingPlaneteName=false) {
		if(!startingPlaneteName) startingPlaneteName = this.startingPlaneteName;
		const planeteId = _planetes.planetesIdByName[startingPlaneteName]
		if(planeteId){
			const starterPlanetePack = _planetes.planetes[planeteId];
			if (!starterPlanetePack) {
				_planetes.currentPack = this.startingPlaneteName
			}
			else {
				_planetes.currentPack = starterPlanetePack
			}
		}
		if(!_planetes.currentPack) {
			_planetes.currentPack = _planetes.planetes[_planetes.planetesIdByName['terre']]
			console.log('starting planete:',_planetes.currentPack.name)
		}
		this.setGroupe();
	},
};