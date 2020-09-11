class Node{
    constructor(x,y){
        this.x = x;
        this.y= y;
        this.isColored = false;
    }
}

class Grid{
    constructor(grid_x,grid_y,node_size){
        this.grid_x= grid_x;//1240
        this.grid_y = grid_y;//400
        this.node_size = node_size;

        //creating a 2d array[20][62] because js sucks
        this.rows = this.grid_y/this.node_size;
        this.columns = this.grid_x/this.node_size;
        this.nodes = new Array(this.rows); // 400/20 = 20
        for(var i = 0; i < this.nodes.length;i++){
            this.nodes[i] = new Array(this.columns); //1240/20 = 62
        }

        this.create_nodes();
    }
    create_nodes(){
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                this.nodes[i][j] = new Node(i*20,j*20);
            }
        }        
    }//create node method
}

class Canvas{
    constructor(grid){
        this.grid = grid;
        this.c = document.getElementById("my-canvas");
        this.ismouse=false;
        console.log(this.c);
        this.ctx = this.c.getContext("2d");
        this.c.addEventListener("mousedown",  this.mousedown);
        this.c.addEventListener("mousemove" ,this.mousemove);
        this.c.addEventListener("mouseup" , this.mouseup);
        this.nodes_to_color = [];
    }

    mouse_to_node(mouse_x,mouse_y){
        return ([(mouse_x/this.grid.node_size)*this.grid.node_size,(mouse_y/this.grid.node_size)*this.grid.node_size]);         
    }

    mousedown(event){   
        this.ismousedown=true; 
        var point = this.mouse_to_node(event.clientX,event.clientY);
        console.log("mouse down @"+point);                 
    }

    mousemove(event){
        if(this.ismousedown)
        console.log(this.mouse_to_node(event.clientX,event.clientY));
    }

    mouseup(event){
        this.ismousedown=false;
        var point = this.mouse_to_node(event.clientX,event.clientY);
        console.log("mouse up @"+point); 
    }
}
function draw_grid(){
    grid = new Grid(1240,400,20);
    canvas = new Canvas(grid);

    //for vertical lines
    for(i = 0 ; i < 1240; i+=20){
        canvas.ctx.moveTo(i,0);
        canvas.ctx.lineTo(i,400);
        canvas.ctx.strokeStyle = "#808080";
        canvas.ctx.stroke();
    }

    //for horizontal lines
    for(i = 0 ; i < 400; i+=20){
        canvas.ctx.moveTo(0,i);
        canvas.ctx.lineTo(1240,i);
        canvas.ctx.strokeStyle = "#808080";
        canvas.ctx.stroke();    
    }
}
