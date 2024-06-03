import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";
function App() {
  
  return (
    <>
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/analytics" element={<Analytics/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
