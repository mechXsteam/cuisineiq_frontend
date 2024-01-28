import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'
import {Grid} from '@mui/material'
import {Icon} from 'leaflet'
import PopupCard from '../components/PopupCard'
import apartmentsIconPng from '../assets/apartments.png'
import React, {useState} from 'react'
import Card from '../components/Card'
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import {useEffect} from "react";

import {useNavigate} from "react-router-dom";

// load the css for react leaflet, !IMPORTANT
import 'leaflet/dist/leaflet.css'


export default function Cuisines() {

    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    // latitudes and longitudes of CP
    const [location, setLocation] = useState({
        lat: 28.632991037953683,
        lng: 77.21936821524868
    })

    // input prompt for the search bar, based on this the cuisines are filtered from the backend API using NLP
    const [inputPrompt, setInputPrompt] = useState("")
    // cuisines fetched from the backend API and stored in the state
    const [cuisines, setCuisines] = useState([])

    // remove the token from the local storage and navigate to the login page
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/")
    }

    // icon for the marker on the map
    const apartmentsIcon = new Icon({
        iconUrl: apartmentsIconPng,
        iconSize: [40, 40]
    });

    // function to fly to the location of the marker on the map
    function MyComponent() {
        const map = useMap()
        map.flyTo([location.lat, location.lng], map.getZoom())
    }

    // function to format the date
    function formatDate(dateString) {
        const dateObject = new Date(dateString);
        return dateObject.toLocaleDateString();
    }


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/cuisine-crud/?prompt=${inputPrompt}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'token': token,
            },
        })
            .then((response) => {
                    if (response.status !== 200) { // if the token is invalid, navigate to the login page
                        localStorage.removeItem('token')
                        navigate("/")

                    } else {
                        return response.json()
                    }
                }
            )
            .then((data) => setCuisines(data.cuisines))
            .catch((error) => console.error('Error:', error));
    }, [inputPrompt])


    return <Grid container xy={10}>
        {/*side by side listing and the map, the click on any limiting will fly to the location of the restaurant*/}
        <Grid item xs={3} justifySelf={"center"} className="listing-container">
            <TextField id="outlined-basic"
                       label="Input Prompt"
                       variant="outlined"
                       sx={{minWidth: 280, margin: 2}}
                       value={inputPrompt}
                       onChange={(e) => setInputPrompt(e.target.value)}
            />
            <Button variant="contained" sx={{margin: 2, backgroundColor: 'red'}}
                    onClick={handleLogout}><LogoutIcon/></Button>
            {cuisines.map((cuisine) => <Card
                    key={cuisine.id}
                    name={cuisine.name}
                    description={cuisine.description}
                    posted_on={formatDate(cuisine.created_at)}
                    image={cuisine.images[0]}
                    ambience={cuisine.ambience}
                    budget={cuisine.budget}
                    dietary_options={cuisine.dietary_options}
                    cuisine={cuisine.cuisine}
                    handleClick={() => {
                        setLocation({
                            lat: cuisine.latitude,
                            lng: cuisine.longitude
                        })
                    }}
                />
            )
            }

        </Grid>
        <Grid item xs={8} className={"sticky"}>
            <MapContainer id={"myCont"} center={[28.632932070640823, 77.21966424043708]} zoom={30}
                          scrollWheelZoom={true}>
                <MyComponent/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cuisines.map((cuisine) => {
                    return (
                        <Marker key={cuisine.id} position={[cuisine.latitude, cuisine.longitude]}
                                icon={apartmentsIcon}>
                            <Popup>
                                <PopupCard
                                    name={cuisine.name}
                                    description={cuisine.description}
                                    date_posted={formatDate(cuisine.created_at)}
                                    image={cuisine.images}
                                    cardData={{id: cuisine.id}}
                                />
                            </Popup>
                        </Marker>
                    )
                })}
            </MapContainer>
        </Grid>
    </Grid>
}