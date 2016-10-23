import settings from 'app/settings';

const scene = new THREE.Scene();

if (settings.fog) {
	scene.fog = new THREE.FogExp2(settings.renderColor, settings.fogDensity);
}

export default scene;