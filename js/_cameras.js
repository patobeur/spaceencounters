import * as THREE from "three";
import {_ship} from "./_ship.js";
import {_planetes} from "./_planetes.js";
export let _cameras = {
	id:new Number(0),
	cameras:{},
	counter:new Number(0),
	defaultCameraDistance:100,
	currentPack:null,
	//--------------------------
	conf:{
		position: new THREE.Vector3(0,0,0),
		groupe: null,
	},
	getCamera(){
		return this.currentPack
	},
	cameraFollow(distance){
		this.currentPack.camera.position.x=_ship.groupe.position.x
		this.currentPack.camera.position.y=_ship.groupe.position.y

		let d = distance + _planetes.currentPack.radius
		if(distance<200){
			this.currentPack.camera.position.z=200
		}
		else {
			let vue = distance*5
			this.currentPack.camera.position.z=(vue>1000) ? 1000 : vue
		}
		this.lookAtShip()
	},
	stepAnimation(distance){
		this.cameraFollow(distance)
	},
	lookAtShip(){
		this.currentPack.camera.lookAt(_ship.groupe.position);
	},
	add: function (conf) {
		let position=(conf&&conf.position)?conf.position:_ship.groupe.position;
		let name=(conf&&conf.name)?conf.name:'camera_'+this.id;
		
		let pack = {
			id:this.id,
			name:name?name:"unknow_"+this.id,
			//--------------
			groupe:new THREE.Group(),
			camera:null,
			//--------------
			position:position,
		}

		// console.log('pos',pos)
		pack.groupe = new THREE.Group();
		pack.groupe.name = "grp_"+pack.name

		pack.groupe.position.x = _ship.groupe.position.x;
		pack.groupe.position.y = _ship.groupe.position.y;
		pack.groupe.position.z = this.defaultCameraDistance;
		//console.log('pack.groupe.position',pack.groupe.position)

		pack.camera = new THREE.PerspectiveCamera(
			40,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		pack.camera.name = name
		// pack.groupe.add( pack.camera );
		this.cameras[this.id] = pack

		if(this.currentPack===null) {
			this.currentPack = pack;
		}
		this.lookAtShip()

		this.id++
		this.counter++
	},
	tweaks(){
		// last tweaks
		this.conf.position.z = this.defaultCameraDistance
	},
	init(){
		this.tweaks();
		this.add({position:new THREE.Vector3(0,0,500),name:'mainCamera'});

	},
};