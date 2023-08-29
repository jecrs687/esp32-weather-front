
var created = false;

export function rain (elRef:any): any{
    if(created) return;
    created = true;
    var nbDrop = 858; 
    console.log(elRef)
    
    function randRange( minNum:number, maxNum:number) {
      return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
    }
    
    function createRain() {
      var i:number;
      for(i = 1;i<nbDrop;i++) {
      var dropLeft = randRange(0,1600);
      var dropTop = randRange(-1000,1400);
      elRef.current?.append('<div class="drop" id="drop'+i+'"></div>')
      elRef.current?.querySelectorAll('#drop'+i).forEach((el:any)=>{
        el.style.left = dropLeft;
        el.style.top = dropTop;
      })
      }
    }
    createRain();
    }