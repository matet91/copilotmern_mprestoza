//import routes and route
import { Routes, Route } from 'react-router-dom';

//import header, footer and content components
import Header from './components/Header';
import Footer from './components/Footer';
import Details from './components/Details';
import Listings from './components/Listings';

function App() {
  //return a router with nested routes and a route
  return (
    <div className="container mx-auto">
      <Header />
      <Routes>
        <Route path="/" element={<Listings />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
