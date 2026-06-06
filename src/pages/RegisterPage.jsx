import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../lib/api";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
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
      const { data } = await api.post("/api/auth/register", form);
      login(data.token);
      toast.success("Cuenta creada correctamente");
      navigate(from, { replace: true });
    } catch (error) {
      const status = error?.response?.status;
      const message =
        status === 409
          ? "Ese email ya está registrado"
          : error?.response?.data?.error || "No se pudo crear la cuenta";
      toast.error(message);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-base-300 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Crear cuenta</h1>
        <p className="opacity-70 mb-6">Registrate para administrar tus notas.</p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            className="block w-full input lg:input-lg focus:ring-0 focus:outline-0 border-0"
            type="text"
            name="name"
            placeholder="Nombre"
            value={form.name}
            onChange={handleChange}
            required
            minLength={2}
          />

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
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={form.phone}
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

          <button className="btn btn-soft btn-primary w-full">Registrar</button>
        </form>

        <p className="mt-4 text-sm">
          ¿Ya tenés cuenta?{" "}
          <Link className="link link-primary" to="/login">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
