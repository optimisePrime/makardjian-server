import React from 'react';

  const DiscountProduct = (props) => {
    const numListPrice = Number(props.product.list_price.slice(1));
    const numPrice = Number(props.product.price.slice(1));
    const savingsNum = numListPrice - numPrice;
    const savingsCur = new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(savingsNum)
    console.log(savingsCur)
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
              <td id='mk-discount-price' className='mk-red-price'>
                {props.product.price}
              </td>
            </tr>
            <tr>
              <td>
                You Save:
              </td >
              <td id='mk-savings-cur' className='mk-red-price'>
              {savingsCur} ({props.product.discount})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  export default DiscountProduct;