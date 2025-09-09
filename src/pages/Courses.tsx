import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import AdminAddButton from "@/components/admin/AdminAddButton";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";
import CourseCard from "@/components/courses/CourseCard";
import CoursesHeader from "@/components/courses/CoursesHeader";
import WhyChooseUsSection from "@/components/courses/WhyChooseUsSection";
import CategoryFilter from "@/components/courses/CategoryFilter";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { courses, contentLoading } = useBackend();

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "IITM BS", name: "IITM BS" },
    { id: "NEET", name: "NEET" },
    { id: "JEE", name: "JEE" }
  ];

  // Real-time filtering based on selected category
  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => {
        // Handle both "IITM BS" and "IITM_BS" variations
        if (selectedCategory === "IITM BS") {
          return course.exam_category === "IITM BS" || course.exam_category === "IITM_BS";
        }
        return course.exam_category === selectedCategory;
      });

  return (
    <>
      <HeroCarousel />
      <NavBar />
      <main className="pt-20">
        <CoursesHeader />
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              
              <AdminAddButton
                contentType="courses"
              >
                Add Course
              </AdminAddButton>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentLoading ? (
                Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <CourseCard course={course} index={index} key={course.id} />
                ))
              ) : (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <p className="text-lg">No courses found for this category.</p>
                  Please check back later or select a different category.
                </div>
              )}
            </div>
          </div>
        </section>
        <WhyChooseUsSection />
      </main>
      <Footer />
      <EmailPopup />
    </>
  );
};

export default Courses;
