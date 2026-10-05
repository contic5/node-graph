export class Node
{
    static c:HTMLCanvasElement;
    static ctx:CanvasRenderingContext2D;

    x=0;
    y=0;
    radius=5;
    move_speed=2;
    angle:number;
    v_x:number;
    v_y:number;

    constructor(c:HTMLCanvasElement,move_speed:number)
    {
       this.angle=Math.random()*2*Math.PI;
       this.move_speed=move_speed;
       
       this.x=Math.floor(Math.random()*(c.width-this.radius));
       this.y=Math.floor(Math.random()*(c.width-this.radius));
       this.v_x=this.move_speed*Math.cos(this.angle);
       this.v_y=this.move_speed*Math.sin(this.angle);
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
        ctx.fillStyle="lightblue";
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }
}