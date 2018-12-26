import React from 'react';

const Description = (props) => {
    const descriptionArray = JSON.parse(props.product.description)
    console.log(descriptionArray);
    return (
        <div></div>
    )
};

export default Description;
