const API_BASE_URL = "http://localhost:8000";

const urls = {
  auth: {
    register: () => `${API_BASE_URL}/user/register/`,
    login: () => `${API_BASE_URL}/user/login/`,
    logout: () => `${API_BASE_URL}/user/logout/`,
    profile: () => `${API_BASE_URL}/user/info/`,
  },
  common: {
    getMyPortfolio: () => `${API_BASE_URL}/user/portfolio`,
    joinWaitlist: () => `${API_BASE_URL}/join`,
    image: (address) => `${API_BASE_URL}/${address}`,
  },
};

export default urls;
