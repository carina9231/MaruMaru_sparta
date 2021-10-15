

function save_upload() {
    const idx = $("#idx").val()
    const new_title = $("#title_box").val();
    const new_content = $("#contents_box").val();

    if (new_title.length == 0) {
        alert("제목을 입력해주세요.");
        return;
    }

    if (new_content.length == 0) {
        alert("수정 내용을 입력해주세요.");
        return;
    }

    $.ajax({
        type: "PUT",
        url: `/detail`,
        data: {
            id_give: idx,
            title_give: new_title,
            contents_give: new_content
        },
        success: function (response) {
            alert(response["msg"])
            window.location.href = `/detail/${idx}`
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}