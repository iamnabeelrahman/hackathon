import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-12">
      <div className="flex justify-center items-center">
        <div className="max-w-4xl w-full space-y-16">
          {/* Header */}
          <header className=" flex flex-col justify-center items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#f1f5f9] mb-6">
              Privacy Policy
            </h1>
            <p className="text-[#94a3b8] text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center">
              Your privacy is important to us. This document outlines the types
              of personal information we collect and how it is used.
            </p>
          </header>

          {/* Policy Sections */}
          <section className="space-y-14">
            {/* Information Collection */}
            <div className="p-6 bg-[#1e293b] rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#38bdf8] mb-4">
                Information We Collect
              </h2>
              <p className="text-[#d1d5db] leading-relaxed">
                We may collect the following types of information when you use
                our services:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-[#d1d5db]">
                <li>Personal details like name, email, and phone number.</li>
                <li>Device and browser information for analytics purposes.</li>
                <li>
                  Usage data such as pages visited and actions performed on our
                  platform.
                </li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="p-6 bg-[#1e293b] rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#38bdf8] mb-4">
                How We Use Your Information
              </h2>
              <p className="text-[#d1d5db] leading-relaxed">
                The information we collect is used to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-[#d1d5db]">
                <li>Provide and maintain our services.</li>
                <li>Personalize your experience on our platform.</li>
                <li>
                  Communicate with you, including sending updates and offers.
                </li>
                <li>Improve our services and troubleshoot issues.</li>
              </ul>
            </div>

            {/* Data Sharing */}
            <div className="p-6 bg-[#1e293b] rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#38bdf8] mb-4">
                Sharing of Information
              </h2>
              <p className="text-[#d1d5db] leading-relaxed">
                We value your privacy and do not sell your personal information.
                However, we may share your data with:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-[#d1d5db]">
                <li>
                  Service providers who assist in delivering our services.
                </li>
                <li>Legal authorities if required by law or legal process.</li>
                <li>
                  Business partners, if relevant to a joint service or offering.
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="p-6 bg-[#1e293b] rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#38bdf8] mb-4">
                Data Security
              </h2>
              <p className="text-[#d1d5db] leading-relaxed">
                We implement robust security measures to protect your
                information from unauthorized access or disclosure. However, no
                method of transmission over the Internet is 100% secure.
              </p>
            </div>

            {/* Your Rights */}
            <div className="p-6 bg-[#1e293b] rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#38bdf8] mb-4">
                Your Rights
              </h2>
              <p className="text-[#d1d5db] leading-relaxed">
                You have rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-[#d1d5db]">
                <li>Accessing and updating your data.</li>
                <li>Requesting deletion of your data.</li>
                <li>Opting out of marketing communications.</li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="p-6 bg-[#1e293b] rounded-lg shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-[#38bdf8] mb-4">
                Contact Us
              </h2>
              <p className="text-[#d1d5db] leading-relaxed">
                If you have any questions or concerns about this privacy policy,
                please reach out to us at:
              </p>
              <p className="mt-4 text-[#38bdf8] font-semibold">
                support@projectpal.com
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center mt-16 text-[#94a3b8] text-sm">
            © {new Date().getFullYear()} ProectPal. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
