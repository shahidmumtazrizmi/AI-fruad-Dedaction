// src/app/loading.tsx

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative h-16 w-16">
        <div className="absolute left-0 top-0 h-full w-full animate-[spin_1.5s_linear_infinite] rounded-full border-4 border-dashed border-primary"></div>
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-[spin_1.5s_ease-in-out_infinite] rounded-full border-2 border-solid border-accent"></div>
      </div>
    </div>
  );
}
