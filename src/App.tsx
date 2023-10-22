import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Header from "./components/header/Header";

import "./scss/app.scss";

const Home = lazy(() => import(/* webpackChunkName: "Home" */ "./pages/Home"));
const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Router>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Suspense>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
