
// src/app/workflow/page.tsx
import FirmLayout from "@/components/layout/firm-layout";
import PayVibeWorkflowDiagram from "@/components/workflow/PayVibeWorkflowDiagram";

export default function WorkflowPage() {
  return (
    <FirmLayout>
      <PayVibeWorkflowDiagram />
    </FirmLayout>
  );
}
