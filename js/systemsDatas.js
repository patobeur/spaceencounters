import * as THREE from "three";
import {_planetes} from "./planetes.js";
export let _systemsDatas = {
	json: {
		solarSystem: [
			{
				position:  { x: 0, y: 0, z: 0 },
				category: "star",
				name: "soleil",
				emoji: "🌞",
				radius: 90,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "nasa_sun.jpg",
				temperature: 5500,
                story:"Le Soleil, étoile centrale du système solaire, mesure environ 1,4 million de kilomètres de diamètre et possède une masse d'environ 330 000 fois celle de la Terre, fournissant la lumière et l'énergie nécessaires à la vie sur notre planète.",			
				satellites: []
            },
			{
				position: { x: 0, y: 200, z: 0 },
				category: "planet",
				name: "mercure",
				emoji: "☿",
				radius: 50 * 0.38,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "nasa_mercure.jpg",
				temperature: 700,
                story:"Mercure, la planète la plus proche du Soleil, a un diamètre d'environ 4 880 kilomètres et une masse équivalente à environ 0,06 fois celle de la Terre, faisant d'elle une planète rocheuse.",
				satellites: [],
			},
			{
				position: { x: 0, y: 400, z: 0 },
				category: "planet",
				name: "venus",
				emoji: "♀️",
				radius: 50 * 0.95,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "nasa_venus.jpg",
				temperature: 737,
                story:"Vénus, deuxième planète du système solaire, affiche un diamètre d'environ 12 104 kilomètres et une masse d'environ 0,82 fois celle de la Terre, présentant une atmosphère dense de dioxyde de carbone et d'acide sulfurique.",
				satellites: [],
			},
			{
				position: { x: 0, y: 600, z: 0 },
				category: "planet",
				name: "terre",
				emoji: "🌍",
				radius: 30,
				color: 0x0000ff,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "nasa_earth.jpg",
				temperature: 37,
				// objects: { box: {}, start: {}, end: {} },
                story:"Notre planète, la Terre, mesure environ 12 742 kilomètres de diamètre et possède une masse d'environ 5,97 x 10^24 kg, caractérisée par une diversité biologique unique et un climat propice à la vie.",
				satellites: [
					{
						position: { x: 100, y: 0, z: 0 },
						category: "satellite",
						name: "lune",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity:  1 * Math.pow(10, -2),
						mass: 10,
						texture: "nasa_lune.jpg",
						distToParent: 300,
                        story:"La Lune, satellite naturel de la Terre, a un diamètre d'environ 3 474 kilomètres et une masse d'environ 0,0123 fois celle de la Terre, influençant les marées et jouant un rôle clé dans les cycles lunaires."
					},
				],
			},
			{
				position: { x: 0, y: 800, z: 0 },
				category: "planet",
				name: "mars",
				emoji: "♂️",
				radius: 50 * 0.53,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "nasa_mars.jpg",
				temperature: 210,
                story:"Mars, quatrième planète du système solaire, a un diamètre d'environ 6 779 kilomètres et une masse d'environ 0,11 fois celle de la Terre, avec une atmosphère mince et une surface rougeâtre due à l'oxyde de fer.",
				satellites: [
					{
						position: { x:100, y: 0, z: 0 },
						category: "satellite",
						name: "phobos",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "nasa_phobos.jpg",
						distToParent: 150,
                        story:"Phobos, l'une des lunes de Mars, est de petite taille avec un diamètre d'environ 22,2 kilomètres, orbite rapidement autour de la planète rouge, suscitant des questions sur son origine.",
					},
					{
						position: { x: 0, y: 100, z: 0 },
						category: "satellite",
						name: "deimos",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "nasa_deimos.jpg",
						distToParent: 200,
                        story:"Deimos, autre lune de Mars, a un diamètre d'environ 12,4 kilomètres, affichant une surface irrégulière et une orbite plus éloignée, également objet d'études sur son origine.",
					},
				],
			},
			{
				position: { x: 0, y: 1000, z: 0 },
				category: "planet",
				name: "jupiter",
				emoji: "⛔",//"♃",
				radius: 56,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "nasa_jupiter.jpg",
                story:"Jupiter, la plus grande planète du système solaire, présente un diamètre d'environ 139 820 kilomètres et une masse d'environ 318 fois celle de la Terre, caractérisée par une atmosphère gazeuse et une forte activité de tempête.",
				satellites: [
					{
						position: { x:610, y: 0, z: 0 },
						category: "satellite",
						name: "io",
						emoji: "🟠",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "nasa_io.jpg",
						distToParent: 150,
                        story:"Io, lune de Jupiter, est marquée par des volcans actifs et un intense bombardement de particules, mesurant environ 3 642 kilomètres de diamètre.",
					},
					{
						position: { x: 660, y: 0, z: 0 },
						category: "satellite",
						name: "europe",
						emoji: "❄️",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "nasa_europe.jpg",
						distToParent: 200,
                        story:"Europe, une lune glacée de Jupiter, a un diamètre d'environ 3 122 kilomètres, avec des fractures de glace et des océans souterrains potentiels, suscitant un intérêt particulier pour la recherche de vie extraterrestre.",
					},
					{
						position: { x:710, y: 0, z: 0 },
						category: "satellite",
						name: "ganymede",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "pinimg_ganimede.jpg",
						distToParent: 250,
                        story:"Ganymède, la plus grande lune de Jupiter, mesure environ 5 268 kilomètres de diamètre, affichant une surface composée de glace et de roches, constituant également un des plus grands objets du système solaire.",
					},
					{
						position: { x:760, y: 0, z: 0 },
						category: "satellite",
						name: "callisto",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "nasa_callisto.jpg",
						distToParent: 300,
                        story:"Callisto, l'une des lunes galiléennes de Jupiter, présente un diamètre d'environ 4 820 kilomètres, avec une surface cratérisée ancienne et une composition de glace.",
					},
				],
			},
			{
				position: { x: 2000, y: 0, z: 0 },
				category: "planet",
				name: "saturne",
				// emoji: "♄",
				emoji: "☣️",
				radius: 472.5,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "vide.jpg",
                mass: 1,
                story:"Saturne, géante gazeuse avec un diamètre d'environ 116 460 kilomètres et une masse d'environ 95 fois celle de la Terre, est célèbre pour ses magnifiques anneaux composés de glace et de roches.",
				// texture: "nasa_saturn.jpg",
				satellites: [
					{
						position: { x: 500, y: 0, z: 0 },
						category: "satellite",
						name: "mimas",
						emoji: "🪐",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						texture: "vide.jpg",
						mass: 1,
						//texture: "nasa_mimas.jpg",
						distToParent: 150,
                        story:"Mimas, lune de Saturne, mesure environ 396 kilomètres de diamètre, présentant un cratère géant appelé Herschel, créant une ressemblance frappante avec l'Étoile de la Mort de Star Wars.",
					},
					{
						position: { x:520, y: 0, z: 0 },
						category: "satellite",
						name: "encelade",
						emoji: "🪐",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_encelade.jpg",
						distToParent: 200,
                        story:"Encelade, autre lune de Saturne, mesure environ 504 kilomètres de diamètre et est caractérisée par des jets de glace provenant de fractures dans sa surface, alimentant les anneaux de la planète.",
					},
					{
						position: { x: 540, y: 0, z: 0 },
						category: "satellite",
						name: "téthys",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_tethys.jpg",
						distToParent: 250,
                        story:"Téthys, lune de Saturne, a un diamètre d'environ 1 062 kilomètres, avec une grande tache rouge appelée Odysseus sur sa surface.",
					},
					{
						position: { x: 560, y: 0, z: 0 },
						category: "satellite",
						name: "dioné",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_dione.jpg",
						distToParent: 300,
                        story:"Dioné, lune de Saturne, mesure environ 1 122 kilomètres de diamètre et présente une variété de caractéristiques de surface, dont des cratères et des falaises.",
					},
					{
						position: { x: 580, y: 0, z: 0 },
						category: "satellite",
						name: "rhéa",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_rhea.jpg",
						distToParent: 350,
                        story:"Rhéa, lune de Saturne, a un diamètre d'environ 1 527 kilomètres, montrant une surface lumineuse et des rayons sombres, témoignant de l'activité géologique passée.",
					},
					{
						position: { x: 600, y: 0, z: 0 },
						category: "satellite",
						name: "titan",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_titan.jpg",
						distToParent: 400,
                        story:"Titan, la plus grande lune de Saturne, a un diamètre d'environ 5 151 kilomètres, possédant une atmosphère dense et des lacs d'hydrocarbures liquides à sa surface, suscitant un grand intérêt scientifique.",
					},
					{
						position: { x: 620, y: 0, z: 0 },
						category: "satellite",
						name: "iapetus",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_iapetus.jpg",
						distToParent: 450,
                        story:"Japet, lune de Saturne, mesure environ 1 471 kilomètres de diamètre et présente une étrange coloration bicolore, avec une moitié sombre et une moitié lumineuse.",
					},
				],
			},
			{
				position: { x: 1400, y: 0, z: 0 },
				category: "planet",
				name: "uranus",
				emoji: "⚠️",//"♅",
				radius: 205,
				color: 0xff5000,
				gravity: 0.8 * Math.pow(10, -2),
				texture: "vide.jpg",
				//texture: "nasa_uranus.jpg",
				temperature: 59,
                story:"Uranus, géante gazeuse, a un diamètre d'environ 50 724 kilomètres et une masse d'environ 14 fois celle de la Terre, se distinguant par son inclinaison inhabituelle de rotation.",
				satellites: [
					{
						position: { x: 255, y: 0, z: 0 },
						category: "satellite",
						name: "miranda",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_miranda.jpg",
						distToParent: 100,
                        story:"Miranda, lune d'Uranus, mesure environ 471 kilomètres de diamètre et présente une surface chaotique avec des zones de hautes falaises et de profondes vallées.",
					},
					{
						position: { x: 275, y: 0, z: 0 },
						category: "satellite",
						name: "ariel",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						textexture: "vide.jpg",
						//textureture: "nasa_ariel.jpg",
						distToParent: 150,
                        story:"Ariel, autre lune d'Uranus, a un diamètre d'environ 1 157 kilomètres, avec une surface relativement jeune, montrant des signes d'activité géologique.",
					},
					{
						position: { x: 295, y: 0, z: 0 },
						category: "satellite",
						name: "umbriel",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_umbriel.jpg",
						distToParent: 200,
                        story:"Umbriel, lune d'Uranus, mesure environ 1 169 kilomètres de diamètre, affichant une surface sombre et présentant peu de caractéristiques géologiques apparentes",
					},
					{
						position: { x: 315, y: 0, z: 0 },
						category: "satellite",
						name: "titania",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_titania.jpg",
						distToParent: 250,
                        story:"Titania, lune d'Uranus, mesure environ 1 578 kilomètres de diamètre, caractérisée par une surface cratérisée et des canyons profonds.",
					},
					{
						position: { x: 335, y: 0, z: 0 },
						category: "satellite",
						name: "obéron",
						emoji: "🌕",
						radius: 3,
						color: 0xff50ff,
						gravity: 0.2,
						mass: 1,
						texture: "vide.jpg",
						//texture: "nasa_oberon.jpg",
						distToParent: 300,
                        story:"Obéron, lune d'Uranus, a un diamètre d'environ 1 522 kilomètres, avec une surface présentant des caractéristiques géologiques variées, dont des canyons et des cratères.",
					},
				],
			},
		],
	},
	getjson: function (name) {
		return this.json[name]
	},
	addSolarSystem: function (name) {
		this.json[name].forEach((planete) => {
			_planetes.add(planete);
		});
	},
};