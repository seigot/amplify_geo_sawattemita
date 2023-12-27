import React, { useEffect } from 'react';
import { createMap, drawPoints } from "maplibre-gl-js-amplify";
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import "maplibre-gl/dist/maplibre-gl.css";
import axios from "axios";
//import { drawPoints } from "maplibre-gl-js-amplify";
import CustomIcon from './sumi_0.png';
import CustomIcon1 from './sumi_1.png';
import CustomIcon2 from './sumi_2.png';
import CustomIcon3 from './sumi_3.png';
import CustomIcon4 from './sumi_4.png';
//import { MapView, LocationSearch } from '@aws-amplify/ui-react-geo';
import { Link } from "react-router-dom";

//custom icon
const icon = new Image(100,100);
icon.src = CustomIcon;
const icon1 = new Image(100,100);
icon1.src = CustomIcon1;
const icon2 = new Image(100,100);
icon2.src = CustomIcon2;
const icon3 = new Image(100,100);
icon3.src = CustomIcon3;
const icon4 = new Image(100,100);
icon4.src = CustomIcon4;

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

function App_challenge() {
    useEffect(() => {
	async function initMap() {
	    const map = await createMap({
		container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
		center: [135.949368, 35.017228], // 東京駅
		zoom: 14,
	    });
	    map.on("load", function () {
		var static_source = "source"
		function draw(source, userid, lati, longi, stampi) {
		    drawPoints(source,
		     [
			   {
			       coordinates: [longi, lati], 
			       title: source,
			       address: userid,
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

		axios
		    .get("https://301bccgsd2.execute-api.ap-northeast-1.amazonaws.com/location_point_stage/location_point")
		    .then((response) => {
			console.log(response);
			console.log(response.data)
			Object.keys(response.data).forEach((key) => {

			    if ( key+1 < response.length ) {
				console.log("skip key:", key, ", length-1:", response.data.length-1);
				return;
			    }
			    else {
				console.log("key:", key, ", length-1:", response.data.length-1);
			    }

			    console.log("key=" + key + ", UserId=" + response.data[key]["UserId"]+ ", latitude=" + response.data[key]["latitude"]+ ", longitude=" + response.data[key]["longitude"]);
			    var userid = response.data[key]["UserId"]
			    var sourcename = userid + "_00" + key.toString()
			    var lati = response.data[key]["latitude"]
			    var longi = response.data[key]["longitude"]
			    var timestamp = response.data[key]["timestamp"]
			    var ButtonHoldDuration = parseInt(response.data[key]["button_hold_duration_msec"]); //0.1
                            console.log("sourcename:" + sourcename + ", lati:" + lati + ", longi:" + longi, ", ButtonHoldDuration:" + ButtonHoldDuration, ", timestamp:" + timestamp);

			    if (parseInt(ButtonHoldDuration) < 1000) {
				console.log("test1")
			    }
			    else {
				console.log("test2")
				return;
			    }

			    var iconi = icon
			    if (parseInt(ButtonHoldDuration) < 250) {
				var iconi = icon
				console.log("duration1");
			    }
			    else if (parseInt(ButtonHoldDuration) < 500) {
				var iconi = icon1
				console.log("duration2");
			    }
			    else if (ButtonHoldDuration < 750) {
				var iconi = icon2
				console.log("duration3");
			    }
			    else if (ButtonHoldDuration < 1000) {
				var iconi = icon3
				console.log("duration4")
			    }
			    else if (ButtonHoldDuration >= 1000) {
				var iconi = icon4
				console.log("duration5");
			    }
			    else {
				console.log("Invalid Number..")
			    }
			    draw("stamp point", userid, lati, longi, iconi);
			});
		    })
		    .catch((err) => console.log(err));
		
	    }
	    );
	}
	initMap();
    }, []);

    return (
	<div className="App_challenge">
	    <h1>OshitaKan Stamp Map (Oshitakan - challenge)</h1>
	    <ul id="locations">
		<li><b>NishiKadoma, Osaka prefecture, kadoma-shi motomachi [135.57586849,34.73740137] </b></li>
		<Link to="/">OshitaKan Stamp Map (All) へ移動する </Link> <br/> 		
	    </ul>
	    <div id="map" style={{height: '100vh'}}/>
	</div>
    );
}

export default App_challenge;

