const BUSINESS_PHONE = "+18888888888";
document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}));

document.querySelectorAll(".add-item").forEach(button => {
  button.addEventListener("click", () => {
    const item = button.closest(".food-card").dataset.item;
    const checkbox = [...document.querySelectorAll('#menuChoices input[type="checkbox"]')].find(box => box.value === item);
    if (checkbox) checkbox.checked = true;
    button.classList.add("added");
    button.textContent = "Added";
    document.getElementById("order").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.getElementById("orderForm").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const items = [...document.querySelectorAll('#menuChoices input[type="checkbox"]:checked')].map(box => box.value);
  const size = document.getElementById("orderSize").value;
  const date = document.getElementById("pickupDate").value;
  const notes = document.getElementById("orderNotes").value.trim();
  if (!items.length) return alert("Please choose at least one dish.");

  const message = [
    "Hi! I would like to request a made-to-order food order.",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Items: ${items.join(", ")}`,
    `Amount / size: ${size}`,
    `Preferred pickup date: ${date || "Not selected"}`,
    `Special requests: ${notes || "None"}`,
    "",
    "Please let me know availability, total price, and pickup details. Thank you!"
  ].join("\n");

  window.location.href = `sms:${BUSINESS_PHONE}?&body=${encodeURIComponent(message)}`;
});
