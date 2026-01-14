import { useMemo, useState } from "react";
import { sendContactMessage } from "../services/contactApi";

export default function FormularioContact() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "general", // Ahora es un select
    mensaje: "",
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = useMemo(() => {
    return (
      form.nombre.trim() &&
      /\S+@\S+\.\S+/.test(form.email) &&
      form.telefono.trim() &&
      form.asunto &&
      form.mensaje.trim()
    );
  }, [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Adaptar los datos al formato que espera el backend
      const contactData = {
        fullName: form.nombre,
        email: form.email,
        phone: form.telefono,
        subject: form.asunto,
        message: form.mensaje
      };

      await sendContactMessage(contactData);
      
      // Éxito
      setStatus({
        type: 'success',
        message: '¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.'
      });
      
      // Limpiar formulario
      setForm({ 
        nombre: "", 
        email: "", 
        telefono: "", 
        asunto: "general", 
        mensaje: "" 
      });

      // Scroll al mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.'
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Contáctanos</h1>

      <div className="space-y-4 text-neutral-700 max-w-3xl mb-10">
        <p>
          ¿Tienes alguna pregunta, quieres ser voluntario o deseas apoyarnos? 
          Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
        <p>
          También puedes contactarnos directamente por WhatsApp o visitarnos en nuestras instalaciones.
        </p>
      </div>

      {/* Mensajes de estado */}
      {status.message && (
        <div className={`mb-6 p-4 rounded-lg ${
          status.type === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <p className="font-medium">{status.message}</p>
        </div>
      )}

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Escríbenos</h2>

      <div className="bg-neutral-200 rounded-xl p-6 md:p-8">
        <form
          onSubmit={onSubmit}
          className="max-w-2xl mx-auto"
          aria-labelledby="contact-form-title"
        >
          <h3 id="contact-form-title" className="sr-only">
            Formulario de contacto
          </h3>

          <div className="space-y-5">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-neutral-800">
                Nombre y apellido <span aria-hidden="true">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                autoComplete="name"
                value={form.nombre}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg bg-white border border-neutral-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Tu nombre completo"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-800">
                Correo electrónico <span aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg bg-white border border-neutral-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="tucorreo@ejemplo.com"
                aria-invalid={form.email && !/\S+@\S+\.\S+/.test(form.email)}
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-neutral-800">
                  Número de teléfono (de WhatsApp) <span aria-hidden="true">*</span>
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.telefono}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-white border border-neutral-300 px-3 py-2
                             focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="+502 5555-5555"
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-neutral-800">
                  Asunto <span aria-hidden="true">*</span>
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  required
                  value={form.asunto}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-lg bg-white border border-neutral-300 px-3 py-2
                             focus:outline-none focus:ring-2 focus:ring-black"
                  disabled={isSubmitting}
                >
                  <option value="general">Consulta general</option>
                  <option value="volunteer">Quiero ser voluntario</option>
                  <option value="donation">Donaciones</option>
                  <option value="found_pet">Encontré una mascota</option>
                  <option value="lost_pet">Perdí mi mascota</option>
                  <option value="other">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-800">
                Tu mensaje <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={6}
                value={form.mensaje}
                onChange={onChange}
                className="mt-1 block w-full rounded-lg bg-white border border-neutral-300 px-3 py-2
                           focus:outline-none focus:ring-2 focus:ring-black resize-y"
                placeholder="Cuéntanos en qué podemos ayudarte"
                disabled={isSubmitting}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className={`px-6 py-2 rounded-lg font-semibold shadow transition-all
                 ${isValid && !isSubmitting
                   ? "bg-black text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                   : "bg-neutral-300 text-neutral-600 cursor-not-allowed"}`}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar ▸'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}