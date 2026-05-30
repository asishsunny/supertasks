"use client";

import { FormModal } from "@/components/overlays/FormModal";
import { MODAL_CONFIGS } from "@/lib/data";

export default function FormModalGallery() {
  return <FormModal config={MODAL_CONFIGS.create_task} open onClose={() => {}} />;
}
