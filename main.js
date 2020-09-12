class Node{
    constructor(x,y){
        this.x = x;
        this.y= y;
        this.neighbours = []; //assigned in clockwise sense i.e. top , right , bottom , left
        this.distance = 99999999; //infinity
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

    //populating nodes array with objects of type Node O(n)
    create_nodes(){
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                this.nodes[i][j] = new Node(i*20,j*20); // hashing done here, (i,j) stores node with (x,y) = (i*20,j*20) therefore a node with (x,y) can be retrieved from nodes[x/20,y/20]
            }
        } 
        this.assign_neighbours();       
    }

    //assigning neighbours to each node as mentioned in the nodes class O(n)
    assign_neighbours(){
        var k =0;
        for(var i = 0; i < this.rows; i++){
            for(var j = 0; j < this.columns; j++){
                if(i-1 >=0) // for neighbour above 
                this.nodes[i][j].neighbours[k++] = this.nodes[i-1][j];

                if(j+1 < this.columns) //for right neighbour 
                this.nodes[i][j].neighbours[k++] = this.nodes[i][j+1];

                if(i+1 < this.rows) //for bottom neighbour 
                this.nodes[i][j].neighbours[k++] = this.nodes[i+1][j];

                if(j-1 >= 0) // for left neighbour 
                this.nodes[i][j].neighbours[k++] = this.nodes[i][j-1];
            }
        }
    }

    find_node(co_ordinates){ //finding node by hashing. Time complexity to find a node is now O(1)
        return ;
    }

    //sets the said property of node with co_ordinates in constant time by using hashing 
    set_node_property(co_ordnaites, property , value ){
        if(property == "distance")
        this.nodes[co_ordinates[0]/this.node_size][co_ordinates[1]/this.node_size].distance = value;
    }
}

//front end related class
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

class DijkstrasAlgorithm{ // any node pointer is a list of co_ordinates of a node that can be used to lookup the node in constant time 
    constructor(canvas,start,end,obstacles){
        this.canvas = canvas;
        this.grid = this.canvas.grid;
        this.startNodePointer = [start.x , start.y];
        this.endNodePointer = [end.x , end.y];
        this.obstacles = obstacles; //left for later
        this.unvisited = this.grid.nodes;
    }
    
    solve(){
        this.currentPointer = this.startNodePointer;
        this.grid.find_node(this.currentPointer).set_node_property("distance",0);
        console.log(find_node(this.currentPointer).distance); 
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
