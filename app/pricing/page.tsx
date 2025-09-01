
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  const features = [
    'Unlimited QR code generation',
    'All QR code types and categories',
    'Full customization options',
    'High-resolution exports (PNG, SVG, PDF)',
    'Basic analytics and tracking',
    'Mobile-responsive dashboard',
    'Email support',
    'No watermarks or branding',
    'Commercial usage rights',
    'API access (coming soon)'
  ];

  const comparisons = [
    {
      feature: 'QR Code Generation',
      qrresult: 'Unlimited',
      competitor1: '10/month',
      competitor2: '50/month'
    },
    {
      feature: 'Customization Options',
      qrresult: 'Full Access',
      competitor1: 'Limited',
      competitor2: 'Basic'
    },
    {
      feature: 'Analytics',
      qrresult: 'Detailed',
      competitor1: 'Basic',
      competitor2: 'None'
    },
    {
      feature: 'Export Formats',
      qrresult: 'PNG, SVG, PDF',
      competitor1: 'PNG only',
      competitor2: 'PNG, PDF'
    },
    {
      feature: 'Support',
      qrresult: '24/7',
      competitor1: 'Business hours',
      competitor2: 'Email only'
    },
    {
      feature: 'Price',
      qrresult: 'FREE',
      competitor1: '$9.99/month',
      competitor2: '$19.99/month'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to create professional QR codes, completely free forever
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-gradient-to-r from-blue-600 to-purple-600 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
            </div>
            
            <div className="p-8 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Free Forever Plan</h2>
              <div className="mb-6">
                <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  $0
                </span>
                <span className="text-xl text-gray-600 ml-2">forever</span>
              </div>
              <p className="text-gray-600 mb-8">
                Everything you need to create, customize, and track professional QR codes
              </p>
              
              <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 mb-8 whitespace-nowrap">
                <i className="ri-rocket-line mr-2"></i>
                Get Started Now
              </button>
              
              <div className="text-left space-y-4">
                <h3 className="font-bold text-gray-900 text-center mb-4">What's Included:</h3>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <i className="ri-check-circle-fill text-green-500 mr-3 flex-shrink-0"></i>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Free Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why is QRResult Free?</h2>
            <p className="text-xl text-gray-600">Our commitment to democratizing QR technology</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-heart-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      We believe QR technology should be accessible to everyone, regardless of budget or technical expertise.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-community-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Community Support</h3>
                    <p className="text-gray-600">
                      Our platform is supported by voluntary donations and partnerships with businesses who value our mission.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-lightbulb-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation Focus</h3>
                    <p className="text-gray-600">
                      By removing cost barriers, we can focus on building the best QR code platform possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://readdy.ai/api/search-image?query=Diverse%20team%20of%20developers%20and%20designers%20working%20together%20in%20modern%20office%2C%20collaborative%20workspace%2C%20people%20from%20different%20backgrounds%2C%20inclusive%20technology%20company%2C%20warm%20lighting%2C%20professional%20environment&width=600&height=500&seq=why-free&orientation=landscape"
                alt="Team working together"
                className="w-full h-96 object-cover object-top rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How QRResult Compares</h2>
            <p className="text-xl text-gray-600">See why we're the best choice for QR code generation</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-blue-600">QRResult</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Competitor A</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Competitor B</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {row.qrresult}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.competitor1}</td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.competitor2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing FAQ</h2>
            <p className="text-xl text-gray-600">Common questions about our free model</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Will QRResult always be free?</h3>
              <p className="text-gray-600">
                Yes! Our core QR code generation and customization features will always remain free. We're committed to 
                keeping QR technology accessible to everyone.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Are there any hidden costs?</h3>
              <p className="text-gray-600">
                No hidden costs whatsoever. You get full access to all features, unlimited QR code generation, 
                and exports without any charges or premium upgrades.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How do you sustain the platform?</h3>
              <p className="text-gray-600">
                We're supported through voluntary donations from our community and partnerships with businesses 
                who believe in our mission to democratize QR technology.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use QRResult for commercial purposes?</h3>
              <p className="text-gray-600">
                Absolutely! You have full commercial usage rights for all QR codes generated with QRResult, 
                with no licensing fees or restrictions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users creating professional QR codes for free
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
            <i className="ri-qr-code-fill mr-2"></i>
            Create Your First QR Code
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
