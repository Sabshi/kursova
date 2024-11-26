
emailjs.init("K-38eEO5SamgxNkVc");


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const number = document.getElementById("number").value;

    const templateParams = {
        name: name,
        email: email,
        number: number,
    };

    emailjs.send("service_8wcp16j", "template_mtvh7bm", templateParams)
        .then(function(response) {
            console.log("Лист успішно відправлено!", response.status, response.text);
            alert("Лист успішно відправлено!");
        })
        .catch(function(error) {
            console.error("Сталася помилка:", error);
            alert("Сталася помилка при відправленні листа. Спробуйте знову.");
        });
});
