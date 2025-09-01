import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next/metadata';

export async function generateStaticParams() {
  return [
    { slug: 'qr-code-marketing-guide-2024' },
    { slug: 'qr-codes-restaurants-dining-experience' },
    { slug: 'qr-code-security-best-practices' },
    { slug: 'creative-qr-code-design-ideas' },
    { slug: 'qr-code-analytics-measuring-success' },
    { slug: 'future-of-qr-codes-trends-predictions' },
  ];
}

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
  tags: string[];
}

const blogPosts: Record<string, BlogPost> = {
  'qr-code-marketing-guide-2024': {
    title: 'The Ultimate Guide to QR Code Marketing in 2024',
    excerpt: 'Discover how businesses are leveraging QR codes to boost engagement, drive sales, and create seamless customer experiences.',
    author: 'Sarah Johnson',
    date: 'March 15, 2024',
    readTime: '8 min read',
    category: 'Marketing',
    image: 'https://readdy.ai/api/search-image?query=Modern%20digital%20marketing%20concept%20with%20QR%20codes%2C%20smartphone%20scanning%2C%20business%20growth%20charts%2C%20professional%20marketing%20materials%2C%20clean%20modern%20office%20environment%2C%20bright%20lighting&width=800&height=400&seq=blog-detail1&orientation=landscape',
    tags: ['QR Marketing', 'Digital Strategy', 'Customer Engagement', 'ROI'],
    content: `
<p>QR codes have experienced a remarkable renaissance in recent years, transforming from a forgotten technology to an essential marketing tool. In 2024, businesses across industries are discovering innovative ways to leverage QR codes for enhanced customer engagement and measurable results.</p>

<h2>The QR Code Revolution</h2>

<p>The global pandemic accelerated QR code adoption by nearly a decade, with usage increasing by over 750% between 2020 and 2024. Today's consumers are not only familiar with QR codes but actively expect them in various touchpoints throughout their customer journey.</p>

<blockquote>"QR codes have become the bridge between physical and digital experiences, offering businesses unprecedented opportunities to connect with customers." - Marketing Institute Report 2024</blockquote>

<h2>Key QR Code Marketing Strategies</h2>

<h3>1. Contactless Menu and Ordering</h3>
<p>Restaurants have led the QR code revolution, with 89% of establishments now using QR codes for menus. This strategy has expanded beyond dining to include:</p>
<ul>
<li>Product catalogs in retail stores</li>
<li>Service menus in salons and spas</li>
<li>Information kiosks in hotels and tourism</li>
</ul>

<h3>2. Event Marketing and Networking</h3>
<p>QR codes are revolutionizing event experiences by enabling:</p>
<ul>
<li>Instant contact sharing and networking</li>
<li>Session feedback and surveys</li>
<li>Exclusive content access for attendees</li>
<li>Social media integration and sharing</li>
</ul>

<h3>3. Product Authentication and Storytelling</h3>
<p>Luxury brands and manufacturers use QR codes to:</p>
<ul>
<li>Verify product authenticity</li>
<li>Share product origin stories</li>
<li>Provide detailed specifications</li>
<li>Offer exclusive customer experiences</li>
</ul>

<h2>Measuring QR Code Marketing Success</h2>

<p>Successful QR code campaigns require careful tracking and analysis. Key metrics include:</p>

<h3>Engagement Metrics</h3>
<ul>
<li><strong>Scan Rate:</strong> Percentage of people who scan vs. see the code</li>
<li><strong>Conversion Rate:</strong> Actions taken after scanning</li>
<li><strong>Time to Action:</strong> Speed of user engagement</li>
<li><strong>Repeat Scans:</strong> Customer retention indicator</li>
</ul>

<h3>Demographic Insights</h3>
<ul>
<li>Geographic distribution of scans</li>
<li>Device types and operating systems</li>
<li>Peak engagement times and dates</li>
<li>User journey mapping</li>
</ul>

<h2>Best Practices for QR Code Marketing</h2>

<h3>Design Considerations</h3>
<ul>
<li><strong>Size Matters:</strong> Minimum 2x2 cm for reliable scanning</li>
<li><strong>Contrast:</strong> High contrast between foreground and background</li>
<li><strong>Error Correction:</strong> Use 15-30% error correction for branded codes</li>
<li><strong>Testing:</strong> Test across different devices and lighting conditions</li>
</ul>

<h3>User Experience Optimization</h3>
<ul>
<li>Clear call-to-action instructions</li>
<li>Mobile-optimized landing pages</li>
<li>Fast loading times (under 3 seconds)</li>
<li>Value proposition clarity</li>
</ul>

<h2>Industry-Specific Applications</h2>

<h3>Retail and E-commerce</h3>
<ul>
<li>Product reviews and ratings access</li>
<li>Loyalty program enrollment</li>
<li>Inventory and size checking</li>
<li>Exclusive discount codes</li>
</ul>

<h3>Real Estate</h3>
<ul>
<li>Virtual property tours</li>
<li>Detailed property information</li>
<li>Agent contact details</li>
<li>Mortgage calculators</li>
</ul>

<h3>Healthcare</h3>
<ul>
<li>Patient check-in processes</li>
<li>Medical history access</li>
<li>Appointment scheduling</li>
<li>Health education resources</li>
</ul>

<h2>Future Trends in QR Code Marketing</h2>

<p>Looking ahead, QR code marketing will continue evolving with emerging technologies:</p>

<ul>
<li><strong>AI Integration:</strong> Personalized experiences based on scan history</li>
<li><strong>Augmented Reality:</strong> QR codes triggering AR experiences</li>
<li><strong>Blockchain Integration:</strong> Enhanced security and verification</li>
<li><strong>Voice Integration:</strong> Audio-guided experiences post-scan</li>
</ul>

<h2>Getting Started with QR Code Marketing</h2>

<p>Ready to implement QR code marketing? Follow these steps:</p>

<ol>
<li><strong>Define Objectives:</strong> Clear goals and success metrics</li>
<li><strong>Choose the Right Tool:</strong> Select a reliable QR code generator</li>
<li><strong>Design for Success:</strong> Focus on user experience and aesthetics</li>
<li><strong>Test Thoroughly:</strong> Ensure functionality across all scenarios</li>
<li><strong>Track and Optimize:</strong> Monitor performance and iterate</li>
</ol>

<h2>Conclusion</h2>

<p>QR code marketing in 2024 represents a mature, versatile tool that bridges physical and digital experiences. When implemented strategically with proper tracking and optimization, QR codes can significantly enhance customer engagement, streamline operations, and drive measurable business results.</p>

<p>The key to success lies in understanding your audience, providing genuine value, and continuously optimizing based on data-driven insights. As technology continues to evolve, QR codes will remain a crucial component of the modern marketing toolkit.</p>
    `
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | QRResult Blog`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  const relatedPosts = [
    {
      title: 'QR Codes in Restaurants: Revolutionizing the Dining Experience',
      slug: 'qr-codes-restaurants-dining-experience',
      image: 'https://readdy.ai/api/search-image?query=Modern%20restaurant%20interior%20with%20QR%20code%20menu%20on%20table%2C%20elegant%20dining%20setup%2C%20contactless%20technology%2C%20warm%20ambient%20lighting&width=300&height=200&seq=related1&orientation=landscape'
    },
    {
      title: 'Creative QR Code Design Ideas That Actually Work',
      slug: 'creative-qr-code-design-ideas',
      image: 'https://readdy.ai/api/search-image?query=Creative%20QR%20code%20designs%20with%20artistic%20patterns%2C%20colorful%20branding%20elements%2C%20design%20studio%20workspace&width=300&height=200&seq=related2&orientation=landscape'
    },
    {
      title: 'QR Code Analytics: Measuring Success and ROI',
      slug: 'qr-code-analytics-measuring-success',
      image: 'https://readdy.ai/api/search-image?query=Data%20analytics%20dashboard%20showing%20QR%20code%20performance%20metrics%2C%20charts%20and%20graphs%2C%20business%20intelligence&width=300&height=200&seq=related3&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      {/* Breadcrumb */}
      <section className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <i className="ri-arrow-right-s-line"></i>
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <i className="ri-arrow-right-s-line"></i>
            <span className="text-gray-900">Marketing Guide</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <article className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Category and Reading Time */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full">
              {post.category}
            </span>
            <span className="text-gray-600 text-sm">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Author and Date */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <i className="ri-user-fill text-white text-xl"></i>
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-gray-600 text-sm">{post.date}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover object-top"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-700 leading-relaxed [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-gray-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-6 [&>ul]:mb-6 [&>ol]:mb-6 [&>li]:mb-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-8"
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <i className="ri-twitter-fill"></i>
                Twitter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                <i className="ri-facebook-fill"></i>
                Facebook
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                <i className="ri-linkedin-fill"></i>
                LinkedIn
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <i className="ri-link"></i>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Link 
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group"
              >
                <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Update</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to get the latest QR code marketing insights delivered to your inbox
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}