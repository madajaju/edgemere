// wrapper class for three-bmfont-text-bundle.js

var TextBitmap = function( config ) {

  this.config = config;
  config.color = config.color || '#fff';

  var geometry = this.geometry = createGeometry( config ); // text-bm-font

  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load(config.imagePath, function(){
    texture.needsUpdate = true;
    texture.minFilter = THREE.LinearMipMapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;
    texture.anisotropy = renderer.getMaxAnisotropy();
  });

  var material = this.material = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone( SDFShader.uniforms ),
    fragmentShader: SDFShader.fragmentShader,
    vertexShader: SDFShader.vertexShader,
    side: THREE.DoubleSide,
    transparent: true,
    depthTest: false
  });

  material.uniforms.map.value = texture;
  material.uniforms.color.value = new THREE.Color( config.color );

  var mesh = this.mesh = new THREE.Mesh( geometry, material );
  var group = this.group = new THREE.Group();

  mesh.renderOrder = 1;

  mesh.rotation.x = Math.PI;

  var boxGeo = new THREE.BoxGeometry(1,1,1);
  var boxMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: config.showHitBox ? 1 : 0,
    wireframe: true
  });
  var hitBox = this.hitBox = new THREE.Mesh( boxGeo, boxMat );
  hitBox.mesh = mesh;

  this.update();

  var s = config.scale || 1;
  group.scale.set( s, s, s );

  group.add( mesh );
  group.add( hitBox );

}

TextBitmap.prototype.update = function(){

  var geometry = this.geometry;
  var mesh = this.mesh;

  geometry.update( this.config );

  // centering
  geometry.computeBoundingBox();
  mesh.position.x = - geometry.layout.width / 2;
  mesh.position.y = - ( geometry.boundingBox.max.y - geometry.boundingBox.min.y ) / 2; // valign center
  this.hitBox.scale.set( geometry.layout.width, geometry.layout.height, 1 );
  // mesh.position.y = - ( geometry.boundingBox.max.y - geometry.boundingBox.min.y ); // valign top
  // this.hitBox.position.y = - geometry.layout.height / 2; // valign top

  this.height = geometry.layout.height * this.config.scale; // for html-like flow / positioning
}

Object.defineProperty(TextBitmap.prototype, 'text', {

  get: function() {
    return this.config.text;
  },

  set: function(s) {

    this.config.text = s;
    this.update();

    return this;

  }

});
