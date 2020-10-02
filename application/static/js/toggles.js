function toggleElement(id) {
  target = document.getElementById(id);
  target.classList.toggle('hidden');
}

function toggleMenu() {
  menu = document.getElementById('navigation');
  shades = document.getElementById('shades');

  shades.classList.toggle('hidden');
  menu.classList.toggle('display-block');
}

function dismissNotif(id) {
  target = document.getElementById(id);
  target.classList.toggle('hidden');
}

function showControls(id) {
  document.getElementById(id).classList.toggle('hidden');
}

// function fill_card_form(button_id, action) {
//   console.log(button_id);
//   console.log(action);
//   target_card = document.getElementById('card-' + button_id);
//   target_card.innerHTML = "#" + button_id + " has been processed. Please refresh the page to see the change.";
// }