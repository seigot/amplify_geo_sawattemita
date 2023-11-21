import React, { useEffect } from 'react';
import { createMap, drawPoints } from "maplibre-gl-js-amplify";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
//import { drawPoints } from "maplibre-gl-js-amplify";
import CustomIcon from './logo.svg';
//import { MapView, LocationSearch } from '@aws-amplify/ui-react-geo';

//custom icon
const icon = new Image(100,100);
icon.src = CustomIcon;

// Amplify の設定を読み込み
Amplify.configure(awsconfig);

//const map = await createMap({                                                                                                                                                                                                                        
//    container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
//    center: [135.949368, 35.017228], // 東京駅
//    zoom: 14,
//});           

const onClick1 = () => {

};
axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'; //'application/x-www-form-urlencoded'; //'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios
    .get("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => {
	console.log(response);
    })
axios
//    .get("https://jsonplaceholder.typicode.com/users/1")
    .get("https://301bccgsd2.execute-api.ap-northeast-1.amazonaws.com/location_point_stage/location_point")
    .then((response) => {
	console.log(response);
    })
    .catch((err) => console.log(err));

axios
//    .get("https://jsonplaceholder.typicode.com/users/1")
    .get("https://y3ggbki6xh.execute-api.ap-northeast-1.amazonaws.com/demo/location_point_api_test_takada")
    .then((response) => {
	console.log(response);
    })
    .catch((err) => console.log(err));


//var https = require('https');
console.log("aaa")

function App() {
    //const
//    global.map = createMap({
//        container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
//        center: [135.949368, 35.017228], // 東京駅
//        zoom: 14,
//    });
    useEffect(() => {
	async function initMap() {
	    const map = await createMap({
		container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
		center: [135.949368, 35.017228], // 東京駅
		zoom: 14,
	    });
	    map.on("load", function () {

		console.log("hello2")
		console.log("test1")

//		var lat1 = 135.949368
//		var grat1 = 35.017228
//		var lat2 = 135.57586849
//		var grat2 = 34.73740137
//		var lat3 = 135.5617
//		var grat3 = 34.7357
//		var source1 = "point" + String(lat1) + String(grat1)
//		var source2 = "point" + String(lat2) + String(grat2)
//		var source3 = "point" + String(lat3) + String(grat3)

		function draw(source, lati, longi) {
		    drawPoints(source,
		     [
			   {
			       coordinates: [longi, lati], 
			       title: 'Point01',
			       address: 'Main1 Points',
			   },
		       ],
		       map,
		       {
			   showCluster: true,
			   unclusteredOptions: {
			       showMarkerPopup: true,
			       defaultColor: '#005993',
			       markerImageElement: icon,
			   },
			   clusterOptions: {
			       showCount: true,
			       fillColor: '#FF5773'
			   },
		       }
		      );
		}

/*		const jsons3 = [
		    {
			"UserId": "sato_test1",
			"latitude": 35.017228,
			"longitude": 135.949368,
			"timestamp": 1699580120018
		    },
		    {
			"UserId": "RasPi_device1",
			"latitude": 40,
			"longitude": 130.1,
			"timestamp": 1698646805067
		    },
		    {
			"UserId": "sdscsd",
			"latitude": 24.5,
			"longitude": 134.3,
			"timestamp": 1698637464138
		    }
		]
*/
		console.log("test2")
		axios
		    .get("https://301bccgsd2.execute-api.ap-northeast-1.amazonaws.com/location_point_stage/location_point")
		    .then((response) => {
			console.log(response);
			console.log(response.data)
			Object.keys(response.data).forEach((key) => {
			    console.log("key=" + key + ", UserId=" + response.data[key]["UserId"]+ ", latitude=" + response.data[key]["latitude"]+ ", longitude=" + response.data[key]["longitude"]);
			    var sourcename = response.data[key]["UserId"]
			    var lati = response.data[key]["latitude"]
			    var longi = response.data[key]["longitude"]
			    draw(sourcename, lati, longi);
			});
		    })
		    .catch((err) => console.log(err));
		
//		console.log("----------");
//		Object.keys(jsons3).forEach((key) => {
//		    console.log("key=" + key + ", UserId=" + jsons3[key]["UserId"]+ ", latitude=" + jsons3[key]["latitude"]+ ", longitude=" + jsons3[key]["longitude"]);
//		    var sourcename = jsons3[key]["UserId"]
//		    var lati = jsons3[key]["latitude"]
//		    var longi = jsons3[key]["longitude"]		    
//		    draw(sourcename, lati, longi);
//		});
		//draw(source1, lat1, grat1);
		//draw(source2, lat2, grat2);
		//draw(source3, lat3, grat3);
	    }
	    );
	}
	initMap();
    }, []);

    return (
	<div className="App">
	    <h1>OshitaKan Stamp Map (All)</h1>
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

