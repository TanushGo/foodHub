import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="topnav">
          <li>FoodHub</li>
          <li className="home-link" key="home-button">
            <Link to="/">
              Home
            </Link>
          </li>
          
          <li className="create-link" key="create-button">
            <Link to="/create">
            Create New Post
            </Link>
          </li>
    

        </div>
        
      <Outlet />
    </div>
  );
};

export default Layout;