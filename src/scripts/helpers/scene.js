import Settings from 'app/settings';

const Scene = new THREE.Scene();

if (Settings.fog) {
  Scene.fog = new THREE.FogExp2(Settings.renderColor, Settings.fogDensity);
}

export default Scene