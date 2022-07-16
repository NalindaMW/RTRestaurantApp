import { Fragment, useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const orderCartHandler = () => {
    console.log("Ordering...");
  };

  return (
    <Fragment>
      {cartIsShown && (
        <Cart
          onCartOrder={orderCartHandler}
          onCartClose={hideCartHandler}
          onClose={hideCartHandler}
        />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
