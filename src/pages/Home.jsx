import { useEffect, useState } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/pizzaBlock/PizzaBlock";
import Skeleton from "../components/pizzaBlock/Skeleton";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://65264185917d673fd76be60b.mockapi.io/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);
  
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
          : items.map((item) => <PizzaBlock {...item} key={item.id} />)}
      </div>
    </>
  );
}

export default Home;
