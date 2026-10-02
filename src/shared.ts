import { Node } from "./node";
export function generate_2d_array(width:number,height:number,value:any=false)
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
export function calculate_distance(node_1:Node,node_2:Node)
{
    return Math.sqrt(Math.pow(node_1.x-node_2.x,2)+Math.pow(node_1.y-node_2.y,2));
}