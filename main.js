const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
var balls = [{x:100,y:100,r:30,prevPos:[100,100]},{x:130,y:130,r:30,prevPos:[130,130]}]

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
        
        //velocity calculations
        var tempPos = [balls[i].x,balls[i].y]

        if(balls[i].x<balls[i].r||balls[i].x>canvas.width-balls[i].r){
        balls[i].x-=(balls[i].x-balls[i].prevPos[0])
        } else{
        balls[i].x+=(balls[i].x-balls[i].prevPos[0])
        }
        if(balls[i].y<balls[i].r||balls[i].y>canvas.height-balls[i].r){
        balls[i].y-=(balls[i].y-balls[i].prevPos[1])
        } else{
        balls[i].y+=(balls[i].y-balls[i].prevPos[1])
        }
        
        balls[i].prevPos = tempPos


        for(var i1=0;i1<balls.length;i1++){
            if(i1!=i){
                var d = dist(balls[i].x,balls[i1].x,balls[i].y,balls[i1].y)
                if(d<balls[i].r+balls[i1].r){
                    balls[i].x+=(balls[i].x-balls[i1].x)/(d-balls[i].r+balls[i1].r)
                    balls[i].y+=(balls[i].y-balls[i1].y)/(d-balls[i].r+balls[i1].r)
                }
            }
        }
    }
    requestAnimationFrame(main)
}
main()
