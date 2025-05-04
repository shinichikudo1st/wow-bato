"use client";

import { useState } from "react";
import AuthBackground from "@/components/ui/authBackground";
import Navbar from "@/components/ui/navbar";
import { FiArrowLeft, FiArrowUp, FiDollarSign, FiPieChart, FiBarChart2, FiTrendingUp, FiAlertCircle, FiCalendar } from "react-icons/fi";
import { useRouter } from "next/navigation";

// Mock data for the dashboard
const MOCK_BUDGET_DATA = {
  totalBudget: 120000000,
  allocated: 95000000,
  spent: 62000000,
  remaining: 58000000,
  comparisonToPrevYear: 15, 
};

const MOCK_BARANGAY_SPENDING = [
  { name: "Poblacion", allocated: 15000000, spent: 12000000, projects: 14 },
  { name: "Mambaling", allocated: 18000000, spent: 10000000, projects: 12 },
  { name: "Pasil", allocated: 12000000, spent: 9000000, projects: 10 },
  { name: "Labangon", allocated: 14000000, spent: 11000000, projects: 8 },
  { name: "Guadalupe", allocated: 21000000, spent: 15000000, projects: 18 },
];

const MOCK_SPENDING_CATEGORIES = [
  { category: "Infrastructure", amount: 25000000, percentage: 40 },
  { category: "Healthcare", amount: 15000000, percentage: 24 },
  { category: "Education", amount: 12000000, percentage: 19 },
  { category: "Social Services", amount: 6000000, percentage: 10 },
  { category: "Administrative", amount: 4000000, percentage: 7 },
];

const MOCK_ALERTS = [
  { barangay: "Labangon", message: "Budget utilization below 60%", severity: "warning" },
  { barangay: "Guadalupe", message: "Large expenditure requires approval", severity: "alert" },
  { barangay: "Mambaling", message: "Missing expense documentation", severity: "critical" },
];

const CityAdminDashboard = () => {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState("yearly");

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white">
      <AuthBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.push('/home/city-admin')}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Main Page
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">City Budget Dashboard</h1>
          </div>

          {/* Time Period Selector */}
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <FiCalendar className="text-gray-400" />
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="text-sm font-medium text-gray-700 bg-transparent border-none focus:ring-0"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
              <FiDollarSign className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_DATA.totalBudget)}</p>
            <div className="flex items-center mt-2 text-sm">
              <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{MOCK_BUDGET_DATA.comparisonToPrevYear}%</span>
              <span className="text-gray-400 ml-1">from previous year</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Allocated to Barangays</h3>
              <FiPieChart className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_DATA.allocated)}</p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-400">{Math.round((MOCK_BUDGET_DATA.allocated / MOCK_BUDGET_DATA.totalBudget) * 100)}% of total budget</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Spent to Date</h3>
              <FiBarChart2 className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_DATA.spent)}</p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-400">{Math.round((MOCK_BUDGET_DATA.spent / MOCK_BUDGET_DATA.totalBudget) * 100)}% of total budget</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Remaining Budget</h3>
              <FiTrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_DATA.remaining)}</p>
            <div className="flex items-center mt-2 text-sm">
              <span className="text-gray-400">{Math.round((MOCK_BUDGET_DATA.remaining / MOCK_BUDGET_DATA.totalBudget) * 100)}% of total budget</span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spending by Category */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h2>
              <div className="space-y-4">
                {MOCK_SPENDING_CATEGORIES.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(item.amount)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-full rounded-full bg-blue-500" 
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Barangay Comparison Table */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Barangay Budget Comparison</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barangay</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allocated</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                      <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {MOCK_BARANGAY_SPENDING.map((barangay, index) => (
                      <tr key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/home/city-admin/${barangay.name.toLowerCase()}`)}>
                        <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{barangay.name}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(barangay.allocated)}</td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(barangay.spent)}</td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className={`h-full rounded-full ${barangay.spent/barangay.allocated > 0.85 ? "bg-green-500" : barangay.spent/barangay.allocated > 0.6 ? "bg-yellow-500" : "bg-red-500"}`}
                                style={{ width: `${(barangay.spent/barangay.allocated) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-gray-700">{Math.round((barangay.spent/barangay.allocated) * 100)}%</span>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">{barangay.projects}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Urgent Attention */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Requires Attention</h2>
                <FiAlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <div className="space-y-4">
                {MOCK_ALERTS.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    alert.severity === 'critical' ? 'bg-red-50 border-l-4 border-red-500' :
                    alert.severity === 'alert' ? 'bg-orange-50 border-l-4 border-orange-500' :
                    'bg-yellow-50 border-l-4 border-yellow-500'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{alert.barangay}</h3>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        alert.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.severity === 'alert' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                View All Alerts
              </button>
            </div>

            {/* Budget Distribution Visualization */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Budget Distribution</h2>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Budget Distribution</span>
                </div>
                <div className="flex h-6 rounded-lg overflow-hidden">
                  <div className="bg-blue-500" style={{ width: '40%' }}></div>
                  <div className="bg-purple-500" style={{ width: '24%' }}></div>
                  <div className="bg-green-500" style={{ width: '19%' }}></div>
                  <div className="bg-yellow-500" style={{ width: '10%' }}></div>
                  <div className="bg-red-500" style={{ width: '7%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Infrastructure (40%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Healthcare (24%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Education (19%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Social Services (10%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs text-gray-600">Administrative (7%)</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-blue-50 rounded-lg text-blue-600 font-medium text-sm hover:bg-blue-100 transition-colors duration-200">
                  Generate Budget Report
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 rounded-lg text-green-600 font-medium text-sm hover:bg-green-100 transition-colors duration-200">
                  Approve Pending Transactions
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 rounded-lg text-purple-600 font-medium text-sm hover:bg-purple-100 transition-colors duration-200">
                  Review Funding Requests
                </button>
                <button className="w-full text-left px-4 py-3 bg-orange-50 rounded-lg text-orange-600 font-medium text-sm hover:bg-orange-100 transition-colors duration-200">
                  Schedule Budget Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CityAdminDashboard;