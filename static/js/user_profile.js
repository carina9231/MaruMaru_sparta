$(document).ready(function () {
    bsCustomFileInput.init();
})



function create_baby_profile() {
    var popup = window.open('/profile/create', '네이버팝업', 'width=700px,height=700px,scrollbars=yes');
    popup.onbeforeunload=function (){
        window.location.reload();
    }
}

function ProfileLike(number) {

    const profile_id = number

    $.ajax({
        type: "POST",
        url: "/dogprofile/like",
        data: {id_give: profile_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload();
        }
    })
}