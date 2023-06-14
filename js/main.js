
let inp = document.getElementById("in")
let out = document.getElementById("out")
let SFrom = document.getElementById("from")
let STo = document.getElementById("to")
let switchBtn = document.querySelector(".switch")

let from
let to
let currency

fetch("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=31b0927acfb6429c995aab383602847a").then(a => {
    let e = a.json()
    return e;
}).then(i => {
    currency = Object.keys(i.rates)
    currency.forEach(e => {
        SFrom.innerHTML += `<option>${e}</option>`
        STo.innerHTML += `<option>${e}</option>`
    })
    from = i.rates[SFrom.value]
    to = i.rates[STo.value]
    SFrom.onchange = _ => {
        from = i.rates[SFrom.value]
        out.value = (inp.value / from * to).toFixed(2)
    }
    STo.onchange = _ => {
        to = i.rates[STo.value]
        out.value = (inp.value / from * to).toFixed(2)
    }
    switchBtn.addEventListener("click", _ => {
        [SFrom.value, STo.value] = [STo.value, SFrom.value]
        from = i.rates[SFrom.value]
        to = i.rates[STo.value]
        out.value = (inp.value / from * to).toFixed(2)
        switchBtn.classList.toggle('on')
    })
    inp.oninput = _ => {
        out.value = (inp.value / from * to).toFixed(2)
    }
})