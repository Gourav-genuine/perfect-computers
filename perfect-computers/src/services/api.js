const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

class ApiService {
  // Helper method to make API calls
  async makeRequest(endpoint, options = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const defaultOptions = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const finalOptions = { ...defaultOptions, ...options };
      
      const response = await fetch(url, finalOptions);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API Error:', error);
      // Don't break the app if logging fails
      return { success: false, error: error.message };
    }
  }

  // Log visitor activity
  async logVisitor(page, action = 'visit') {
    return this.makeRequest('/api/log-visitor', {
      method: 'POST',
      body: JSON.stringify({ page, action }),
    });
  }

  // Log order completion
  async logOrder(orderData, total, items) {
    return this.makeRequest('/api/log-order', {
      method: 'POST',
      body: JSON.stringify({ orderData, total, items }),
    });
  }

  // Get visitor statistics
  async getVisitorStats() {
    return this.makeRequest('/api/visitor-stats');
  }

  // Health check
  async healthCheck() {
    return this.makeRequest('/api/health');
  }

  // Get today's logs (for admin/debug)
  async getTodayLogs() {
    return this.makeRequest('/api/logs/today');
  }
}

export default new ApiService(); 