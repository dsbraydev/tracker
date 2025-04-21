interface AuthProps {
  text: string;
  cta: () => void;
}

export function FunctionalButton({ text, cta }: AuthProps) {
  return (
    <button
      className={`bg-orange text-dark rounded-md py-1 px-4 font-semibold flex items-center gap-2 duration-300 hover:opacity-70`}
      onClick={() => cta()}
    >
      {text}
    </button>
  );
}
