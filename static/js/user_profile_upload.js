$(document).ready(function () {
    bsCustomFileInput.init();
})

function readFile(event) {
    let file = event.target.files[0];
    let check = event.target;
    let reader = new FileReader()


    console.log(file)

    let href = window.URL.createObjectURL(file)
    console.log(href)
    $("#profile-img").attr('src', href)

    //5분뒤에 메모리 해제
    setTimeout(function () {
        window.URL.revokeObjectURL(href)
    },1000 * 60 * 5)    

}