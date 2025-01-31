import Image from "next/image"; // Assure-toi d'importer Image depuis next/image

interface LoginButtonProps {
  icon: string;
  text: string;
  onClick: () => void;
}

function LoginButton({ icon, text, onClick }: LoginButtonProps) {
  return (
    <div className="border-gray-200 border block w-full mb-2 relative px-2 py-3 rounded-lg">
      {/* Conteneur pour l'icône et le texte */}
      <div className="flex items-center gap-2">
        {/* Image de l'icône */}
        <Image src={icon} alt={text} width={20} height={20} className="inline-block" />
        {/* Bouton avec le texte */}
        <button onClick={onClick} className="flex-1 text-center text-sm font-medium">
          {text}
        </button>
      </div>
    </div>
  );
}

export default LoginButton;