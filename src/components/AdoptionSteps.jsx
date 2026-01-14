const steps = [
  {
    title: "Paso 1",
    description: "Descarga el formulario e imprímelo",
    Icon: DownloadIcon,
  },
  {
    title: "Paso 2",
    description: "Llena los datos solicitados",
    Icon: FormIcon,
  },
  {
    title: "Paso 3",
    description: "Escanea el documento en PDF",
    Icon: ScanIcon,
  },
  {
    title: "Paso 4",
    description: "Carga el documento escaneado y envíalo",
    Icon: UploadIcon,
  },
];

export default function AdoptionSteps() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => {
        const StepIcon = step.Icon;

        return (
          <div key={step.title} className="text-center flex flex-col items-center gap-4">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-sky-100">
              <StepIcon className="h-12 w-12 text-sky-500" />
            </div>
            <div>
              <p className="text-xl font-semibold text-neutral-900">{step.title}</p>
              <p className="mt-1 text-sm text-neutral-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <path d="M24 6v24" strokeLinecap="round" />
      <path d="m14 24 10 10 10-10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 36h24" strokeLinecap="round" />
    </svg>
  );
}

function FormIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <rect x="9" y="6" width="30" height="36" rx="4" />
      <path d="M18 16h12" strokeLinecap="round" />
      <path d="M18 24h12" strokeLinecap="round" />
      <path d="M18 32h8" strokeLinecap="round" />
    </svg>
  );
}

function ScanIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <rect x="9" y="14" width="30" height="20" rx="4" />
      <path d="M4 14h8" strokeLinecap="round" />
      <path d="M36 14h8" strokeLinecap="round" />
      <path d="M4 34h8" strokeLinecap="round" />
      <path d="M36 34h8" strokeLinecap="round" />
      <path d="M18 24h12" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon(props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <path d="M24 30V6" strokeLinecap="round" />
      <path d="m14 18 10-10 10 10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 34h24" strokeLinecap="round" />
      <path d="M16 40h16" strokeLinecap="round" />
    </svg>
  );
}
