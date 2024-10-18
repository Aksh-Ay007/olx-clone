import { Link } from "react-router-dom";

type Product = {
    id: number;
    image: string;
    price: number;
    title: string;
    category: string;  // Added category field
    
  };
  
  type ProductsProps = {
    products: Product[];
    menu:any  // products should be an array of Product
  };
  
  function Home({ products }: ProductsProps) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {products?.map((data) => {
          return (

            <Link to='/details' state={{data:data}}>
            <div key={data.id} className="border border-spacing-1 p-4 shadow-lg">
              <img src={data.image} className="w-60 h-48 object-cover" alt={data.title} />
              <h1 className="text-lg font-semibold mt-2">${data.price}</h1>
              <h1 className="text-md text-gray-700">{data.title}</h1>
              <h1 className="text-md text-gray-500">{data.category}</h1>
            </div>
            </Link>
          );
        })}
      </div>
    );
  }
  
  export default Home;
  