import * as THREE from "three";
import {_ship} from "./ship.js";
import {_engine} from "./engine.js";
export const _newton = {
    G: 0.8 * Math.pow(10, -2),
    
    /**
     * Calcule la force de gravité selon la loi universelle de Newton.
     * @param {number} masse1 - Masse du premier objet.
     * @param {number} masse2 - Masse du deuxième objet.
     * @param {number} distance - Distance entre les centres de masse des deux objets.
     * @param {number} gravity - Gravité.
     * @returns {number} - Force de gravité calculée.
     */
    loiUNewton:(masse1, masse2, distance, gravity)=> {
        if(distance===0) {throw new Error("La distance r entre les centres de masse des deux objets ne peut être = à 0");}
        const F = gravity * ( ( masse1*masse2 ) / ( distance*distance ) );
        return F;
    },
    /**
     * Calcule la distance entre deux objets.
     * @param {Object} planetePack - planete.
     * @param {Object} shipPack - ship.
     * @returns {number} - Distance entre les deux objets.
     */
    calculerDistance:(planetePack, shipPack)=> {
        const dx = (planetePack.groupe.position.x) - (shipPack.groupe.position.x);
        const dy = (planetePack.groupe.position.y) - (shipPack.groupe.position.y);
        return Math.sqrt(dx * dx + dy * dy);
    },
	appliquerGraviteColis: function(planetePack,colisPack)  {
		let distance = _newton.calculerDistance(planetePack, colisPack);
		if(colisPack.nearestPlaneteDistance===null)colisPack.nearestPlaneteDistance = distance;
		if (distance<colisPack.nearestPlaneteDistance) {
			colisPack.nearestPlaneteDistance=distance;
			colisPack.nearestPlanetePack=colisPack;
		}

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
			// landing or crash -- reset all to zero -- rebondis 
			colisPack.vx *= -0.5;
			colisPack.vy *= -0.5;
		}
		// Mise à jour de la position en fonction de vx, vy, et vz
		colisPack.groupe.position.x += colisPack.vx;
		colisPack.groupe.position.y += colisPack.vy;
	},
	appliquerGraviteShip: function(planetePack)  {
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
			_engine.vx += forceDirection.x * forceMagnitude;
			_engine.vy += forceDirection.y * forceMagnitude; 
		}
		else {
			// landing or crash -- rebonds
            _engine.vx *= -0.5;
            _engine.vy *= -0.5;
		}
	},
	PIHalf: (Math.PI / 2),
	earthG: 0.8 * Math.pow(10, -2),
}