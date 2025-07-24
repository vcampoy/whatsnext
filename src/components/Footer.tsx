export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-sm">
          © {currentYear} What's Next. All rights reserved.
        </p>
      </div>
    </footer>
  )
} 