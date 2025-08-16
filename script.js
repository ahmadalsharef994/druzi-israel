// Israeli-focused configuration
const COUNTRY_CONFIG = {
  ISRAEL: {
    flag: '🇮🇱',
    language: 'en',
    recipients: [
      'pm@pmo.gov.il',
      'sar@mfa.gov.il',
      'pniyot@pmo.gov.il',
      'diplomatic@mfa.gov.il',
      'minister@mod.gov.il',
      'legal@pmo.gov.il',
      'arab@pmo.gov.il',
      'media@pmo.gov.il',
      'info@knesset.gov.il',
      'office@president.gov.il'
    ],
    placeholderName: '[Your Name]',
    nameLabels: { first: 'First Name *', last: 'Last Name *', nameHeader: 'Your Name (Required)' },
    warning: '⚠️ Please enter your first and last name to enable the send button.',
    messageLabel: 'Your Message:',
    sendButton: '🇮🇱 Send Appeal to Israel',
    mainHeading: 'Appeal to Israel: Annexation of Jabal Al-Druze',
    subtitle: 'Requesting Israeli sovereignty over Jabal Al-Druze based on the historic covenant between Druze and Jews',
    emails: [
      {
        subject: 'Urgent Appeal from Druze Community: Request for Annexation of Jabal Al-Druze',
        template: EMAIL_TEMPLATES.ISRAEL[1]
      }
    ]
  }
};

// State
let currentCountry = 'ISRAEL';
let currentEmail;
let firstNameInput, lastNameInput, messageTextarea, sendEmailBtn, warningBox;

// Initialize
window.addEventListener('DOMContentLoaded', () => {
  // Inputs
  firstNameInput = document.getElementById('firstName');
  lastNameInput = document.getElementById('lastName');
  messageTextarea = document.getElementById('message');
  sendEmailBtn = document.getElementById('sendEmailBtn');
  warningBox = document.querySelector('.warning-box');

  applyCountry(currentCountry);

  firstNameInput.addEventListener('input', validateForm);
  lastNameInput.addEventListener('input', validateForm);
  sendEmailBtn.addEventListener('click', sendEmail);
});

function applyCountry(code, preserveNames=false) {
  const cfg = COUNTRY_CONFIG[code];
  if (!cfg) return;

  // Select the single email template
  currentEmail = cfg.emails[0];

  // Set document language
  document.documentElement.lang = cfg.language;

  // UI texts
  document.getElementById('mainHeading').textContent = cfg.mainHeading;
  document.getElementById('subtitleText').textContent = cfg.subtitle;
  document.getElementById('firstNameLabel').textContent = cfg.nameLabels.first;
  document.getElementById('lastNameLabel').textContent = cfg.nameLabels.last;
  document.getElementById('nameHeader').textContent = cfg.nameLabels.nameHeader;
  document.getElementById('warningBoxText').textContent = cfg.warning;
  document.getElementById('messageLabel').textContent = cfg.messageLabel;
  sendEmailBtn.textContent = cfg.sendButton;
  document.getElementById('pageTitle').textContent = cfg.mainHeading;
  document.getElementById('flagDisplay').innerHTML = `${cfg.flag} <img src="Druze_star.svg" alt="Druze Star" class="druze-star">`;
  document.getElementById('emailSubject').textContent = currentEmail.subject;

  // Template
  messageTextarea.value = currentEmail.template;

  // Re-apply name if already entered
  if (firstNameInput.value && lastNameInput.value) {
    updateMessageWithName(firstNameInput.value.trim(), lastNameInput.value.trim());
  }
}

function validateForm() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const isValid = firstName && lastName;
  sendEmailBtn.disabled = !isValid;
  sendEmailBtn.style.background = isValid ? '#059669' : '#6B7280';
  warningBox.style.display = isValid ? 'none' : 'block';
  if (isValid) updateMessageWithName(firstName, lastName);
}

function updateMessageWithName(firstName, lastName) {
  const cfg = COUNTRY_CONFIG[currentCountry];
  const fullName = `${firstName} ${lastName}`;
  messageTextarea.value = currentEmail.template.replace(cfg.placeholderName, fullName);
}

function sendEmail() {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  if (!firstName || !lastName) return alert('Please enter your first and last name.');
  updateMessageWithName(firstName, lastName);
  const cfg = COUNTRY_CONFIG[currentCountry];
  const subject = encodeURIComponent(currentEmail.subject);
  const body = encodeURIComponent(messageTextarea.value);
  const recipients = cfg.recipients.join(',');
  window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
}

console.log('Israeli-focused contact form initialized');
