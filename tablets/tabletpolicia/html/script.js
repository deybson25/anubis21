window.addEventListener("message", function(event) {

    if (event.data.action === "open") {

        document.body.style.display = "flex";

    }

    if (event.data.action === "close") {

        document.body.style.display = "none";

    }

})

document.getElementById("fechar").addEventListener("click", () => {

    fetch(`https://${GetParentResourceName()}/fechar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })

})
