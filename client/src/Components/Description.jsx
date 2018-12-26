import React from 'react';

const Description = (props) => {
// console.log(props.description)
  return (
    <ul>
      {
        props.description.map(bullet => {
         return (<li>{bullet}</li>)
        })
      }
    </ul>
  )
};

export default Description;
