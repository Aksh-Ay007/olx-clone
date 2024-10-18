type MenuProp = {
    setMenu: (menu: string) => void; // Explicit typing for setMenu
  };
  
  function Menubar(props: MenuProp) {
    return (
      <div className="flex shadow-sm h-10 p-2">
        <h1 onClick={() => props.setMenu("men's clothing")} className="ml-48 cursor-pointer">Men's Clothing</h1>
        <h1 onClick={() => props.setMenu("women's clothing")} className="ml-5 cursor-pointer">Women's Clothing</h1>
        <h1 onClick={() => props.setMenu('electronics')} className="ml-5 cursor-pointer">Electronics</h1>
        <h1 onClick={() => props.setMenu('jewelery')} className="ml-5 cursor-pointer">Jewelery</h1>
      </div>
    );
  }
  
  export default Menubar;
  