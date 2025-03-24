import { useLoaderData, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore"; // Import updateDoc
import { db } from "../config/Firebase";

export async function loader({ params }) {
  const { id } = params; // Get the job ID from the route parameters

  try {
    const jobRef = doc(db, "jobs", id); // Reference the job document in Firestore
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      throw new Error("Job not found");
    }

    return { id: jobSnap.id, ...jobSnap.data() }; // Return the job data
  } catch (error) {
    console.error("Error fetching job data:", error);
    throw new Error("Failed to fetch job data");
  }
}

const EditJob = () => {
  const job = useLoaderData(); // Get the job data from the loader
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (job) {
      setFormData({
        id: job.id || "",
        type: job.type || "",
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        C_name: job.C_name || "",
        C_description: job.C_description || "",
        C_contactEmail: job.C_contactEmail || "",
        C_contactPhone: job.C_contactPhone || "",
      });
    }
  }, [job]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const jobRef = doc(db, "jobs", formData.id); // Reference the job document in Firestore
      await updateDoc(jobRef, formData); // Update the job document in Firestore

      alert("Job updated successfully!");
      navigate("/jobs"); // Redirect to the jobs page
    } catch (error) {
      console.error("Error updating job:", error);
      alert("An error occurred while updating the job.");
    }
  };

  if (!formData) {
    return <div>Loading...</div>; // Show a loading state if formData is not initialized
  }

  return (
    <div>
      {/* <h1>Edit Job: {formData.title || "No title available"}</h1> */}
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
                <label htmlFor="C_name" className="block text-gray-700 font-bold mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="C_name"
                  name="C_name"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Company Name"
                  value={formData.C_name}
                  onChange={handleChange}
                />
              </div>

              {/* Company Description */}
              <div className="mb-4">
                <label htmlFor="C_description" className="block text-gray-700 font-bold mb-2">
                  Company Description
                </label>
                <textarea
                  id="C_description"
                  name="C_description"
                  className="border rounded w-full py-2 px-3"
                  rows="4"
                  placeholder="What does your company do?"
                  value={formData.C_description}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Contact Email */}
              <div className="mb-4">
                <label htmlFor="C_contactEmail" className="block text-gray-700 font-bold mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  id="C_contactEmail"
                  name="C_contactEmail"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Email address for applicants"
                  required
                  value={formData.C_contactEmail}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Phone */}
              <div className="mb-4">
                <label htmlFor="C_contactPhone" className="block text-gray-700 font-bold mb-2">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="C_contactPhone"
                  name="C_contactPhone"
                  className="border rounded w-full py-2 px-3"
                  placeholder="Optional phone for applicants"
                  value={formData.C_contactPhone}
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