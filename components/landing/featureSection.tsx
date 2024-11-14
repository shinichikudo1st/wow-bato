import { FiPieChart, FiTrendingUp, FiSearch, FiUsers } from "react-icons/fi";

const features = [
  {
    name: "Real-time Budget Tracking",
    description:
      "Monitor barangay expenses and allocations as they happen with our advanced tracking system.",
    icon: FiPieChart,
  },
  {
    name: "Transparent Reporting",
    description:
      "Access detailed financial reports and understand how your barangay funds are being utilized.",
    icon: FiTrendingUp,
  },
  {
    name: "Easy Search & Filter",
    description:
      "Quickly find specific budget information with our powerful search and filter capabilities.",
    icon: FiSearch,
  },
  {
    name: "Community Engagement",
    description:
      "Participate in budget discussions and provide feedback on spending priorities.",
    icon: FiUsers,
  },
];

export default function FeatureSection() {
  return (
    <div className="py-16 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-700 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-800 sm:text-4xl">
            Better Budget Management
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 lg:mx-auto">
            Discover how we're making barangay financial management more
            accessible and transparent.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50/50 border border-blue-100"
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white shadow-sm">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="ml-4 text-lg leading-6 font-semibold text-gray-800">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-4 text-base text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
