import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow relative">
        {/* Hero Section - Full Screen Height */}
        <section className="min-h-screen flex items-center justify-center relative border-b border-gray-200 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/pharma.jpg)',
            }}
          ></div>
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-primary-50/80"></div>
          
          <div className="container-custom w-full relative z-10">
            <div className="text-center max-w-2xl mx-auto px-6 sm:px-4">
              <h1 className="text-5xl md:text-7xl font-medium text-gray-900 mb-6 tracking-tight drop-shadow-sm md:whitespace-nowrap">
                Leyuwork Pharmacy
              </h1>
              <p className="text-lg md:text-2xl text-gray-700 mb-12 font-normal drop-shadow-sm">
                Your trusted neighborhood pharmacy in Hossana, Ethiopia
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
                <a
                  href="tel:+251911662934"
                  className="btn-primary inline-flex items-center justify-center w-auto sm:w-auto mx-auto sm:mx-0"
                >
                  Call Now
                </a>
                <a
                  href="https://goo.gl/maps/VxbhWkrEUayvswZL7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center w-auto sm:w-auto mx-auto sm:mx-0"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Summary */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-light text-center text-gray-900 mb-16 tracking-tight">
              What We Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200">
              <div className="bg-white p-8 border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-4 text-primary-600 font-light">Rx</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Prescription Drugs</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Licensed dispensing of prescription medications with professional guidance.
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-4 text-primary-600 font-light">OTC</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">OTC Medicines</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Over-the-counter medications for common health conditions.
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-4 text-primary-600 font-light">+</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Medical Supplies</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Essential medical equipment and supplies for home healthcare.
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="text-3xl mb-4 text-primary-600 font-light">i</div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Health Advice</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Professional health guidance from our licensed pharmacists.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link href="/services" className="btn-outline">
                View All Services
              </Link>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="section-padding bg-white border-y border-gray-200">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-light text-center text-gray-900 mb-16 tracking-tight">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-primary-200 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-600">✓</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Licensed & Certified</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Operating under Ethiopian health regulations with licensed pharmacists.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-primary-200 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-600">$</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Affordable Prices</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Committed to providing affordable medicines for all members of our community.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 border-2 border-primary-200 bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-600">★</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Quality Service</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Professional, friendly service with a focus on your health and wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white border-t border-gray-200">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight text-gray-900">
              Need Help? We&apos;re Here for You
            </h2>
            <p className="text-lg mb-12 text-gray-600 font-light">
              Visit us today or contact us for any health-related questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+251911662934"
                className="bg-gray-900 text-white px-8 py-3 font-medium hover:bg-gray-800 transition-colors inline-flex items-center justify-center border border-gray-900"
              >
                Call Now
              </a>
              <Link
                href="/contact"
                className="border border-gray-900 text-gray-900 px-8 py-3 font-medium hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
