export function getBackground(temp: number): string {
    const color1 = [0,127,255];
    const color2 = [0,0,255];
    const color3 = [255,165,0];
    const color4 = [255,0,0];
    const isCold = temp< 28;
    const backgroundColor = 
    (isCold ? color1: color3).map(
      (c1,i) => Math.round(c1+(((isCold ?color2[i]: color4[i])-c1)*
      (temp/(isCold? 30: 42)))
      )
    ).join(',');
    return backgroundColor;
  }