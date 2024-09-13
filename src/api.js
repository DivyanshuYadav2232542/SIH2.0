// api.js
let complaints = [];

// Function to submit a new complaint (store it in the array)
export const submitComplaint = (complaint) => {
  complaints.push(complaint);
  console.log('Complaints Array:', complaints); // Debugging to ensure complaints are stored
};

// Function to get complaint by tracking ID
export const getComplaintById = (trackingId) => {
  return complaints.find(complaint => complaint.trackingId === trackingId);
};
