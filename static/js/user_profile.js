$(document).ready(function () {
    bsCustomFileInput.init();
})



function create_baby_profile() {
    var popup = window.open('/profile/create', '네이버팝업', 'width=700px,height=700px,scrollbars=yes');
    popup.onbeforeunload=function (){
        window.location.reload();
    }
}