import React from 'react'

function About() {
  return (
    
        <main className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
            {/* Header Section */}
            <section className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-600">About Us</h1>
            </section>

            {/* Content Section */}
            <section className="space-y-6 mb-10 text-base leading-relaxed">
                <p>
                    Welcome to <strong>YourInterviewBuddy</strong>, your trusted partner in
                    achieving interview success. We are passionate about helping
                    professionals like you prepare, excel, and land your dream jobs.
                </p>
                <p>
                    Our mission is to bridge the gap between job seekers and their career
                    aspirations. With expertly designed resources, mock interviews, and
                    personalized coaching, we empower individuals to showcase their best
                    selves to prospective employers.
                </p>
                <p>
                    Whether you are a seasoned professional or just starting your career,
                    YourInterviewBuddy is here to guide you every step of the way. Together,
                    let’s turn opportunities into achievements.
                </p>
            </section>

            {/* Footer Section */}
            <section className="bg-gray-100 p-6 rounded-lg mb-16">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us?</h2>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Tailored interview preparation</li>
                    <li>Expert guidance from industry professionals</li>
                    <li>Comprehensive resources and tools</li>
                    <li>Commitment to your success</li>
                </ul>
            </section>
        </main>

  )
}

export default About