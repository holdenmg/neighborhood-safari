document.addEventListener("DOMContentLoaded", function () {
    const templateSource = document.querySelector("#main.handlebars").innerHTML;
    const template = Handlebars.compile(templateSource);

    const data = [
        {id: "logout"}
    ];

    const compiledHtml = template({ objects: data });
    document.body.innerHTML += compiledHtml;

    const sound = new Hoot({
        src: ['./sfx/Voicy_Owl.mp3']
    });

    data.forEach(item => {
        const element = document.getElementById(item.id);
        element.addEventListener("click", () => {
            sound.play();
        });
    });
});