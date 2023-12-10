import * as THREE from "three";
import {_engine} from "./engine.js";
import {_ship} from "./ship.js";
import { _systemsDatas } from "./systemsDatas.js";
export let _htmlFront = {
	consoleDiv: null,
	storyDiv: null,
	planetsDiv: null,
	entrys:{},
	init: function () {
		// this.consoleDiv = document.createElement("div");
		// this.consoleDiv.className = "consoleDiv";
		this.addconsoleDiv()
		this.addplanetsDiv()
		this.addboardDiv()
		this.addstoryDiv()
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
	addboardDiv: function () {
		this.boardDiv = this.createDiv({
			tag:'div',
			attributes:{className:"boardDiv"},
			style:{}
		})
		document.body.appendChild(this.boardDiv);


		this.velocityDiv = this.createDiv({tag:'div',attributes:{className:"velocityDiv"}})
		this.velocityDivx = this.createDiv({tag:'div',attributes:{className:"vx"}})
		this.velocityDivy = this.createDiv({tag:'div',attributes:{className:"vy"}})
		this.bubblex = this.createDiv({tag:'div',attributes:{className:"bubble bbx"}})
		this.bubbley = this.createDiv({tag:'div',attributes:{className:"bubble bby"}})
		// this.velocityDivz = this.createDiv({tag:'div',attributes:{className:"vz"}})

		this.velocityDivx.appendChild(this.bubblex);
		this.velocityDivy.appendChild(this.bubbley);

		this.velocityDiv.appendChild(this.velocityDivx);
		this.velocityDiv.appendChild(this.velocityDivy);
		// this.velocityDiv.appendChild(this.velocityDivz);

		document.body.appendChild(this.velocityDiv);








	},
	addstoryDiv: function () {
		this.storyDiv = this.createDiv({
			tag:'div',
			attributes:{className:"storyDiv"},
			style:{}
		})
		document.body.appendChild(this.storyDiv);
	},
	addconsoleDiv: function () {
		this.consoleDiv = this.createDiv({
			tag:'div',
			attributes:{className:"consoleDiv"},
			style:{}
		})
		document.body.appendChild(this.consoleDiv);
	},
	addplanetsDiv: function () {
		this.planetsDiv = this.createDiv({tag:'div',attributes:{id:"planetesvignettes"}});
		document.body.appendChild(this.planetsDiv);
	},
	refresh: function (p, nearestPlanet) {
		if (nearestPlanet && nearestPlanet.distanceToShip !== null) {
			this.consoleDiv.innerHTML =
				`<b>Informations sur la Ship:</b><br>` +
				`Rotation Z: ${p.groupe.rotation.z.toFixed(2)}<br>` +
				`Position X: ${p.groupe.position.x.toFixed(2)}<br>` +
				`Position Y: ${p.groupe.position.y.toFixed(2)}<br>` +
				`Position Z: ${p.groupe.position.z.toFixed(2)}<br>` +
				`Vx: ${p.vx.toFixed(3)}<br>` +
				`Vy: ${p.vy.toFixed(3)}<br>` +
				`Vz: ${p.vz.toFixed(3)}<br>` +
				`Puissance du moteur: ${(_engine.power.cur)}<br><br>` +
				`<b>Informations sur la Planète la plus proche:</b><br>` +
				`Nom: ${nearestPlanet.name}<br>` +
				`Distance à la planète: ${nearestPlanet.distanceToShip.toFixed(2)}<br>` +
				`Masse: ${nearestPlanet.mass.toFixed(2)}<br>` +
				`Rayon: ${nearestPlanet.radius.toFixed(2)}<br>` +
				`Gravité: ${nearestPlanet.gravity.toFixed(2)}<br>`;
		} else {
			this.consoleDiv.innerHTML = "Calcul de la distance en cours...";
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