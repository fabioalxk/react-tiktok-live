import React from "react";

function RankingTable({ ranking, currentTables, renderTable }) {
  return (
    <div className="ranking-container">
      <h3 className="ranking-title">Ranking dos Participantes</h3>
      <div className="tables-container">
        {currentTables === 0 ? (
          <>
            <table className="ranking-table first-set">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuário</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>{renderTable(0, 10)}</tbody>
            </table>
            <table className="ranking-table first-set">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuário</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>{renderTable(10, 20)}</tbody>
            </table>
          </>
        ) : (
          <>
            <table className="ranking-table second-set">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuário</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>{renderTable(20, 30)}</tbody>
            </table>
            <table className="ranking-table second-set">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Usuário</th>
                  <th>Pontos</th>
                </tr>
              </thead>
              <tbody>{renderTable(30, 40)}</tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default RankingTable;
