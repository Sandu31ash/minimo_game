window.onload = () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  gameState.player = new Player();
  gameState.enemies.push(new Enemy());

  registerGameEvents(gameState.player);
  startGameLoop(gameState.player, gameState.enemies, ctx);
};
