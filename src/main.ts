import './style.css'
import { Node } from './node';
import { calculate_distance,generate_2d_array } from './shared';
function clear()
{
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,c.width,c.height);
}
function draw_connections()
{
  ctx.strokeStyle="azure";
  ctx.lineWidth=2;
  for(let from=0;from<nodes.length;from++)
  {
    for(let to=from+1;to<nodes.length;to++)
    {
      const distance=calculate_distance(nodes[from],nodes[to]);

      if(distance<connection_distance)
      {
        ctx.beginPath();
        ctx.moveTo(nodes[from].x,nodes[from].y);
        ctx.lineTo(nodes[to].x,nodes[to].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  ctx.strokeStyle="black";
  ctx.lineWidth=1;
}
function draw()
{
  clear();
  for(let node of nodes)
  {
    node.move(c);
  }
  
  for(let node of nodes)
  {
    node.draw(ctx);
  }

  draw_connections();
}
function setup()
{
  nodes=[];
  for(let i=0;i<total_nodes;i++)
  {
    nodes.push(new Node(c,node_speed));
  }
}
export function update_values(e:Event)
{

  let total_nodes_element=document.getElementsByClassName("total_nodes")[0] as HTMLInputElement;
  total_nodes=parseInt(total_nodes_element.value);

  let connection_distance_element=document.getElementsByClassName("connection_distance")[0] as HTMLInputElement;
  connection_distance=parseInt(connection_distance_element.value);

  let node_speed_element=document.getElementsByClassName("connection_distance")[0] as HTMLInputElement;
  node_speed=parseInt(node_speed_element.value)/5;
  setup();
}

let total_nodes=50;
let connection_distance=150;
let node_speed=2;
let nodes:Node[]=[];

let c=document.getElementById("my_canvas") as HTMLCanvasElement;
let ctx=c.getContext("2d") as CanvasRenderingContext2D;

setup();
setInterval(draw,1000/30);