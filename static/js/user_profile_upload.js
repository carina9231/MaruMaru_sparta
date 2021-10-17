$(document).ready(function () {
    bsCustomFileInput.init();
})

function readFile(event) {
    let file = event.target.files[0];
    let check = event.target;
    let reader = new FileReader()

    let href = window.URL.createObjectURL(file)
    $("#profile-img").attr('src', href)

    //5분뒤에 메모리 해제
    setTimeout(function () {
        window.URL.revokeObjectURL(href)
    }, 1000 * 60 * 5)

}

function user_update() {
    let name = $('#name').val()
    let description = $('#description').val()
    let file = $('#file')[0].files[0]
    let form_data = new FormData()

    form_data.append("file_give", file)
    form_data.append("name_give", name)
    form_data.append("description_give", description)

    //사진이 들어가지 않았을 때
    if (file == null) {
        alert("사진을 넣어주세요!");
        $("#file").focus();
        return false;
    } else if (name.length == 0) {
        alert("별명을 입력해주세요!");
        $("#name").focus();
        return false;
    }

    $.ajax({
        type: "POST",
        url: "/user_update",
        data: form_data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            alert(response["msg"])
            location.replace('/user_profile')
        }
    })
}