import { Route, Routes } from "react-router-dom";
import { ContactDetail } from "../components/ContactDetail";
import { ContactList } from "../components/ContactList";
import { ProductList } from "../components/ProductList";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<ContactList />}></Route>
      <Route path="/contactDetail/:id" element={<ContactDetail />} />
      <Route path="/products" element={<ProductList />}></Route>
    </Routes>
  );
};
