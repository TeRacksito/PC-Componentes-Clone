import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-6 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="space-x-6">
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link to="/contact" className="hover:text-gray-400">
              Contact
            </Link>
            <Link to="/privacy" className="hover:text-gray-400">
              Privacy
            </Link>
          </div>

          <div className="mt-4 md:mt-0 text-sm">
            &copy; {new Date().getFullYear()} PC Clone. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
