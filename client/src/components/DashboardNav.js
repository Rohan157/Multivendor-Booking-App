import { Link } from "react-router-dom";

const DashboardNav = () => {
  //to give us the link of where we are right now regarding location such as /restration or login or etc
  const active = window.location.pathname;
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard" && "active"}`}
          to="/dashboard"
        >
          Your Bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/dashboard/seller" && "active"}`}
          to="/dashboard/seller"
        >
          Your Hotels
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
