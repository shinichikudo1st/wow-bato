"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiInfo, FiFileText, FiDollarSign, FiActivity, FiUsers, FiCheckCircle, FiAlertCircle, FiCalendar, FiMapPin } from "react-icons/fi";
import AuthBackground from "@/components/ui/authBackground";
import Navbar from "@/components/ui/navbar";
import { useProfileID } from "@/hooks/userHooks";

const MOCK_BUDGET_SUMMARY = {
  totalBudget: 21000000,
  allocated: 18600000,
  spent: 15000000,
  remainingBudget: 6000000,
  fiscalYear: "2023-2024",
};

const MOCK_BUDGET_CATEGORIES = [
  { name: "Infrastructure", allocated: 9000000, spent: 7000000, percentage: 40 },
  { name: "Education", allocated: 4000000, spent: 3000000, percentage: 19 },
  { name: "Healthcare", allocated: 5000000, spent: 4000000, percentage: 24 },
  { name: "Social Welfare", allocated: 2000000, spent: 800000, percentage: 10 },
  { name: "Administrative", allocated: 1000000, spent: 200000, percentage: 7 },
];

const MOCK_PROJECTS = [
  { 
    id: "p1", 
    name: "Road Rehabilitation - Main Street", 
    budget: 3500000, 
    spent: 3000000, 
    progress: 85, 
    category: "Infrastructure",
    startDate: "2023-06-01",
    endDate: "2023-12-15", 
    status: "In Progress"
  },
  { 
    id: "p2", 
    name: "Barangay Health Center Expansion", 
    budget: 2000000, 
    spent: 1800000, 
    progress: 90, 
    category: "Healthcare",
    startDate: "2023-05-15",
    endDate: "2023-11-30", 
    status: "In Progress"
  },
  { 
    id: "p3", 
    name: "Public School Classroom Addition", 
    budget: 2500000, 
    spent: 2200000, 
    progress: 95, 
    category: "Education",
    startDate: "2023-04-01",
    endDate: "2023-10-30", 
    status: "Completed"
  },
  { 
    id: "p4", 
    name: "Community Food Program", 
    budget: 800000, 
    spent: 600000, 
    progress: 75, 
    category: "Social Welfare",
    startDate: "2023-07-01",
    endDate: "2023-12-31", 
    status: "In Progress"
  },
];

const MOCK_RECENT_EXPENDITURES = [
  { date: "2023-10-15", description: "Construction materials for road repair", amount: 250000, category: "Infrastructure" },
  { date: "2023-10-12", description: "Medical supplies for health center", amount: 180000, category: "Healthcare" },
  { date: "2023-10-10", description: "Food supplies for community program", amount: 120000, category: "Social Welfare" },
  { date: "2023-10-05", description: "School furniture", amount: 350000, category: "Education" },
  { date: "2023-10-02", description: "Road equipment rental", amount: 200000, category: "Infrastructure" },
];

const TIME_PERIODS = [
  { label: "Current Quarter", value: "quarter" },
  { label: "Current Year", value: "year" },
  { label: "All Time", value: "all" },
];

