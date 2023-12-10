import * as THREE from "three";
import {_htmlFront} from "./htmlFront.js";
import {_systemsDatas} from "./systemsDatas.js";
import {_newton} from "./newton.js";
import {_ship} from "./ship.js";
export let _planetes = {
	id: new Number(0),
    G: 0.8 * Math.pow(10, -2),
	planetes: {},
	counter: 0,
	nearestId:0,//nearestPlaneteId
	oldPack:null,
	currentPack:null,
	planetesIdByName:{},
	category:{satellite:'S',planete:'P',etoile:'E'},
	//--------------------------
	conf:{
		defaultMass: 0.8 * Math.pow(10, 3),
		defaultGravity: 0,
		defaultRadius:50,
		defaultColor:0x0000ff,
		defaultAtmosphereSize:25,
		defaultAtmosphereTransparent:true,
		defaultAtmosphereOpacity:0.8,
		defaultVelocity:new THREE.Vector3(0,0,0),
		defaultCategory: 'unknown',
		defaultStory: 'unknown',
	},
    /**
     * Définit le pack de planète actuel en fonction de l'ID de la planète la plus proche.
     * @param {number} nearestId - ID de la planète la plus proche.
     */
	setCurrentPlanetePack: function (nearestId) {

		if(this.oldPack === null) {
			_htmlFront.entrys[this.currentPack.id].vignette.classList.add("active");
		}

		if (this.oldPack != null && this.oldPack != this.planetes[nearestId]){
			this.currentPack = this.planetes[nearestId]
			_htmlFront.entrys[this.currentPack.id].vignette.classList.add("active");
			_htmlFront.entrys[this.oldPack.id].vignette.classList.remove("active");
		}
		this.oldPack = this.currentPack
	},
	add: function (datas) {
		console.log('add Planet',datas.category)
		// console.log('datas:',datas)
		this.conf.defaultGravity = this.G;

		let radius=(datas&&datas.radius)?datas.radius:this.conf.defaultRadius;
		let atmosphereSize=(datas&&datas.atmosphereSize)?datas.atmosphereSize:this.conf.defaultAtmosphereSize;
		// ----------------------

		let pack = {
			id:this.id,
			emoji:(datas&&datas.emoji)?datas.emoji:"❔",
			name:(datas&&datas.name)?datas.name:"unknow_"+this.id,
			groupe:new THREE.Group(),
			//--------------
			mass:(datas&&datas.mass)?datas.mass:this.conf.defaultMass,
			gravity:(datas&&datas.gravity)?datas.gravity:this.conf.defaultGravity,
			radius:radius,
			atmosphereSize:atmosphereSize,
			atmosphereradius:radius+atmosphereSize,
			//--------------
			vx:(datas&&datas.vx)?datas.vx:this.conf.defaultVelocity.x,
			vy:(datas&&datas.vy)?datas.vy:this.conf.defaultVelocity.y,
			vz:(datas&&datas.vz)?datas.vz:this.conf.defaultVelocity.z,
			//--------------
			position:(datas&&datas.position)?datas.position:false,
			texture:(datas&&datas.texture)?datas.texture:'vide.jpg',
			satellites:(datas&&datas.satellites)?datas.satellites:false,
			color:(datas&&datas.color)?datas.color:false,
			category:(datas&&datas.category)?datas.category:this.conf.defaultCategory,
			story:(datas&&datas.story)?datas.story:this.conf.defaultStory,
			//--------------
			distanceToShip:null,
			planete:null,
			atmosphere:null,
		}
		// console.log('pack',pack)
		//----------------
		pack.groupe = new THREE.Group();
		pack.groupe.name = "grp_"+pack.name
		
		pack.groupe.position.x = pack.position.x;
		pack.groupe.position.y = pack.position.y;
		pack.groupe.position.z = pack.position.z;
		
		//----------------
        
			const material = new THREE.TextureLoader().load( './textures/'+pack.texture );
			material.colorSpace = THREE.SRGBColorSpace;

			const night_texture_loader = new THREE.TextureLoader();
			const night_texture = night_texture_loader.load('./textures/'+pack.texture );
			
			// const day_texture_loader = new THREE.TextureLoader();
			// const day_texture = day_texture_loader.load('./textures/'+pack.texture );

		pack.planete = new THREE.Mesh(
			new THREE.SphereGeometry(pack.radius, 32, 32),
			// new THREE.MeshBasicMaterial({
			new THREE.MeshPhongMaterial({
				map: material ,
				// color:color??this.conf.defaultColor,
				// transparent:this.conf.defaultAtmosphereTransparent,
				// opacity:this.conf.defaultAtmosphereOpacity
				emissiveMap: night_texture,
				emissive: new THREE.Color(0x888888),
				emissiveIntensity: 1,
				// specularMap: terre_specularmap,
				specular: 1,
				shininess: 30,
				// wireframe:true
			})
		);
		pack.planete.name = pack.name;
		//----------------
		pack.atmosphere = new THREE.Mesh(
			new THREE.SphereGeometry(pack.atmosphereradius, 32, 32),
			new THREE.MeshBasicMaterial({ color: 0x0000FF,transparent: true, opacity:0.05})
		);
		pack.atmosphere.name = "atmosphere_"+pack.name;
		//----------------
		pack.groupe.add( pack.planete );
		pack.groupe.add( pack.atmosphere );
		// console.log('pack.groupe',pack.groupe)

		// if(this.currentPack===null) this.currentPack=pack

		this.planetes[this.id] = pack
		this.planetesIdByName[pack.name] = this.id
		this.id++
		this.counter++

		_htmlFront.addPlanetEntry(pack);
		if(pack.satellites) this.addSatellites(pack);
	},
	addSatelliteToGroupeAndPlanetes: function(parentPack,satellite) {
		console.log('add Planet',satellite.category)
		let radius=(satellite&&satellite.radius)?satellite.radius:this.conf.defaultRadius;
		let atmosphereSize=(satellite&&satellite.atmosphereSize)?satellite.atmosphereSize:this.conf.defaultAtmosphereSize;

		let satellitePack = {
			id: this.id,
			name: (satellite && satellite.name) ? satellite.name : "satellite_" + this.id,
			//--------------
			groupe:new THREE.Group(),
			planete:null,
			atmosphere:null,
			emoji:(satellite&&satellite.emoji)?satellite.emoji:"❔",
			//--------------
			mass:(satellite&&satellite.mass)?satellite.mass:this.conf.defaultMass,
			gravity:(satellite&&satellite.gravity)?satellite.gravity:this.conf.defaultGravity,
			radius:radius,
			atmosphereSize:atmosphereSize,
			atmosphereradius:radius+atmosphereSize,
			//--------------
			// vx:this.conf.vx,
			// vy:this.conf.vy,
			// vz:this.conf.vz,
			// velocity:this.conf.velocity,
			distanceToShip:null,
			color:(satellite&&satellite.color)?satellite.color:'white',
			position: (satellite && satellite.position) ? satellite.position : new THREE.Vector3(0,0,0),
			texture: (satellite && satellite.texture) ? satellite.texture : false,
			category:(satellite&&satellite.category)?satellite.category:this.conf.defaultCategory,
			story:(satellite&&satellite.story)?satellite.story:this.conf.defaultStory,
		};
	
		satellitePack.groupe = new THREE.Group();
		satellitePack.groupe.name = "grp_" + satellitePack.name;
	
		const satelliteMaterial = new THREE.TextureLoader().load('./textures/' + satellitePack.texture);
		satelliteMaterial.colorSpace = THREE.SRGBColorSpace;
	
		satellitePack.planete = new THREE.Mesh(
			new THREE.SphereGeometry(satellitePack.radius, 32, 32),
			new THREE.MeshPhongMaterial({
				map: satelliteMaterial,
				// affiner les textures
			})
		);
		satellitePack.planete.name = satellitePack.name;
		
		satellitePack.atmosphere = new THREE.Mesh(
			new THREE.SphereGeometry(satellitePack.atmosphereradius, 32, 32),
			new THREE.MeshBasicMaterial({ color: 0x0000FF,transparent: true,opacity:0.05})
		);
		satellitePack.atmosphere.name = "atmosphere_"+satellitePack.name;

		satellitePack.groupe.add(satellitePack.planete)
		satellitePack.groupe.add(satellitePack.atmosphere)
		
		// satellitePack.groupe.position.copy(
		// 	parentPack.groupe.position.clone().add(satellitePack.position)
		// );

		satellitePack.groupe.position.x = parentPack.groupe.position.x + satellitePack.position.x
		satellitePack.groupe.position.y = parentPack.groupe.position.y + satellitePack.position.y

		satellitePack.position.x = satellitePack.groupe.position.x+0
		satellitePack.position.y = satellitePack.groupe.position.y+0

		// console.log(satellitePack.groupe.position)
		// console.log(satellitePack.position)

		// Ajoutez le satellite à la liste des planètes
		this.planetes[this.id] = satellitePack;
		this.planetesIdByName[satellitePack.name] = this.id
		this.id++;
		this.counter++;
	
		// Ajoutez le satellite à la scène et au groupe de la planète parente
		// this.currentPack.groupe.add(satellitePack.groupe);
	
		_htmlFront.addPlanetEntry(satellitePack);
	},
	addSatellites: function(pack) {
		if (pack.satellites && pack.satellites.length > 0) {
			pack.satellites.forEach(satellite => {
				// console.log(satellite.name)
				this.addSatelliteToGroupeAndPlanetes(pack,satellite);
			});
		}
	},
	appliquerRotationAuxSattelites: function()  {
		//faire tourner les sattelites autour de leur planete mere
	},
	appliquerGravite: function(planetePack)  {
		let distance = _newton.calculerDistance(planetePack, _ship);
		planetePack.distanceToShip = distance
		if(distance > planetePack.radius + (_ship.height/2) ) { // or _ship.radius instead of _ship.height
			let forceMagnitude = _newton.loiUNewton(planetePack.mass, _ship.mass,distance,planetePack.gravity);
			let dx = planetePack.groupe.position.x - _ship.groupe.position.x;
			let dy = planetePack.groupe.position.y - _ship.groupe.position.y;  
			let forceDirection = {
				x: dx / distance,
				y: dy / distance
			};
			_ship.vx += forceDirection.x * forceMagnitude;
			_ship.vy += forceDirection.y * forceMagnitude; 
		}
		else {
			// landing or crash -- rebonds or reset all to zero
			_ship.vx *= -0.5;
			_ship.vy *= -0.5;
		}
	},
	appliquerGraviteColis: function(planetePack,colisPack)  {
		// console.log('ok')
		let distance = _newton.calculerDistance(planetePack, colisPack);
		if(colisPack.nearestPlaneteDistance===null)colisPack.nearestPlaneteDistance = distance;
		if (distance<colisPack.nearestPlaneteDistance) {
			colisPack.nearestPlaneteDistance=distance;
			colisPack.nearestPlanetePack=colisPack;
		}

		// planetePack.distanceToColis = distance
		if(distance > planetePack.radius + (colisPack.radius) ) { // or _ship.radius instead of _ship.height
			let forceMagnitude = _newton.loiUNewton(
				planetePack.mass,
				colisPack.mass,
				distance,
				planetePack.gravity
			);
			let dx = planetePack.groupe.position.x - colisPack.groupe.position.x;
			let dy = planetePack.groupe.position.y - colisPack.groupe.position.y;

			let forceDirection = {
				x: dx / distance,
				y: dy / distance
			};
			colisPack.vx += forceDirection.x * forceMagnitude;
			colisPack.vy += forceDirection.y * forceMagnitude; 
		}
		else {
			// landing or crash -- reset all to zero
			// colisPack.vx=0
			// colisPack.vy=0
			// colisPack.vz=0
			colisPack.vx *= -0.5;
			colisPack.vy *= -0.5;
		}
		// Mise à jour de la position en fonction de vx, vy, et vz
		colisPack.groupe.position.x += colisPack.vx;
		colisPack.groupe.position.y += colisPack.vy;
		// console.log(colisPack.name,colisPack.groupe.position) 
		// colisPack.groupe.position.z += colisPack.vz;
	},
	init(){
		  this.addThemAll()
	},
	addThemAll:function(){
		_systemsDatas.addSolarSystem('solarSystem')
	}
};