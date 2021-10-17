$(document).ready(function () {
    bsCustomFileInput.init();
})

function profile_upload() {

    let name = $("#dog_name").val()
    let age = $("#dog_age").val()
    let gender = $("#dog_gender").val()
    let comment = $("#dog_comment").val()


    // 파일명 출력
    let fileInput = document.getElementsByClassName("file");

    //사진이 들어가지 않았을 때
    if (fileInput[0].files.length == 0) {
        alert("사진을 넣어주세요!");
        $("#file").focus();
        return false;
    }
    for (let i = 0; i < fileInput.length; i++) {
        if (fileInput[i].files.length > 0) {
            for (let j = 0; j < fileInput[i].files.length; j++) {
                let filename = fileInput[i].files[j].name //

                let file = $('#file')[0].files[0]
                let form_data = new FormData()

                form_data.append("file_give", file)
                form_data.append("name_give", name)
                form_data.append("age_give", age)
                form_data.append("gender_give", gender)
                form_data.append("comment_give", comment)
                form_data.append("filename_give", filename)

                if ($("#dog_name").val().length == 0) {
                    alert("강아지 이름을 입력하세요!");
                    $("#dog_name").focus();
                    return false;
                }
                if ($("#dog_age").val().length == 0) {
                    alert("강아지 나이를 입력하세요!");
                    $("#dog_age").focus();
                    return false;
                }
                if ($("#dog_gender").val().length == 0) {
                    alert("강아지 성별을 입력하세요!");
                    $("#dog_gender").focus();
                    return false;
                }
                if ($("#dog_comment").val().length == 0) {
                    alert("강아지 소개를 입력하세요!");
                    $("#dog_comment").focus();
                    return false;
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/profile/create",
                        data: form_data,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (response) {
                            alert(response["msg"])
                            window.close()  //pop up close

                            //추가
                            let babay_img = response['baby']['file']
                            console.log(babay_img)

                            let temp_html = `
                                <div class="add-card rounded-circle" onclick="alert('hi')" onmouseover="select_in()"
                                     onmouseout="select_out()">
                                    <img src="/static/profileimg/${babay_img}">
                                </div>
                            `
                            $('#baby-list').append(temp_html)

                        }
                    })
                }
            }
        }
    }
}