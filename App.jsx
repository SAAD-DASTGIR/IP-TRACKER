import { useState,useEffect } from 'react'
import Header from '../Components/Header'
import Search from '../Components/Search'
import Information from '../Components/Information'
import { MapContainer,TileLayer,useMap,Marker,Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import Markerposition from '../Components/Markerposition'

export default function App() {
  fetch('https://api.ipify.org?format=json')
    .then(res => resjson())
    .then(data => {
      const CipAddress = data.ip;
      console.log('Your IP address is:', CipAddress);
    })
    .catch(error => {
      console.error('Error fetching IP address:', error);
    });
 
  const [address,setaddress]=useState("")
  const [ipaddress,setipaddress]=useState("")

  const getInitialData = async () => {
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      const userIpAddress = ipData.ip;
      const response = await fetch(
        `https://weatherapi-com.p.rapidapi.com/ip.json?q=${userIpAddress}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "ea9700f9e7msh9007bcea398c404p113ba0jsnadd5028f0afd",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          },
        }
      );
      const data = await response.json();
      setaddress(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


async function  getentereddata(){
  const response = await fetch(
    `https://weatherapi-com.p.rapidapi.com/ip.json?q=${ipaddress}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ea9700f9e7msh9007bcea398c404p113ba0jsnadd5028f0afd",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    }
  );
  const data = await response.json();
  // Assuming setAddress is a function to set the address data
  setaddress(data);
}


const handleSubmit = (e) => {
  e.preventDefault()
  getentereddata()
  setipaddress("")
}

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <>
    {address&& <>
      <Header/>
      <Search
        valueip={ipaddress}
        onchange={(e) => setipaddress(e.target.value)}
        onsubmit={handleSubmit}
        
      />
      <Information  
        IP={address.ip}
        InternetType={address.type}
        Locationcity={address.city}
        Locationcountry={address.country_name}
        TimeZone={address.localtime}
       />
     <div>
     <MapContainer 
        center={[address.lat,address.lon]} zoom={13} scrollWheelZoom={true} className="map"
        style={{height:"700px",width:"100vw",marginTop:"-5.2em",zIndex:"1000",position:"relative" }}
     >
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
      <Markerposition address={address}/>
      </MapContainer>
     </div>
    </>} 
    </>
  )
}

