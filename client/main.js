var socket = io.connect('172.20.2.51:6677/', {'forceNew': true});

socket.on('messages',function(data){
  if (data) {
    console.log(data);
    render(data);
  }
});

function render(data){
  if (data) {
    var html = data.map(function(message,indice){
      if(message.color == 'rgb(0, 0, 0)'){

        var color_ = 'white';

      }else{
        var color_ = 'black';        
      }


      return(`
        <div class="message" style="background:${message.color};color:${color_}" >
          <strong>${message.nickname}</strong>
          <p>${message.text}<p>
        </div>
      `);
    }).join(' ');

    document.getElementById('messages').innerHTML = html;
  }
}
///home/administrativo/Documentos/j/javascript/socket/client/main.js
//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


function addMessage(e){
 // e.preventDefault();
 // e.preventDefault();
  var message = {
    /*nikname:'ggg',
    text:'chuy'*/
    color:document.getElementById('colorDisplay').style.backgroundColor,
    nickname:document.getElementById('nickname').value,
    text:document.getElementById('text').value

  };

 // console.log(message);
 // return false;

document.getElementById('nickname').style.display = 'none';


socket.emit('add-message',message);
 document.getElementById('text').value = '';
return false;


}



document.getElementById('text').addEventListener('input', function(event) {
  var inputValue = event.target.value;
  if (/\n/.test(inputValue)) {
    event.preventDefault(); // Evita que el Enter realice la acción por defecto (como agregar un salto de línea)
    addMessage(); // Llama a la función que envía el mensaje
    event.target.value = ''; // Limpia el área de texto después de enviar el mensaje
  }
});
