export class hsl {
  public h : number = 0;
  public s : number = 0;
  public l : number = 0;

  constructor(h: number, s: number, l:number)
  {
    this.h = h;
    this.s = s;
    this.l = l;
  }

  hslToHTMLCode()
  {
    let r : number = 0;
    let g : number = 0;
    let b : number = 0;

    if(this.s === 0){
        r = g = b = this.l;
    }else{
        var q = this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s;
        var p = 2 * this.l - q;
        r = Math.round(this.hue2rgb(p, q, this.h + 1/3)*255);
        g = Math.round(this.hue2rgb(p, q, this.h)*255);
        b = Math.round(this.hue2rgb(p, q, this.h - 1/3)*255);
    }
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  componentToHex(c: number) : string {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  
  hue2rgb(p : number, q: number, t :number): number
  {
    if(t < 0) t += 1;
    if(t > 1) t -= 1;
    if(t < 1/6) return p + (q - p) * 6 * t;
    if(t < 1/2) return q;
    if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p; 
  }

}