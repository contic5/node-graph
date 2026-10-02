import './style.css'
import { Node } from './node';

function clear()
{
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,c.width,c.height);
}
function draw_connections()
{
  ctx.strokeStyle="azure";
  ctx.lineWidth=3;
  for(let from=0;from<nodes.length;from++)
  {
    for(let to=from+1;to<nodes.length;to++)
    {
      if(connections[from][to]==true)
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
function generate_2d_array(width:number,height:number,value:any=false)
{
  let res:any[][]=[];
  for(let i=0;i<height;i++)
  {
    res.push([]);
    for(let j=0;j<width;j++)
    {
      res[i].push(value);
    }
  }
  return res;
}
function setup()
{
  connections=generate_2d_array(total_nodes,total_nodes);
  nodes=[];
  for(let i=0;i<total_nodes;i++)
  {
    nodes.push(new Node(c));
  }

  const total_connections=(connection_rate*((total_nodes-1)*(total_nodes-1)))/(2*100);
  let connections_made=0;

  let total_attempts=0;
  let max_attempts=Math.min(10000,total_nodes*total_nodes*total_nodes);

  while(connections_made<total_connections&&total_attempts<max_attempts)
  {
    let from=Math.floor(Math.random()*total_nodes);
    let to=Math.floor(Math.random()*total_nodes);
    if(from!=to&&!connections[from][to])
    {
      connections[from][to]=true;
      connections[to][from]=true;
      connections_made+=1;
    }
    total_attempts+=1;
  }
  console.log(connections_made);
}

let total_nodes=50;
let connections:boolean[][]=[];
let nodes:Node[]=[];
let connection_rate=5;

let c=document.getElementById("my_canvas") as HTMLCanvasElement;
let ctx=c.getContext("2d") as CanvasRenderingContext2D;

setup();
setInterval(draw,1000/30);