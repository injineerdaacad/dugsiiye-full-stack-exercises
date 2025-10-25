import React from "react";
import StudentRegistrationForm from "../components/forms/StudentRegistrationForm";

const StudentRegistrationPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 ring-1 ring-zinc-900/5">
        <h2 className="text-2xl font-semibold text-zinc-900 mb-8 text-center">
          Student Registration
        </h2>
        <StudentRegistrationForm />
      </div>
    </div>
  );
};

export default StudentRegistrationPage;