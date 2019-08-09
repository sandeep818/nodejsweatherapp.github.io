console.log('from climnt script');

const weatherForm=document.querySelector('form');
const search=document.querySelector('input');
const result=document.querySelector('.result');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    result.textContent="Loading..."
    const location= search.value;
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
            console.log(data)
            if(data.error){
                console.log(data.error);
                result.innerHTML=`<h5 style="color:red">${data.error}</h5>`;
            }
            else{
                result.innerHTML=`<p>${data.location}.</p><p>${data.summary}.</p><p>${data.temp}-Digree.</p><p> Wind speed is - ${data.wind}</p>`;
                console.log(data.location,data.summary,data.temp)
                search.value=""
            }
    })
})

})