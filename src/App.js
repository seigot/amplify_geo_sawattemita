import React, { useEffect } from 'react';
import { createMap, drawPoints } from "maplibre-gl-js-amplify";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "maplibre-gl/dist/maplibre-gl.css";

// Amplify の設定を読み込み
Amplify.configure(awsconfig);

const onClick1 = () => {

}

function App() {

    useEffect(() => {
	async function initMap() {
	const map = await createMap({
	    container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
	    center: [135.949368, 35.017228], // 東京駅
	    zoom: 14,
	});
	map.on("load", function () {
	    drawPoints('pointsSource',
		       [
			   {
			       coordinates: [135.949368, 35.017228],
			       title: 'Point01',
			       address: 'Main1 Points',
			   },
			   {
			       coordinates: [135.57586849, 34.73740137],
			       title: 'Point02',
			       address: 'Main2 Points',
			   },
			   {
			       coordinates: [135.5617,34.7357],
			       title: 'Point03',
			       address: 'Main3 Points',
			   },
		       ],
		       map,
		       {
			   showCluster: false,
			   unclusteredOptions: {
			       showMarkerPopup: true,
			       defaultColor: '#005993'
			   },
			   clusterOptions: {
			       showCount: false,
			       fillColor: '#FF5773'
			   },
		       }
		      );
	});
	}
	initMap();
    }, []);

    return (
	<div className="App">
	    <h1>OshitaKan Stamp Map</h1>
	    <ul id="locations">
		<li><b>Kusatsu, Shiga prefecture</b>, kusatsu-shi kusatsu-cho [135.949368,35.017228] </li>
		<button onClick={onClick1()}> Click </button>
		<li><b>NishiKadoma, Osaka prefecture</b>, kadoma-shi motomachi [135.57586849,34.73740137]</li>
		<button onClick={onClick1()}> Click </button>
		<li><b>Moriguchi, Osaka prefecture</b>, moriguchi-shi kawara-cho [135.5617,34.7357]</li>
                <button onClick={onClick1()}> Click </button>  
	    </ul>
	    <div id="map" style={{height: '100vh'}}/>
	</div>
    );
}

export default App;

