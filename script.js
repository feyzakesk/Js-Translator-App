const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const selectTag = document.querySelectorAll("select");
const exchangeIcon = document.querySelector(".exchange");
const translateBtn = document.querySelector("button");
const icons = document.querySelectorAll(".row i");


selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // Varsayılan olarak ilk select için İngilizce, ikinci select için Türkçe seçili olacak
        let selected = "";
        if (id === 0 && country_code === "en-US") {
            selected = "selected";
        } else if (id === 1 && country_code === "tr-TR") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option); // Option tag'ini select tag'inin içine ekleme
    }
});

exchangeIcon.addEventListener("click",() =>{
    //exchanging textarea and select tag values
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selecTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click",()=>{
    let text =  fromText.value;
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    if(!text) return;
    toText.setAttribute("placeholder","Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        toText.setAttribute("placeholder","Translation...");
    })

});

icons.forEach(icon => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("fa-copy")){
            //if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            //if clicked icon has from id, copy the fromTextarea value else copy the toTextarea value
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value; 
            }else{
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[1].value; 
            }
            speechSynthesis.speak(utterance); //speak the passed utterance
        }
    });
})
