import * as THREE from "three";
import {_engine} from "./engine.js";
import {_ship} from "./ship.js";
import { _systemsDatas } from "./systemsDatas.js";
export let _htmlFront = {
	infoDiv: null,
	storyDiv: null,
	planetsDiv: null,
	entrys:{},
	init: function () {
		// this.infoDiv = document.createElement("div");
		// this.infoDiv.className = "infodiv";
		this.storyDiv = this.createDiv({
			tag:'div',
			attributes:{className:"storyDiv"},
			style:{}
		})
		document.body.appendChild(this.storyDiv);
		this.infoDiv = this.createDiv({
			tag:'div',
			attributes:{className:"infodiv"},
			style:{}
		})
		document.body.appendChild(this.infoDiv);

		this.planetsDiv = this.createDiv({tag:'div',attributes:{id:"planetesvignettes"}});
		document.body.appendChild(this.planetsDiv);		
	},
	addPlanetEntry: function (pack) {
		console.log('addPlanetEntry',pack)
		let vignette=this.createDiv({tag:'div',attributes:{className:"vignette "+pack.category}});
		let emoji=this.createDiv({tag:'div',attributes:{className:"emoji",textContent:pack.emoji}});
		let name=this.createDiv({tag:'div',attributes:{className:"name",textContent:pack.name}});

		this.entrys[pack.id] = {
			vignette:vignette,
			emoji:emoji,
			name:name,
		}
		vignette.addEventListener('click',(e)=>{
				_ship.teleportationScotty(pack.name)
			},pack.name
		);
		vignette.addEventListener('mouseenter',(e)=>{
				this.storyDiv.classList.add('active')
				this.storyDiv.textContent = pack.emoji + ' ' + pack.story

			}
		);
		vignette.addEventListener('mouseout',(e)=>{
				this.storyDiv.classList.remove('active')
				this.storyDiv.textContent = ''

			}
		);
		vignette.appendChild(this.entrys[pack.id].name);
		vignette.appendChild(this.entrys[pack.id].emoji);

		this.planetsDiv.prepend(vignette);
		this.planetsDiv.scroll({
			top: 1000,
			behavior: "smooth",
		  });

	},
	refresh: function (p, nearestPlanet) {
		if (nearestPlanet && nearestPlanet.distanceToShip !== null) {
			this.infoDiv.innerHTML =
				`<b>Informations sur la Ship:</b><br>` +
				`Rotation Z: ${p.groupe.rotation.z.toFixed(2)}<br>` +
				`Position X: ${p.groupe.position.x.toFixed(2)}<br>` +
				`Position Y: ${p.groupe.position.y.toFixed(2)}<br>` +
				`Position Z: ${p.groupe.position.z.toFixed(2)}<br>` +
				`Vitesse (${p.vx.toFixed(1)}, ${p.vy.toFixed(1)}, ${p.vz.toFixed(1)})<br>` +
				`Puissance du moteur: ${(_engine.power.cur)}<br><br>` +
				`<b>Informations sur la Planète la plus proche:</b><br>` +
				`Nom: ${nearestPlanet.name}<br>` +
				`Distance à la planète: ${nearestPlanet.distanceToShip.toFixed(2)}<br>` +
				`Masse: ${nearestPlanet.mass.toFixed(2)}<br>` +
				`Rayon: ${nearestPlanet.radius.toFixed(2)}<br>` +
				`Gravité: ${nearestPlanet.gravity.toFixed(2)}<br>`;
		} else {
			this.infoDiv.innerHTML = "Calcul de la distance en cours...";
		}
	},
	createDiv: function (params) {
		let element = document.createElement(params.tag);
		if (params.attributes) {
			for (const key in params.attributes) {
				if (Object.hasOwnProperty.call(params.attributes, key)) {
					element[key] = params.attributes[key];
				}
				if (params.style) {
					for (const key2 in params.style) {
						if (Object.hasOwnProperty.call(params.style, key2)) {
							element.style[key2] = params.style[key2];
						}
					}
				}
			}
		}
		return element;
	},
};