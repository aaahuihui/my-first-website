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

  statusMessage.textContent = `当前状态已更新：${timeText}，我正在继续完善个人主页，并把学习过程记录到仓库里。`;
});
