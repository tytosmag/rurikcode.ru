import db from '../config/db.js';

export const getLeaderboard = async (req, res) => {
  try {
    const leaders = await db('leaderboard')
      .select(
        'id',
        'user_id',
        'username',
        'score',
        'time_seconds',
        'level',
        'created_at'
      )
      .orderBy('score', 'desc')
      .orderBy('time_seconds', 'asc')
      .limit(20);

    return res.json({ leaders });
  } catch (error) {
    return res.status(500).json({
      message: 'Ошибка получения таблицы лидеров',
      error: error.message
    });
  }
};

export const createLeaderboardResult = async (req, res) => {
  try {
    const {
      user_id,
      username,
      score,
      time_seconds,
      level
    } = req.body;

    if (!username || score === undefined) {
      return res.status(400).json({
        message: 'username и score обязательны'
      });
    }

    const [result] = await db('leaderboard')
      .insert({
        user_id: user_id || null,
        username,
        score,
        time_seconds: time_seconds || null,
        level: level || null
      })
      .returning([
        'id',
        'user_id',
        'username',
        'score',
        'time_seconds',
        'level',
        'created_at'
      ]);

    return res.status(201).json({
      message: 'Результат сохранён',
      result
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Ошибка сохранения результата',
      error: error.message
    });
  }
};