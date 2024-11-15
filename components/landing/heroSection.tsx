import {
  FiTrendingUp,
  FiSearch,
  FiArrowRight,
  FiBarChart2,
  FiPieChart,
} from "react-icons/fi";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234B5563' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 left-1/4 w-24 h-24 bg-blue-200/20 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-purple-200/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="sm:text-center lg:text-left lg:col-span-6">
            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-600">
                  Now Live
                </span>
              </div>

              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Toledo City</span>
                <span className="block mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Transparency Portal
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-500 sm:text-xl max-w-3xl">
                Empowering citizens through financial transparency. Access,
                understand, and monitor Toledo City's barangays budget
                allocation and spending in real-time.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <a
                  href="#explore"
                  className="inline-flex items-center justify-center px-8 py-3 
                    text-base font-medium rounded-xl text-white 
                    bg-gradient-to-r from-blue-600 to-blue-500 
                    hover:from-blue-700 hover:to-blue-600 
                    transition-all duration-300 
                    shadow-sm hover:shadow-lg
                    transform hover:-translate-y-0.5"
                >
                  <FiBarChart2 className="mr-2 h-5 w-5" />
                  Explore Budget Data
                  <FiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="#learn"
                  className="inline-flex items-center justify-center px-8 py-3 
                    text-base font-medium rounded-xl text-blue-600 
                    bg-blue-50 hover:bg-blue-100 
                    border-2 border-blue-100 hover:border-blue-200
                    transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-gray-100 pt-8">
                {[
                  { label: "Active Users", value: "1,000+", icon: FiPieChart },
                  { label: "Barangays", value: "38", icon: FiSearch },
                  {
                    label: "Monthly Reports",
                    value: "100+",
                    icon: FiTrendingUp,
                  },
                ].map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start text-blue-600 mb-2">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Dashboard Preview */}
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full bg-white rounded-2xl overflow-hidden shadow-xl transform transition-all hover:scale-105 duration-300">
                {/* Replace with your actual dashboard image */}
                <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <FiBarChart2 className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                      <span className="text-gray-500">
                        Budget Analytics Dashboard Preview
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
