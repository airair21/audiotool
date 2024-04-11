const save = document.getElementbyId('save');

save.addEventListener('click', function(){
  html2canvas(document.querySelector('canvas', {onrendered: function(canvas){
    document.body.appendChild(canvas);
    return Canvas2Image.saveAsPNG(canvas);
  }}))
})
