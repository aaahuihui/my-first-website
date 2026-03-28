const statusButton = document.getElementById("statusButton");
const statusMessage = document.getElementById("statusMessage");

statusButton.addEventListener("click", () => {
  const now = new Date();
  const timeText = now.toLocaleString("zh-CN", {
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });

  statusMessage.textContent = `当前状态已更新：${timeText}，我是电子信息专业研一学生，正在继续练习 Python、C、C++，也在不断学习网页开发。`;
});
