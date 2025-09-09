import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import IITMToolsTab from "@/components/iitm/IITMToolsTab";
import { ChevronRight, Home, Calculator } from "lucide-react";
import { Link } from "react-router-dom";

const IITMBSTools = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-royal transition-colors"
              >
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link 
                to="/iitm-bs-preparation" 
                className="text-gray-600 hover:text-royal transition-colors"
              >
                IITM BS Preparation
              </Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-royal font-medium">Tools</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <section className="bg-gradient-to-br from-royal to-royal-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center mb-4">
              <Calculator className="h-10 w-10 mr-4" />
              <h1 className="text-4xl font-bold">IITM BS Tools</h1>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Access powerful calculators and predictors designed specifically for IITM BS students. 
              Calculate your CGPA, predict required marks, and analyze your academic performance.
            </p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <IITMToolsTab />
          </div>
        </section>

        {/* Back Link */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              to="/iitm-bs-preparation" 
              className="inline-flex items-center px-6 py-3 bg-royal text-white font-medium rounded-lg hover:bg-royal-dark transition-colors"
            >
              Back to IITM BS Preparation
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default IITMBSTools;
