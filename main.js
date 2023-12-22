const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
var balls = []
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var newBall = (x,y,r,vx,vy) => {
    balls.push({x:x,y:y,r:r,prevPos:[x-vx,y-vy]})
}

newBall(100,100,40,-5,5)
newBall(500,500,40,5,5)

var dist = (x,x1,y,y1) => {
    return Math.sqrt(((x-x1)**2)+((y-y1)**2))
}

var main = () => {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,canvas.width,canvas.height)

    for(var i=0;i<balls.length;i++){
    ctx.beginPath()
    ctx.arc(balls[i].x,balls[i].y,balls[i].r,0,2*Math.PI)
    ctx.fillStyle = "red"
    ctx.fill()

    var tempPos = [balls[i].x,balls[i].y]

    if(balls[i].x<=balls[i].r||balls[i].x>canvas.width-balls[i].r){
        balls[i].x-=(balls[i].x-balls[i].prevPos[0])
    }
    if(balls[i].y<=balls[i].r||balls[i].y>canvas.height-balls[i].r){
        balls[i].y-=balls[i].y-balls[i].prevPos[1]
    }

    balls[i].x+=balls[i].x-balls[i].prevPos[0]
    balls[i].y+=balls[i].y-balls[i].prevPos[1]
    balls[i].prevPos = tempPos

    for(var i1=0;i1<balls.length;i1++){
        if(i1!=i){
            var d = dist(balls[i].x,balls[i1].x,balls[i].y,balls[i1].y)
            if(d<=balls[i].r+balls[i1].r){
                if(balls[i].x!=balls[i1].x){
                    var m = (balls[i].y-balls[i1].y)/(balls[i].x-balls[i1].x)
                } else {
                    var m = 0.1
                }
                    var b = balls[i].y-m*balls[i].x
                    balls[i].x += 0.01*(-balls[i1].r-balls[i].r)*Math.sign(balls[i1].x-balls[i].x)
                    balls[i].y = balls[i].x * m + b
            }
        }
    }
    }

    requestAnimationFrame(main)
}
main()
