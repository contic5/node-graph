import './style.css'

function clear()
{
  ctx.fillStyle="#000000";
  ctx.fillRect(0,0,c.width,c.height);
}
function draw()
{
  clear();
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

let total_nodes=10;
let connections=[];
connections=generate_2d_array(10,10);

let c=document.getElementById("my_canvas") as HTMLCanvasElement;
let ctx=c.getContext("2d") as CanvasRenderingContext2D;
setInterval(draw,1000/30);