document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector("nav");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");
  const okBtn = document.getElementById("okBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");

  document.getElementById("year").textContent = new Date().getFullYear();

  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

  function showModal(title, text) {
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.remove("hidden");
  }

  function hideModal() {
    modal.classList.add("hidden");
  }

  document.querySelectorAll(".order-btn").forEach(button => {
    button.addEventListener("click", () => {
      const meal = button.dataset.meal;
      showModal(meal, `You selected ${meal}. The booking flow can be connected to your backend when you are ready.`);
    });
  });

  document.getElementById("contactBtn").addEventListener("click", () => {
    showModal("Contact MaakaTiffin", "Your MaakaTiffin contact/WhatsApp details can be added here.");
  });

  closeModal.addEventListener("click", hideModal);
  okBtn.addEventListener("click", hideModal);
  modal.addEventListener("click", e => { if (e.target === modal) hideModal(); });
});
