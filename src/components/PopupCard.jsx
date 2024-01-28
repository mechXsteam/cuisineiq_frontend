import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LightboxDisplay from "./Lightbox";
import {useEffect} from "react";
import { useState} from "react";

export default function PopupCard(props) {
    const {cardData} = props
    const [favoriteCards, setFavoriteCards] = useState([]);

    useEffect(() => {
        const storedFavorites =
            JSON.parse(localStorage.getItem("favoriteCards")) || [];
        setFavoriteCards(storedFavorites);
    }, []);

    const handleFavoriteToggle = () => {
        const isCardFavorite = favoriteCards.includes(cardData.id);

        if (isCardFavorite) {
            const updatedFavorites = favoriteCards.filter(
                (cardId) => cardId !== cardData.id
            );
            setFavoriteCards(updatedFavorites);
            localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
        } else {
            const updatedFavorites = [...favoriteCards, cardData.id];
            setFavoriteCards(updatedFavorites);
            localStorage.setItem("favoriteCards", JSON.stringify(updatedFavorites));
        }
    };

    const isCardFavorite = favoriteCards.includes(cardData.id);
    return (
        <Card sx={{maxWidth: 345}}>
            <CardHeader
                title= {props.name}
                subheader={props.date_posted}
            />
            <CardMedia
                component="img"
                height="194"
                src={props.image[0]}
                alt="property"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {props.description}...
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    onClick={handleFavoriteToggle}
                    color={isCardFavorite ? "success" : "default"}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <LightboxDisplay picture1={props.image[0]} picture2={props.image[1]}/>
                </IconButton>
            </CardActions>
        </Card>
    );
}