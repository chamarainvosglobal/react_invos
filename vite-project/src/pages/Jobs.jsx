import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

const Jobs = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch job data from Firestore
  useEffect(() => {
    const fetchJob = async () => {
      try {
        console.log("Job ID from URL:", id); // Debug log

        const jobRef = doc(db, "jobs", id); // Reference the job document
        const jobSnap = await getDoc(jobRef);

        if (!jobSnap.exists()) {
          console.error("Job not found in Firestore");
          setJob(null); // Set job to null if not found
          return;
        }

        setJob({ id: jobSnap.id, ...jobSnap.data() }); // Set the job data
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchJob();
  }, [id]);

  // Delete job from Firestore
  const onDeleteClick = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      const jobRef = doc(db, "jobs", jobId);
      await deleteDoc(jobRef); // Delete the job document
      alert("Job deleted successfully!");
      navigate("/jobs"); // Redirect to the jobs page
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!job) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">Job not found</h1>
        <Link
          to="/jobs"
          className="text-indigo-500 hover:text-indigo-600 mt-4 inline-block"
        >
          Back to Job Listings
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="inline text-lg mb-1 mr-1 text-orange-700" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>
                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>
                <p className="mb-4">{job.salary}</p>
              </div>
            </main>

            {/* Sidebar */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>
                <h2 className="text-2xl">{job.C_name || "N/A"}</h2>
                <p className="my-2">{job.C_description || "No description available."}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.C_contactEmail || "N/A"}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>
                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.C_contactPhone || "N/A"}
                </p>
              </div>

              {/* Manage Job */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;