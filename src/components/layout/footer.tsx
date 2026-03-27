export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="text-xs text-neutral-medium">
          &copy; {new Date().getFullYear()} AUTO24. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
