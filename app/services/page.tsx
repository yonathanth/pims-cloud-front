import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ServicesPage() {
  const services = [
    {
      title: 'Prescription Medication Dispensing',
      description: 'We provide professional dispensing of prescription medications with proper guidance from our licensed pharmacists. All prescriptions are handled with care and attention to ensure safety and efficacy.',
    },
    {
      title: 'Over-the-Counter Medicines',
      description: 'A wide range of OTC medications for common health conditions including pain relief, cold and flu, digestive issues, and more. Our staff can help you choose the right product for your needs.',
    },
    {
      title: 'Medical Equipment',
      description: 'Essential medical equipment and supplies including blood pressure monitors, thermometers, first aid supplies, and other home healthcare essentials.',
    },
    {
      title: 'Vitamins & Supplements',
      description: 'Quality vitamins and dietary supplements to support your health and wellbeing. We offer a variety of options to meet different nutritional needs.',
    },
    {
      title: 'Basic Health Guidance',
      description: 'Professional health advice and guidance from our licensed pharmacists. We can help answer questions about medications, health conditions, and general wellness.',
    },
    {
      title: 'Medication Consultation',
      description: 'Consult with our pharmacists about your medications, potential interactions, proper usage, and any concerns you may have about your treatment.',
    },
  ];

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
              Our Services
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl mx-auto font-normal drop-shadow-sm">
              Comprehensive healthcare services to meet all your medical needs
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-8 hover:bg-primary-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="section-padding bg-white border-y border-gray-200">
          <div className="container-custom max-w-3xl">
            <div className="bg-white border-l-4 border-primary-600 p-8 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Important Notice
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We do not list specific prescription drug names online for safety and compliance reasons. 
                Please visit our pharmacy or contact us directly to inquire about specific medications. 
                Our licensed pharmacists are available to assist you with all your prescription needs.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-gray-900 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-tight">
              Need Our Services?
            </h2>
            <p className="text-lg mb-12 text-gray-400 font-light">
              Visit us today or contact us for more information
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+251"
                className="bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors inline-flex items-center justify-center border border-white"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/251"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
