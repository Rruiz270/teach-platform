const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api/v1';
let authToken = '';

// Test credentials
const TEST_USER = {
  email: 'admin@teach.edu.br',
  password: 'admin123'
};

// Helper function to make authenticated requests
async function makeRequest(method, endpoint, data = {}) {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error.response?.data || error.message);
    throw error;
  }
}

// Test suite
async function runTests() {
  console.log('🚀 Starting AI Endpoint Tests...\n');

  try {
    // 1. Login
    console.log('1. Testing Login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, TEST_USER);
    authToken = loginResponse.data.data.token;
    console.log('✅ Login successful\n');

    // 2. Test Chat with Claude (should work if API key is configured)
    console.log('2. Testing Chat with Claude...');
    try {
      const chatResponse = await makeRequest('POST', '/ai/chat', {
        tool: 'claude',
        prompt: 'Olá! Explique brevemente o que são frações para alunos do 5º ano.'
      });
      console.log('✅ Claude Chat Response:', chatResponse.data.response.substring(0, 100) + '...\n');
    } catch (error) {
      console.log('❌ Claude not configured yet\n');
    }

    // 3. Test Lesson Plan Generation
    console.log('3. Testing Lesson Plan Generation...');
    try {
      const lessonResponse = await makeRequest('POST', '/ai/lesson-plan', {
        subject: 'Matemática',
        grade: '5º ano',
        topic: 'Introdução às Frações',
        duration: 50,
        tool: 'claude'
      });
      console.log('✅ Lesson Plan Generated Successfully\n');
    } catch (error) {
      console.log('❌ Lesson Plan generation failed\n');
    }

    // 4. Test Quiz Generation
    console.log('4. Testing Quiz Generation...');
    try {
      const quizResponse = await makeRequest('POST', '/ai/quiz', {
        subject: 'Ciências',
        grade: '7º ano',
        topic: 'Sistema Solar',
        questionCount: 5,
        tool: 'claude'
      });
      console.log('✅ Quiz Generated Successfully\n');
    } catch (error) {
      console.log('❌ Quiz generation failed\n');
    }

    // 5. Test Educational Content Generation
    console.log('5. Testing Educational Content Generation...');
    try {
      const contentResponse = await makeRequest('POST', '/ai/content/generate', {
        contentType: 'worksheet',
        params: {
          topic: 'Verbos no Presente',
          grade: '4º ano',
          exerciseCount: 10
        }
      });
      console.log('✅ Educational Content Generated Successfully\n');
    } catch (error) {
      console.log('❌ Educational content generation failed\n');
    }

    // 6. Test Get Templates
    console.log('6. Testing Get Templates...');
    const templatesResponse = await makeRequest('GET', '/ai/templates');
    console.log('✅ Templates Retrieved:', Object.keys(templatesResponse.data.templates).join(', '), '\n');

    // 7. Test Usage Statistics
    console.log('7. Testing Usage Statistics...');
    const usageResponse = await makeRequest('GET', '/ai/usage?period=month');
    console.log('✅ Usage Stats Retrieved:', usageResponse.data.usage.length, 'tools tracked\n');

    // 8. Test Image Generation (will fail without API key)
    console.log('8. Testing Image Generation...');
    try {
      const imageResponse = await makeRequest('POST', '/ai/image/generate', {
        prompt: 'Educational diagram of the water cycle',
        tool: 'dalle',
        size: '512x512'
      });
      console.log('✅ Image Generated Successfully\n');
    } catch (error) {
      console.log('❌ Image generation requires OpenAI API key\n');
    }

    // 9. Test Batch Processing
    console.log('9. Testing Batch Processing...');
    try {
      const batchResponse = await makeRequest('POST', '/ai/batch', {
        requests: [
          {
            type: 'chat',
            tool: 'claude',
            prompt: 'What is 2+2?'
          },
          {
            type: 'chat',
            tool: 'claude',
            prompt: 'What is the capital of Brazil?'
          }
        ]
      });
      console.log('✅ Batch Processing Successful:', batchResponse.data.results.length, 'requests processed\n');
    } catch (error) {
      console.log('❌ Batch processing failed\n');
    }

    console.log('🎉 Test Suite Complete!\n');
    console.log('📝 Next Steps:');
    console.log('1. Add missing API keys to .env file');
    console.log('2. Test each endpoint after adding corresponding API key');
    console.log('3. Update frontend to use these endpoints');
    
  } catch (error) {
    console.error('❌ Test suite failed:', error.message);
  }
}

// Run tests
runTests();