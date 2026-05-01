/* start homepage scripts */
const topBtn = document.getElementById("back-to-top-btn");
const openCommentBtn = document.getElementById("open-comments-btn");
const commentSection = document.getElementById("collapsible-comments");

//scroll to top of page on click
topBtn.addEventListener('click', ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});


//toggle comment btn on and off

openCommentBtn.addEventListener('click', () => {
    
    //find current style of comment section display property
    const style = window.getComputedStyle(commentSection);
    const currStyle = style.getPropertyValue('display');
    console.log("currstyle: " + currStyle);

    if(currStyle === 'none'){
        commentSection.style.display = "block";
    }
    else{
        commentSection.style.display = "none";
    }
});

/* end homepage scripts */


