export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-gray-400 border-t border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm">
          © {currentYear} What's Next. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 