import { useEffect, useState } from "react";
import { submitSimplifiedAdoption } from "../services/adoptionApi";

export default function AdoptionFormCard({ dog }) {
  const [fileName, setFileName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [formValues, setFormValues] = useState({
    fullName: "",
    dogName: dog?.nombre ?? "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, dogName: dog?.nombre ?? "" }));
  }, [dog]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const [file] = event.target.files || [];
    if (file) {
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        setStatus({
          type: 'error',
          message: 'Por favor, selecciona un archivo PDF válido.'
        });
        setFileName("");
        setPdfFile(null);
        return;
      }
      
      // Validar tamaño (máximo 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: 'El archivo es demasiado grande. El tamaño máximo es 10MB.'
        });
        setFileName("");
        setPdfFile(null);
        return;
      }
      
      setFileName(file.name);
      setPdfFile(file);
      setStatus({ type: '', message: '' });
    } else {
      setFileName("");
      setPdfFile(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!pdfFile) {
      setStatus({
        type: 'error',
        message: 'Por favor, carga el formulario PDF completado.'
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Crear FormData para enviar el archivo
      const formData = new FormData();
      formData.append('pet', dog.id);
      formData.append('full_name', formValues.fullName);
      formData.append('pet_name_requested', formValues.dogName);
      formData.append('phone', formValues.phone);
      formData.append('filled_form_pdf', pdfFile);

      const response = await submitSimplifiedAdoption(formData);
      
      // Éxito
      setStatus({
        type: 'success',
        message: response.message || '¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo pronto.'
      });
      
      // Limpiar formulario
      setFormValues({ 
        fullName: "", 
        dogName: dog?.nombre ?? "", 
        phone: "" 
      });
      setFileName("");
      setPdfFile(null);
      
      // Reset file input
      const fileInput = document.getElementById('adoption-file');
      if (fileInput) fileInput.value = '';
      
      // Scroll al mensaje de éxito
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Hubo un error al enviar tu solicitud. Por favor, verifica los datos e intenta nuevamente.'
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadUrl = "/docs/formulario-adopcion-huellitas.pdf";

  return (
    <>
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

      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-3xl bg-neutral-200/70 p-6 shadow-inner sm:p-10"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700">
              Nombre y apellido *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formValues.fullName}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="dogName" className="block text-sm font-medium text-neutral-700">
              Nombre del perrito *
            </label>
            <input
              id="dogName"
              name="dogName"
              type="text"
              required
              value={formValues.dogName}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">
              Número de teléfono (de WhatsApp) *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              pattern="[0-9+\s-]{8,15}"
              placeholder="Ej. +502 1234 5678"
              value={formValues.phone}
              onChange={handleChange}
              disabled={isSubmitting}
              className="mt-2 h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-sm shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 disabled:bg-neutral-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-neutral-700">Descargue el formulario aquí</p>
            <a
              href={downloadUrl}
              download
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Descargar formulario
              <span aria-hidden="true" className="text-base">⇩</span>
            </a>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-neutral-700" htmlFor="adoption-file">
              Cargue el documento PDF aquí *
            </label>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
              <label
                htmlFor="adoption-file"
                className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-300 px-5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                Cargar formulario
                <span aria-hidden="true" className="text-base">⇧</span>
              </label>
              <input
                id="adoption-file"
                type="file"
                required
                accept="application/pdf"
                onChange={handleFileChange}
                disabled={isSubmitting}
                className="sr-only"
              />
              <p className={`text-xs sm:ml-2 ${fileName ? 'text-green-600 font-medium' : 'text-neutral-500'}`}>
                {fileName || "Sin archivos seleccionados"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !pdfFile}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl px-8 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              isSubmitting || !pdfFile
                ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                : 'bg-sky-400 text-white hover:bg-sky-500'
            }`}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
            <span aria-hidden="true">{isSubmitting ? '⏳' : '➜'}</span>
          </button>
        </div>
      </form>
    </>
  );
}