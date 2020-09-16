colors = {"gray": "#808080" , "green":"#008000" , "red":"#FF0000" , "black":"#000000" , "background-gray":"#606060"};
node_inputs = {"start": null , "end":null , "obstacles":[]}
class Node{
    constructor(x,y,isObstacle){
        this.x = x;
        this.y= y;
        this.neighbours = []; //assigned in clockwise sense i.e. top , right , bottom , left
        this.distance = 99999999; //infinity
        this.isObstacle =isObstacle;
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
    }

    //sets the said property of node with co_ordinates in constant time by using hashing 
    set_node_property(co_ordinates, property , value ){
        if(property == "distance")
        this.nodes[co_ordinates[0]/this.node_size][co_ordinates[1]/this.node_size].distance = value;
    }

}

class DijkstrasAlgorithm{ // any node pointer is a list of co_ordinates of a node that can be used to lookup the node in constant time 
    constructor(grid){
        this.grid = grid;
        this.obstacles = []; //stores points of obstacles
        this.obstaclePointer = 0;
        this.startNodePointer = [-1,-1]; //meaning no start node selected
        this.endNodePointer = [-1,-1]; //meaning no end node selected
        console.log("CONSTRUCtor");
        console.log(this.obstacles);

    }
    
    better_includes(arr){
        var copy = this.obstacles;
        for(var i = 0; i < arr.length; i++){
            if(JSON.stringify(arr[i]) == JSON.stringify(copy))
            return true;
        }
        return false;
    }

    create_nodes(){
        console.log(this.grid.rows);
        console.log(this.grid.columns);
        for(var i = 0; i < 20; i++){
            for(var j = 0; j < 20; j++){
                if(this.better_includes(this.obstacles,[i*20,j*20]))
                this.grid.nodes[i][j] = new Node(i*20,j*20,true);
            }
        }
        console.log(this.grid.nodes);
    }

    set_start_node(start_node_point){
        this.startNodePointer = start_node_point; // stores co ordinates of start node 
    }

    set_end_node(end_node_point){
        this.endNodePointer = end_node_point;
    }

    add_obstacle_node(obstacle_node_point){
        this.obstacles[this.obstaclePointer++] = obstacle_node_point;
    }

    find_hashed_node(node_points){ //point is co ordinates of actual node and is returning the node
        return this.grid.nodes[ parseInt(node_points[0]/20)][parseInt(node_points[1]/20)];
    }
    
    solve(){ 
        this.create_nodes();
        //this.currentPointer = this.startNodePointer;
        //this.grid.set_node_property(this.currentPointer,"distance",0);
    }
}

function draw_grid(){
    //grid = new Grid(1240,400,20);
    //DijkstrasSolver = new DijkstrasAlgorithm(grid);

    canvas = document.getElementById("my-canvas");  //global variable 
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", test_function);

    //for vertical lines
    for(i = 0 ; i < 1240; i+=20){
        ctx.moveTo(i,0);
        ctx.lineTo(i,400);
        ctx.strokeStyle = colors["gray"];
        ctx.stroke();
    }

    //for horizontal lines
    for(i = 0 ; i < 400; i+=20){
        ctx.moveTo(0,i);
        ctx.lineTo(1240,i);
        ctx.strokeStyle = colors["gray"];
        ctx.stroke();    
    }
}

function test_function(event){  //event handling function, called when mouse click inside canvas
    var point = [parseInt(event.clientX/20)*20 , parseInt(event.clientY/20)*20];
    var console_output =""; 
    if(selecting_start){
        if(DijkstrasSolver.startNodePointer == [-1,-1]){
            DijkstrasSolver.set_start_node(point);
            ctx.fillStyle = colors["green"];
        }
        else{
            ctx.fillStyle = colors["background-gray"];
            ctx.fillRect(DijkstrasSolver.startNodePointer[0] , DijkstrasSolver.startNodePointer[1] , 20 , 20);
            DijkstrasSolver.set_start_node(point);
            ctx.fillStyle = colors["green"];
            ctx.fillRect(point[0],point[1],20,20);
        }
        console_output = ">Start Node Selected "+"("+DijkstrasSolver.startNodePointer+")";
    }
    else if(selecting_end){
        if(DijkstrasSolver.endNodePointer == [-1,-1]){
            DijkstrasSolver.set_end_node(point);
            ctx.fillStyle = colors["red"];
        }
        else{
            ctx.fillStyle = colors["background-gray"];
            ctx.fillRect(DijkstrasSolver.endNodePointer[0] , DijkstrasSolver.endNodePointer[1] , 20 , 20);
            DijkstrasSolver.set_end_node(point);
            ctx.fillStyle = colors["red"];
            ctx.fillRect(point[0],point[1],20,20);
        }
        console_output = ">End Node Selected "+"("+DijkstrasSolver.endNodePointer+")";
    }
    else if(selecting_obstacle){
        ctx.fillStyle = colors["black"];
        DijkstrasSolver.add_obstacle_node(point);
        console_output = ">Obstacle Selected"+"("+point+")";
    }
    ctx.fillRect(point[0] , point[1] , 20 , 20);
    document.getElementsByClassName("textbox")[0].value = console_output; 
}

function decide_point(str){ //onclick of any menu button 
    switch(str){
        case "start":
            selecting_start = true;
            selecting_end = false;
            selecting_obstacle = false;
            document.getElementsByClassName("textbox")[0].value = ">Selecting Start Point...";
            break;
        case "end":
            selecting_end = true;
            selecting_start = false;
            selecting_obstacle = false;
            document.getElementsByClassName("textbox")[0].value = ">Selecting End Point...";
            break;
        default:
            selecting_obstacle = true;
            selecting_start = false;
            selecting_end = false;
            document.getElementsByClassName("textbox")[0].value = ">Selecting Obstaecles...";
            break;
    }
}

function call_solve(){
    //console.log("method called");
    DijkstrasSolver.solve();
}