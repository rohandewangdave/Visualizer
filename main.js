class Node{
    Node(x,y){
        this.point = [x,y];
    }
}

function draw_grid(){
    var c = document.getElementsByClassName("my-canvas");
    var ctx = c[0].getContext("2d");

    //for vertical lines
    for(i = 0 ; i < 1240; i+=10){
        ctx.moveTo(i,0);
        ctx.lineTo(i,400);
        ctx.strokeStyle = "#808080";
        ctx.stroke();
    }

    //for horizontal lines
    for(i = 0 ; i < 400; i+=10){
        ctx.moveTo(0,i);
        ctx.lineTo(1240,i);
        ctx.strokeStyle = "#808080";
        ctx.stroke();
    }
}