import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ContactPage() {
  const mapDirectionsUrl = "https://goo.gl/maps/VxbhWkrEUayvswZL7";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3955.3386831193543!2d37.853112075002414!3d7.537991992475343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMzInMTYuOCJOIDM3wrA1MScyMC41IkU!5e0!3m2!1sen!2set!4v1768083428377!5m2!1sen!2set";

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
              Contact Us
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl mx-auto font-normal drop-shadow-sm">
              Visit us or get in touch - we&apos;re here to help
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Details */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-12 tracking-tight">Get in Touch</h2>
                
                <div className="space-y-8">
                  {/* Address */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Location</h3>
                    <p className="text-gray-600">
                      Hossana, Ethiopia
                    </p>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Phone</h3>
                    <div className="space-y-2">
                      <div>
                        <a
                          href="tel:+251911662934"
                          className="text-gray-600 hover:text-primary-600 transition-colors block"
                        >
                          +251 911 662 934
                        </a>
                      </div>
                      <div>
                        <a
                          href="tel:+25178819400"
                          className="text-gray-600 hover:text-primary-600 transition-colors block"
                        >
                          +251 788 194 00
                        </a>
                      </div>
                      <div>
                        <a
                          href="tel:+251912645392"
                          className="text-gray-600 hover:text-primary-600 transition-colors block"
                        >
                          +251 912 645 392
                        </a>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Call us during business hours
                    </p>
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">WhatsApp</h3>
                    <a
                      href="https://wa.me/251911662934"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      Message us on WhatsApp (+251 911 662 934)
                    </a>
                    <p className="text-sm text-gray-500 mt-1">
                      Available for quick inquiries
                    </p>
                  </div>

                  {/* Opening Hours */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-2 uppercase tracking-wider">Opening Hours</h3>
                    <div className="text-gray-600 space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">8:00 AM - 8:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="mt-12 space-y-3">
                  <a
                    href="tel:+251911662934"
                    className="btn-primary w-full text-center inline-block"
                  >
                    Call Now (+251 911 662 934)
                  </a>
                  <a
                    href="https://wa.me/251911662934"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center inline-block"
                  >
                    WhatsApp Us
                  </a>
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline w-full text-center inline-block"
                  >
                    Get Directions
                  </a>
                </div>
              </div>

              {/* Map */}
              <div>
                <h2 className="text-2xl font-light text-gray-900 mb-6 tracking-tight">Find Us</h2>
                <div className="border border-gray-200 overflow-hidden rounded">
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                    title="Leyuwork Pharmacy Location"
                  ></iframe>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  <a
                    href={mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline"
                  >
                    Open in Google Maps for detailed directions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="section-padding bg-white border-y border-gray-200">
          <div className="container-custom max-w-3xl">
            <h2 className="text-2xl font-light text-gray-900 text-center mb-8 tracking-tight">
              We&apos;re Here to Help
            </h2>
            <div className="bg-white border-l-4 border-primary-600 p-8 border border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Whether you need prescription medications, over-the-counter products, or health advice, 
                our team is ready to assist you. We recommend calling ahead to check product availability, 
                especially for specific prescription medications.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                For urgent health matters, please contact emergency services. For medication refills and 
                general inquiries, feel free to visit us during our opening hours or reach out via phone 
                or WhatsApp.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
