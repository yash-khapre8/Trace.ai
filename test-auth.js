// Quick test script to verify authentication
const axios = require('axios');

const API_URL = 'http://localhost:5001/api';

async function testAuth() {
    console.log('🧪 Testing Authentication System...\n');

    try {
        // Test 1: Health Check
        console.log('1️⃣ Testing health endpoint...');
        const health = await axios.get('http://localhost:5001/health');
        console.log('✅ Health check passed:', health.data);

        // Test 2: Signup
        console.log('\n2️⃣ Testing signup...');
        const signupData = {
            username: 'testuser_' + Date.now(),
            email: `test${Date.now()}@example.com`,
            password: 'Test123!@#'
        };

        const signupResponse = await axios.post(`${API_URL}/auth/signup`, signupData);
        console.log('✅ Signup successful:', signupResponse.data);

        const token = signupResponse.data.data.token;

        // Test 3: Login
        console.log('\n3️⃣ Testing login...');
        const loginResponse = await axios.post(`${API_URL}/auth/login`, {
            email: signupData.email,
            password: signupData.password
        });
        console.log('✅ Login successful:', loginResponse.data);

        // Test 4: Protected Route
        console.log('\n4️⃣ Testing protected route...');
        const meResponse = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Protected route works:', meResponse.data);

        console.log('\n🎉 All authentication tests passed!');
    } catch (error) {
        console.error('\n❌ Test failed:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response from server. Is it running on port 5001?');
        } else {
            console.error('Error:', error.message);
        }
        process.exit(1);
    }
}

testAuth();
