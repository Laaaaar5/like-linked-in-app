const state = {
  contacts: [],
};

function getData(n) {
  const getUser = fetch(
    `https://dummy-apis.netlify.app/api/contact-suggestions?count=${n}`
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

  /* Background Image*/
  const imageWrapper = document.createElement("div");
  imageWrapper.classList.add("image-wrapper");

  const backgroundImageUrl =
    "url(" +
    contactData.backgroundImage +
    "?random=" +
    contactData.name.first +
    ")";

  imageWrapper.style.setProperty(
    "--profile-background-image",
    backgroundImageUrl
  );

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
    contactData.mutualConnections + " mutual connections"
  );
  pMore.classList.add("additional-information");
  pMore.appendChild(pMoreTxt);
  if (contactData.mutualConnections === 0) {
    pMore.style.setProperty("visibility", "hidden");
  }

  /** Connect Button */
  const connectButton = document.createElement("button");
  connectButton.innerText = "Connect";
  connectButton.classList.add("connect");

  wrapperElement.append(
    imageWrapper,
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
    document.querySelector(".suggestions").append(personElement);
  }
}

function render2() {
  //pending invitations
  const pendEl = document.createElement("p");
  const pendText = document.createTextNode(" pending invitations");
  const pendPre = document.createElement("span");
  pendPre.innerText = "No";

  pendEl.append(pendPre, pendText);
  document.querySelector("header").append(pendEl);

  //people you may know
  const peopEl = document.createElement("p");
  const peopText = document.createTextNode("People you may know in your area");

  peopEl.append(peopText);
  document
    .querySelector("main")
    .insertBefore(peopEl, document.querySelector(".suggestions"));
}

getData(8);
render2();

let penNum = 0;
document.body.addEventListener("click", (e) => {
  //remove
  if (e.target.classList.value === "close") {
    e.target.parentElement.remove();
    getData(1);
  }

  //connect/pending
  if (e.target.classList.value === "connect") {
    penNum++;
    document.querySelector("span").innerHTML = penNum;
    e.target.innerHTML = "Pending";

    e.target.classList.toggle("connect");
    e.target.classList.toggle("pending");

    console.log(e.target, penNum);
  } else if (e.target.classList.value === "pending") {
    penNum--;
    document.querySelector("span").innerHTML = penNum;
    if (penNum === 0) {
      document.querySelector("span").innerHTML = "No";
    }
    e.target.innerHTML = "Connect";
    e.target.classList.toggle("connect");
    e.target.classList.toggle("pending");
  }
});
