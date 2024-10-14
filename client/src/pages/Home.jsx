import React from "react";
import "./Home.scss";

function Home() {
  // Mock de votos
  const votes = [
    { option: "Opção 1", votes: 22 },
    { option: "Opção 2", votes: 30 },
  ];

  // Mock de ranking (coloquei apenas 12, mas será preenchido até 20)
  const ranking = [
    { position: 1, user: "usuario3", points: 150 },
    { position: 2, user: "usuario1", points: 120 },
    { position: 3, user: "usuario4", points: 100 },
    { position: 4, user: "usuario5", points: 95 },
    { position: 5, user: "usuario6", points: 90 },
    { position: 6, user: "usuario7", points: 85 },
    { position: 7, user: "usuario8", points: 80 },
    { position: 8, user: "usuario9", points: 75 },
    { position: 9, user: "usuario10", points: 70 },
    { position: 10, user: "usuario11", points: 65 },
    { position: 11, user: "usuario12", points: 60 },
    { position: 12, user: "usuario13", points: 55 },
  ];

  const filledRanking = [...ranking];
  while (filledRanking.length < 20) {
    filledRanking.push({
      position: filledRanking.length + 1,
      user: "-",
      points: "-",
    });
  }

  const firstHalf = filledRanking.slice(0, 10);
  const secondHalf = filledRanking.slice(10, 20);

  return (
    <div className="home-container">
      <div className="vote-container">
        <h2 className="option-type-text">Digite uma das opções no chat:</h2>
        <div className="vote-cards">
          <div className="vote-card option-1">
            {votes[0].option}
            <br />
            {votes[0].votes} votos
          </div>
          <div className="vote-card option-2">
            {votes[1].option}
            <br />
            {votes[1].votes} votos
          </div>
        </div>
      </div>

      <div className="ranking-container">
        <h3 className="ranking-text">Ranking</h3>
        <div className="tables-container">
          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {firstHalf.map((user, index) => (
                <tr key={index}>
                  <td>{user.position}</td>
                  <td>{user.user}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Usuário</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {secondHalf.map((user, index) => (
                <tr key={index}>
                  <td>{user.position}</td>
                  <td>{user.user}</td>
                  <td>{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
