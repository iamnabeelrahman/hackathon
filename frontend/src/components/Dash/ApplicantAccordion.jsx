import React, { useEffect, useState } from "react";

const ApplicantAccordion = ({ applicant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    console.log(applicant);
  }, [applicant]);

  return (
    <div className="accordion-container border-b border-gray-300">
      {/* Accordion Header */}
      <div
        className={`accordion-header flex justify-between items-center cursor-pointer ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleAccordion}
      >
        <h3 className="text-lg font-semibold">{applicant.username}</h3>
        <span className="text-xl">{isOpen ? "-" : "+"}</span>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="accordion-content flex flex-row-reverse gap-5 items-center justify-between">
          <div className="text-info flex-1">
            <p>
              <strong>Name:</strong> {applicant.username}
            </p>
            {applicant.number && (
              <p>
                <strong>Number:</strong> {applicant.number}
              </p>
            )}
            <p>
              <strong>Email:</strong> {applicant.email}
            </p>
            <p>
              <strong>Resume:</strong>{" "}
              <a
                href={applicant.resume}
                download={
                  applicant.username
                    ? `${applicant.username}-resume.pdf`
                    : "resume.pdf"
                }
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Resume
              </a>
            </p>
          </div>
          <div className="profile-image ml-4">
            <img
              src={applicant.profileImage}
              alt={`${applicant.username}'s profile`}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantAccordion;
