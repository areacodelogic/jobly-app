import axios from 'axios';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    // paramsOrData._token = // for now, hardcode token for "testing"
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc' +
    // '3RpbmciLCJpc19hZG1pbiI6ZmFsc2UsImlhdCI6MTU1MzcwMzE1M30.' +
    // 'COmFETEsTxN_VfIlgIKw0bYJLkvbRQNgO1XCSE8NZ0U';
    // localStorage.getItem('jobly-token')
    paramsOrData._token = localStorage.getItem('jobly-token');

    console.debug('API Call:', endpoint, paramsOrData, verb);

    try {
      return (
        await axios({
          method: verb,
          url: `http://localhost:3001/${endpoint}`,
          [verb === 'get' ? 'params' : 'data']: paramsOrData,
        })
      ).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(search) {
    console.log('here');
    let res = await this.request('companies', { search });
    console.log(res);
    return res.companies;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }
  static async getJobs(search) {
    let res = await this.request('jobs', { search });
    return res.jobs;
  }

  static async login(credentials) {
    let res = await this.request(`login`, credentials, 'post');
    return res.token;
  }

  static async register(data) {
    let res = await this.request('users', data, 'post');
    return res.token;
  }

  static async getCurrentUser(username){
    let res = await this.request(`users/${username}`)
    return res.user
  }

  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`, data, 'patch');
  }
}

export default JoblyApi;
