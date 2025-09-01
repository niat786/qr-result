
'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: 'The Ultimate Guide to QR Code Marketing in 2024',
      excerpt: 'Discover how businesses are leveraging QR codes to boost engagement, drive sales, and create seamless customer experiences.',
      author: 'Sarah Johnson',
      date: 'March 15, 2024',
      readTime: '8 min read',
      category: 'Marketing',
      image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20marketing%20concept%20with%20QR%20codes%2C%20smartphone%20scanning%2C%20business%20growth%20charts%2C%20professional%20marketing%20materials%2C%20clean%20modern%20office%20environment%2C%20bright%20lighting&width=600&height=400&seq=blog1&orientation=landscape',
      slug: 'qr-code-marketing-guide-2024'
    },
    {
      id: 2,
      title: 'QR Codes in Restaurants: Revolutionizing the Dining Experience',
      excerpt: 'Learn how restaurants are using QR codes for contactless menus, payments, and customer feedback to enhance safety and efficiency.',
      author: 'Michael Chen',
      date: 'March 12, 2024',
      readTime: '6 min read',
      category: 'Industry',
      image: 'https://readdy.ai/api/search-image?query=Modern%20restaurant%20interior%20with%20QR%20code%20menu%20on%20table%2C%20elegant%20dining%20setup%2C%20contactless%20technology%2C%20warm%20ambient%20lighting%2C%20contemporary%20restaurant%20design&width=600&height=400&seq=blog2&orientation=landscape',
      slug: 'qr-codes-restaurants-dining-experience'
    },
    {
      id: 3,
      title: 'Security Best Practices for QR Code Implementation',
      excerpt: 'Essential security guidelines to protect your business and customers when implementing QR code solutions.',
      author: 'Dr. Alex Rivera',
      date: 'March 10, 2024',
      readTime: '10 min read',
      category: 'Security',
      image: 'https://readdy.ai/api/search-image?query=Cybersecurity%20concept%20with%20QR%20codes%2C%20digital%20shield%20protection%2C%20secure%20data%20transmission%2C%20modern%20tech%20security%20visualization%2C%20professional%20blue%20tones&width=600&height=400&seq=blog3&orientation=landscape',
      slug: 'qr-code-security-best-practices'
    },
    {
      id: 4,
      title: 'Creative QR Code Design Ideas That Actually Work',
      excerpt: 'Explore innovative QR code designs that maintain functionality while capturing attention and reinforcing brand identity.',
      author: 'Emma Watson',
      date: 'March 8, 2024',
      readTime: '7 min read',
      category: 'Design',
      image: 'https://readdy.ai/api/search-image?query=Creative%20QR%20code%20designs%20with%20artistic%20patterns%2C%20colorful%20branding%20elements%2C%20design%20studio%20workspace%2C%20creative%20marketing%20materials%2C%20modern%20graphic%20design%20setup&width=600&height=400&seq=blog4&orientation=landscape',
      slug: 'creative-qr-code-design-ideas'
    },
    {
      id: 5,
      title: 'QR Code Analytics: Measuring Success and ROI',
      excerpt: 'Master the art of QR code analytics to track performance, understand user behavior, and optimize your campaigns.',
      author: 'David Kim',
      date: 'March 5, 2024',
      readTime: '9 min read',
      category: 'Analytics',
      image: 'https://readdy.ai/api/search-image?query=Data%20analytics%20dashboard%20showing%20QR%20code%20performance%20metrics%2C%20charts%20and%20graphs%2C%20business%20intelligence%20visualization%2C%20modern%20office%20with%20multiple%20monitors&width=600&height=400&seq=blog5&orientation=landscape',
      slug: 'qr-code-analytics-measuring-success'
    },
    {
      id: 6,
      title: 'The Future of QR Codes: Trends and Predictions',
      excerpt: 'Explore emerging trends in QR code technology and how they will shape the future of digital interaction.',
      author: 'Lisa Park',
      date: 'March 3, 2024',
      readTime: '5 min read',
      category: 'Technology',
      image: 'https://readdy.ai/api/search-image?query=Futuristic%20technology%20concept%20with%20QR%20codes%2C%20holographic%20displays%2C%20advanced%20digital%20interfaces%2C%20sci-fi%20tech%20environment%2C%20purple%20and%20blue%20lighting&width=600&height=400&seq=blog6&orientation=landscape',
      slug: 'future-of-qr-codes-trends-predictions'
    }
  ];

  const categories = ['All', 'Marketing', 'Industry', 'Security', 'Design', 'Analytics', 'Technology'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            QR Code
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Insights & Tips
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Expert guides, industry insights, and best practices for QR code marketing and implementation
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full border-2 border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white hover:border-transparent transition-all duration-200 whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-200"
                  >
                    Read More
                    <i className="ri-arrow-right-line ml-2"></i>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest QR code trends, tips, and insights delivered to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
