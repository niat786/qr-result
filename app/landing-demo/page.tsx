'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LandingDemoContent() {
  const searchParams = useSearchParams();
  const [currentTime] = useState(new Date());
  const [deviceType, setDeviceType] = useState('desktop');
  
  // Detect device type
  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      setDeviceType('mobile');
    } else if (/iPad/i.test(userAgent)) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, []);

  // Get URL parameters
  const source = searchParams.get('source') || 'direct';
  const campaign = searchParams.get('campaign') || 'default';
  const hour = currentTime.getHours();

  // Determine content based on conditions
  const getContent = () => {
    // Time-based content
    if (hour >= 6 && hour < 12) {
      return {
        period: 'Morning',
        title: 'Good Morning! Start Your Day Right',
        subtitle: 'Early bird specials and morning productivity tools',
        bgColor: 'from-orange-400 to-yellow-500',
        offer: '30% OFF Morning Essentials',
        cta: 'Get Morning Deal'
      };
    } else if (hour >= 12 && hour < 17) {
      return {
        period: 'Afternoon',
        title: 'Afternoon Productivity Boost',
        subtitle: 'Midday solutions for busy professionals',
        bgColor: 'from-blue-500 to-cyan-500',
        offer: 'Free Trial + Lunch & Learn',
        cta: 'Start Free Trial'
      };
    } else if (hour >= 17 && hour < 22) {
      return {
        period: 'Evening',
        title: 'Unwind and Plan Ahead',
        subtitle: 'Evening relaxation and next-day preparation',
        bgColor: 'from-purple-500 to-pink-500',
        offer: 'Buy 2 Get 1 Free',
        cta: 'Shop Evening Deal'
      };
    } else {
      return {
        period: 'Late Night',
        title: 'Night Owl Special',
        subtitle: 'Exclusive late-night offers for insomniacs',
        bgColor: 'from-indigo-600 to-purple-700',
        offer: '40% OFF + Free Shipping',
        cta: 'Claim Night Deal'
      };
    }
  };

  // Device-specific content
  const getDeviceContent = () => {
    switch (deviceType) {
      case 'mobile':
        return {
          appPrompt: 'Download our mobile app for the best experience',
          features: ['One-tap ordering', 'Push notifications', 'Offline mode'],
          ctaSecondary: 'Download App'
        };
      case 'tablet': 
        return {
          appPrompt: 'Tablet-optimized interface available',
          features: ['Split-screen view', 'Touch gestures', 'Presentation mode'],
          ctaSecondary: 'Try Tablet View'
        };
      default:
        return {
          appPrompt: 'Full desktop experience with advanced features',
          features: ['Advanced analytics', 'Bulk operations', 'Multi-window support'],
          ctaSecondary: 'Explore Desktop'
        };
    }
  };

  // Source-specific content
  const getSourceContent = () => {
    switch (source) {
      case 'print':
        return {
          sourceMsg: 'Welcome from our print advertisement!',
          bonus: 'Print readers get extra 15% off',
          sourceIcon: 'ri-newspaper-line'
        };
      case 'social':
        return {
          sourceMsg: 'Thanks for following us on social media!',
          bonus: 'Social followers get free premium upgrade',
          sourceIcon: 'ri-share-line'
        };
      case 'email':
        return {
          sourceMsg: 'Great to see you from our email campaign!',
          bonus: 'Email subscribers get priority support',
          sourceIcon: 'ri-mail-line'
        };
      default:
        return {
          sourceMsg: 'Welcome to our dynamic landing page!',
          bonus: 'New visitors get welcome bonus',
          sourceIcon: 'ri-star-line'
        };
    }
  };

  const timeContent = getContent();
  const deviceContent = getDeviceContent();
  const sourceContent = getSourceContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Dynamic Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="ri-qr-code-fill text-white text-xl"></i>
              </div>
              <span className="font-['Pacifico'] text-2xl text-gray-900">DynamicLand</span>
            </div>
            <div className="text-sm text-gray-500">
              {timeContent.period} • {deviceType} • {source}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${timeContent.bgColor} text-white py-20`}>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Dynamic%20landing%20page%20with%20$%7BtimeContent.period.toLowerCase%28%29%7D%20lighting%2C%20modern%20business%20environment%2C%20professional%20team%20working%20with%20technology%2C%20$%7BtimeContent.period.toLowerCase%28%29%7D%20atmosphere%2C%20productive%20workspace&width=1920&height=1080&seq=landing-${timeContent.period.toLowerCase()}&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          {/* Source Welcome Message */}
          <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <i className={`${sourceContent.sourceIcon} text-xl`}></i>
            <span className="text-sm font-medium">{sourceContent.sourceMsg}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {timeContent.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {timeContent.subtitle}
          </p>

          {/* Time-sensitive offer */}
          <div className="inline-block bg-white/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">{timeContent.offer}</div>
            <div className="text-sm text-white/80">+ {sourceContent.bonus}</div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              <i className="ri-shopping-cart-line mr-2"></i>
              {timeContent.cta}
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              <i className="ri-smartphone-line mr-2"></i>
              {deviceContent.ctaSecondary}
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optimized for {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} Users
            </h2>
            <p className="text-xl text-gray-600">{deviceContent.appPrompt}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {deviceContent.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 bg-gradient-to-r ${timeContent.bgColor} rounded-xl flex items-center justify-center mb-6`}>
                  <i className="ri-check-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature}</h3>
                <p className="text-gray-600">Specially designed for {deviceType} users to provide the best possible experience.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Stats Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {hour < 12 ? '2.5K' : hour < 17 ? '5.8K' : hour < 22 ? '3.2K' : '1.1K'}
              </div>
              <div className="text-gray-600">Active Users Now</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {deviceType === 'mobile' ? '95%' : deviceType === 'tablet' ? '87%' : '92%'}
              </div>
              <div className="text-gray-600">{deviceType} Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {source === 'print' ? '15' : source === 'social' ? '8' : source === 'email' ? '12' : '10'}min
              </div>
              <div className="text-gray-600">Avg. Session Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-gray-600">Dynamic Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Info Panel */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Live Page Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Time:</span>
                  <span className="font-mono">{currentTime.toLocaleTimeString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Device Type:</span>
                  <span className="capitalize">{deviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Traffic Source:</span>
                  <span className="capitalize">{source}</span>
                </div>
                <div className="flex justify-between">
                  <span>Campaign:</span>
                  <span className="capitalize">{campaign}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Content Period:</span>
                  <span>{timeContent.period}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Offer:</span>
                  <span className="text-green-400">{timeContent.offer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bonus Applied:</span>
                  <span className="text-blue-400">{sourceContent.bonus}</span>
                </div>
                <div className="flex justify-between">
                  <span>Page Variant:</span>
                  <span>{deviceType}-{timeContent.period.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 bg-gradient-to-r ${timeContent.bgColor}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Experience Dynamic QR Technology</h2>
          <p className="text-xl mb-8 opacity-90">
            This page automatically adapts based on time, device, and traffic source
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              Try It Yourself
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <i className="ri-qr-code-fill text-white"></i>
            </div>
            <span className="font-['Pacifico'] text-xl">DynamicLand</span>
          </div>
          <p className="text-gray-400 text-sm">
            Powered by Dynamic QR Technology • Page generated at {currentTime.toLocaleString()}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Content adapted for: {deviceType} • {timeContent.period} • {source} traffic
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function LandingDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dynamic content...</p>
        </div>
      </div>
    }>
      <LandingDemoContent />
    </Suspense>
  );
}