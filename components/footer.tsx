import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* About Section - Centered on mobile */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Leyuwork Pharmacy</h3>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed max-w-md mx-auto md:mx-0">
              Licensed pharmacy in Hossana, Ethiopia. Providing safe, affordable medicines and quality health services.
            </p>
            <p className="text-xs text-gray-400">
              Licensed and operating under Ethiopian health regulations.
            </p>
          </div>

          {/* Quick Links - Centered on mobile */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 inline-block">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 inline-block">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors duration-200 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - Centered on mobile */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Hossana, Ethiopia</li>
              <li>
                <a href="tel:+251" className="hover:text-white transition-colors duration-200 inline-block">
                  Call Us
                </a>
              </li>
              <li>
                <a href="https://wa.me/251" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 inline-block">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Leyuwork Pharmacy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
