import { useSelector } from "react-redux";

export const Testing = () => {
  const products = useSelector((state) => state.productSlice.products);
  console.error("products:", products);
  return (
    <div>
      Testing
      <div>GEtDAta</div>
      <button>GetDataById</button>
    </div>
  );
};
