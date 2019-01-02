import React from 'react';

const NoDiscountProduct = (props) => {
  if (props.product.prime === 1) {
    return (
      <div className='mk-price-div'>
        <table>
          <tbody>
            <tr>
              <td>
                    Price:
              </td>
              <td className='mk-red-font mk-product-price'>
                <span>{props.product.price}</span>
                <span className='mk-prime-icon'>
                </span>
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
                  Price:
            </td>
            <td className='mk-red-font mk-product-price'>
              <span>{props.product.price}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    )
  }
}

export default NoDiscountProduct;
