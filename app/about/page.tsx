
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://readdy.ai/api/search-image?query=Professional%20woman%20CEO%20in%20modern%20office%2C%20confident%20business%20leader%2C%20contemporary%20corporate%20headshot%2C%20warm%20professional%20lighting%2C%20business%20suit%2C%20approachable%20smile&width=300&height=300&seq=team1&orientation=squarish',
      bio: 'Former tech executive with 15+ years in digital innovation and QR technology.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20CTO%20in%20modern%20tech%20office%2C%20experienced%20software%20engineer%2C%20contemporary%20corporate%20headshot%2C%20clean%20background%2C%20business%20casual%20attire%2C%20confident%20expression&width=300&height=300&seq=team2&orientation=squarish',
      bio: 'Software architect specializing in scalable systems and QR code generation algorithms.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://readdy.ai/api/search-image?query=Professional%20female%20designer%20in%20creative%20workspace%2C%20UI%2FUX%20expert%2C%20modern%20corporate%20headshot%2C%20artistic%20background%2C%20creative%20professional%20attire%2C%20inspiring%20smile&width=300&height=300&seq=team3&orientation=squarish',
      bio: 'Award-winning UX designer focused on creating intuitive and accessible user experiences.'
    },
    {
      name: 'David Kim',
      role: 'Head of Marketing',
      image: 'https://readdy.ai/api/search-image?query=Professional%20male%20marketing%20executive%20in%20modern%20office%2C%20digital%20marketing%20expert%2C%20contemporary%20corporate%20headshot%2C%20professional%20lighting%2C%20business%20attire%2C%20engaging%20smile&width=300&height=300&seq=team4&orientation=squarish',
      bio: 'Digital marketing strategist with expertise in growth hacking and customer acquisition.'
    }
  ];

  const values = [
    {
      icon: 'ri-user-heart-line',
      title: 'User-Centric',
      description: 'Every feature we build starts with understanding our users\' needs and challenges.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Security First',
      description: 'We prioritize data protection and privacy in every aspect of our platform.'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation',
      description: 'Constantly pushing the boundaries of what\'s possible with QR technology.'
    },
    {
      icon: 'ri-global-line',
      title: 'Accessibility',
      description: 'Making QR code technology accessible to everyone, everywhere, for free.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              QRResult
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            We're on a mission to make QR code technology accessible, powerful, and free for everyone
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  QRResult was born from a simple frustration: existing QR code generators were either 
                  too expensive, too limited, or too complicated for everyday users and businesses.
                </p>
                <p>
                  Founded in 2023, we set out to create the most comprehensive, user-friendly, and 
                  completely free QR code platform. Our team of experienced developers, designers, 
                  and marketers came together with one goal: democratize QR technology.
                </p>
                <p>
                  Today, we serve thousands of users worldwide, from small business owners to 
                  enterprise clients, helping them connect with their audiences through the power 
                  of QR codes.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20tech%20startup%20office%20with%20diverse%20team%20collaborating%2C%20innovative%20workspace%20design%2C%20QR%20code%20technology%20displays%2C%20bright%20natural%20lighting%2C%20contemporary%20furniture%2C%20creative%20environment&width=600&height=500&seq=about-story&orientation=landscape"
                alt="QRResult team working together"
                className="w-full h-96 object-cover object-top rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-rocket-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg">
                To provide the world's most powerful, user-friendly, and completely free QR code 
                generation platform that empowers businesses and individuals to connect, engage, 
                and succeed in the digital economy.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-eye-line text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg">
                A world where QR technology seamlessly bridges the physical and digital realms, 
                making information sharing instant, secure, and universally accessible across 
                all communities and industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <i className={`${value.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind QRResult</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center p-6">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover object-top"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                1M+
              </div>
              <p className="text-gray-600 font-semibold">QR Codes Generated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                50K+
              </div>
              <p className="text-gray-600 font-semibold">Active Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2">
                99.9%
              </div>
              <p className="text-gray-600 font-semibold">Uptime</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600 font-semibold">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start creating professional QR codes today, completely free
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
