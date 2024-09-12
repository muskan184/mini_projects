const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowms = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("button")
const FromCrr = document.querySelector(".from select")
const ToCrr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

for(let select of dropdowms){
    for(CurrCode in countryList){
       let newoption = document.createElement("option")
       newoption.innerText = CurrCode
       newoption.value =  CurrCode
       select.append(newoption)
       if(select.name==="From" && CurrCode === "USD"){
        newoption.selected="selected";
       }
       else if(select.name==="To" && CurrCode === "INR"){
         newoption.selected="selected";
        }
    }
    select.addEventListener("change",(eve)=>{
     updateFlag(eve.target)
    });
}

const updateFlag=(element)=>{
   let CurrCode = element.value;
   let countrycode = countryList[CurrCode]
   let newSrclink = `https://flagsapi.com/${countrycode}/flat/64.png`  
   let img = element.parentElement.querySelector("img") 
   img.src = newSrclink;
}

btn.addEventListener("click",async(event)=>{
    event.preventDefault()
    let amount = document.querySelector(".amount input")
    let amountVal = amount.value
    if(amountVal==""||amountVal<1)
    {
        amountVal = 1;
        amount.value='1';
    }

     const url = `${BASE_URL}/${FromCrr.value.toLowerCase()}.json`;
    let response = await fetch(url)
    // console.log(response);
    let data = await response.json()
    // console.log(data);
    let rate = data[FromCrr.value.toLowerCase()][ToCrr.value.toLowerCase()]
    // console.log(rate)
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${FromCrr.value} = ${finalAmount} ${ToCrr.value}`;
})
