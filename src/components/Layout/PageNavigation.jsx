import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PageNavigation() {
  const navigate = useNavigate();

  return (
    <div className="mb-4 flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-400/20 bg-orange-400/15 text-white transition hover:bg-orange-400/25 sm:h-11 sm:w-11"
        title="Go back"
      >
        <ArrowLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => navigate(1)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-400/20 bg-sky-400/15 text-white transition hover:bg-sky-400/25 sm:h-11 sm:w-11"
        title="Go forward"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}

export default PageNavigation;
