import * as THREE from "three";
import {_ship} from "./ship.js";
import {_planetes} from "./planetes.js";
export let _ombre = {
	ombre:null,
	theta:null,
	deplacer:function(){
		// direction planete ship
		// rustine 2 ???
		this.theta = this.getTheta( _planetes.currentPack, _ship.groupe ) - Math.PI / 2; 
		const pos = this.getSurfacePos( _planetes.currentPack, this.theta )
		this.ombre.position.x = pos.x
		this.ombre.position.y = pos.y
	},
    /**
     * Obtient la position de surface en fonction de la planète et de l'angle vers la ship.
     * @param {Object} planetePack - Pack de la planète.
     * @param {number} theta - Angle theta vers la ship.
     * @returns {Object} - Nouvelles ositions x et y.
     */
	getSurfacePos:function(planetePack, theta) {
		let groupe = planetePack.groupe
		let radius = planetePack.radius
		let x = groupe.position.x - Math.sin(theta) * radius
		let y = groupe.position.y + Math.cos(theta) * radius
		return { x: x, y: y }
	},
    /**
     * Obtient l'angle theta entre la planète et l'objet spécifié.
     * @param {Object} planete - Planète.
     * @param {Object} object - Objet.
     * @returns {number} - Angle theta calculé.
     */
	getTheta:function(planete, object){
		var nextY = object.position.y - planete.position.y;
		var nextX = object.position.x - planete.position.x;
		var theta = Math.atan2(nextY, nextX);
		return theta;
	},
	stepAnimation:function(){
		this.deplacer()
	},
	init:function(){
		this.ombre = new THREE.Mesh(
			new THREE.SphereGeometry(1, 32, 32),
			new THREE.MeshBasicMaterial({ color: 0xff0000 })
		);
		this.ombre.name = "ombre";
	}
};