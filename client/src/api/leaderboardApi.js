import axios from 'axios';

const leaderboardApi = axios.create({
  baseURL: '/api/leaderboard',
  withCredentials: true
});

export const getLeaderboardRequest = () => leaderboardApi.get('/');

export const createLeaderboardResultRequest = (data) => {
  return leaderboardApi.post('/', data);
};

export default leaderboardApi;