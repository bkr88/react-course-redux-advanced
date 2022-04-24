import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';

const cartUrl =
  'https://react-course-94490-default-rtdb.europe-west1.firebasedatabase.app/cart.json';

export const fetchCartData = () => async (dispatch) => {
  const fetchData = async () => {
    const response = await fetch(cartUrl);

    if (!response.ok) {
      throw new Error('Could not fetch cart data!');
    }

    const data = await response.json();

    return data;
  };

  try {
    const cartData = await fetchData();

    dispatch(
      cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity,
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Fetching cart data failed!',
      })
    );
  }
};

export const sendCartData = (cartState) => async (dispatch) => {
  const sendRequest = async () => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );

    const response = await fetch(cartUrl, {
      method: 'PUT',
      body: JSON.stringify({
        items: cartState.items,
        totalQuantity: cartState.totalQuantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Sending cart data failed.');
    }
  };

  try {
    await sendRequest();

    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Success!',
        message: 'Sending cart data successfully!',
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Sending cart data failed!',
      })
    );
  }
};