const PublicDisclosureDashboard = () => {
  const router = useRouter();
  const { barangayName } = useProfileID();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeframe, setTimeframe] = useState("year");

  const formatCurrency = (amount) => {
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Barangay {barangayName} Public Dashboard</h1>
              <p className="mt-2 text-gray-600">Fiscal Year: {MOCK_BUDGET_SUMMARY.fiscalYear}</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center">
              <span className="mr-2 text-sm text-gray-600">View:</span>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="text-sm font-medium rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {TIME_PERIODS.map((period) => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Budget Overview
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "projects"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setActiveTab("expenditures")}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "expenditures"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Recent Expenditures
              </button>
              <button
                onClick={() => setActiveTab("documents")}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "documents"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Public Documents
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
            <div className="rounded-full bg-blue-100 p-2">
              <FiDollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Budget</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_SUMMARY.totalBudget)}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
            <div className="rounded-full bg-green-100 p-2">
              <FiCheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Allocated Budget</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_SUMMARY.allocated)}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
            <div className="rounded-full bg-purple-100 p-2">
              <FiActivity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Spent to Date</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_SUMMARY.spent)}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-start space-x-4">
            <div className="rounded-full bg-orange-100 p-2">
              <FiAlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Remaining Budget</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(MOCK_BUDGET_SUMMARY.remainingBudget)}</p>
            </div>
          </div>
        </div>

        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900">Budget Allocation by Category</h2>
                <p className="text-sm text-gray-500 mt-1">Breakdown of budget allocation for fiscal year {MOCK_BUDGET_SUMMARY.fiscalYear}</p>
              </div>
              <div className="px-6 pb-6">
                {MOCK_BUDGET_CATEGORIES.map((category, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(category.spent)}</span>
                        <span className="text-xs text-gray-500 ml-1">of {formatCurrency(category.allocated)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          category.name === "Infrastructure" ? "bg-blue-600" : 
                          category.name === "Education" ? "bg-green-600" : 
                          category.name === "Healthcare" ? "bg-purple-600" : 
                          category.name === "Social Welfare" ? "bg-yellow-600" : 
                          "bg-red-600"
                        }`} 
                        style={{ width: `${(category.spent / category.allocated) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Budget Distribution</h2>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Budget Distribution</span>
                </div>
                <div className="flex h-8 rounded-lg overflow-hidden">
                  {MOCK_BUDGET_CATEGORIES.map((category, index) => (
                    <div 
                      key={index}
                      className={`
                        ${category.name === "Infrastructure" ? "bg-blue-600" : 
                          category.name === "Education" ? "bg-green-600" : 
                          category.name === "Healthcare" ? "bg-purple-600" : 
                          category.name === "Social Welfare" ? "bg-yellow-600" : 
                          "bg-red-600"
                        }
                      `}
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {MOCK_BUDGET_CATEGORIES.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className={`w-4 h-4 rounded-full mr-2 
                        ${category.name === "Infrastructure" ? "bg-blue-600" : 
                          category.name === "Education" ? "bg-green-600" : 
                          category.name === "Healthcare" ? "bg-purple-600" : 
                          category.name === "Social Welfare" ? "bg-yellow-600" : 
                          "bg-red-600"
                        }
                      `}
                    ></div>
                    <span className="text-sm text-gray-600">{category.name} ({category.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Ongoing and Completed Projects</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {MOCK_PROJECTS.map((project) => (
                <div key={project.id} className="p-6 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <div 
                          className={`w-3 h-3 rounded-full mr-2 
                            ${project.category === "Infrastructure" ? "bg-blue-600" : 
                              project.category === "Education" ? "bg-green-600" : 
                              project.category === "Healthcare" ? "bg-purple-600" : 
                              "bg-yellow-600"
                            }
                          `}
                        ></div>
                        <span className="text-xs font-medium text-gray-500">{project.category}</span>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mt-1">{project.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <FiCalendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <span>{project.startDate} to {project.endDate}</span>
                      </div>
                    </div>
                    <div>
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">
                        {project.status}
                      </div>
                      <div className="mt-2">
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(project.spent)}</span>
                        <span className="text-sm text-gray-500"> of {formatCurrency(project.budget)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-500">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${
                          project.progress >= 90 ? "bg-green-600" : 
                          project.progress >= 75 ? "bg-blue-600" : 
                          project.progress >= 50 ? "bg-yellow-600" : 
                          "bg-orange-600"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "expenditures" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Expenditures</h2>
              <p className="text-sm text-gray-500 mt-1">Latest financial transactions and expenses</p>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {MOCK_RECENT_EXPENDITURES.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.category === "Infrastructure" ? "bg-blue-100 text-blue-800" : 
                          item.category === "Education" ? "bg-green-100 text-green-800" : 
                          item.category === "Healthcare" ? "bg-purple-100 text-purple-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-gray-50 px-6 py-3 flex justify-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View All Expenditures
              </button>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Public Documents</h2>
              <p className="text-sm text-gray-500 mt-1">Official documents related to budget and projects</p>
            </div>
            <ul className="divide-y divide-gray-200">
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Annual Budget Report 2023</p>
                      <p className="text-sm text-gray-500">PDF Document • Uploaded on October 15, 2023</p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Q3 Financial Statement</p>
                      <p className="text-sm text-gray-500">PDF Document • Uploaded on September 30, 2023</p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Infrastructure Projects Bidding Results</p>
                      <p className="text-sm text-gray-500">PDF Document • Uploaded on August 22, 2023</p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Healthcare Program Annual Review</p>
                      <p className="text-sm text-gray-500">PDF Document • Uploaded on July 15, 2023</p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="block hover:bg-gray-50">
                  <div className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0">
                      <FiFileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Q2 Financial Statement</p>
                      <p className="text-sm text-gray-500">PDF Document • Uploaded on June 30, 2023</p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
            <div className="bg-gray-50 px-6 py-3 flex justify-center">
              <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                View All Documents
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer Footer */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FiInfo className="h-5 w-5 text-gray-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Disclaimer</h3>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  This dashboard provides public information about barangay budgets and projects. 
                  All data is updated regularly and is presented for transparency purposes. 
                  For official documents or specific inquiries, please contact the Barangay Administration Office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PublicDisclosureDashboard;
