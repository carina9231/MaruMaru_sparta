$(document).ready(function () {
    //iframe url 삽입
    const id = $("#idx").val();
    let href = '/map?id=' + id
    $('#go-map').attr("src", href)
    // show_join_list();
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



function comment_upload() {
    const e_idx = $("#idx").val();
    const comment_input = $("#comment_content").val();

    if (comment_input.length == 0) {
        alert("댓글을 입력해주세요!");
        return;
    }

    $.ajax({
        type: "POST",
        url: `/comment`,
        data: {
            id_give: e_idx,
            comment_give: comment_input
        },
        success: function (response) {
            alert(response["msg"])
            let comment_text = ""
            const arr_comment = response["save_comment"]["comment"].reverse();
            arr_comment.forEach((e) => {
                comment_text += `
                            &nbsp;
                            <div class="card mb-2">
                                <div class="card-header bg-light">
                                    <i class="fa fa-comment fa"></i> 작성자: ${e.user}
                                </div>
                                <div class="card-body">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <div class="comment_wrote">내용: ${e.comment}</div>
                                            <button type="button" class="btn btn-dark mt-3">수정</button>
                                            <button type="button" class="btn btn-dark mt-3">삭제</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        `
            })
            $("#comment_content").val("")
            $(`#comment_list_${e_idx}`).html(comment_text)

        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}