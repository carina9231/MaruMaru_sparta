const id = $("#profile_id").val();

function delete_post() {
    const result = confirm("정말로 삭제 하시겠습니까?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: `/profile`,
            data: {id_give: id},
            success: function (response) {
                window.location.href = `/profiles`
            },
            error: function (request, status, error) {
                alert(error);
            }
        });
    } else {
        return false;
    }
}