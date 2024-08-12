import { ChevronRight } from "lucide-react";

const ScrollIndicator = () => (
    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none animate-pulse md:hidden">
      <div className="h-full flex items-center justify-center">
        <ChevronRight size={24} className="text-gray-400" />
      </div>
    </div>
  );

  export default ScrollIndicator