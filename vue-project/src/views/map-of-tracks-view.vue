<script setup>
import { onMounted } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

onMounted(() => {
    const map = L.map('map').setView([56.95, 24.11], 13);

    // OpenStreetMap tile layer
    const OpenStreetMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const googleMaps = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }); 

    // marker
    const BikeIcon = L.Icon.extend({
      options: {
          iconSize: [35, 50],
          iconAnchor: [22, 44],
          popupAnchor: [-3, -46]
      }
    });

    // Use proper public folder paths with forward slashes
    const blueIcon = new BikeIcon({iconUrl: '/images/bike_point_blue.png'}),
          orangeIcon = new BikeIcon({iconUrl: '/images/bike_point_orange.png'});
    
    // SKATEPARK
    var BARONA_SKATEPARK = L.marker([56.96124277824361, 24.144649914175325], {icon: blueIcon}).bindPopup("Barona SKATEPARK");
    var MIERADARZA_SKATEPARK = L.marker([56.945268438700104, 24.139304028764542], {icon: blueIcon}).bindPopup("Mieradārzs SKATEPARK");
    var IMANTA_SKATEPARK = L.marker([56.95631163658412, 24.00304950946472], {icon: blueIcon}).bindPopup("Imanta SKATEPARK");
    var KRASTMALA_SKATEPARK = L.marker([56.939407371654994, 24.119965834769015], {icon: blueIcon}).bindPopup("Krastmala SKATEPARK");
    var ZASULAUKS_SKATEPARK = L.marker([56.94430493065498, 24.06039721650843], {icon: blueIcon}).bindPopup("Zasulauks SKATEPARK");
    var OLAINE_SKATEPARK = L.marker([56.79067457015535, 23.942204983192823], {icon: blueIcon}).bindPopup("Olaine SKATEPARK");
    var TUKUMS_SKATEPARK = L.marker([56.96498059811032, 23.142226950198676], {icon: blueIcon}).bindPopup("Tukums SKATEPARK");
    var SIGULDA_SKATEPARK = L.marker([57.1584334116469, 24.855292234955137], {icon: blueIcon}).bindPopup("Sigulda SKATEPARK");
    var AUCE_SKATEPARK = L.marker([56.45857093320212, 22.895679379717414], {icon: blueIcon}).bindPopup("Auce SKATEPARK");
    var JAUNOLAINE_SKATEPARK = L.marker([56.79805632880793, 23.99122258945311], {icon: blueIcon}).bindPopup("Jaunolaine SKATEPARK");
    var JAUNMARUPE_SKATEPARK = L.marker([56.87795628366717, 23.94575818752378], {icon: blueIcon}).bindPopup("Jaunmārupe SKATEPARK");
    var DZINTARI_SKATEPARK = L.marker([56.97512444441959, 23.81653621697686], {icon: blueIcon}).bindPopup("Dzintari SKATEPARK");
    var BABITE_SKATEPARK = L.marker([56.95689791445658, 23.950615573555737], {icon: blueIcon}).bindPopup("Babīte SKATEPARK");
    var BISUMUIZA_SKATEPARK = L.marker([56.91499969390911, 24.134757615811036], {icon: blueIcon}).bindPopup("Bišumuiža SKATEPARK");
    var ULBROKAS_SKATEPARK = L.marker([56.93750091987118, 24.290476533740225], {icon: blueIcon}).bindPopup("Ulbrokas SKATEPARK");
    var KEKAVA_SKATEPARK = L.marker([56.82724834892806, 24.231715897058393], {icon: blueIcon}).bindPopup("Ķekava SKATEPARK");
    var IKSKILE_SKATEPARK = L.marker([56.83503472037768, 24.506150233231605], {icon: blueIcon}).bindPopup("Ikšķile SKATEPARK");
    var VENTSPILS_SKATEPARK = L.marker([57.38856078598287, 21.56677989062882], {icon: blueIcon}).bindPopup("Ventspils SKATEPARK");
    var GROBINA_SKATEPARK = L.marker([56.537830561262766, 21.17076206958303], {icon: blueIcon}).bindPopup("Grobiņa SKATEPARK");
    var LIEPAJA_SKATEPARK = L.marker([56.501214422216606, 20.996141317407194], {icon: blueIcon}).bindPopup("Liepāja SKATEPARK");
    var DAUGAVPILS_SKATEPARK = L.marker([55.87238977003404, 26.504648095455074], {icon: blueIcon}).bindPopup("Daugavpils SKATEPARK");
    var REZEKNE_SKATEPARK = L.marker([56.512417249598855, 27.340199458909147], {icon: blueIcon}).bindPopup("Rēzekne SKATEPARK");
    var VALMIERA_SKATEPARK = L.marker([57.53639946581929, 25.408881845438867], {icon: blueIcon}).bindPopup("Valmiera SKATEPARK");

    // PUMPTRACK
    var BARONA_PUMPTRACK = L.marker([56.960700942469764, 24.1436449864371], {icon: orangeIcon}).bindPopup("Barona PUMPTRACK");
    var MEZCIEMA_PUMPTRACK = L.marker([56.96323135100916, 24.23773098548082], {icon: orangeIcon}).bindPopup("Mežciems PUMPTRACK");
    var PLAVNIEKI_PUMPTRACK = L.marker([56.93462366284932, 24.212479305131936], {icon: orangeIcon}).bindPopup("Pļavnieki PUMPTRACK");
    var UPESCIEMS_PUMPTRACK = L.marker([56.98344964679447, 24.337074211683294], {icon: orangeIcon}).bindPopup("Upesciems PUMPTRACK");
    var SARKANDAUGAVA_PUMPTRACK = L.marker([57.006126297822654, 24.122938749250736], {icon: orangeIcon}).bindPopup("Sarkandaugava PUMPTRACK");
    var ULBROKA_PUMPTRACK = L.marker([56.93958300052169, 24.28826670840088], {icon: orangeIcon}).bindPopup("Ulbroka PUMPTRACK");
    var IMANTA_PUMPTRACK = L.marker([56.96133488654021, 24.006003739872437], {icon: orangeIcon}).bindPopup("Imanta PUMPTRACK");
    var BALOZI_PUMPTRACK = L.marker([56.883074361063976, 24.150966012998314], {icon: orangeIcon}).bindPopup("Baloži PUMPTRACK");
    var MARUPE_PUMPTRACK = L.marker([56.881009368688396, 24.060647885359508], {icon: orangeIcon}).bindPopup("Mārupe PUMPTRACK");
    var ZAKUMUIZA_PUMPTRACK = L.marker([56.96961038484792, 24.48948696971739], {icon: orangeIcon}).bindPopup("Zaķumuiža PUMPTRACK");
    var OGRE_PUMPTRACK = L.marker([56.81454312570477, 24.61954043123241], {icon: orangeIcon}).bindPopup("Ogre PUMPTRACK");
    var OLAINE_PUMPTRACK = L.marker([56.789796816486415, 23.943255999639312], {icon: orangeIcon}).bindPopup("Olaine PUMPTRACK");
    var BALDONE_PUMPTRACK = L.marker([56.742788672104346, 24.38669916888463], {icon: orangeIcon}).bindPopup("Baldone PUMPTRACK");
    var KEGUMA_PUMPTRACK = L.marker([56.74679145147216, 24.710438013934763], {icon: orangeIcon}).bindPopup("Ķeguma PUMPTRACK");
    var ADAZI_PUMPTRACK = L.marker([57.07914593413758, 24.32444738005113], {icon: orangeIcon}).bindPopup("Ādaži PUMPTRACK");
    var SAULKRASTI_PUMPTRACK = L.marker([57.26151472744627, 24.42085073855379], {icon: orangeIcon}).bindPopup("Saulkrasti PUMPTRACK");
    var RAGANA_PUMPTRACK = L.marker([57.18164875775139, 24.697408760828342], {icon: orangeIcon}).bindPopup("Ragana PUMPTRACK");
    var IECAVA_PUMPTRACK = L.marker([56.59821703244727, 24.191469132821247], {icon: orangeIcon}).bindPopup("Iecava PUMPTRACK");
    var LAPMEZCIEMS_PUMPTRACK = L.marker([56.99960760026023, 23.513859200827294], {icon: orangeIcon}).bindPopup("Lapmežciems PUMPTRACK");
    var CESIS_PUMPTRACK = L.marker([57.31542679841841, 25.274756944657813], {icon: orangeIcon}).bindPopup("Cēsis PUMPTRACK");
    var DOBELE_PUMPTRACK = L.marker([56.62369200446352, 23.289796827684775], {icon: orangeIcon}).bindPopup("Dobele PUMPTRACK");
    var TUKUMS_PUMPTRACK = L.marker([56.96523909811523, 23.142204370115554], {icon: orangeIcon}).bindPopup("Tukums PUMPTRACK");
    var SIGULDA_PUMPTRACK = L.marker([57.15814334754244, 24.85483141859902], {icon: orangeIcon}).bindPopup("Sigulda PUMPTRACK");
    var JEKABPILS_PUMPTRACK = L.marker([56.496989602419326, 25.869787928932624], {icon: orangeIcon}).bindPopup("Jēkabpils PUMPTRACK");
    var AUCE_PUMPTRACK = L.marker([56.45839959052306, 22.896200309992643], {icon: orangeIcon}).bindPopup("Auce PUMPTRACK");
    var MURMUIZA_PUMPTRACK = L.marker([57.47529868359074, 25.492283392492883], {icon: orangeIcon}).bindPopup("Mūrmuiža PUMPTRACK");
    var GROBINA_PUMPTRACK = L.marker([56.53862693612575, 21.16859447132635], {icon: orangeIcon}).bindPopup("Grobiņa PUMPTRACK");
    var DAUGAVPILS_PUMPTRACK = L.marker([55.872553992362576, 26.504637135073803], {icon: orangeIcon}).bindPopup("Daugavpils PUMPTRACK");
    var REZEKNE_PUMPTRACK = L.marker([56.51335318398251, 27.338951379416873], {icon: orangeIcon}).bindPopup("Rēzekne PUMPTRACK");
    var VALMIERA_PUMPTRACK = L.marker([57.53610792770557, 25.40872353962594], {icon: orangeIcon}).bindPopup("Valmiera PUMPTRACK");

    // Group markers into LayerGroups
    var skateparks = L.layerGroup([
        BARONA_SKATEPARK, 
        MIERADARZA_SKATEPARK, 
        IMANTA_SKATEPARK, 
        KRASTMALA_SKATEPARK, 
        ZASULAUKS_SKATEPARK, 
        OLAINE_SKATEPARK,
        TUKUMS_SKATEPARK,
        SIGULDA_SKATEPARK,
        AUCE_SKATEPARK,
        JAUNOLAINE_SKATEPARK,
        JAUNMARUPE_SKATEPARK,
        DZINTARI_SKATEPARK,
        BABITE_SKATEPARK,
        BISUMUIZA_SKATEPARK,
        ULBROKAS_SKATEPARK,
        KEKAVA_SKATEPARK,
        IKSKILE_SKATEPARK,
        VENTSPILS_SKATEPARK,
        GROBINA_SKATEPARK,
        LIEPAJA_SKATEPARK,
        DAUGAVPILS_SKATEPARK,
        REZEKNE_SKATEPARK,
        VALMIERA_SKATEPARK]);

    var pumptracks = L.layerGroup([
        BARONA_PUMPTRACK, 
        MEZCIEMA_PUMPTRACK, 
        PLAVNIEKI_PUMPTRACK, 
        UPESCIEMS_PUMPTRACK, 
        SARKANDAUGAVA_PUMPTRACK, 
        ULBROKA_PUMPTRACK, 
        IMANTA_PUMPTRACK, 
        BALOZI_PUMPTRACK, 
        MARUPE_PUMPTRACK, 
        ZAKUMUIZA_PUMPTRACK, 
        OGRE_PUMPTRACK, 
        OLAINE_PUMPTRACK, 
        BALDONE_PUMPTRACK, 
        KEGUMA_PUMPTRACK, 
        ADAZI_PUMPTRACK,
        SAULKRASTI_PUMPTRACK, 
        RAGANA_PUMPTRACK,
        IECAVA_PUMPTRACK,
        LAPMEZCIEMS_PUMPTRACK,
        CESIS_PUMPTRACK,
        DOBELE_PUMPTRACK,
        TUKUMS_PUMPTRACK,
        SIGULDA_PUMPTRACK,
        JEKABPILS_PUMPTRACK,
        AUCE_PUMPTRACK,
        MURMUIZA_PUMPTRACK,
        GROBINA_PUMPTRACK,
        DAUGAVPILS_PUMPTRACK,
        REZEKNE_PUMPTRACK,
        VALMIERA_PUMPTRACK]);

    var bmx_tracks = L.layerGroup([]);

    // Define base layers and overlays for the layers control
    var baseMaps = {
        "Open Street Map": OpenStreetMap,
        "Google Maps": googleMaps
    };

    var overlayMaps = {
        "Skateparks": skateparks,
        "Pumptracks": pumptracks,
        "BMX Tracks": bmx_tracks
    };

    // Add the Layer Control to the map
    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Optionally, add the skateparks and pumptracks layers to the map by default
    skateparks.addTo(map);
    pumptracks.addTo(map);
    bmx_tracks.addTo(map);

});
</script>

<template>
  <main>
      <div id="map"></div>
  </main>
</template>

<style scoped>
#map {
    width: 80%; /* Width of the map relative to the viewport */
    height: 75vh; /* Height relative to the viewport height */
    margin: auto;
}
</style>