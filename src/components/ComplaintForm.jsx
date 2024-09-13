// components/ComplaintForm.js
import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Image, Text, VStack, Heading, Select, useToast } from '@chakra-ui/react';
import { submitComplaint } from '../api';
import { nanoid } from 'nanoid';

const categories = ["Billing Issue", "Technical Problem", "Service Interruption", "Other"];

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    description: '',
    category: '',
    image: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result // Base64 encoded image
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const id = nanoid(6); // Generate a shorter 6-character tracking ID
    setTrackingId(id);
    await submitComplaint({ ...formData, trackingId: id });
    setSubmitted(true);
    toast({
      title: 'Complaint submitted successfully.',
      description: `Your tracking ID is: ${id}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="500px" mx="auto" mt="8" p="6" boxShadow="lg" borderRadius="md" bg="white">
      <VStack spacing={5}>
        <Heading size="lg">Submit Your Complaint</Heading>
        <Input
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          placeholder="Your Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <Select
          placeholder="Select Complaint Category"
          value={formData.category}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Textarea
          placeholder="Describe the problem"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        {formData.image && (
          <Image src={formData.image} alt="Uploaded image" maxW="300px" borderRadius="lg" />
        )}
        <Button colorScheme="teal" onClick={handleSubmit} w="full" size="lg">
          Submit Complaint
        </Button>
        {submitted && (
          <Box mt={4} textAlign="center">
            <Text>Your complaint has been submitted successfully!</Text>
            <Text>Your tracking ID: <strong>{trackingId}</strong></Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ComplaintForm;
