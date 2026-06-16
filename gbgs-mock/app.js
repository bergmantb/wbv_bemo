const processToggle = document.querySelector("[data-process-toggle]");
const processMenu = document.querySelector("[data-process-menu]");
const createWfmtButton = document.querySelector("[data-create-wfmt]");
const openGbgsButton = document.querySelector("[data-open-gbgs]");
const wfmtStatus = document.querySelector("[data-wfmt-status]");
const choiceBackdrop = document.querySelector("[data-choice-backdrop]");
const areaBackdrop = document.querySelector("[data-area-backdrop]");
const klsBackdrop = document.querySelector("[data-kls-backdrop]");
const areaForm = document.querySelector("[data-area-form]");
const areaType = document.querySelector("[data-area-type]");
const areaId = document.querySelector("[data-area-id]");
const ruleTitle = document.querySelector("[data-rule-title]");
const ruleText = document.querySelector("[data-rule-text]");
const bemoFormat = document.querySelector("[data-bemo-format]");
const bemoLegend = document.querySelector("[data-bemo-legend]");
const validationMessage = document.querySelector("[data-validation-message]");
const toast = document.querySelector("[data-toast]");
let wfmtCreated = false;
let savedAreaId = "BEMO_1312200021";

const rules = {
  bemo: {
    title: "Gebiets-ID-Regel Betreibermodell",
    text: "Format: BEMO_<10-stellige Vertragsnummer>, zum Beispiel BEMO_1312200021.",
    example: "BEMO_1312200021",
    pattern: /^BEMO_[0-9]{10}$/
  },
  dl: {
    title: "Gebiets-ID-Regel Deckungsluecke",
    text: "Format: DL_<Regel gemaess Fachvorgabe>. Die Detailregel ist fachlich noch zu bestaetigen.",
    example: "DL_5005300021",
    pattern: /^DL_.+/
  },
  gfp: {
    title: "Gebiets-ID-Regel GlasfaserPlus",
    text: "Format: GFP_<Regel gemaess Fachvorgabe>. Die Detailregel ist fachlich noch zu bestaetigen.",
    example: "GFP_5005300021",
    pattern: /^GFP_.+/
  }
};

function show(element) {
  element.hidden = false;
}

function hide(element) {
  element.hidden = true;
}

function showToast(message) {
  toast.textContent = message;
  show(toast);
  window.setTimeout(() => hide(toast), 3200);
}

function setWfmtCreated(value) {
  wfmtCreated = value;
  openGbgsButton.disabled = !value;
  openGbgsButton.classList.toggle("disabled", !value);
  createWfmtButton.textContent = value ? "WFMT-Auftrag erzeugt" : "WFMT-Auftrag erzeugen";
  createWfmtButton.disabled = value;
  wfmtStatus.classList.toggle("ready", value);
  wfmtStatus.textContent = value
    ? "WFMT-Auftrag erzeugt. GBGS-Funktionen sind jetzt aktiv."
    : "WFMT-Auftrag noch nicht erzeugt. GBGS-Funktionen sind deaktiviert.";
}

function updateRule() {
  const rule = rules[areaType.value];
  ruleTitle.textContent = rule.title;
  ruleText.textContent = rule.text;
  areaId.value = rule.example;
  const showBemo = areaType.value === "bemo";
  bemoFormat.hidden = !showBemo;
  bemoLegend.hidden = !showBemo;
  hide(validationMessage);
}

function validateAreaId() {
  const rule = rules[areaType.value];
  const valid = rule.pattern.test(areaId.value.trim());
  validationMessage.hidden = valid;
  if (!valid) {
    validationMessage.textContent = `Die Gebiets-ID passt nicht zur Regel: ${rule.text}`;
  }
  return valid;
}

function closeAllModals() {
  hide(choiceBackdrop);
  hide(areaBackdrop);
  hide(klsBackdrop);
}

processToggle.addEventListener("click", () => {
  processMenu.hidden = !processMenu.hidden;
});

createWfmtButton.addEventListener("click", () => {
  setWfmtCreated(true);
  hide(processMenu);
  showToast("WFMT-Auftrag wurde im Klickdummy erzeugt.");
});

openGbgsButton.addEventListener("click", () => {
  if (!wfmtCreated) return;
  hide(processMenu);
  show(choiceBackdrop);
});

document.querySelector("[data-start-area]").addEventListener("click", () => {
  hide(choiceBackdrop);
  show(areaBackdrop);
});

document.querySelector("[data-start-kls]").addEventListener("click", () => {
  hide(choiceBackdrop);
  show(klsBackdrop);
});

document.querySelectorAll("[data-close-choice]").forEach((button) => {
  button.addEventListener("click", () => hide(choiceBackdrop));
});

document.querySelectorAll("[data-close-area]").forEach((button) => {
  button.addEventListener("click", () => hide(areaBackdrop));
});

document.querySelectorAll("[data-close-kls]").forEach((button) => {
  button.addEventListener("click", () => hide(klsBackdrop));
});

[choiceBackdrop, areaBackdrop, klsBackdrop].forEach((backdrop) => {
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) hide(backdrop);
  });
});

areaType.addEventListener("change", updateRule);
areaId.addEventListener("input", validateAreaId);

areaForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateAreaId()) return;
  savedAreaId = areaId.value.trim();
  document.querySelectorAll("[data-kls-area-id]").forEach((cell) => {
    cell.textContent = savedAreaId;
  });
  hide(areaBackdrop);
  showToast(`Gebietsdaten fuer ${savedAreaId} gespeichert.`);
});

document.querySelector("[data-kls-export]").addEventListener("click", (event) => {
  event.currentTarget.textContent = "KLS-BT-Liste exportiert";
  event.currentTarget.disabled = true;
  showToast("KLS-BT-Liste wurde fuer PST vorbereitet.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
    hide(processMenu);
  }
});

const today = new Date();
const plusDays = (days) => {
  const date = new Date(today);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

areaForm.elements.vvmStart.value = plusDays(17);
areaForm.elements.vvmEnd.value = plusDays(77);
areaForm.elements.buildStart.value = plusDays(94);
areaForm.elements.buildEnd.value = plusDays(274);
setWfmtCreated(false);
