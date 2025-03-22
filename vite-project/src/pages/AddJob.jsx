import React, { useState } from 'react';

const AddJob = () => {
  const [formData, setFormData] = useState({
    id: Date.now().toString(),  
    type: '',  
    description: '',  
    location: '',  
    salary: '',  
    company: {
      name: '',  
      description: '',  
      contactEmail: '',  
      contactPhone: '',  
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle nested fields for the company object
    if (['name', 'contactEmail', 'contactPhone'].includes(name)) {
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          [name]: value,
        },
      });
    } else if (name === 'description' && e.target.id === 'company_description') {
      // Handle the company description field
      setFormData({
        ...formData,
        company: {
          ...formData.company,
          description: value,
        },
      });
    } else {
      // Handle all other fields (including job description)
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format the data to match the required structure
    const formattedData = {
      id: Date.now().toString(), // Generate a unique ID
      title: formData.title,
      type: formData.type,
      description: formData.description,
      location: formData.location,
      salary: formData.salary,
      company: {
        name: formData.company.name,
        description: formData.company.description,
        contactEmail: formData.company.contactEmail,
        contactPhone: formData.company.contactPhone,
      },
    };

    // Send the formatted data to the backend
    fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Job added successfully:', data);
        alert('Job added successfully!');
      })
      .catch((error) => {
        console.error('Error adding job:', error);
        alert('Failed to add job.');
      });
  };

  return (
    <div>
      <section className="bg-indigo-50">
        <div className="container m-auto max-w-2xl py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl text-center font-semibold mb-6">Add Job</h2>

              {/* Job Type */}
              <div className="mb-4">
                <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                  Job Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="">Select Job Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Remote">Remote</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Job Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                  Job Listing Name
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="e.g., Senior React Developer"
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Job Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                    Job Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows="4"
                    placeholder="Add any job duties, expectations, requirements, etc."
                    required
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                </div>

              {/* Salary */}
              <div className="mb-4">
                <label htmlFor="salary" className="block text-gray-700 font-bold mb-2">
                  Salary
                </label>
                <select
                  id="salary"
                  name="salary"
                  className="border rounded w-full py-2 px-3"
                  required
                  value={formData.salary}
                  onChange={handleChange}
                >
                  <option value="">Select Salary Range</option>
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K - $60K">$50K - $60K</option>
                  <option value="$60K - $70K">$60K - $70K</option>
                  <option value="$70K - $80K">$70K - $80K</option>
                  <option value="$80K - $90K">$80K - $90K</option>
                  <option value="$90K - $100K">$90K - $100K</option>
                  <option value="$100K - $125K">$100K - $125K</option>
                  <option value="$125K - $150K">$125K - $150K</option>
                  <option value="$150K - $175K">$150K - $175K</option>
                  <option value="$175K - $200K">$175K - $200K</option>
                  <option value="Over $200K">Over $200K</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="border rounded w-full py-2 px-3 mb-2"
                  placeholder="Company Location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <h3 className="text-2xl mb-5">Company Info</h3>

              {/* Company Name */}
              <div className="mb-4">
                <label htmlFor="company" className="block text-gray-700 font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="name"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  value={formData.company.name}
                  onChange={handleChange}
                />
              </div>

              {/* Company Description */}
                <div className="mb-4">
                <label htmlFor="company_description" className="block text-gray-700 font-bold mb-2">
                    Company Description
                </label>
                <textarea
                    id="company_description"
                    name="description"
                    className="border rounded w-full py-2 px-3"
                    rows="4"
                    placeholder="What does your company do?"
                    value={formData.company.description}
                    onChange={handleChange}
                ></textarea>
                </div>

              {/* Contact Email */}
              <div className="mb-4">
                <label htmlFor="contact_email" className="block text-gray-700 font-bold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="contact_email"
                  name="contactEmail"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                  value={formData.company.contactEmail}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Phone */}
              <div className="mb-4">
                <label htmlFor="contact_phone" className="block text-gray-700 font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contactPhone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  value={formData.company.contactPhone}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddJob;