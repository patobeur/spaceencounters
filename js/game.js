import * as THREE from "three";
// import {_systemsDatas} from "./_systemsDatas.js";
// import {_engine} from "./_engine.js";
// import {_newton} from "./_newton.js";
import {_cameras} from "./cameras.js";
import {_ship} from "./js/_ship.js";
import {_htmlFront} from "/spaceencounters/js/_htmlFront.js";
import {_planetes} from "/spaceencounters/js/_planetes.js";
import {_ombre} from "/spaceencounters/js/_ombre.js";
import {_controls} from "/spaceencounters/js/_controls.js";
import {_missions} from "/spaceencounters/js/_missions.js";
import {_colis} from "/spaceencounters/js/_colis.js";
class Game {
	run=false;
	scene = null;
	renderer = null;
	startingPlaneteName=startingPlaneteName;
	constructor() {}
    /**
     * Initialise tous les éléments du jeu.
     */
	init = () => {
		this.setThemAll();
		this.addEventsListeners();
		_colis.setScene(this.scene)
		_missions.add()

		_colis.add({
			planeteNameOrigine:"lune",
			angle:Math.PI/2,
			color:'red',
			altitudedelivraison:12
		});

		this.run=true;
		// console.log(this.scene.children)
		this.start();
		
	};
    /**
     * Configure tous les éléments nécessaires pour le jeu.
     */
	setThemAll= () => {
		this.sets = {
			setScene: () => {
				this.scene = new THREE.Scene();
				
				let ambient = new THREE.AmbientLight(0x555555, 1);
				this.scene.add(ambient);
				

				const pointLight2 = new THREE.PointLight(0xffffff, 1);
				pointLight2.position.set(500, 100,100)
				this.scene.add(pointLight2);

				const pointLight = new THREE.PointLight(0xffffff, 1);
				pointLight.position.set(0, 100, 100)
				this.scene.add(pointLight);

				// Ajouter un repère
				const axesHelper = new THREE.AxesHelper(1000);
				axesHelper.position.set(0,0,0)
				this.scene.add(axesHelper);
			},
			setrenderer: () => {
				// Initialisation du rendu
				this.renderer = new THREE.WebGLRenderer({ antialias: true });
				this.renderer.setSize(window.innerWidth, window.innerHeight);
				this.renderer.setPixelRatio(devicePixelRatio);
				// tentative de fog
				// this.scene.fog = new THREE.FogExp2(0x000000, 0.001);
				// this.renderer.setClearColor(this.scene.fog.color);
				document.body.appendChild(this.renderer.domElement);
			},
			setinfodiv: () => {
				_htmlFront.init()
			},
			setplanetes: () => {
				_planetes.init();
				for (const id in _planetes.planetes) {
					if (Object.hasOwnProperty.call(_planetes.planetes, id)) {
						this.scene.add(_planetes.planetes[id].groupe)
						// console.log(_planetes.planetes[id].name,_planetes.planetes[id].groupe.position)
					}
				}
				// console.log(this.scene.children)
			},
			setship: () => {
				_ship.init(this.startingPlaneteName);
				this.scene.add(_ship.groupe);
			},
			setombre: () => {
				_ombre.init();
				this.scene.add(_ombre.ombre);
			},
			setcamera: () => {
				_cameras.init()
			},
		};
		for (const key in this.sets) {
			if (Object.hasOwnProperty.call(this.sets, key)) {
				this.sets[key](this);
			}
		}
	};
	addEventsListeners= () => {
		// Gestion du keyboard
		document.addEventListener("keydown", (event) => {
			// console.log(event.code)
			if (event.code === _controls.controlsKeys.left || event.code === _controls.controlsKeys.ArrowLeft) {
				_controls.controls['left'] = true
			} else if (event.code === _controls.controlsKeys.right || event.code === _controls.controlsKeys.ArrowRight) {
				_controls.controls['right'] = true
			}
			if (event.code === _controls.controlsKeys.up || event.code === _controls.controlsKeys.ArrowUp) {
				_controls.controls['up'] = true
			} else if (event.code === _controls.controlsKeys.down || event.code === _controls.controlsKeys.ArrowDown) {
				_controls.controls['down'] = true
			}
		});
		document.addEventListener("keyup", (event) => {
			if (event.code === _controls.controlsKeys.up) {
				_controls.controls['up'] = false
			} 
		});
		// en cas de resize malencontreux
		window.addEventListener("resize", () => {
			const newWidth = window.innerWidth;
			const newHeight = window.innerHeight;
			_cameras.currentPack.camera.aspect = newWidth / newHeight;
			_cameras.currentPack.camera.updateProjectionMatrix();
			this.renderer.setSize(newWidth, newHeight);
		});
	};
	checkRebondOrExplosion = () => {
		// check si explosion ou pas en fonction de la vitesse de collision
		let vitessedecollision = Math.sqrt(_ship.vx ** 2 + _ship.vy ** 2); // à calculer
		if (vitessedecollision >= _ship.ship.limiteInfrascture) {
			// console.log('vitessedecollision',vitessedecollision,'>',_ship.ship.limiteInfrascture)
			// console.log('boom')
		} else {
			// le vaisseau rebondit pas encore ;(
			_ship.vx *= -0.5;
			_ship.vy *= -0.5;
		}
	};
    nextFrame= () => {
		if (this.run) {
			_controls.checkKeyboard();
			_ship.nextFrame();
	
			let dddddd = 0
			let nearestId = 0;
			let minDistance = 999999999;
	
			let planetes = _planetes.planetes
			for (const key in planetes) {
				if (Object.hasOwnProperty.call(planetes, key)) {
					const planetePack = planetes[key];
					
					// Appliquer la gravité de la planète en cours à la ship
					_planetes.appliquerGravite(planetePack);
	
					// Récupérer la distance ship/planète en considérant la surface
					dddddd = planetePack.distanceToShip + 0;	
					// Mettre à jour nearestId et minDistance si nécessaire
					if (dddddd-planetePack.radius < minDistance) {
						minDistance = dddddd-planetePack.radius;
						nearestId = planetePack.id;
					}
					// console.log(`Distance: ${dddddd}, Min Distance: ${minDistance}, Nearest Id: ${nearestId}`);

					// appliquer la gravité au colis possedant une mass ?
					let colis = _colis.colis
					for (const key in colis) {
						if (Object.hasOwnProperty.call(colis, key)) {
							const colisPack = colis[key];
							// console.log(colisPack)
							_planetes.appliquerGraviteColis(planetePack,colisPack)
						}
					}





				}
			}		
			_planetes.setCurrentPlanetePack(nearestId)
	
			_ombre.stepAnimation()
			_cameras.stepAnimation(minDistance)
			// Rendu de la scène
		}
	};
	refreshScene= () => {
		this.nextFrame();
		this.renderer.render(this.scene, _cameras.currentPack.camera);
		requestAnimationFrame(this.refreshScene);
	};
	start= () => {
		this.refreshScene();
	};
    /**
     * Génère un nombre aléatoire entre min et max (inclus).
     * @param {number} min - Valeur minimale.
     * @param {number} max - Valeur maximale.
     * @returns {number} - Nombre aléatoire généré.
     */
	rand = (min, max) => { return Math.floor(Math.random() * (max - min + 1) + min) };
	// degToRad = (deg) => { return deg * (Math.PI / 180); };
	// radToDeg = (rad) => { return rad * (180 / Math.PI); };
	tweaks=function () {
	}
}
const startingPlaneteName = 'lune';
let GAME = new Game();
GAME.init();
