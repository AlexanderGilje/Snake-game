
    //board
    var blocksize = 25;
    var rows = 20;
    var cols = 20;
    var board;
    var context;


    //snake head
    var snakeX = blocksize * 5;
    var snakeY = blocksize * 5;

    var velocityX = 0;
    var velocityY = 0;

    var snakeBody = []

    //food
    var foodX;
    var foodY;

    var gameOver = false;


    window.onload = function() {
        board = document.getElementById("board");
        board.height = rows * blocksize;
        board.width = cols * blocksize;
        context = board.getContext("2d"); //Used for drawing on the board
        placefood();
        document.addEventListener("keyup", changeDirection);
        // update();
        setInterval(update, 1000/10); //hvert 100 millisekund refresher den update funksjonen så slangen beveger seg

        //initialize scoreboard
        updateScoreboard();
}


    //function to update the game state
    function update() {
        if (gameOver) {
            return;
        }


        //Draw grid
        drawGrid();



        context.fillStyle="black"; 
        context.fillRect(0,0, board.width, board.height);

        context.fillStyle="red";
        context.fillRect(foodX, foodY, blocksize, blocksize);

        if (snakeX == foodX && snakeY == foodY) {
            snakeBody.push([foodX, foodY])
            placefood();

            }

        //telling the snake body where to move
        for (let i = snakeBody.length-1; i > 0; i--) {
            snakeBody[i] = snakeBody[i-1];
        }
        if (snakeBody.length) {
            snakeBody[0] = [snakeX, snakeY];
        }

        

        //increase score when a new body segment is drawn
        if (snakeBody.length > 0) {
            score = snakeBody.length * 10; //Score is 10 points per body segment
            updateScoreboard();
        }


           //Function to draw the grid
    function drawGrid() {
        context.strokeStyle = "#444"; //Grid Color
        context.lineWidth = 0.5; //Grid line thickness
    }

        //Draw vertical lines
        for (let i = 0; i <= cols; i++) {
        context.beginPath();
        context.moveTo(i * blocksize, 0);
        context.lineTo(i * blocksize, board.height);
        context.stroke();
    }

        //Draw horizontal lines
        for (let j = 0; j <= rows; j++) {
        context.beginPath();
        context.moveTo(0, j * blocksize);
        context.lineTo(board.width, j * blocksize);
        context.stroke();
        }

        //Draw snake head
        context.fillStyle="lime";
        snakeX += velocityX * blocksize;
        snakeY += velocityY * blocksize;
        context.fillRect(snakeX, snakeY, blocksize, blocksize);


        for (let i = 0; i < snakeBody.length; i++) {
            context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
        }

        //game over conditions
        if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize) {
            gameOver = true;
            alert("Game Over");
            window.location.reload();
            
            
        }

        for (let i = 0; i < snakeBody.length; i++) {
            if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                alert("Game Over");
            window.location.reload();
            }
        }

}

    
    

    //function to update the scoreboard display
    function updateScoreboard() {
        const scoreBoard = document.getElementById("scoreboard");
        scoreBoard.textContent = `score: ${score}`;
    }

//function to change the snakes direction
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
   else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
   else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
   else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


    function placefood() {
        // Math.random returnerer et tilfeldig tall mellom 0-1, vi ganger deretter dette med 20 som er antall kollonner. Det inkluderer derimot ikke 20 så det blir istedet 0-19.9999
        // Vi må ta Math.floor for å fjerne desimaltallene så det blir et tall mellom 0-19. Dette ganger vi med blocksize som er 25.
        foodX = Math.floor(Math.random() * cols) * blocksize;
        foodY = Math.floor(Math.random() * rows) * blocksize;
    }