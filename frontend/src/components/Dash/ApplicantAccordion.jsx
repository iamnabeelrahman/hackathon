import React, { useState } from "react";

const ApplicantAccordion = ({ applicant }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-container">
      {/* Accordion Header */}
      <div
        className={`accordion-header ${isOpen ? "open" : ""}`}
        onClick={toggleAccordion}
      >
        <h3>{applicant.name}</h3>
        <span className="">{isOpen ? "-" : "+"}</span>
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div className="accordion-content">
          <p>
            <strong>Name:</strong> {applicant.name}
          </p>
          <p>
            <strong>Number:</strong> {applicant.number}
          </p>
          <p>
            <strong>Email:</strong> {applicant.email}
          </p>
          <p>
            <strong>Timestamp:</strong> {applicant.timestamp}
          </p>
        </div>
      )}
    </div>
  );
};

export default ApplicantAccordion;