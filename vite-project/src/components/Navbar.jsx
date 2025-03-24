import logo from '../assets/images/logo.png'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  const linkClass = ({ isActive }) => isActive ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'

  return (
    <nav className="w-screen h-20 "
    style={{
      backgroundImage:
        "linear-gradient(to right, #110158, rgba(0, 41, 116, 0.72),rgb(0, 44, 116))",
    }}>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              {/* Logo */}
              <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                <img
                  className="h-10 w-auto"
                  src={logo}
                  alt="React Jobs"
                />
                <span className="hidden md:block text-white text-2xl font-bold ml-2">
                  Invos Global
                </span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink
                    to="/"
                    className={linkClass}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/jobs"
                    className={linkClass}>
                    Jobs
                  </NavLink>
                  <NavLink
                    to="/add-job"
                    className={linkClass}>
                    Add Job
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={linkClass}>
                    Log Out
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar