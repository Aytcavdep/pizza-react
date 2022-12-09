import "./scss/app.scss";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { lazy, Suspense } from "react";

const Cart = lazy(() => import(/*webpackChunkName: "Cart"*/ "./pages/Cart"));
const NotFound = lazy(() =>
  import(/*webpackChunkName: "NotFound"*/ "./pages/NotFound")
);
const FullPizza = lazy(() =>
  import(/*webpackChunkName: "FullPizza"*/ "./pages/FullPizza")
);
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route
            path="cart"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
