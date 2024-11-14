import {
  FiPieChart,
  FiTrendingUp,
  FiSearch,
  FiUsers,
  FiArrowRight,
  FiBarChart2,
} from "react-icons/fi";

const features = [
  {
    name: "Real-time Budget Tracking",
    description:
      "Monitor barangay expenses and allocations as they happen with our advanced tracking system.",
    icon: FiPieChart,
    color: "from-blue-600 to-blue-400",
  },
  {
    name: "Transparent Reporting",
    description:
      "Access detailed financial reports and understand how your barangay funds are being utilized.",
    icon: FiTrendingUp,
    color: "from-indigo-600 to-indigo-400",
  },
  {
    name: "Easy Search & Filter",
    description:
      "Quickly find specific budget information with our powerful search and filter capabilities.",
    icon: FiSearch,
    color: "from-sky-600 to-sky-400",
  },
  {
    name: "Community Engagement",
    description:
      "Participate in budget discussions and provide feedback on spending priorities.",
    icon: FiUsers,
    color: "from-blue-600 to-blue-400",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Better Budget Management
          </p>
          <p className="mt-4 text-xl text-gray-500">
            Discover how we're making barangay financial management more
            accessible and transparent.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.name} className="relative group">
              <div className="h-full p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100">
                <div className="flex items-center space-x-4">
                  <div
                    className={`
                    flex items-center justify-center w-12 h-12 
                    rounded-xl bg-gradient-to-r ${feature.color}
                    text-white shadow-sm group-hover:scale-110 
                    transition-transform duration-300
                  `}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-4 text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <a
                    href="#"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Learn more
                    <svg
                      className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-block group">
            <a
              href="#"
              className="relative inline-flex items-center gap-2 px-8 py-4 
                text-base font-medium rounded-xl text-white 
                bg-gradient-to-r from-blue-600 to-blue-500 
                hover:from-blue-700 hover:to-blue-600 
                transition-all duration-300 
                shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)]
                hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.12)]
                transform hover:-translate-y-0.5
                overflow-hidden
                group"
            >
              {/* Button Content */}
              <div className="relative flex items-center gap-2">
                <FiBarChart2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                <span className="relative">
                  Start Exploring
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Hover Effect Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                transform -translate-x-full transition-transform duration-700 
                group-hover:translate-x-full"
              />
            </a>

            {/* Button Badge */}
            <div className="absolute -right-2 -top-2 transform translate-x-full -translate-y-full">
              <div
                className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full 
                animate-pulse border border-blue-200"
              >
                New Features
              </div>
            </div>
          </div>
        </div>

        {/* Optional: Quick Stats Below CTA */}
        <div className="mt-8 flex justify-center gap-8 text-center text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FiUsers className="w-4 h-4 text-blue-500" />
            <span>1000+ Active Users</span>
          </div>
          <div className="flex items-center gap-1">
            <FiPieChart className="w-4 h-4 text-blue-500" />
            <span>Real-time Updates</span>
          </div>
          <div className="flex items-center gap-1">
            <FiSearch className="w-4 h-4 text-blue-500" />
            <span>Advanced Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
}
