const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

helloButton.addEventListener("click", () => {
  message.textContent = "你刚刚触发了一个最基础的 JavaScript 交互，说明这个网页不只是静态文字了。";
});
