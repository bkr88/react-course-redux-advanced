import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCartData, sendCartData } from 'store/cart-actions';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from 'components/UI/Notification';

let isInitial = true;

function App() {
  const dispatch = useDispatch();

  const cartState = useSelector((state) => state.cart);
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cartState.changed) {
      dispatch(sendCartData(cartState));
    }
  }, [cartState, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {showCart && <Cart />}

        <Products />
      </Layout>
    </>
  );
}

export default App;
