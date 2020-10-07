const socket = io("http://localhost:8000");

const msgContainer = document.querySelector(".msg-container")
const msgInput = document.getElementsByClassName("message-input")
const heaing = document.querySelector(".heading")
const form = document.querySelector(".form")
const userName = prompt("Welcome enter your Name");

var audio = new Audio("Sms.mp3")
const appendFunction = (message, position) => {
    const newElement = document.createElement("div");
    newElement.innerText = message;
    newElement.classList.add("message");
    newElement.classList.add(position)
    msgContainer.append(newElement)
    audio.play();
}

const autoinvovk = value => {
    if (!value == null) {
        document.getElementById("userName").innerText = `welcome ${value} ichat`
    }
}
socket.emit("new-user-joined", userName)

autoinvovk(userName)
socket.on("user-joined", name => {
    appendFunction(`${name} new join`, "left")
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(msgInput[0].value);
    let message = msgInput[0].value;
    appendFunction(`you : ${message}`, "right")
    socket.emit("send", message);
    msgInput[0].value = " ";
})

socket.on("recived", data => {
    appendFunction(`${data.name} : ${data.message}`, "left")
})

socket.emit("left", name => {
    appendFunction(`${name} : left the chat`)
})