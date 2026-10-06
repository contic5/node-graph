import './style.css'
import { Node } from './node';
import { calculate_distance,generate_2d_array } from './shared';
function clear()
{
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,c.width,c.height);
}
function calculate_connections()
{
  for(let from=0;from<nodes.length;from++)
  {
    for(let to=from+1;to<nodes.length;to++)
    {
      const distance=calculate_distance(nodes[from],nodes[to]);
      if(distance<connection_distance)
      {
        connection_frames[from][to]=Math.min(connection_frames[from][to]+1,required_connection_frames);
      }
      else
      {
        connection_frames[from][to]=Math.max(connection_frames[from][to]-1,0);
      }

      if(!connected[from][to]&&connection_frames[from][to]==required_connection_frames)
      {
        connected[from][to]=true;
      }
      else if(connected[from][to]&&connection_frames[from][to]==0)
      {
        connected[from][to]=false;
      }
    }
  }
}
function draw_connections()
{
  ctx.strokeStyle=Node.line_color;
  ctx.lineWidth=2;
  for(let from=0;from<nodes.length;from++)
  {
    for(let to=from+1;to<nodes.length;to++)
    {
      if(connected[from][to]==true)
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
  
  calculate_connections();
  frames_drawn+=1;

  if(frames_drawn>=required_connection_frames)
  {
    draw_connections();

    for(let node of nodes)
    {
      node.draw(ctx);
    }
  }
}
function setup()
{
  nodes=[];
  for(let i=0;i<total_nodes;i++)
  {
    nodes.push(new Node(c));
  }
  connection_frames=generate_2d_array(total_nodes,total_nodes,0);
  connected=generate_2d_array(total_nodes,total_nodes,0);
  frames_drawn=0;
}
export function update_values(e:Event)
{
  if(e.target instanceof HTMLInputElement)
  {
    const target_class=e.target.className;
    let class_elements=document.getElementsByClassName(target_class);
    for(let class_element of class_elements)
    {
      if(class_element instanceof HTMLInputElement)
      {
        class_element.value=e.target.value;
      }
    }
  }
  let total_nodes_element=document.getElementsByClassName("total_nodes")[0] as HTMLInputElement;
  total_nodes=parseInt(total_nodes_element.value);

  let connection_distance_element=document.getElementsByClassName("connection_distance")[0] as HTMLInputElement;
  connection_distance=parseInt(connection_distance_element.value);

  let node_speed_element=document.getElementsByClassName("node_speed")[0] as HTMLInputElement;
  node_speed=parseInt(node_speed_element.value)/5;
  console.log(`Total Nodes: ${total_nodes} | Connection Distance: ${connection_distance} | Node Speed: ${node_speed}`);
  Node.move_speed=node_speed;

  let node_color_element=document.getElementById("node_color") as HTMLInputElement;
  Node.node_color=node_color_element.value;


  let line_color_element=document.getElementById("line_color") as HTMLInputElement;
  Node.line_color=line_color_element.value;


  setup();
}

let total_nodes=125;
let connection_distance=150;
let node_speed=2;

Node.move_speed=node_speed;
Node.node_color="lightblue";
Node.line_color="white";
let nodes:Node[]=[];

let c=document.getElementById("my_canvas") as HTMLCanvasElement;
c.width=window.innerWidth;
c.height=window.innerHeight-30;

let connection_frames=generate_2d_array(total_nodes,total_nodes,0);
let connected=generate_2d_array(total_nodes,total_nodes,0);
let required_connection_frames=10;
let frames_drawn=0;

let ctx=c.getContext("2d") as CanvasRenderingContext2D;

setup();
setInterval(draw,1000/30);