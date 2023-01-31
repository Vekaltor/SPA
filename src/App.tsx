import ListOfProducts from "./features/products/ListOfProducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
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
