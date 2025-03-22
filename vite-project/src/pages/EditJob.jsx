import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export async function loader({ params }) {
    const { id } = params; // Get the job ID from the route parameters
    const response = await fetch(`/api/jobs/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch job data');
    }
    return response.json(); // Return the job data
}

const EditJob = () => {
    const job = useLoaderData(); // Get the job data from the loader
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);

    
    useEffect(() => {
        if (job) {
            setFormData({
                id: job.id || '',  
                type: job.type || '',  
                title: job.title || '',  
                description: job.description || '',  
                location: job.location || '',  
                salary: job.salary || '',  
                company: {
                    name: job.company?.name || '',  
                    description: job.company?.description || '',  
                    contactEmail: job.company?.contactEmail || '',  
                    contactPhone: job.company?.contactPhone || '',  
                },
            });
        }
    }, [job]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('company.')) {
            const key = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                company: {
                    ...prev.company,
                    [key]: value,
                },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/jobs/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update job');
            }

            alert('Job updated successfully!');
            navigate('/jobs'); // Redirect to the jobs page
        } catch (error) {
            console.error(error);
            alert('An error occurred while updating the job.');
        }
    };

    if (!formData) {
        return <div>Loading...</div>; // Show a loading state if formData is not initialized
    }

    return (
        <div>
            <h1>Edit Job: {formData.title || 'No title available'}</h1>
            <section className="bg-indigo-50">
                <div className="container m-auto max-w-2xl py-24">
                    <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-3xl text-center font-semibold mb-6">Edit Job</h2>

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
                                <label htmlFor="company.name" className="block text-gray-700 font-bold mb-2">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    id="company.name"
                                    name="company.name"
                                    className="border rounded w-full py-2 px-3"
                                    placeholder="Company Name"
                                    value={formData.company.name}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Company Description */}
                            <div className="mb-4">
                                <label htmlFor="company.description" className="block text-gray-700 font-bold mb-2">
                                    Company Description
                                </label>
                                <textarea
                                    id="company.description"
                                    name="company.description"
                                    className="border rounded w-full py-2 px-3"
                                    rows="4"
                                    placeholder="What does your company do?"
                                    value={formData.company.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Contact Email */}
                            <div className="mb-4">
                                <label htmlFor="company.contactEmail" className="block text-gray-700 font-bold mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    id="company.contactEmail"
                                    name="company.contactEmail"
                                    className="border rounded w-full py-2 px-3"
                                    placeholder="Email address for applicants"
                                    required
                                    value={formData.company.contactEmail}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Contact Phone */}
                            <div className="mb-4">
                                <label htmlFor="company.contactPhone" className="block text-gray-700 font-bold mb-2">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    id="company.contactPhone"
                                    name="company.contactPhone"
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
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EditJob;