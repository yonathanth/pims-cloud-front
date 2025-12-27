import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow">
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
          
          <div className="container-custom w-full relative z-10 px-6 sm:px-4">
            <h1 className="text-4xl md:text-6xl font-medium text-gray-900 text-center mb-6 tracking-tight drop-shadow-sm">
              About Us
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl mx-auto font-normal drop-shadow-sm">
              Learn more about Leyuwork Pharmacy and our commitment to serving our community
            </p>
          </div>
        </section>

        {/* About Content */}
        <section className="section-padding bg-white">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-tight">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Leyuwork Pharmacy has been serving the Hossana community with dedication and care. 
                We are a licensed drug store operating under Ethiopian health regulations, committed 
                to providing safe, affordable, and quality healthcare services to our neighbors.
              </p>
              
              <p>
                Our mission is to make healthcare accessible to everyone in our community. We believe 
                that quality medicines and professional health advice should be available to all, 
                regardless of their circumstances. With a focus on affordability, safety, and 
                professional service, we strive to be your trusted partner in health.
              </p>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-8 mt-16 tracking-tight">Licensed & Professional</h2>
            <div className="bg-white border-l-4 border-primary-600 p-8 mb-12 border border-gray-200">
              <p className="text-gray-900 text-lg leading-relaxed mb-4 font-medium">
                We are a licensed drug store operating under Ethiopian health regulations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our pharmacy is staffed by licensed pharmacists who are committed to providing 
                professional guidance and ensuring the safe dispensing of medications. We maintain 
                strict compliance with all health regulations and standards to ensure the safety 
                and wellbeing of our customers.
              </p>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-tight">Our Mission</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200 mb-12">
              <div className="bg-white p-8 border border-gray-200 hover:bg-primary-50 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Affordable Healthcare</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We are committed to providing affordable medicines and healthcare services 
                  to ensure that everyone in our community has access to the care they need.
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 hover:bg-primary-50 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Safe Medicines</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  All our medications are sourced from reputable suppliers and stored according 
                  to proper guidelines to ensure safety and efficacy.
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 hover:bg-primary-50 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Professional Service</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our licensed pharmacists provide professional guidance and health advice 
                  to help you make informed decisions about your health.
                </p>
              </div>
              
              <div className="bg-white p-8 border border-gray-200 hover:bg-primary-50 transition-colors">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Community Focus</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We are proud to be part of the Hossana community and are dedicated to 
                  serving our neighbors with care and respect.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-light text-gray-900 mb-8 tracking-tight">Our Team</h2>
            <p className="text-gray-600 leading-relaxed">
              Our team consists of licensed pharmacists and trained staff who are passionate 
              about healthcare and committed to serving our community. We work together to 
              ensure that every customer receives the best possible care and service.
            </p>
            
            <p className="text-gray-600 leading-relaxed mt-6">
              If you have any questions about our services or need health advice, please don't 
              hesitate to visit us or contact us. We're here to help!
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white border-y border-gray-200">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-tight">
              Visit Us Today
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              We'd love to meet you and help with your healthcare needs.
            </p>
            <a
              href="/contact"
              className="btn-outline inline-block"
            >
              Get Directions
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
