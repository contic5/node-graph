export class Node
{
    static c:HTMLCanvasElement;
    static ctx:CanvasRenderingContext2D;
    static move_speed:number
    static node_color:string;
    static line_color:string;

    x=0;
    y=0;
    radius=5;
    angle:number;
    v_x:number;
    v_y:number;

    constructor(c:HTMLCanvasElement)
    {
       this.angle=Math.random()*2*Math.PI;

       this.x=Math.floor(Math.random()*(c.width-this.radius));
       this.y=Math.floor(Math.random()*(c.width-this.radius));
       this.v_x=Node.move_speed*Math.cos(this.angle);
       this.v_y=Node.move_speed*Math.sin(this.angle);
    }
    move(c:HTMLCanvasElement)
    {
        this.x+=this.v_x;
        this.y+=this.v_y;

        if(this.x<0)
        {
            this.x=0;
            this.v_x=Math.abs(this.v_x);
        }
        if(this.x>c.width-this.radius)
        {
            this.x=c.width-this.radius;
            this.v_x=-Math.abs(this.v_x);
        }
        if(this.y<0)
        {
            this.y=0;
            this.v_y=Math.abs(this.v_y);
        }
        if(this.y>c.height-this.radius)
        {
            this.y=c.height-this.radius;
            this.v_y=-Math.abs(this.v_y);
        }
    }
    draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle=Node.node_color;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}