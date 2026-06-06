import { NavLink } from "react-router-dom"
import { PlusIcon, LogOut, LogIn, UserPlus } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
  <header className="navbar bg-base-300 py-8 mb-10">
    <div className="w-full max-w-[1000px] mx-auto flex items-center justify-between">
        <NavLink className="text-3xl font-bold" to="/">
            TodoApp
        </NavLink>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <NavLink className="btn btn-soft btn-primary font-bold text-[1.1em]" to="/createNote">
                <PlusIcon />
                Crear una nota
              </NavLink>
              <button type="button" className="btn btn-soft btn-error font-bold" onClick={logout}>
                <LogOut size={18} />
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink className="btn btn-soft btn-primary font-bold" to="/login">
                <LogIn size={18} />
                Login
              </NavLink>
              <NavLink className="btn btn-soft btn-secondary font-bold" to="/register">
                <UserPlus size={18} />
                Register
              </NavLink>
            </>
          )}
        </div>
    </div>
  </header>)
    
  
}

export default NavBar
