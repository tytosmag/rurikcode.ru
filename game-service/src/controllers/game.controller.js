import { scenes } from '../data/scenes.js';

export const getStartScene = async (req, res) => {
  const scene = scenes.find((item) => item.id === 'intro');

  return res.json({
    scene
  });
};

export const getSceneById = async (req, res) => {
  const { sceneId } = req.params;

  const scene = scenes.find((item) => item.id === sceneId);

  if (!scene) {
    return res.status(404).json({
      message: 'Сцена не найдена'
    });
  }

  return res.json({
    scene
  });
};

export const submitChoice = async (req, res) => {
  const { sceneId } = req.params;
  const { choiceId, currentScore = 0 } = req.body;

  const scene = scenes.find((item) => item.id === sceneId);

  if (!scene) {
    return res.status(404).json({
      message: 'Сцена не найдена'
    });
  }

  const choice = scene.choices.find((item) => item.id === choiceId);

  if (!choice) {
    return res.status(400).json({
      message: 'Выбор не найден'
    });
  }

  const nextScene = scenes.find((item) => item.id === choice.nextSceneId);

  if (!nextScene) {
    return res.status(404).json({
      message: 'Следующая сцена не найдена'
    });
  }

  const nextScore = Number(currentScore) + Number(choice.score || 0);

  return res.json({
    choice,
    scene: nextScene,
    score: nextScore,
    isFinal: Boolean(nextScene.isFinal)
  });
};