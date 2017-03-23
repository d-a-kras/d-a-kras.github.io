var lastTime;
var gameTime = 0;
var canvas;
var ctx;
var isGameOver;             //проверка кончилась игра или нет
var lastFire = Date.now();

//картинки
var background = new Image();
var playerImg = new Image();
var enemy = new Image();
var bullet = new Image();
var explosion= new Image();
var cloud = new Image();
var HP= new Image();
//массивы объектов
var enemies = [];
var bullets = [];
var explosions = [];
var hitPoints =[];
var clouds = [];
//скорости
var playerSpeed = 300;          //скорость игрока
var enemySpeed = 200;          //скорость врагов
var bulletSpeed = 500;         //скорость пуль
var cloudSpeed = 200;          //скорость облак
var score = 0;
var scoreEl = document.getElementById('score');
function start() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
   
    background.onload = function () {
        init();
    }
    background.src = "resources/bg.png";
    enemy.src = "resources/enemy.png";
    playerImg.src = "resources/player3.png";
    bullet.src="resources/bullet.png";
	explosion.src="resources/explosion.png"
	HP.src="resources/heart.png"
	cloud.src="resources/cloud.png"
}

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

// объект игрок
var player = {
    pos: [150, 150],
    sprite: new Sprite(playerImg, [0, 0], [75, 139])
};
 for(var j=0; j<3; j++){
hitPoints.push({
                    pos: [0+50*j,-50],
                    sprite: new Sprite(HP,
                                       [78,78],
                                       [39, 39])
                })
}



function init() {
    ctx.drawImage(background, 0, 0, 1200, 620);
    lastTime = Date.now();
    main();
}

function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimFrame(main);
};


// ядро по сути
function update(dt) {
    gameTime += dt;
    max = 100;
    handleInput(dt);
    updateEntities(dt);
    //if (gameTime > 20)
      //  max = 50;
    //else if (gameTime > 10)
      //  max = 50;
    a = Math.floor(Math.random() * (max - 1 + 1)) + 1;
    if (a == 1) {
        enemies.push({
            pos: [canvas.width,
                    Math.random() * (canvas.height - 60) - 60],
            sprite: new Sprite(enemy, [0, 78],[113, 37])
        });
		
		
    }
	    if (a == 1) {
        clouds.push({
            pos: [canvas.width,
                    Math.random() * (canvas.height - 60) - 60],
            sprite: new Sprite(cloud, [0, 78],[113, 50])
        });
		
		
    }

    checkCollisions();
scoreEl.innerHTML = score;
};

//обработка клавиш
function handleInput(dt) {
    if (input.isDown('DOWN') || input.isDown('s')) {
        player.pos[1] += playerSpeed * dt;
    }

    if (input.isDown('UP') || input.isDown('w')) {
        player.pos[1] -= playerSpeed * dt;
    }
    if (input.isDown('RIGHT') || input.isDown('s')) {
        player.pos[0] += playerSpeed * dt;
    }

    if (input.isDown('LEFT') || input.isDown('w')) {
        player.pos[0] -= playerSpeed * dt;
    }

    if(input.isDown('SPACE') &&
         (!isGameOver)&&
        Date.now() - lastFire > 500) {
        var x = player.pos[0]+20;
        var y = player.pos[1]+20;

        bullets.push({ pos: [x, y],
            sprite: new Sprite(bullet, [50, 20], [21, 10]) });

        lastFire = Date.now();
    }


}


function updateEntities(dt) {

    // обновление врагов
    for (var i = 0; i < enemies.length; i++) {

        enemies[i].pos[0] -= enemySpeed * dt;

        // удаление ушедших за границу
        if (enemies[i].pos[0] < -110) {
            enemies.splice(i, 1);
            i--;
        }
    }
	
	//вылет облаков
	for (var i = 0; i < clouds.length; i++) {

        clouds[i].pos[0] -= cloudSpeed * dt;

        // удаление ушедших за границу облаков
        if (clouds[i].pos[0] < -110) {
            clouds.splice(i, 1);
            i--;
        }
    }
    //обновление пуль
    for(var i=0; i<bullets.length; i++) {
        var bullet = bullets[i];

        switch(bullet.dir) {
            default:
                bullet.pos[0] += bulletSpeed * dt;
        }

        // удаляем пулю если вышла за пределы экрана
        if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
            bullet.pos[0] > canvas.width) {
            bullets.splice(i, 1);
            i--;
        }
    }
	//обновление жизней
		
}
function checkPlayerBounds() {
    // не даем игроку выйти за границы канваса
    if (player.pos[0] < 0) {
        player.pos[0] = 0;
    }
    else if (player.pos[0] > canvas.width) {
        player.pos[0] = canvas.width;
    }

    if (player.pos[1] < 20) {
        player.pos[1] = 20;
    }
    else if (player.pos[1] > canvas.height - 10) {
        player.pos[1] = canvas.height - 10;
    }
}

// отрисовка
function render() {
    ctx.drawImage(background, 0, 0, 1200, 620);
    if(!isGameOver){ renderEntity(player);
    renderEntities(enemies);
    renderEntities(bullets);
	renderEntities(explosions);
	renderEntities(hitPoints);
	renderEntities(clouds);}
};

function renderEntities(list) {
    for (var i = 0; i < list.length; i++) {
        renderEntity(list[i]);
    }
}

function renderEntity(entity) {
    ctx.save();
    ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(ctx);
    ctx.restore();
}


function collides(x, y, r, b, x2, y2, r2, b2) {
    return !((r <= x2) || (x > r2) ||
        (b <= y2-65) || (y+65 > b2));
}


function boxCollides(pos, size, pos2, size2) {

    return collides(pos[0], pos[1],
            pos[0] + size[0], pos[1] + size[1],
        pos2[0], pos2[1],
            pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
    checkPlayerBounds();
    
    for (var i = 0; i < enemies.length; i++) {
        var pos = enemies[i].pos;
        var size = enemies[i].sprite.size;

   for(var j=0; j<bullets.length; j++) {
            var pos2 = bullets[j].pos;
            var size2 = bullets[j].sprite.size;

            if(boxCollides(pos, size, pos2, size2)) {
                //удаляем врагов
                
                   score+=100;
              enemies.splice(i, 1);
                i--;

                // 
                explosions.push({
                    pos: [pos[0],pos[1]],
                    sprite: new Sprite(explosion,
                                       [78,78],
                                       [39, 39])
                });

                // удаляем пулили
                bullets.splice(j, 1);
                break;
            }
        }

			
          if(boxCollides(pos, size, player.pos, player.sprite.size)) {
		  if(hitPoints.length==1){
		    gameOver();}
		  
				
		 else {enemies.splice(i, 1);
                i--;
		 var s=hitPoints.length;
		 hitPoints.pop();
		  }


    }}
}
function gameOver() {
isGameOver=true;
alert("Вы проиграли. Нажмите ок. ДЛя новой попытки нажмите f5");
}



