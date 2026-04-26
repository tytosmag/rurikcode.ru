export default function About() {
  return (
    <section className="content-page">
      <h1>О проекте</h1>

      <p>
        Код Рюрика — это образовательная игра, которую мы переводим в формат
        современного SPA-приложения с дальнейшим переходом на микросервисную
        архитектуру.
      </p>

      <p>
        На текущем этапе проект включает клиент на React + Vite, сервер на
        Node.js + Express, базу данных PostgreSQL и авторизацию через JWT в
        cookies.
      </p>

      <p>
        Дальше мы будем постепенно выносить сервисы отдельно: auth-service,
        leaderboard-service, game-service и gateway.
      </p>
    </section>
  );
}