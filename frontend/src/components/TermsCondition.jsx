import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="w-full flex flex-col bg-gradient-to-tl from-gray-800 to-gray-900 text-white py-10 px-5">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-white">Terms and Conditions</h1>
      </header>

      <section className="w-full bg-gray-800 bg-opacity-70 p-8 rounded-lg mx-auto text-left">
        <h2 className="text-xl font-semibold mb-6">1. Introduction</h2>
        <p className="text-sm text-gray-400 mb-4">
          Welcome to [Your Website Name]. By accessing or using our website, you agree to comply with and be bound by these terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mb-6">2. Usage License</h2>
        <p className="text-sm text-gray-400 mb-4">
          You are granted a limited, non-exclusive, non-transferable license to use the website for personal and non-commercial purposes.
        </p>

        <h2 className="text-xl font-semibold mb-6">3. Intellectual Property</h2>
        <p className="text-sm text-gray-400 mb-4">
          All content, images, and materials on this site are the property of [Your Website Name] and are protected by copyright laws. You may not reproduce, distribute, or modify the content without prior permission.
        </p>

        <h2 className="text-xl font-semibold mb-6">4. User Responsibilities</h2>
        <p className="text-sm text-gray-400 mb-4">
          As a user, you agree not to engage in any activity that would harm the functionality of the website or violate these terms.
        </p>

        <h2 className="text-xl font-semibold mb-6">5. Privacy Policy</h2>
        <p className="text-sm text-gray-400 mb-4">
          We value your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal data.
        </p>

        <h2 className="text-xl font-semibold mb-6">6. Limitation of Liability</h2>
        <p className="text-sm text-gray-400 mb-4">
          In no event shall [Your Website Name] be liable for any indirect, incidental, or consequential damages arising from your use of the website.
        </p>

        <h2 className="text-xl font-semibold mb-6">7. Termination</h2>
        <p className="text-sm text-gray-400 mb-4">
          We reserve the right to suspend or terminate your access to the website at our discretion, for any violation of these terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mb-6">8. Modifications</h2>
        <p className="text-sm text-gray-400 mb-4">
          We may revise these terms and conditions periodically. All updates will be posted on this page, and the changes will be effective immediately.
        </p>

        <h2 className="text-xl font-semibold mb-6">9. Governing Law</h2>
        <p className="text-sm text-gray-400 mb-4">
          These terms and conditions are governed by the laws of [Your Country/State], without regard to its conflict of law provisions.
        </p>

        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>Last updated: January 2025</p>
        </footer>
      </section>
    </div>
  );
};

export default TermsAndConditions;
