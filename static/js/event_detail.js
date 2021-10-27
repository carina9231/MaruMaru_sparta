$(document).ready(function () {
    //iframe url 삽입
    const id = $("#idx").val();
    let href = '/map?id=' + id
    $('#go-map').attr("src", href)
});


function delete_event() {
    const e_idx = $("#idx").val();
    const result = confirm("정말로 삭제 하시겠습니까?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: `/event/detail`,
            data: {id_give: e_idx},
            success: function (response) {
                alert(response['msg'])
                window.location.href = `/event/list`
            },
            error: function (request, status, error) {
                alert(error);
            }
        });
    } else {
        return false;
    }
}

function onClickLike() {
    const event_id = $("#idx").val();
    $.ajax({
        type: "POST",
        url: "/event/like",
        data: {id_give: event_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload();
        }
    })
}


function onClickJoin() {
    const event_id = $("#idx").val();
    $.ajax({
        type: "POST",
        url: "/event/join",
        data: {id_give: event_id},
        success: function (response) {
            alert(response['msg'])
            window.location.reload();
        }
    })
}


function event_comment_upload() {
    const e_idx = $("#idx").val();
    const comment_input = $("#comment_content").val();

    console.log(comment_input)
    if (comment_input.length == 0) {
        alert("댓글을 입력해주세요!");
        return;
    }

    $.ajax({
        type: "POST",
        url: `/event/comment`,
        data: {
            id_give: e_idx,
            comment_give: comment_input
        },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}

function event_comment_delete(comment_idx) {
    const e_idx = $("#idx").val();
    console.log(e_idx)
    console.log(comment_idx)
    $.ajax({
        type: "GET",
        url: `/comment/event_write`,
        data: {
            id_give: e_idx,
            comment_idx: comment_idx
        },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })

}