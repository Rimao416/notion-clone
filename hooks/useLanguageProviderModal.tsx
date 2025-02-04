import { create } from "zustand";
interface LanguageProviderModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useLanguageProviderModal = create<LanguageProviderModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useLanguageProviderModal;
