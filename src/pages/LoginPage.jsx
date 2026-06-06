import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/api/auth/login", form);
      login(data.token);
      toast.success("Sesión iniciada correctamente");
      navigate(from, { replace: true });
    } catch (error) {
      const status = error?.response?.status;
      const message =
        status === 401
          ? "Credenciales inválidas"
          : error?.response?.data?.error || "No se pudo iniciar sesión";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-base-300 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Iniciar sesión</h1>
        <p className="opacity-70 mb-6">Accedé con tu cuenta para ver tus notas.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="block w-full input lg:input-lg focus:ring-0 focus:outline-0 border-0"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="block w-full input lg:input-lg focus:ring-0 focus:outline-0 border-0"
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button className="btn btn-soft btn-primary w-full">Entrar</button>
        </form>

        <p className="mt-4 text-sm">
          ¿No tenés cuenta?{" "}
          <Link className="link link-primary" to="/register">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
