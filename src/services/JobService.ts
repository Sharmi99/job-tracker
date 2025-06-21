
export const getJobs = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API Received:", data);
      resolve({ message: "Application submitted successfully!" });
    }, 1000);
  });
};
