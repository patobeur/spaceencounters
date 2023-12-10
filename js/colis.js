import * as THREE from "three";
import {_planetes} from "./planetes.js";
export let _colis = {
	id: new Number(0),
	counter: 0,
	colis: {},
	colisIdByName:{},
	//--------------------------
	nearestPlanetePack:null,
	nearestPlaneteDistance:999999,
	//--------------------------
	add: function(datas)  {
		console.log(datas)
		let planeteName = datas.planeteNameOrigine
		let angle = datas.angle
		let color = datas.color

		const planetePack = _planetes.planetes[_planetes.planetesIdByName[planeteName]];
		
		if (planetePack) {
			let colisPack = {
				angle: angle,
				planetePack:planetePack,
				id:this.id,
				name:"colis_"+this.id,
				//--------------
				groupe:new THREE.Group(),
				position:new THREE.Vector3(0,0,0),
				colis:null,
				//--------------
				mass:.1,
				radius:2,
				// ---------------------
				altitudedelivraison: (datas && datas.altitudedelivraison ) ? datas.altitudedelivraison : 0,
				cubeSize: 4,
				landed:false,
				color:(datas&&datas.color)?datas.color:'white',
				height:4,
				vx:0,
				vy:0,
				vz:0,
			}
			colisPack.velocity = new THREE.Vector3(
				colisPack.vx,
				colisPack.vy,
				colisPack.vz
			)
			colisPack.position.x = colisPack.planetePack.groupe.position.x - Math.sin(colisPack.angle) * (colisPack.planetePack.radius + colisPack.altitudedelivraison + colisPack.radius)
			colisPack.position.y = colisPack.planetePack.groupe.position.y + Math.cos(colisPack.angle) * (colisPack.planetePack.radius + colisPack.altitudedelivraison + colisPack.radius)

			const cubeGeometry = new THREE.BoxGeometry(colisPack.cubeSize, colisPack.cubeSize, colisPack.cubeSize);
			const cubeMaterial = new THREE.MeshBasicMaterial({
				color: 0xFFFFFF,
				wireframe:true
			})
			colisPack.colis = new THREE.Mesh(
				cubeGeometry,
				cubeMaterial
			);
			colisPack.colis.name='colis'
			

			colisPack.groupe = new THREE.Group();
			colisPack.groupe.name = "grp_"+colisPack.name

			colisPack.groupe.add(colisPack.colis)

			colisPack.groupe.position.x = colisPack.position.x+0;
			colisPack.groupe.position.y = colisPack.position.y+0;
			
			this.colis[this.id] = colisPack 
			
			this.colisIdByName[colisPack.name] = this.id
			this.id++;
			this.counter++;

			this.apparition(colisPack)

		} else {
			console.error(`La Planète avec le nom '${planeteName}' n'a pas été trouvée.`);
		}
	},
	setScene:function(scene){
		this.scene = scene
	},
	apparition:function(colisPack){
		this.scene.add(colisPack.groupe);
		// let apparaitre = setInterval(() => {
		// 	let opa = colisPack.colis.opacity
		// 	opa += (opa > 0) ? 0.1 : -0.1;
		// 	if (opa >= 1) clearInterval(apparaitre);
		// }, 300);
	},
};