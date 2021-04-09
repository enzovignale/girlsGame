class actionFigure{
    constructor(name, image, id){
        this._designation = name;
        this._image = image;
        this._anchorID = id;
    }
    motion(){

    }
}


document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino');
    const grid = document.querySelector('.grid');
    const body = document.querySelector('body');
    const alert = document.getElementById('alert');
    let isJumping = false;
    let gravity = 0.9;
    let isGameOver = false;
    let position = 0;
    let number = -5;
    let request;
    let power = 17;
    let delay = .24;
    let progress;
    let stopId;
    
    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true;
                //jump();
                number = -4;
                requestAnimationFrame(performAnimation);    
            }
            //jump();
        }
    }
    document.addEventListener('keydown', control);

    const performAnimation = () => {
        request = requestAnimationFrame(performAnimation)
        position = (power*25 - power*(Math.pow(number, 2) ))
        dino.style.bottom = position/2 + 'px';
        number+=delay;
        if(number >= 5){
            cancelAnimationFrame(request);
            isJumping = !isJumping;
        }
        //TODO: Not working as a object. Need to look how to make the requestAnimationFrame call inside a object     
      }
    //TODO: Do I need this?
    // function jump() {
    //     number = -4;
    //     requestAnimationFrame(performAnimation);
    // }
    
    function generateObstacles() {
        //TODO: This needs a lot of work
        let randomTime = Math.random() * 4000;
        let obstaclePosition = 2000;

        //Obstacle is created here
        const obstacle = document.createElement('div');
        if (!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle);
        obstacle.style.left = obstaclePosition + 'px';

        //Detecting Collision
        let timerId = setInterval(function() {
        if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
            clearInterval(timerId);
            alert.innerHTML = 'Game Over';
            isGameOver = true;
            //remove all children
            body.removeChild(body.firstChild);
            while (grid.firstChild) {
                grid.removeChild(grid.lastChild)
            }
        }
            obstaclePosition -=20;
            obstacle.style.left = obstaclePosition + 'px';
        },20);

        // if Collision happen, stop animation
        if (!isGameOver) setTimeout(generateObstacles, randomTime)
    }


    generateObstacles();
})