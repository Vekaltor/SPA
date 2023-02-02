import ListOfProducts from "./features/products/ListOfProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PRODUCTION_URL } from "./config/PRODUCTION_URL";

function App() {
  return (
    <>
      <Router basename={PRODUCTION_URL}>
        <Routes>
          <Route path="/">
            <Route index element={<ListOfProducts />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
