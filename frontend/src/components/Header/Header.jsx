import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Discover Culinary Excellence with Our Exquisite Menu</h2>
        <p>
          Explore our diverse menu, offering a tantalizing selection of dishes
          made with premium ingredients and exceptional culinary skill. Our goal
          is to delight your taste buds and enhance your dining experience with
          every flavorful bite.
        </p>
        <a href="#explore-menu">
          <button>View Menu</button>
        </a>
      </div>
    </div>
  );
};

export default Header;
