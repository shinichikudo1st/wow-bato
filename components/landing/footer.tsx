import Link from "next/link";
import { FiGithub, FiTwitter, FiFacebook, FiMail } from "react-icons/fi";

const footerLinks = {
  about: [
    { name: "Our Mission", href: "/about" },
    { name: "Transparency", href: "/transparency" },
    { name: "Contact Us", href: "/contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Guidelines", href: "/guidelines" },
    { name: "FAQs", href: "/faqs" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Data Protection", href: "/data-protection" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: FiFacebook, href: "#" },
  { name: "Twitter", icon: FiTwitter, href: "#" },
  { name: "GitHub", icon: FiGithub, href: "#" },
  { name: "Email", icon: FiMail, href: "mailto:contact@example.com" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">TC</span>
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Toledo City Portal
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Empowering citizens through financial transparency and accessible
              budget management.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Toledo City Portal. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-blue-600 text-sm transition-colors duration-200"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
