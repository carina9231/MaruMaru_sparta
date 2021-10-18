$(document).ready(function () {
    bsCustomFileInput.init();
})

function select_in() {
    $('.add-card').css("box-shadow", "1px")
}

function select_out() {
    $('.add-card').css("box-shadow", "none")
}

function create_baby_profile() {
    var popup = window.open('/profile/create', '네이버팝업', 'width=700px,height=700px,scrollbars=yes');
    popup.onbeforeunload=function (){
        window.location.reload();
    }
}