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
    const { score, time_seconds, level } = req.body;

    if (score === undefined || score === null) {
      return res.status(400).json({
        message: 'score обязателен'
      });
    }

    const numericScore = Number(score);

    if (!Number.isInteger(numericScore) || numericScore < 0) {
      return res.status(400).json({
        message: 'score должен быть целым числом больше или равным 0'
      });
    }

    const numericTime = time_seconds ? Number(time_seconds) : null;

    if (
      numericTime !== null &&
      (!Number.isInteger(numericTime) || numericTime < 0)
    ) {
      return res.status(400).json({
        message: 'time_seconds должен быть целым числом больше или равным 0'
      });
    }

    const [result] = await db('leaderboard')
      .insert({
        user_id: req.user.id,
        username: req.user.username,
        score: numericScore,
        time_seconds: numericTime,
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