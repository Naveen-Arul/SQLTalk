const axios = require('axios');

// Test the analyze endpoint
async function testAnalyzeEndpoint() {
  try {
    console.log('Testing /api/analyze endpoint...');
    
    const response = await axios.post('http://localhost:5000/api/analyze', {
      query: 'Show total value by category'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response received:');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Validate response structure
    if (response.data.success && response.data.analysis) {
      console.log('\n✅ Test passed: Endpoint is working correctly');
      
      // Check if analysis has expected structure
      const analysis = response.data.analysis;
      const expectedKeys = ['intent', 'table', 'columns', 'filters', 'aggregation', 'time_range', 'confidence'];
      const hasAllKeys = expectedKeys.every(key => key in analysis);
      
      if (hasAllKeys) {
        console.log('✅ Analysis contains all expected keys');
      } else {
        console.log('❌ Analysis missing some expected keys');
      }
    } else {
      console.log('❌ Test failed: Unexpected response structure');
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Test the data endpoint as well
async function testDataEndpoint() {
  try {
    console.log('\nTesting /api/data endpoint...');
    
    const response = await axios.get('http://localhost:5000/api/data');
    
    console.log('Response received:');
    console.log(JSON.stringify(response.data, null, 2));
    
    if (Array.isArray(response.data)) {
      console.log('✅ Data endpoint test passed: Returned array of data');
    } else {
      console.log('❌ Data endpoint test failed: Did not return array');
    }
  } catch (error) {
    console.error('❌ Data endpoint test failed with error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

// Run tests
async function runTests() {
  console.log('Starting Phase 2 tests...\n');
  
  // Start server first (this would be done separately in real testing)
  console.log('Note: Server must be running on port 5000 for these tests to work');
  console.log('Run "npm run dev" in the backend directory before executing tests\n');
  
  await testAnalyzeEndpoint();
  await testDataEndpoint();
  
  console.log('\nTests completed.');
}

runTests();