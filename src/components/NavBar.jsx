import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <div className="bg-sky-200 bg-opacity-50 backdrop-blur-sm fixed z-10 w-full">
      <div className="navbar max-w-[90%] mx-auto">
        <div className="flex-1">
          <NavLink to={"/"} className="btn btn-ghost text-xl font-bold">EventPulse</NavLink>
        </div>
        {
          user ? <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt=""
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-sky-200 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Dashboard
                </a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div> : <div>
          <NavLink to={"/login"} className="btn bg-sky-500 btn-ghost">LOGIN</NavLink>
        </div>
        }
      </div>
    </div>
  );
};

export default NavBar;
