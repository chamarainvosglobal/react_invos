import React, { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import { db } from "../config/Firebase";
import { getDocs, collection } from "firebase/firestore";

const JobListings = ({ isHome = false }) => {
  const [Jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log("Fetching jobs from Firestore...");
        const jobsCollection = collection(db, "jobs");
        const jobsSnapshot = await getDocs(jobsCollection);

        const jobsData = jobsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Fetched jobs:", jobsData);

        setJobs(isHome ? jobsData.slice(0, 3) : jobsData);
      } catch (error) {
        console.error("Error fetching jobs from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Jobs.length > 0 ? (
              Jobs.map((job) => <JobListing key={job.id} job={job} />)
            ) : (
              <p>No jobs available or failed to load jobs.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;