export default function Leaderboard() {
  const mockLeaders = [
    { id: 1, username: 'Rurik', score: 1200 },
    { id: 2, username: 'Vova', score: 980 },
    { id: 3, username: 'Novgorod', score: 870 }
  ];

  return (
    <section className="content-page">
      <h1>Таблица лидеров</h1>

      <div className="leaderboard-card">
        <div className="leaderboard-row leaderboard-head">
          <span>Место</span>
          <span>Игрок</span>
          <span>Очки</span>
        </div>

        {mockLeaders.map((player, index) => (
          <div key={player.id} className="leaderboard-row">
            <span>{index + 1}</span>
            <span>{player.username}</span>
            <span>{player.score}</span>
          </div>
        ))}
      </div>
    </section>
  );
}