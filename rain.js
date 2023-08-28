var nbDrop = 858; 
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}
function createRain() {
  for(i = 1;i<nbDrop;i++) {
  var dropLeft = randRange(0,1600);
  var dropTop = randRange(-1000,1400);

  document.querySelectorAll('#rain')[0].append('<div class="drop" id="drop'+i+'"></div>');
  document.querySelectorAll('#drop'+i).forEach((el)=>{
    el.style.left = dropLeft;
    el.style.top = dropTop;
  })
  }

}
createRain();
