import axios from 'axios';

const gameApi = axios.create({
  baseURL: '/api/game',
  withCredentials: true
});

export const getStartSceneRequest = () => gameApi.get('/start');

export const getSceneRequest = (sceneId) => {
  return gameApi.get(`/scenes/${sceneId}`);
};

export const submitChoiceRequest = (sceneId, data) => {
  return gameApi.post(`/scenes/${sceneId}/choice`, data);
};

export default gameApi;