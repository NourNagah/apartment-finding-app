export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="text-left">© {new Date().getFullYear()} Nawy. All rights reserved.</div>
        <div className="flex flex-wrap gap-4 justify-start">
          <a className="hover:text-gray-700" href="https://www.nawy.com/" target="_blank" rel="noopener noreferrer">Contact</a>
          <a className="hover:text-gray-700" href="https://www.nawy.com/" target="_blank" rel="noopener noreferrer">About Nawy</a>
          <a className="hover:text-gray-700" href="https://www.nawy.com/" target="_blank" rel="noopener noreferrer">Privacy</a>
          <a className="hover:text-gray-700" href="https://www.nawy.com/" target="_blank" rel="noopener noreferrer">Terms</a>
        </div>
      </div>
    </footer>
  )
}