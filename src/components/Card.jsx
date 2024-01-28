import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


export default function CuisineCard({
                                        name,
                                        posted_on,
                                        image,
                                        description,
                                        budget,
                                        ambience,
                                        cuisine,
                                        dietary_options,
                                        handleClick
                                    }) {

    return (
        <Card sx={{maxWidth: 345, margin: 2}} className="listingCard" onClick={handleClick}>
            <CardHeader
                title={name}
                subheader={posted_on}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Divider sx={{marginTop:1, marginBottom:1}}/>
                <Typography variant="body2" color="text.secondary">
                    <Chip label={cuisine.toUpperCase()} sx={{margin:1}}/>
                    <Chip label={dietary_options.toUpperCase()} sx={{margin:1}}/>
                    <Chip label={ambience.toUpperCase()} sx={{margin:1}}/>
                    <Chip label={budget.toUpperCase()} sx={{margin:1}}/>
                </Typography>
            </CardContent>

        </Card>
    );
}