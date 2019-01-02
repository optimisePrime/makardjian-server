import React from 'react';

const Description = (props) => {

  return (
    <ul id='mk-description'>
      {
        props.description.map(bullet => {
         return (
            <li>
              <span className='mk-bullet'>
                {bullet}
              </span>
            </li>
          )
        })
      }
    </ul>
  )
};

export default Description;
