// /js/contact.js
const contactHTML = `
<div class="contact">
    <a href="sms:+33698362052" class="contact-item">
        <img src="/static/icons/phone.svg" alt="Téléphone">
        <span>+33 (0) 6 98 36 20 52</span>
    </a>
    <a href="mailto:contact@paweo.cc" class="contact-item">
        <img src="/static/icons/mail.svg" alt="Email">
        <span>contact@paweo.cc</span>
    </a>
    <a href="https://github.com/p4w3o" target="_blank" class="contact-item">
        <img src="/static/icons/gh.svg" alt="GitHub">
        <span>p4w3o GitHub</span>
    </a>
</div>
`;

document.querySelectorAll('.contact-placeholder').forEach(el => {
    el.innerHTML = contactHTML;
});
