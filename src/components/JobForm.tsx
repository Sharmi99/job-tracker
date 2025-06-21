import React, { useEffect, useState } from "react";
import { getJobs } from "../../src/services/JobService";
import { Job } from "../types/job";
import { useFormik } from "formik";
import * as Yup from "yup";

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 Fetch jobs on mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // 👇 Formik setup
  const formik = useFormik<Job>({
    initialValues: {
      id: 0,
      company: "",
      email: "",
      title: "",
      location: "",
      status: "Applied",
    },
    validationSchema: Yup.object({
      company: Yup.string().required("Company is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      title: Yup.string().required("Job title is required"),
      location: Yup.string().required("Location is required"),
      status: Yup.string().oneOf(["Applied", "Interviewed", "Approved", "Rejected"]),
    }),
    onSubmit: (values, { resetForm }) => {
      const newJob = {
        ...values,
        id: jobs.length + 1, // Auto-increment ID
      };
      setJobs([...jobs, newJob]);
      resetForm();
    },
  });

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div>
      <h2>Job Listings</h2>

      {/* Job Submission Form */}
      <form onSubmit={formik.handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          name="company"
          placeholder="Company"
          onChange={formik.handleChange}
          value={formik.values.company}
        />
        {formik.touched.company && formik.errors.company && <div>{formik.errors.company}</div>}

        <input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

        <input
          name="title"
          placeholder="Job Title"
          onChange={formik.handleChange}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}

        <input
          name="location"
          placeholder="Location"
          onChange={formik.handleChange}
          value={formik.values.location}
        />
        {formik.touched.location && formik.errors.location && <div>{formik.errors.location}</div>}

        <select name="status" onChange={formik.handleChange} value={formik.values.status}>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button type="submit">Add Job</button>
      </form>

      {/* Job List */}
      {jobs.map((job) => (
        <div key={job.id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
          <h4>{job.title} at {job.company}</h4>
          <p>Email: {job.email}</p>
          <p>Location: {job.location}</p>
          <p>Status: {job.status}</p>
        </div>
      ))}
    </div>
  );
};

export default JobList;
