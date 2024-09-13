// App.js
import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import ComplaintForm from './components/ComplaintForm';
import SearchForm from './components/SearchForm';

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        
        <ComplaintForm />
       
        <SearchForm />
      </Box>
    </ChakraProvider>
  );
}

export default App;
