import React from 'react';

const Template2 = ({resumeData}) => {
  const {resumeId, personalInfo, educationDetails, experiences, skills, projects, activities } = resumeData;
  return (
    <div className="max-w-5xl mx-auto my-8 p-6 bg-white shadow-lg rounded-lg font-sans text-sm text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <img
            src={personalInfo.photo} // Replace with real image
            alt="Profile"
            className="rounded-md w-full h-48  mb-4"
          />
          <ul className="space-y-2 text-sm">
            <li className="flex items-center"><span className="font-bold">📞</span> +123-456-7890</li>
            <li className="flex items-center"><span className="font-bold">📧</span> hello@reallygreatsite.com</li>
            <li className="flex items-center"><span className="font-bold">🌐</span> www.reallygreatsite.com</li>
            <li className="flex items-center"><span className="font-bold">🏠</span> 123 Anywhere St, Any City, ST 12345</li>
          </ul>

          <div className="mt-6">
            <h3 className="font-bold text-gray-700 mb-2">Education</h3>
            <p className="font-semibold">Bachelor of Design</p>
            <p>Wardiere University</p>
            <p className="text-xs text-gray-600">2006 - 2008</p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-700 mb-2">Expertise</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Digital Marketing</li>
              <li>Branding</li>
              <li>Copywriting</li>
              <li>SEO</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="font-bold text-gray-700 mb-2">Language</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>English</li>
              <li>French</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 p-6">
          <h1 className="text-3xl font-bold">OLIVIA WILSON</h1>
          <p className="text-gray-500 font-medium mb-6">Graphics Designer</p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold flex items-center mb-2">🧾 Profile</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold flex items-center mb-2">💼 Work Experience</h2>
            {[
              {
                company: "Ginyard International Co.",
                years: "2020 - 2023",
              },
              {
                company: "Arowwai Industries",
                years: "2019 - 2020",
              },
              {
                company: "Ginyard International Co.",
                years: "2017 - 2019",
              },
              {
                company: "Arowwai Industries",
                years: "2017 - 2019",
              }
            ].map((job, index) => (
              <div key={index} className="mb-4">
                <p className="font-bold">{job.years}</p>
                <p className="font-semibold">{job.company}</p>
                <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                  <li>Working with the wider development team.</li>
                  <li>Manage website design, content, and SEO Marketing.</li>
                  <li>Branding and Logo Design</li>
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-lg font-semibold flex items-center mb-2">📇 References</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">Bailey Dupont</p>
                <p>Wardiere Inc. / CEO</p>
                <p>📞 123-456-7890</p>
                <p>📧 hello@reallygreatsite.com</p>
              </div>
              <div>
                <p className="font-bold">Harumi Kobayashi</p>
                <p>Wardiere Inc. / CEO</p>
                <p>📞 123-456-7890</p>
                <p>📧 hello@reallygreatsite.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
