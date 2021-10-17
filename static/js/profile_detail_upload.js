function dogdetail_upload() {
    const new_id = $("#profile_id").val()
    const new_age = $("#dog_age").val();
    const new_gender = $("#dog_gender").val();
    const new_comment = $("#dog_comment").val();

    if (new_age.length == 0) {
        alert("나이를 입력해주세요.");
        return;
    }

    if (new_gender.length == 0) {
        alert("성별을 입력해주세요.");
        return;
    }

    if (new_comment.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }


    $.ajax({
        type: "PUT",
        url: `/profile`,
        data: {
            id_give: new_id,
            age_give: new_age,
            gender_give: new_gender,
            comment_give: new_comment
        },
        success: function (response) {
            alert(response["msg"])
            window.location.href = `/profile/${new_id}`
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}