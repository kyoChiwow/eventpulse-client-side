import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { BsThreeDotsVertical } from "react-icons/bs";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, userLogOut } = useAuth();
  const [role] = useRole();

  const handleLogOut = () => {
    userLogOut();
  };

  return (
    <div className="bg-base-300 min-h-screen">
      <div className="drawer z-10">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content mt-4 text-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="btn bg-sky-500 btn-ghost drawer-button"
          >
            Open Dashboard Menu
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-sky-200 text-base-content min-h-full w-80 p-4">
            <h1 className="text-3xl mb-4 text-center">EventPulse</h1>
            <div className="divider"></div>
            {/* Sidebar content here */}
            <div className="flex-1">
              <li>
                <NavLink to="/dashboard" end>
                  Dashboard Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/all-events"}>All Events</NavLink>
              </li>
              {role !== "guest" && (
                <li>
                  <NavLink to="/dashboard/create-events">Create Events</NavLink>
                </li>
              )}
            </div>
            <div className="divider"></div>
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <div>
                  <img
                    className="w-12 h-12 object-cover bg-white rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
                <div>
                  <p className="font-bold">{user.displayName}</p>
                  <p className="font-bold">{user.email}</p>
                </div>
              </div>
              <div className="dropdown dropdown-right dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1">
                  <BsThreeDotsVertical />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-sky-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>

      <header className="flex flex-col justify-center items-center max-w-[88%] mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-center mt-4">
            Welcome to EventPulse Dashboard
          </h1>
        </div>
      </header>

      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
