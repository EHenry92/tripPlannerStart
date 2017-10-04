const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");
//never require backend code

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpYW5uYWxhbnoiLCJhIjoiY2o4YnEzaW40MDBuMDJ6cDdhbTZuMm9yMCJ9.YNhR6HanR-EpwAN05yKbbw';

const map = new mapboxgl.Map({
  container: 'map',
  center: [-74.009, 40.705], // FullStack coordinates
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/streets-v10' // mapbox has lots of different map styles available.
});

const marker = buildMarker('activities', [-74.009, 40.705]);
marker.addTo(map);

let dataArray;

fetch('/api')
  .then(results => results.json())
  .then(data => {
    dataArray = data;
    let hotels = document.getElementById('hotels-choices');
      data[0].forEach((info)  =>  {
        let opt = document.createElement("option");
        let content = document.createTextNode(info.name);
        opt.appendChild(content);
        hotels.appendChild(opt);
        
      })
      let restaurant = document.getElementById('restaurants-choices');    
      data[1].forEach((info)  =>  {
        let opt = document.createElement("option");
        let content = document.createTextNode(info.name);
        opt.appendChild(content);
        restaurant.appendChild(opt);
        
      })
      let activity = document.getElementById('activities-choices');    
      data[2].forEach((info)  =>  {
        let opt = document.createElement("option");
        let content = document.createTextNode(info.name);
        opt.appendChild(content);
        activity.appendChild(opt);
        
      })
  })
  .catch(console.error);

  ["hotels", "restaurants", "activities"].forEach(function (atType, index)  {
    document.getElementById(atType + '-add').addEventListener("click", event =>{
    let temp = document.getElementById(atType+ '-choices').value;
    let list = document.getElementById(atType + '-list');
    let el = document.createElement("li");
    let text = document.createTextNode(temp);
    el.appendChild(text);

    const marker = setCoords(atType,index, temp);
    marker[0].addTo(map);
    map.flyTo({
      center: marker[1],
      zoom: 15
    })
    
    let remove = document.createElement("button");
    remove.innerHTML='X';
    remove.setAttribute('class','removers');
    remove.addEventListener('click', (event) => {
      remove.parentNode.parentNode.removeChild(remove.parentNode); 
      marker[0].remove();    
    });

    el.appendChild(remove);
    list.appendChild(el); 
  })



  });


// document.getElementById("hotels-add").addEventListener("click", event =>{
//     let temp = document.getElementById("hotels-choices").value;
//     let list = document.getElementById("hotels-list");
//     let el = document.createElement("li");
//     let text = document.createTextNode(temp);
//     el.appendChild(text);

//     const marker = setCoords('hotels', 0, temp);
//     marker[0].addTo(map);
//     map.flyTo({
//       center: marker[1],
//       zoom: 15
//     })
    

//     let remove = document.createElement("button");
//     remove.innerHTML='X';
//     remove.setAttribute('class','removers');
//     remove.addEventListener('click', (event) => {
//       remove.parentNode.parentNode.removeChild(remove.parentNode);     
//       marker[0].remove(); 
//     });
//     el.appendChild(remove);
//     list.appendChild(el);
    
// })


// document.getElementById("restaurants-add").addEventListener("click", event =>{
//   let temp = document.getElementById("restaurants-choices").value;
//   let list = document.getElementById("restaurants-list");
//   let el = document.createElement("li");
//   let text = document.createTextNode(temp);
//   el.appendChild(text);

//   const marker = setCoords('restaurants', 1, temp);
//   marker[0].addTo(map);
//   map.flyTo({
//     center: marker[1],
//     zoom: 15
//   })
  

//   let remove = document.createElement("button");
//   remove.innerHTML='X';
//   remove.setAttribute('class','removers');
//   remove.addEventListener('click', (event) => {
//     remove.parentNode.parentNode.removeChild(remove.parentNode);
//     marker[0].remove();    
//   });
//   el.appendChild(remove);
//   list.appendChild(el);
// });

// document.getElementById("activities-add").addEventListener("click", event =>{
//   let temp = document.getElementById("activities-choices").value;
//   let list = document.getElementById("activities-list");
//   let el = document.createElement("li");
//   let text = document.createTextNode(temp);
//   el.appendChild(text);

//   const marker = setCoords('activities', 2, temp);
//   marker[0].addTo(map);
//   map.flyTo({
//     center: marker[1],
//     zoom: 15
//   })
  
//   let remove = document.createElement("button");
//   remove.innerHTML='X';
//   remove.setAttribute('class','removers');
//   remove.addEventListener('click', (event) => {
//     remove.parentNode.parentNode.removeChild(remove.parentNode); 
//     marker[0].remove();    
//   });

//   el.appendChild(remove);
//   list.appendChild(el); 
// });



function setCoords(type, index, name) {
  let coords;
  dataArray[index].forEach((e) => {
    if (e.name === name) {
      coords = e.place.location;
    }
  });
  const mark =  buildMarker(type, coords);
  return [mark, coords];
  // mark.addTo(map);   
}

// document.getElementsByClassName('removers').forEach( (element) => element.addEventListener('click', event => {
// console.log(event);
// }));
