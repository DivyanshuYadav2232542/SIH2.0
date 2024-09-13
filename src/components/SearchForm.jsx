// components/SearchForm.js
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Text, useToast } from '@chakra-ui/react';
import { getComplaintById } from '../api';
import ComplaintDetails from './ComplainDetails';

const SearchForm = () => {
  const [trackingId, setTrackingId] = useState('');
  const [complaintData, setComplaintData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    const data = await getComplaintById(trackingId);
    if (data) {
      setComplaintData(data);
      setNotFound(false);
      toast({
        title: 'Complaint found!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else {
      setNotFound(true);
      setComplaintData(null);
      toast({
        title: 'Complaint not found.',
        description: 'Please check your tracking ID.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="500px" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="md" bg="white">
      <VStack spacing={5}>
        <Heading size="lg">Search Complaint</Heading>
        <Input
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleSearch} w="full" size="lg">
          Search
        </Button>
        {notFound && <Text color="red.500">Complaint not found. Please check your tracking ID.</Text>}
        {complaintData && <ComplaintDetails complaint={complaintData} />}
      </VStack>
    </Box>
  );
};

export default SearchForm;
