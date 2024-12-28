const specialButtons = document.querySelectorAll('.special');
const today = new Date();
const localDate = today.toLocaleDateString('pt-BR')

specialButtons.forEach(button => {
  const releaseDate = button.dataset.releaseDate;
  const image = button.getElementsByTagName('img')[0];

  if (releaseDate == localDate) {
    button.classList.add('unblocked');
    button.classList.remove('blocked', 'expired')
    image.src = "assets/img/basicLogo.png"
  } else if (releaseDate > localDate) {
    button.classList.add('blocked');
  } else if (releaseDate < localDate) {
    button.classList.add('expired');
  }
})

const blockedButtons = document.querySelectorAll('.blocked, .expired');
const popup = document.querySelector('#popup');
const popupContainer = popup.querySelector('.popup-container');
const popupContent = popupContainer.querySelector('.popup-content');
const popupAd = popupContent.querySelector('.popup-ad');
const popupMessage = popupContent.querySelector('.popup-message');
const closePopup = popupContainer.querySelector('#closePopup');

function updatePopupContent(adText, messageText) {
  popupAd.textContent = adText;
  popupMessage.textContent = messageText;
}


const scrollWidth = window.innerWidth - document.documentElement.clientWidth;
console.log(scrollWidth);

blockedButtons.forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault();
    if (button.classList.contains('expired')) {
      updatePopupContent('Escrevi, não leu, perdeu!', 'Essa data já passou, por isso o botão está bloqueado.');
    } else if (button.classList.contains('blocked')) {
      updatePopupContent('Tenha paciência!', 'Essa data ainda não chegou, por isso o botão está bloqueado.')
    }

    document.body.style.paddingRight = `${scrollWidth}px`;
    popup.classList.remove('hidden');
    document.body.classList.add('noscroll');

    closePopup.addEventListener('click', function () {
      document.body.style.paddingRight = '';
      popup.classList.add('hidden');
      document.body.classList.remove('noscroll');
    });
  });
});