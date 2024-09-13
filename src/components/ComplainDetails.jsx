// components/ComplaintDetails.js
import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const ComplaintDetails = ({ complaint }) => {
  return (
    <Box>
      <Text>Name: {complaint.name}</Text>
      <Text>Phone Number: {complaint.phoneNumber}</Text>
      <Text>Description: {complaint.description}</Text>
      {complaint.image && <Image src={complaint.image} alt="Complaint" />}
    </Box>
  );
};

export default ComplaintDetails;
