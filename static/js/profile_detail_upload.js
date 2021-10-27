let url_list = window.location.href.split('/')
const id = url_list[url_list.length-1]

$(document).ready(function () {
    $.ajax({
            type: "GET",
            url: `/dog_info`,
            data: {id: id},
            success: function (response) {
                profile_db = response['profile_db']
                console.log(profile_db)
                $('#profile_id').val(id)
                // $('.dog_img').attr('src','/static/profileimg/'+profile_db.file)
                $('#dog_name').val(profile_db.name)
                $('#dog_age').val(profile_db.age)
                $('#dog_gender').val(profile_db.gender)
                $('#dog_comment').val(profile_db.comment)
            },
            error: function (request, status, error) {
                alert(error);
            }
        });
});

function dogdetail_upload() {
    const new_name = $("#dog_name").val();
    const new_id = $("#profile_id").val();
    const new_age = $("#dog_age").val();
    const new_gender = $("#dog_gender").val();
    const new_comment = $("#dog_comment").val();

    if (new_name.length == 0) {
        alert("이름을 입력해주세요.");
        return;
    }

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
            comment_give: new_comment,
            name_give: new_name
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