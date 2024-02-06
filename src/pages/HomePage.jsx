import React, { useState } from "react";
import ContentLoader from "react-content-loader";
import Card from "../components/Card/Card";

function HomePage({
  goods,
  addToCart,
  addToFavorite,
  isLoading,
}) {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  const renderItems = () => {
    return isLoading
      ? [...Array(8)].fill(
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
      : goods
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((obj) => (
            <Card
              key={obj.id}
              addToCart={(obj) => addToCart(obj)}
              addToFavorite={(obj) => addToFavorite(obj)}
              loading={isLoading}
              {...obj}
            />
          ));
  };

  return (
    <main className="content">
      <div className="search-block">
        <h1>
          {searchValue ? `Поиск по запросу "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search">
          <img width={20} height={20} src="/img/search.svg" alt="найти" />
          <input
            placeholder="Поиск..."
            onChange={onChangeSearchInput}
            value={searchValue}
          />
          {searchValue && (
            <button className="remove-btn" onClick={() => setSearchValue("")}>
              <img width={17} height={17} src="/img/cross.svg" alt="очистить" />
            </button>
          )}
        </div>
      </div>

      <div className="sneakers">{renderItems()}</div>
    </main>
  );
}

export default HomePage;
