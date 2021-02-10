$(function () {
  const SOCKET = io.connect('http://localhost:3000');
  const MESSAGE = $('#message');
  const USERNAME = $('#username');
  const SEND_MESSAGE = $('#send-message');
  const SEND_USERNAME = $('#send-username');
  const CHATROOM = $('#chatroom');
  const FEEDBACK = $('#feedback');
  const MIN = 1;
  const MAX = 9;

  let random = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  let textColor;

  function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }

  function showTimeNow() {
    let today = new Date();
    let hour = today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();

    return `${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
  }

  switch (random) {
    case 1:
      textColor = 'red';
      break;
    case 2:
      textColor = 'orange';
      break;
    case 3:
      textColor = 'dark-cyan';
      break;
    case 4:
      textColor = 'blue-violet';
      break;
    case 5:
      textColor = 'green';
      break;
    case 6:
      textColor = 'medium-blue';
      break;
    case 7:
      textColor = 'olive';
      break;
    case 8:
      textColor = 'indian-red';
      break;
    case 9:
      textColor = 'dark-khaki';
      break;
  }

  SOCKET.on('add_mess', (data) => {
    FEEDBACK.html('');
    MESSAGE.val('');
    CHATROOM.append(
      `<div class="message"><span class="time ${
        data.className
      }">[${showTimeNow()}] </span><span class="username ${data.className}">${
        data.username
      }:</span> ${data.message}</div>`
    );
  });

  SEND_USERNAME.click(() => {
    if (USERNAME.val().trim().length === 0) {
      USERNAME.val('');
      return;
    }
    SOCKET.emit('change-username', { username: USERNAME.val() });
  });

  SEND_MESSAGE.click(() => {
    if (MESSAGE.val().trim().length === 0) {
      MESSAGE.val('');
      return;
    }
    SOCKET.emit('new_message', {
      message: MESSAGE.val(),
      className: textColor,
    });
  });

  MESSAGE.bind('keypress', () => {
    SOCKET.emit('typing');
  });

  SOCKET.on('typing', (data) => {
    FEEDBACK.html(`<p class="feedback"><i>${data.username} prints a message...</i></p>`);
  });
});
