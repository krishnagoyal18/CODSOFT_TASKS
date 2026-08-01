
let contactBtn = document.getElementById("contactBtn");


let text = "Aspiring Full Stack Developer";
let i = 0;

function type() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}

type();

let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || message === ""){
        alert("Please fill all fields");
        return;
    }

    alert("Message sent successfully!");
    contactForm.reset();
});