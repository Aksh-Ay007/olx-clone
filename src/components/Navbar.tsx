import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup"; // Import auth from firebase setup
import { signOut } from "firebase/auth"; // Import signOut method from firebase/auth
import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import Login from "./Login";

type SearchProp = {
  setSearch: (value: string) => void; // Define the type for setSearch as a function that takes a string
};

function Navbar({ setSearch }: SearchProp) {
  const [loginPopUp, setLoginPopUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Store search term in local state
  const [user, setUser] = useState<any>(null); // Store logged-in user information
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Check if user is logged in when the component mounts
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Update user state based on authentication
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Function to handle search submission
  const handleSearch = () => {
    setSearch(searchTerm); // Pass search term to parent via setSearch prop
  };

  // Function to handle logo click and redirect to home
  const handleLogoClick = () => {
    navigate("/"); // Redirect to home page ("/")
  };

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      navigate("/"); // Redirect to home after logout
    } catch (error) {
      console.log("Logout error: ", error); // Handle logout error
    }
  };

  return (
    <>
      <div className="flex p-4 items-center bg-slate-100 shadow-md">
        <img 
          src={olx} 
          className="w-11 h-9 cursor-pointer" 
          onClick={handleLogoClick} // Add onClick to navigate
          alt="OLX Logo" 
        />

        <div className="flex border border-spacing-1 w-64 p-2 border-black ml-5 items-center bg-white">
          <img src={lens} className="w-6 h-5" />
          <input placeholder="Location" className="ml-3 outline-none" />
          <img src={arrow} className="w-8 h-7" />
        </div>

        <div className="flex items-center border-2 border-black bg-white ml-4">
          <input
            placeholder="Find cars, mobile phones, and more"
            className="ml-4 w-96 h-10 p-2 outline-none"
            value={searchTerm} // Bind input value to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <button onClick={handleSearch} className="p-0">
            <img src={search} className="w-10 h-10" />
          </button>
        </div>

        <div className="flex h-12 p-3 ml-10 cursor-pointer items-center">
          <h1 className="font-semibold">English</h1>
          <img src={arrow} className="w-8 h-7 ml-2" />
        </div>

        {user ? (
          <>
            {/* Display Logout button if the user is logged in */}
            <div
              onClick={handleLogout}
              className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline items-center"
            >
              <h1 className="font-bold text-lg">Logout</h1>
            </div>
          </>
        ) : (
          <>
            {/* Display Login button if the user is not logged in */}
            <div
              onClick={() => setLoginPopUp(!loginPopUp)}
              className="flex h-12 p-3 ml-6 cursor-pointer underline hover:no-underline items-center"
            >
              <h1 className="font-bold text-lg">Login</h1>
            </div>
          </>
        )}

        <div className="flex h-12 p-2 ml-6 cursor-pointer rounded-full border border-yellow-500 items-center">
          <h1 className="font-bold text-lg ml-3">+Sell</h1>
        </div>
      </div>

      {loginPopUp && <Login setLoginPopUp={setLoginPopUp} />}
    </>
  );
}

export default Navbar;
