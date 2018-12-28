import React from 'react';

const DiscountProduct = (props) => {
  const numListPrice = Number(props.product.list_price.slice(1));
  const numPrice = Number(props.product.price.slice(1));
  const savingsNum = numListPrice - numPrice;
  const savingsCur = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(savingsNum)
  
  if (props.product.prime) {
    return (
      <div className='mk-price-div'>
        <table>
          <tbody>
            <tr>
              <td>
                List Price:
              </td>
              <td>
                <span className='mk-text-strike'>
                  {props.product.list_price}
                </span>
              </td>
            </tr>
            <tr>
              <td id='mk-price-block'>
                Price:
              </td>
              <td className='mk-product-price mk-red-font'>
                {props.product.price}
                <span className='mk-prime-icon'></span>
              </td>
            </tr>
            <tr>
              <td>
                You Save:
              </td >
              <td id='mk-savings-cur' className='mk-red-font'>
              {savingsCur} ({props.product.discount})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div className='mk-price-div'>
      <table>
        <tbody>
          <tr>
            <td>
              List Price:
            </td>
            <td>
              <span className='mk-text-strike'>
                {props.product.list_price}
              </span>
            </td>
          </tr>
          <tr>
            <td id='mk-price-block'>
              Price:
            </td>
            <td className='mk-product-price mk-red-font'>
              {props.product.price}
            </td>
          </tr>
          <tr>
            <td>
              You Save:
            </td >
            <td id='mk-savings-cur' className='mk-red-font'>
            {savingsCur} ({props.product.discount})
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    )
  }
}

export default DiscountProduct;

/*
Plan for Prime:
  /split the DiscountProduct and NoDiscountProduct modules to have conditional rendering
  /one will render the prime icon and the other will not.
  
*/