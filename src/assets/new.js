;$(function(){
	var bli = 1;
	var bli2 = 1;
	if(device.mobile()){
		bli = 6;
		bli2 = 2;
	}
	//if(device.android()){
	//	$('.earth-canvas').hide();
	//}
	//if(!device.android()){
	if(true){
		// couple of constants
		var POS_X = 1800;
		var POS_Y = 500;
		var POS_Z = 1800;
		var WIDTH = $(window).width();
		var HEIGHT = $(window).height();


		var FOV = 45;
		var NEAR = 1;
		var FAR = 4000;

		// some global variables and initialization code
		// simple basic renderer
		var renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true
		});

    renderer.setSize(WIDTH,HEIGHT);
		renderer.setClearColor(0xFFFFFF, 0);

		// add it to the target element
		var mapDiv = document.getElementById("particles2");
		mapDiv.appendChild(renderer.domElement);

		// setup a camera that points to the center
		var camera = new THREE.PerspectiveCamera(FOV,WIDTH/HEIGHT,NEAR,FAR);
		camera.position.set(POS_X,POS_Y, POS_Z);
		camera.lookAt(new THREE.Vector3(0,0,0));

		// create a basic scene and add the camera
		var scene = new THREE.Scene();
		scene.add(camera);

		// we wait until the document is loaded before loading the
		// density data.
		$(document).ready(function()  {
			jQuery.get('assets/data/density.csv', function(data) {
				addDensity(CSVToArray(data));
				// addLights();
				// addEarth();
				render();
			});
		});

		// simple function that converts the density data to the markers on screen
		// the height of each marker is relative to the density.
		function addDensity(data) {
			// the geometry that will contain all our cubes
			var geom = new THREE.Geometry();
			// material to use for each of our elements. Could use a set of materials to
			// add colors relative to the density. Not done here.
			var cubeMat = new THREE.MeshBasicMaterial({color: 0xffffff});
			var cubeMat3 = new THREE.MeshBasicMaterial({color: 0xffffff, opacity: 0.6});
			var cubeMat2 =  new THREE.MeshBasicMaterial( {color: 0x0F9CFF} );
			for (var i = 0 , j = data.length-1; i < j ; i++) {

				//get the data, and set the offset, we need to do this since the x,y coordinates
				//from the data aren't in the correct format
				var x = parseInt(data[i][0])+180;
				var y = parseInt((data[i][1])-84)*-1;
				var value = parseFloat(data[i][2]);

				// calculate the position where we need to start the cube
				var position = latLongToVector3(y, x, 400 + 1+value/30/4 * bli2, 2);
				var position2 = latLongToVector3(y, x, 400 + 1+value/30/2 * bli2, 2);

				// create the cube
				var cube2 = new THREE.Mesh(new THREE.CubeGeometry(1 * bli2,1 * bli2,1 * bli2,1,1,1),cubeMat);
				cube2.position = position2;
				cube2.lookAt( new THREE.Vector3(0,0,0) );
				THREE.GeometryUtils.merge(geom, cube2);

				if(1+value/30/2 * bli2 >= 8 * bli2){
					var cube = new THREE.Mesh(new THREE.CubeGeometry(1 * bli2,1 * bli2,1+value/30/2 * bli2,1,1,1),cubeMat3);
					cube.position = position;
					cube.lookAt( new THREE.Vector3(0,0,0) );

					var spGeo = new THREE.SphereGeometry(3 * bli2, 3 * bli2, 3 * bli2);
					var mat2 =  new THREE.MeshBasicMaterial( {color: 0xffffff} );
					var sp = new THREE.Mesh(spGeo, mat2);
					sp.position = position2;
					sp.lookAt( new THREE.Vector3(0,0,0) );
					scene.add(sp);

					THREE.GeometryUtils.merge(geom, cube);
				}
			}

			// create a new mesh, containing all the other meshes.
            // var total = new THREE.Mesh(geom, new THREE.MeshFaceMaterial());
			var total = new THREE.Mesh(geom, new THREE.MeshBasicMaterial( {color: 0xffffff} ));

			// and add the total mesh to the scene
			scene.add(total);
		}

		function addClouds() {
			var spGeo = new THREE.SphereGeometry(400,30,30);
			var cloudsTexture = THREE.ImageUtils.loadTexture( "assets/images/earth_clouds_1024.png" );
			var materialClouds = new THREE.MeshPhongMaterial( { color: 0xffffff, map: cloudsTexture, transparent:true, opacity:0.3 } );

			meshClouds = new THREE.Mesh( spGeo, materialClouds );
			meshClouds.scale.set( 1.015, 1.015, 1.015 );
			scene.add( meshClouds );
		}

		function latLongToVector3(lat, lon, radius, heigth) {
			var phi = (lat)*Math.PI/180;
			var theta = (lon-180)*Math.PI/180;

			var x = -(radius+heigth) * Math.cos(phi) * Math.cos(theta);
			var y = (radius+heigth) * Math.sin(phi);
			var z = (radius+heigth) * Math.cos(phi) * Math.sin(theta);

			return new THREE.Vector3(x,y,z);
		}


		function onWindowResize() {
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize( window.innerWidth, window.innerHeight );
		}

		// render the scene
		function render() {
			var timer = Date.now() * 0.0001;
			camera.position.x = (Math.cos( timer ) *  1800);
			camera.position.z = (Math.sin( timer ) *  1800) ;
			camera.lookAt( scene.position );
			onWindowResize();
			renderer.render( scene, camera );
			requestAnimationFrame( render );
		}


		function CSVToArray( strData, strDelimiter ){
			strDelimiter = (strDelimiter || ",");
			var objPattern = new RegExp(
				(
					"(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
					"(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
					"([^\"\\" + strDelimiter + "\\r\\n]*))"
				),
				"gi"
			);
			var arrData = [[]];
			var arrMatches = null;
			while (arrMatches = objPattern.exec( strData )){
				var strMatchedDelimiter = arrMatches[ 1 ];
				if (
					strMatchedDelimiter.length &&
					(strMatchedDelimiter != strDelimiter)
				){
					arrData.push( [] );
				}
				if (arrMatches[ 2 ]){
					var strMatchedValue = arrMatches[ 2 ].replace(
						new RegExp( "\"\"", "g" ),
						"\""
					);
				} else {
					var strMatchedValue = arrMatches[ 3 ];
				}
				arrData[ arrData.length - 1 ].push( strMatchedValue );
			}
            console.log(arrData);
			return( arrData );
		}
	}
});
