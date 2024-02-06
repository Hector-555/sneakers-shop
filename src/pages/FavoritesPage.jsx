import React, { useState, useEffect } from "react";
import axios from "axios";
import ContentLoader from "react-content-loader";
import Card from "../components/Card/Card";

function FavoritesPage() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoading, setIsLoaing] = useState(true);
  console.log(favoriteItems);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        "https://65aa4254081bd82e1d9679c4.mockapi.io/favorites"
      );
      setFavoriteItems(data.flat());
      setIsLoaing(false);
    }
    fetchData();
  }, []);

  return (
    <main className="content">
      <div className="search-block">
        <h1>Избранное</h1>
      </div>

      <div className="sneakers">
        {isLoading ? (
          [...Array(4)].fill(
            <ContentLoader
              speed={2}
              width={220}
              height={226}
              viewBox="0 0 220 226"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="0" y="0" rx="10" ry="10" width="220" height="90" />
              <rect x="0" y="100" rx="5" ry="5" width="220" height="15" />
              <rect x="0" y="124" rx="5" ry="5" width="147" height="15" />
              <rect x="0" y="156" rx="5" ry="5" width="117" height="25" />
              <rect x="173" y="146" rx="10" ry="10" width="47" height="47" />
            </ContentLoader>
          )
        ) : favoriteItems.length === 0 ? (
          <h2>У Вас нет избранных моделей</h2>
        ) : (
          favoriteItems.map((obj) => (
            <Card key={obj.id} loading={isLoading} {...obj} />
          ))
        )}
      </div>
    </main>
  );
}

export default FavoritesPage;
