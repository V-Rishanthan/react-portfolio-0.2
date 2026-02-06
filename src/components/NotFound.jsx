import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl text-center bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur">
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
