import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">404 Not Found</h2>
      <p className="text-gray-600 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
} 