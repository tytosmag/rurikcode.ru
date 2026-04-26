const leaders = [
  { id: 1, username: 'Rurik', score: 2021 },
  { id: 2, username: 'Vova', score: 1221 },
  { id: 3, username: 'Novgorod', score: 821 }
];

export const getLeaderboard = async (req, res) => {
  return res.json({
    leaders
  });
};