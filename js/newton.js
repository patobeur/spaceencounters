import * as THREE from "three";
export const _newton = {
    // G: 0.8 * Math.pow(10, -2),
    
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
	PIHalf: (Math.PI / 2),
	earthG: 0.8 * Math.pow(10, -2),
}