import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AppContext from "./context";
import Orders from "./pages/Orders";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [goods, setGoods] = useState([]);
  const [cartGoods, setCartGoods] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoaing] = useState(true);

  useEffect(() => {
    async function fetchData() {
    try {
      const [cartResp, favResp, goodsResp] = await Promise.all([
        axios.get("https://65aa4254081bd82e1d9679c4.mockapi.io/cart"),
        axios.get("https://65aa4254081bd82e1d9679c4.mockapi.io/favorites"),
        axios.get("https://sneakers-67203-default-rtdb.europe-west1.firebasedatabase.app/sneakers.json")
      ])

      setCartGoods(cartResp.data);
      setFavorites(favResp.data);
      setGoods(goodsResp.data);

      setIsLoaing(false);
      
    } catch (error) {
      alert('Ошибка при запроcе данных')
    }
    }
    fetchData();
  }, []);

  const addToCart = async (obj) => {
    try {
      const findItem = cartGoods.find((item) => item.parentId === obj.id)
      if (findItem) {
        setCartGoods((prev) => prev.filter((item) => item.parentId !== obj.id));
        await axios.delete(`https://65aa4254081bd82e1d9679c4.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartGoods((prev) => [...prev, obj]);
        const {data} = await axios.post("https://65aa4254081bd82e1d9679c4.mockapi.io/cart", obj);
        setCartGoods((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }));
      }
    } catch (error) {
      alert("не удалось обновить данные в корзине!");
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://65aa4254081bd82e1d9679c4.mockapi.io/cart/${id}`);
      setCartGoods((prev) => prev.filter((obj) => obj.id !== id));
    } catch (error) {
      alert("не удалось удалить товар из корзины!");
    }
  };

  const addToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((item) => item.parentId === obj.id)
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => item.parentId !== obj.id));
        await axios.delete(`https://65aa4254081bd82e1d9679c4.mockapi.io/favorites/${findItem.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const {data} = await axios.post("https://65aa4254081bd82e1d9679c4.mockapi.io/favorites", obj);
        setFavorites((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item
        }));
      }
    } catch (error) {
      alert("не удалось добавить в избранные!");
    }
  };

  const isItemAdded = (id) => {
    return cartGoods.some((item) => item.parentId === id);
  };

  const isItemFavorite = (id) => {
    return favorites.some((item) => item.parentId === id);
  };

  return (
    <AppContext.Provider value={{ goods, cartGoods, favorites, setFavorites, isItemAdded, isItemFavorite, addToCart }}>
      <div className="wrapper clear">
        <Cart
          onCloseCart={() => setCartOpened(false)}
          goods={cartGoods}
          onRemoveItem={onRemoveItem}
          setCartGoods={setCartGoods}
          cartGoods={cartGoods}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                goods={goods}
                cartGoods={cartGoods}
                addToCart={addToCart}
                addToFavorite={addToFavorite}
                isLoading={isLoading}
              />
            }
          />

          <Route
            path="/favorites"
            element={<FavoritesPage addToFavorite={addToFavorite} />}
          />

          <Route
            path="/orders"
            element={
              <Orders addToCart={addToCart} addToFavorite={addToFavorite} isLoading={isLoading} />
            }
          />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
