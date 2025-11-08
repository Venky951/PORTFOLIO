// ...existing code...
"use strict";

var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, el) {
        for (let tablink of tablinks) {
                tablink.classList.remove("active-links");
        }
        for (let tabcontent of tabcontents) {
                tabcontent.classList.remove("active-tab");
        }
        // prefer the passed element (from an event handler), otherwise try to find a link matching data-tab attribute
        if (el && el.classList) {
                el.classList.add("active-links");
        } else {
                const link = document.querySelector(`.tab-links[data-tab="${tabname}"]`);
                if (link) link.classList.add("active-links");
        }
        const target = document.getElementById(tabname);
        if (target) target.classList.add("active-tab");
}

var sidemenu = document.getElementById("sidemenu");
function openmenu() {
        if (sidemenu) sidemenu.style.right = "0";
}
function closemenu() {
        if (sidemenu) sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbzzaCNU_ZxXdJAFruvOHhE6-B0iK9yyDbAxVk0onJIKPtqQrEfSYupy6LzdcEXDIQLGPw/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
        form.addEventListener('submit', e => {
                e.preventDefault();
                fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                        .then(response => {
                                // response may be opaque if CORS is restricted; still show success message
                                msg.innerHTML = "Message sent successfully";
                                setTimeout(function () { msg.innerHTML = ""; }, 5000);
                                form.reset();
                        })
                        .catch(error => {
                                console.error('Error!', error.message);
                                msg.innerHTML = "Error sending message";
                                setTimeout(function () { msg.innerHTML = ""; }, 5000);
                        });
        });
}