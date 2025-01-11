import React from "react";
import { useParams } from "react-router-dom";

function Play() {
  const { matchId } = useParams();

  return (
    <div>
      <h1>Play Match</h1>
      <p>Match ID: {matchId}</p>
      <p>Game board will be displayed here.</p>
    </div>
  );
}

export default Play;
