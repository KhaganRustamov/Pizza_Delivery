import { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

export const searchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Router>
      <div className="wrapper">
        <searchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </searchContext.Provider>
      </div>
    </Router>
  );
}

export default App;
