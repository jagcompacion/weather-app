import { NavLink } from "react-router-dom";

const activeClassName = "bg-slate-900 text-slate-50 hover:bg-slate-900/90";

const Footer = () => {
  return (
    <div className="p-4">
      <div className="text-sm font-medium text-center rounded-md border border-slate-200 flex">
        <NavLink
          to="/forecast"
          className={({ isActive }) =>
            `flex-1 py-4 text-center ${
              isActive ? activeClassName : ""
            } rounded-l-md`
          }
        >
          Forcast
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex-1 py-4 text-center ${
              isActive ? activeClassName : ""
            } rounded-r-md`
          }
        >
          History
        </NavLink>
      </div>
    </div>
  );
};

export default Footer;
