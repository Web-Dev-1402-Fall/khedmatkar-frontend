const API_BASE_URL = "http://localhost:8000";

const urls = {
  auth: {
    register: () => `${API_BASE_URL}/user/register/`,
    login: () => `${API_BASE_URL}/user/login/`,
    logout: () => `${API_BASE_URL}/user/logout/`,
    profile: () => `${API_BASE_URL}/user/info/`
  },
  ticket: {
    list: () => `${API_BASE_URL}/ticket/list/`,
    create: () => `${API_BASE_URL}/ticket/create/`,
    answer: () => `${API_BASE_URL}/ticket/comments/add/`,
    details: () => `${API_BASE_URL}/ticket/list/`
  }, payment: {}, service: {},
  common: {
    getMyPortfolio: () => `${API_BASE_URL}/user/portfolio`,
    joinWaitlist: () => `${API_BASE_URL}/join`,
    image: (address) => `${API_BASE_URL}/${address}`
  }
};

export default urls;
