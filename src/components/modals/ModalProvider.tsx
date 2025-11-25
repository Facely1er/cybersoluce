import React, { createContext, useState, useContext } from 'react';
import AssessmentModal from './AssessmentModal';
import PricingModal from './PricingModal';
import UpgradePromptModal from './UpgradePromptModal';
import DemoModeOverlay from './DemoModeOverlay';

type ModalType = 'assessment' | 'pricing' | 'upgrade' | 'demo' | null;
type ModalContextType = {
  openModal: (type: ModalType, data?: any) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalData: any;
};

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  modalType: null,
  modalData: null,
});

export const useModal = () => useContext(ModalContext);

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<any>(null);
  
  const openModal = (type: ModalType, data?: any) => {
    setModalType(type);
    setModalData(data);
  };
  
  const closeModal = () => {
    setModalType(null);
    setModalData(null);
  };
  
  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalType, modalData }}>
      {children}
      
      {modalType === 'assessment' && (
        <AssessmentModal onClose={closeModal} data={modalData} />
      )}
      
      {modalType === 'pricing' && (
        <PricingModal onClose={closeModal} data={modalData} />
      )}
      
      {modalType === 'upgrade' && (
        <UpgradePromptModal onClose={closeModal} data={modalData} />
      )}
      
      {modalType === 'demo' && (
        <DemoModeOverlay onClose={closeModal} data={modalData} />
      )}
    </ModalContext.Provider>
  );
};