import { useState, useCallback } from 'react';

interface ConfirmOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'default' | 'danger' | 'warning';
}

interface UseConfirmDialogReturn {
  isOpen: boolean;
  options: ConfirmOptions | null;
  openConfirm: (options: ConfirmOptions) => Promise<boolean>;
  closeConfirm: () => void;
  confirmAction: () => void;
  loading: boolean;
}

export const useConfirmDialog = (): UseConfirmDialogReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [loading, setLoading] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const openConfirm = useCallback((confirmOptions: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(confirmOptions);
      setIsOpen(true);
      setResolvePromise(() => resolve);
    });
  }, []);

  const closeConfirm = useCallback(() => {
    setIsOpen(false);
    setLoading(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
    setTimeout(() => {
      setOptions(null);
    }, 300);
  }, [resolvePromise]);

  const confirmAction = useCallback(() => {
    setLoading(true);
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
    // Note: The calling component should handle closing the dialog
  }, [resolvePromise]);

  return {
    isOpen,
    options,
    openConfirm,
    closeConfirm,
    confirmAction,
    loading
  };
};

export default useConfirmDialog;