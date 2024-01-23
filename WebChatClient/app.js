"use strict";
// connection to server side
const connection = new signalR.HubConnectionBuilder()
	.withUrl("http://localhost:5075/chatHub")
	.configureLogging(signalR.LogLevel.Information)
	.build();

const start = async () => {
	try {
		await connection.start();
		console.log("Connected to signalR");
	} catch (error) {
		console.log(error);
	}
};

// User joins the platform
const joinUser = async () => {
	const name = window.prompt("Enter the name: ");
	if (name) {
		sessionStorage.setItem("user_name", name);
		// Now user will join chat
		await joinChat(name);
	}
};

// Calls the JoinChat method from server side to alert other users
const joinChat = async (user) => {
	try {
		const message = `${user} joined the chat!`;
		await connection.invoke("JoinChat", user, message);
	} catch (error) {
		console.log(error);
	}
};

// fetching the username from session storage
const getUser = () => sessionStorage.getItem("user_name");

// Defines and executes Receive Message Api for JoinChat
// Client is listening here (connection.on)
const receiveMessage = async () => {
	const currentUser = getUser();
	if (!currentUser) return;
	try {
		await connection.on("ReceiveMessage", (user, message) => {
			const messageClass = currentUser === user ? "sent" : "received";
			appendMessage(message, messageClass);
		});
	} catch (error) {
		console.log(error);
	}
};

const sendMessage = async (user, message) => {
	try {
		await connection.invoke("SendMessage", user, message);
	} catch (error) {
		console.log(error);
	}
};

// Text box element
const textBox = document.getElementById("txt-message");

// Send button
document.getElementById("send-message").addEventListener("click", async (e) => {
	sendingMessage(e);
});

// When use hits 'enter button'
textBox.addEventListener("keydown", async (e) => {
	if (e.key === "Enter") {
		sendingMessage(e);
	}
});

//send message
const sendingMessage = async (e) => {
	e.preventDefault();
	const user = getUser();
	if (!user) return;
	const message = `${user}: ${textBox.value}`;
	if (message) {
		// call the sendMessage api
		await sendMessage(user, message);

		// now clear the textbox
		textBox.value = "";
	}
};

// Appending messages to message section
const appendMessage = (message, messageClass) => {
	const messageBox = document.getElementById("messageSection");
	const newMessage = document.createElement("div");
	newMessage.classList.add(`msg-box`);
	newMessage.classList.add(messageClass);
	newMessage.innerText = message;
	messageBox.appendChild(newMessage);
};

//starting the app
const startApp = async () => {
	await start();
	await joinUser();
	await receiveMessage();
};

// Program
startApp();
