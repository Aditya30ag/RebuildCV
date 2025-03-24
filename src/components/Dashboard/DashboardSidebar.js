import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Briefcase, 
  BarChart2, 
  Settings, 
  CreditCard, 
  FileSymlink, 
  Users, 
  HelpCircle,
  ChevronRight
} from 'lucide-react';

const DashboardSidebar = () => {
  return (
    <aside className="w-64 bg-gray-900/50 border-r border-gray-800 hidden md:block min-h-[calc(100vh-64px)] p-4">
      <nav className="space-y-1">
        <Link to="/dashboard" className="flex items-center px-3 py-2 text-sm rounded-md bg-purple-900/20 text-purple-400 border border-purple-500/20">
          <FileText className="mr-3 h-5 w-5" />
          Resume Builder
          <ChevronRight className="ml-auto h-4 w-4" />
        </Link>
        <Link to="/dashboard/jobs" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
          <Briefcase className="mr-3 h-5 w-5" />
          Job Tracker
        </Link>
        <Link to="/dashboard/analytics" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
          <BarChart2 className="mr-3 h-5 w-5" />
          Application Analytics
        </Link>
        <Link to="/dashboard/letters" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
          <FileSymlink className="mr-3 h-5 w-5" />
          Cover Letters
        </Link>
        <Link to="/dashboard/network" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
          <Users className="mr-3 h-5 w-5" />
          Network Contacts
        </Link>
      </nav>
      
      <div className="mt-10">
        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Account
        </h3>
        <nav className="mt-2 space-y-1">
          <Link to="/dashboard/settings" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Link>
          <Link to="/dashboard/subscription" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
            <CreditCard className="mr-3 h-5 w-5" />
            Subscription
          </Link>
          <Link to="/dashboard/help" className="flex items-center px-3 py-2 text-sm rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition">
            <HelpCircle className="mr-3 h-5 w-5" />
            Help & Support
          </Link>
        </nav>
      </div>
      
      <div className="mt-10 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-medium text-white mb-2">Upgrade to Pro</h3>
        <p className="text-xs text-gray-400 mb-3">Get unlimited resume optimizations, premium templates, and more.</p>
        <Link to="/dashboard/subscription" className="block w-full py-2 text-xs text-center bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition">
          View Plans
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
