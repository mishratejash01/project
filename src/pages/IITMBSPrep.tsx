import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight } from "lucide-react";
import BranchNotesTab from "@/components/iitm/BranchNotesTab";
import PYQsTab from "@/components/iitm/PYQsTab";
import NewsTab from "@/components/iitm/NewsTab";
import ImportantDatesTab from "@/components/iitm/ImportantDatesTab";
import SyllabusTab from "@/components/iitm/SyllabusTab";
import PaidCoursesTab from "@/components/iitm/PaidCoursesTab";

const IITMBSPrep = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("notes");
  const [selectedBranch, setSelectedBranch] = useState("data-science");
  const [selectedLevel, setSelectedLevel] = useState("foundation");

  // Parse URL to get current tab, branch, and level
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const baseIndex = pathParts.findIndex(part => part === 'exam-preparation');
    
    if (baseIndex !== -1 && pathParts[baseIndex + 1] === 'iitm-bs') {
      const tab = pathParts[baseIndex + 2];
      const branch = pathParts[baseIndex + 3];
      const level = pathParts[baseIndex + 4];
      
      // Valid tabs for IITM BS
      const validTabs = ['notes', 'pyqs', 'syllabus', 'tools', 'courses', 'news', 'dates'];
      
      if (tab && validTabs.includes(tab)) {
        setActiveTab(tab);
        
        // Update branch and level if provided and valid
        if (branch && ['data-science', 'electronic-systems'].includes(branch)) {
          setSelectedBranch(branch);
        }
        if (level && ['qualifier', 'foundation', 'diploma', 'degree'].includes(level)) {
          setSelectedLevel(level);
        }
      }
    }
  }, [location.pathname]);

  // Update URL when tab changes
  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    let newPath = `/exam-preparation/iitm-bs/${tabValue}`;
    
    // For content tabs (notes, pyqs) that support branch/level filtering,
    // include current selections in URL if they exist
    if (['notes', 'pyqs'].includes(tabValue) && selectedBranch && selectedLevel) {
      newPath += `/${selectedBranch}/${selectedLevel}`;
    } else if (['notes', 'pyqs'].includes(tabValue) && selectedBranch) {
      newPath += `/${selectedBranch}`;
    }
    
    navigate(newPath, { replace: true });
  };

  // Update URL when branch/level changes in sub-components
  const handleBranchLevelChange = (branch, level) => {
    setSelectedBranch(branch);
    setSelectedLevel(level);
    
    // Only update URL for tabs that support branch/level filtering
    if (['notes', 'pyqs'].includes(activeTab)) {
      let newPath = `/exam-preparation/iitm-bs/${activeTab}`;
      if (branch) {
        newPath += `/${branch}`;
        if (level) {
          newPath += `/${level}`;
        }
      }
      navigate(newPath, { replace: true });
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">IITM BS Degree Preparation</h1>
            <p className="text-xl text-gray-600">Comprehensive resources for IITM BS Data Science & Electronic Systems</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-max min-w-full">
                <TabsTrigger value="notes" className="whitespace-nowrap">Notes</TabsTrigger>
                <TabsTrigger value="pyqs" className="whitespace-nowrap">PYQs</TabsTrigger>
                <TabsTrigger value="syllabus" className="whitespace-nowrap">Syllabus</TabsTrigger>
                <TabsTrigger value="tools" className="whitespace-nowrap">Tools</TabsTrigger>
                <TabsTrigger
                  value="courses" 
                  className="whitespace-nowrap bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:via-yellow-600 data-[state=active]:to-yellow-700 shadow-lg border-2 border-yellow-400"
                >
                  ✨ Courses
                </TabsTrigger>
                <TabsTrigger value="news" className="whitespace-nowrap">News</TabsTrigger>
                <TabsTrigger value="dates" className="whitespace-nowrap">Important Dates</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="notes" className="mt-6">
              <BranchNotesTab 
                selectedBranch={selectedBranch}
                selectedLevel={selectedLevel}
                onBranchLevelChange={handleBranchLevelChange}
              />
            </TabsContent>
            
            <TabsContent value="pyqs" className="mt-6">
              <PYQsTab 
                selectedBranch={selectedBranch}
                selectedLevel={selectedLevel}
                onBranchLevelChange={handleBranchLevelChange}
              />
            </TabsContent>
            
            <TabsContent value="syllabus" className="mt-6">
              <SyllabusTab />
            </TabsContent>
            
            <TabsContent value="tools" className="mt-6">
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900">IITM BS Tools</CardTitle>
                  <CardDescription className="text-lg text-gray-600">
                    All IITM BS Tools are now on a dedicated page
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <p className="text-gray-700">
                    We've moved all our IITM BS tools to a dedicated page for better organization and easier access.
                    Find CGPA calculators, grade predictors, and more useful tools for your studies.
                  </p>
                  <Link to="/iitmbstools">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                      Visit IITM BS Tools Page
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="courses" className="mt-6">
              <PaidCoursesTab />
            </TabsContent>
            
            <TabsContent value="news" className="mt-6">
              <NewsTab />
            </TabsContent>
            
            <TabsContent value="dates" className="mt-6">
              <ImportantDatesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IITMBSPrep;
