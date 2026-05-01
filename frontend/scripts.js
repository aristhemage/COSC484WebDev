/* start homepage scripts */
function scrollToTop(){
    console.log("function called");
    const topBtn = document.getElementById("back-to-top-btn");
    //scroll to top of page on click
    topBtn.addEventListener('click', ()=> {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });
}


//toggle comment btn on and off
function openComments(){
    
    document.querySelectorAll('open-comments-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const post = this.closest('.post');
            const commentSection = post.querySelector('.collapsible-comments');
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
    })



}
/* end homepage scripts */


