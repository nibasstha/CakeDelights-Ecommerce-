import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/homepage/Homepage";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Aboutus from "./Pages/aboutus/Aboutus";
import Navbar from "./components/navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from "./Pages/admin/AdminDashboard/AdminHomepage/AdminDashboard";
import AdminProductEdit from "./Pages/admin/AdminProductEdit/AdminProductEdit";
import ProductDetails from "./Pages/productDetails/ProductDetails";
import Cart from "./Pages/cart/Cart";
import AdminOrders from "./Pages/admin/AdminOrders/AdminOrders";
import Order from "./Pages/orders/Order";
import Search from "./Pages/search/Search";
import Profile from "./Pages/profile/Profile";
  
function App() {
  return (
    <>
    <Router>
      <Navbar />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/details/:id" element={<ProductDetails/>}/>

        {/*cart*/}
        <Route path="/cart" element={<Cart/>}></Route>

        {/*orders*/}
        <Route path="/order" element={<Order/>}></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus/>}/>

        {/*Admin routes*/}
        <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
        <Route path="/admin/product/edit/:id" element={<AdminProductEdit/>}/>
        <Route path="/Profile" element={<Profile/>}></Route>
        <Route path="/admin/orders" element={<AdminOrders/>}></Route>

        {/* SEARCH */}
        <Route path="/search/:query" element={<Search/>}/>

        

        
      </Routes>
    </Router>
    </>
  );
}

export default App;
