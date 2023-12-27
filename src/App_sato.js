import React, { useEffect } from 'react';
import { createMap, drawPoints } from "maplibre-gl-js-amplify";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
//import { drawPoints } from "maplibre-gl-js-amplify";
import CustomIcon from './sato_sumi.png';
import CustomIcon2 from './sumi.png';
//import { MapView, LocationSearch } from '@aws-amplify/ui-react-geo';
import { Link } from "react-router-dom";

//custom icon
const icon = new Image(100,100);
icon.src = CustomIcon;
icon.name = "image1"
const icon2 = new Image(100,100);
icon2.src = CustomIcon2;
icon2.name = "image2"
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

function App_sato() {
    useEffect(() => {
	async function initMap() {
	    const map = await createMap({
		container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
		center: [135.949368, 35.017228], // 東京駅
		zoom: 14,
	    });
	    map.on("load", function () {
		var static_source = "source"
		function draw(source, lati, longi, stampi) {
		    drawPoints(source,
		     [
			   {
			       coordinates: [longi, lati], 
			       title: source,
			       address: 'Main1 Points',
			   },
		       ],
		       map,
		       {
			   showCluster: true,
			   unclusteredOptions: {
			       showMarkerPopup: true,
			       defaultColor: '#005993',
			       markerImageElement: stampi,
//			       activateMarkerImageElement: stampi,
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
			    var userid = response.data[key]["UserId"]
			    var sourcename = userid + "_00" + key.toString()
			    var lati = response.data[key]["latitude"]
			    var longi = response.data[key]["longitude"]
                            console.log("sourcename:" + sourcename + ", lati:" + lati + ", longi:" + longi);
			    if (userid.startsWith("sato")) {
                                draw(sourcename, lati, longi, icon);
			    }
//			    if (sourcename == "tokyo_station") {
//				var iconi = icon2
//				console.log("iconi = icon2")
//				draw(sourcename, lati, longi, icon2);
			    //			    }/
			    else {
//				var iconi = icon2
				//draw(sourcename, lati, longi, icon2);
//				draw("aaaa", lati, longi, icon);
			    }
//			    draw(sourcename, lati, longi, iconi);
			});
		    })
		    .catch((err) => console.log(err));
		
	    }
	    );
	}
	initMap();
    }, []);

    return (
	<div className="App_sato">
	    <h1>OshitaKan Stamp Map (sato)</h1>
	    <ul id="locations">
		<li><b>Kusatsu, Shiga prefecture</b>, kusatsu-shi kusatsu-cho [135.949368,35.017228] </li>
		<Link to="/">OshitaKan Stamp Map (All) へ移動する </Link> <br/> 		
	    </ul>
	    <div id="map" style={{height: '100vh'}}/>
	</div>
    );
}

export default App_sato;

