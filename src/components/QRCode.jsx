import React from 'react';

const QRCode = ({ base64String }) => {
    return (
        <img src={`data:image/jpeg;base64,${base64String}`} alt="Converted from base64"  style={{"height":200}}/>
    );
};

export default QRCode;