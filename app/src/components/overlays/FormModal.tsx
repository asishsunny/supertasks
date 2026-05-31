"use client";

import type { ModalConfig } from "@/types";
import { CreateTaskModal } from "@/components/blocks/CreateTaskModal";

interface FormModalProps {
  config: ModalConfig;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export function FormModal({ config, open, onClose, onSubmit }: FormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Scrim */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      {/* Modal */}
      <div className="relative w-full max-w-[520px] mx-4">
        <CreateTaskModal
          title={config.title}
          fields={config.fields}
          primaryAction={config.actions.primary}
          secondaryAction={config.actions.secondary}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}
