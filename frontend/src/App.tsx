import { Routes, Route } from "react-router-dom";
import { FullLayout } from "./components/Layouts/fullLayout";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import { Home } from "./pages/Home";
import { DynamicPage } from "./pages/DynamicPage";
import { LoginPage } from "./pages/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { CartPage } from "./pages/CartPage";
import { AccountPage } from "./pages/AccountPage";
import { PrivateRoute } from "./components/Routes/PrivateRoute";

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FullLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<LoginPage isSignUp={true} />} />
            <Route path="/cart" element={<CartPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/account" element={<AccountPage />} />
            </Route>
            <Route path="/:slug" element={<DynamicPage />} />
          </Routes>
        </FullLayout>
      </CartProvider>
    </AuthProvider>
  );
}
