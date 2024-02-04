const API_BASE_URL = "http://localhost:80/api";

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
    details: (uuid) => `${API_BASE_URL}/ticket/details/?uuid=${uuid}`
  }, payment: {
    increaseFund:(  )=>`${API_BASE_URL}/payment/wallets/add/`
  }, service: {
    create: () => `${API_BASE_URL}/service/service-requests/create/`,
    acceptBySpecialist: (id) => `${API_BASE_URL}/service/service-requests/${id}/update-by-specialist/`,
    acceptByCustomer: (id) => `${API_BASE_URL}/service/service-requests/service-request-final-decision/${id}/`,
    completeByCustomer: (id) => `${API_BASE_URL}/service/service-requests/${id}/complete/`,
    updateAddress: (id) => `${API_BASE_URL}/service/service-requests/${id}/update-address/`,
    getServiceRequestList: () => `${API_BASE_URL}/service/service-requests/`
  },
  common: {
    image: (address) => `${API_BASE_URL}/${address}`
  }
};

export default urls;
