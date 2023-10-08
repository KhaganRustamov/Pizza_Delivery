import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBLock from "./components/PizzaBlock";

import pizzaList from "./assets/db.json";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzaList.map((item) => (
              <PizzaBLock
                image={item.imageUrl}
                title={item.title}
                types={item.types}
                sizes={item.sizes}
                price={item.price}
                category={item.category}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
