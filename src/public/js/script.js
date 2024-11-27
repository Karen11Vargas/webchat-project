const socket = io();

const send = get(".msger-send-btn");
const msgerChat = get(".msger-chat");

// Función para obtener una cookie por su nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
      return parts.pop().split(';').shift();
  }
  return null; 
}

const username = getCookie('username');


send.addEventListener("click", () => {

  const message = get(".msger-input");
  if (message.value != "") {
    socket.emit("send-message",message.value);
    message.value=""
  }
});

socket.on("message", ({user, message}) => {

    const isOwnMessage = user === username;

    const msg = `
    <div class="msg ${isOwnMessage ? 'right-msg' : 'left-msg'}">
      <div class="msg-img" style="background-image: url(https://xsgames.co/randomusers/avatar.php?g=pixel)"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${user}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${message}</div>
      </div>
    </div>
    `;

    msgerChat.insertAdjacentHTML("beforeend", msg);
    msgerChat.scrollTop += 500;
});

function get(selector, root = document) {
  return root.querySelector(selector);
}


function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}