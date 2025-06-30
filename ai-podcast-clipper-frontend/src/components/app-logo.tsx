import { Mic } from "lucide-react";
const AppLogo = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-xl">
          <Mic className="text-primary-foreground h-6 w-6" />
        </div>
        <div className="bg-chart-2 absolute -top-1 -right-1 h-4 w-4 animate-ping rounded-full" />
      </div>
      <span className="text-foreground text-2xl font-bold">PodClip AI</span>
    </div>
  );
};

export default AppLogo;
