import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

export default function ProductsPage() {
  const categories = [
    {
      name: 'Pain Relief',
      description: 'Medications for managing pain and discomfort',
    },
    {
      name: 'Cold & Flu',
      description: 'Products to help with cold and flu symptoms',
    },
    {
      name: 'Vitamins',
      description: 'Essential vitamins and nutritional supplements',
    },
    {
      name: 'First Aid',
      description: 'First aid supplies and wound care products',
    },
    {
      name: 'Medical Equipment',
      description: 'Blood pressure monitors, thermometers, and more',
    },
    {
      name: 'Personal Care',
      description: 'Personal hygiene and care products',
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
              Our Products
            </h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-2xl mx-auto font-normal drop-shadow-sm">
              Browse our product categories
            </p>
          </div>
        </section>

        {/* Product Categories */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-8 hover:bg-primary-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {category.description}
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
                Product Availability
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                <strong className="text-gray-900">Availability may vary.</strong> Please visit our pharmacy or call us to confirm 
                product availability before making a trip. We update our inventory regularly, and some 
                items may be temporarily out of stock.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                For prescription medications, please bring your prescription or consult with our 
                licensed pharmacists. We can help you find the right products for your health needs.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-white border-t border-gray-200">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-4 tracking-tight">
              Have Questions About Our Products?
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Contact us to check availability or get product recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+251911662934"
                className="btn-primary inline-flex items-center justify-center"
              >
                Call to Check Availability
              </a>
              <a
                href="https://wa.me/251911662934"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center"
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
