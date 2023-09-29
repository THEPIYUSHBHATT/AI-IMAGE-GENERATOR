const generateForm = document.querySelector(".generate-form");
const imageGallery = document.querySelector(".image-gallery");

const OPENAI_API_KEY = "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";

const generateAiImages = async (userPrompt , userImgQuantity) => {
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations",{
        method: "POST" ,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        bosy: JSON.stringify({
            prompt: userPrompt,
            n: parseInt(userImgQuantity),
            size: '512x512',
            response_format: "b64_json"
        })
    });

       if(!response.ok) throw new Error (" Failed To Load Images! Please try Again.")
       const {data} = await response.json(); //get data from the response
       console.log(data)
       
    } catch (error) {
        alert(error.message);
    }
}
const handelFormSubmission = (e) =>{
    e.preventDefault();

    // getting user input and image quantity from the form
    const userPrompt = e.srcElement[0].value;
    const userImgQuantity = e.srcElement[1].value;

    //Creating Html markup for image cards with loading state 
    const imageCardMarkup = Array.from({length: userImgQuantity}, () =>
       `<div class="img-card loading">
        <img src="images/loader.svg" alt="image">
        <a href="#" class="download-btn"
          ><img src="images/download.svg" alt="download icon">
          </a>
      </div>`
    ).join('');

    imageGallery.innerHtml = imageCardMarkup;
    generateAiImages();

}

generateForm.addEventListener('submit',handelFormSubmission);