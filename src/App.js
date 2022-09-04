import './scss/app.scss';
/* import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom'; */
/* import { createContext useState } from 'react'; */
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';

/* export const SearchContext = createContext(); */

function App() {
  /* const [searchValue, setSearchValue] = useState(''); */
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.value);
  return (
    <div className="App">
      <div className="wrapper">
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <span>{filter}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
        </div>
        {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider> */}
      </div>
    </div>
  );
}

export default App;
