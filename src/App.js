import { Route, Routes } from "react-router-dom";

// Customer
import Homepage from "./Pages/Homepage";
import Menu from "./Pages/Menu";
import ProductDetails from "./Pages/ProductDetalse";
import Basket from "./Pages/Basket";
import Receipt from "./Pages/Receipt";
import Orders from "./Pages/Orders";
import Languages from "./Pages/Languages";
import Currency from "./Pages/Currency";

// Dashboard
import DashboardLayout from "./Dashbord/DashboardLayout";
import DashboardHome from "./Dashbord/DashboardHome";
import Categories from "./Dashbord/Page/Category";
import Products from "./Dashbord/Page/Product";
import Flavors from "./Dashbord/Page/Flavor";
import Extras from "./Dashbord/Page/Extra";
import AddCategory from "./Dashbord/Page/AddCategory";
import AddProduct from "./Dashbord/Page/AddProduct";
import AddFlavor from "./Dashbord/Page/AddFlavor";
import AddExtra from "./Dashbord/Page/AddExtra";
import OrdersDashboard from "./Dashbord/Page/OrdersDashboard";
import EditCategory from "./Dashbord/Page/EditCategory";
import EditProduct from "./Dashbord/Page/EditProduct";
import EditFlavor from "./Dashbord/Page/EditFlavor";
import EditExtra from "./Dashbord/Page/EditExtra";

// Auth
import Login from "./Dashbord/Login";
import ProtectedRoute from "./Auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* =====================================================
          CUSTOMER
      ===================================================== */}

      <Route path="/" element={<Homepage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/receipt" element={<Receipt />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/languages" element={<Languages />} />
      <Route path="/currency" element={<Currency />} />

      {/* =====================================================
          DASHBOARD LOGIN
          Public Route
      ===================================================== */}

      <Route path="/dashboard/login" element={<Login />} />

      {/* =====================================================
          PROTECTED DASHBOARD
      ===================================================== */}

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />

          {/* ================= Categories ================= */}

          <Route path="categories" element={<Categories />} />

          <Route path="categories/add" element={<AddCategory />} />

          <Route path="categories/edit/:id" element={<EditCategory />} />

          {/* ================= Products ================= */}

          <Route path="products" element={<Products />} />

          <Route path="products/add" element={<AddProduct />} />

          <Route path="products/edit/:id" element={<EditProduct />} />

          {/* ================= Flavors ================= */}

          <Route path="flavors" element={<Flavors />} />

          <Route path="flavors/add" element={<AddFlavor />} />

          <Route path="flavors/edit/:id" element={<EditFlavor />} />

          {/* ================= Extras ================= */}

          <Route path="extras" element={<Extras />} />

          <Route path="extras/add" element={<AddExtra />} />

          <Route path="extras/edit/:id" element={<EditExtra />} />

          {/* ================= Orders ================= */}

          <Route path="orders" element={<OrdersDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
