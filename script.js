console.log("JS Loaded");

const state = {
  contacts: [],
};

function getData() {
  const getUser = fetch(
    "https://dummy-apis.netlify.app/api/contact-suggestions?count=8"
  );
  getUser
    .then(function (response) {
      if (!response.ok) {
        console.error("failed to Load Data");
      }
      return response.json();
    })
    .then((jsonData) => {
      state.contacts = jsonData;
      render();
    });
}

function contactTemplate(contactData) {
  /** wrapper der alle elemente umgibt */
  const wrapperElement = document.createElement("div");
  wrapperElement.classList.add("card");
  wrapperElement.style.backgroundImage =
    "url(" +
    contactData.backgroundImage +
    "?random=" +
    contactData.name.first +
    ")";

  /** Close Button */
  const closeButton = document.createElement("button");
  closeButton.classList.add("close");

  /** contact Image */
  const userImage = document.createElement("img");
  userImage.src = contactData.picture;

  /** contact name */
  const personName = document.createElement("h2");
  const personNameTxt = document.createTextNode(
    contactData.name.first + " " + contactData.name.last
  );
  personName.appendChild(personNameTxt);

  /** profession */
  const pProfession = document.createElement("p");
  const professionTxt = document.createTextNode(contactData.title);
  pProfession.appendChild(professionTxt);
  pProfession.classList.add("profession");

  /** Additional Information */
  const pMore = document.createElement("p");

  const pMoreTxt = document.createTextNode(
    "Mutual Connections" + contactData.mutualConnections
  );

  pMore.appendChild(pMoreTxt);
  pMore.classList.add("additional-information");

  /** Connect Button */
  const connectButton = document.createElement("button");
  connectButton.innerText = "Connect";
  connectButton.classList.add("connect");

  wrapperElement.append(
    closeButton,
    userImage,
    personName,
    pProfession,
    pMore,
    connectButton
  );

  return wrapperElement;
}

function render() {
  for (let contact of state.contacts) {
    const personElement = contactTemplate(contact);
    console.log(personElement);
    document.querySelector(".suggestions").append(personElement);
  }
}

getData();
/*
<div class="card">
  <button class="close"></button>
  <img src="" alt="" />
  <h2></h2>
  <p class="profession"></p>
  <p class="additional-information"></p>
  <button class="connect"></button>
</div>
*/
