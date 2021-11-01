$(document).ready(function () {
    //iframe url 삽입
    // // let href = '/map?id=' + id
    // $('#go-map').attr("src", href)
    show_events();
});

function show_events() {
    let idx = location.search.substr(location.search.indexOf("?") - 1)
    $.ajax({
        type: 'GET',
        url: '/events/detail',
        data: {id_give: idx},
        success: function (response) {
            let events = response['all_events']
            console.log(events)
            for (let i = 0; i < events.length; i++) {
                let username = events[i]['username']
                let title = events[i]['title']
                let date = events[i]['date']
                let address = events[i]['address']
                let id = events[i]['number']
                let card_img = events[i]['file']
                let contents = events[i]['contents']
                let like_count = events[i]['like_count']
                let join = events[i]['join']
                let max = events[i]['max']
                let comment = events[i]['comment']

                let temp_html = `
            <section class="header">
                <h1>${title}</h1>
                <h4>${date}, ${address}</h4>
            </section>
            <hr>
            <div class="all">
                <div class="grid">
                    <div class="wrapper">
                        <div class="inner clearfix">
                            <div class="grid-left">
                                <img class="image" src="/static/eventimg/${card_img}">
                            </div>
                            <div class="grid-right">
                                <div><H2>${title}</H2></div>
                                <div><H5>행사일 : ${date}</H5></div>
                                <div>
                                    <H5>행사장소 : ${address}
                                        <button class="btn btn-primary ml-3" data-bs-toggle="modal"
                                                data-bs-target="#map-modal">
                                            지도
                                        </button>
                                    </H5>
                                </div>
                                <div><H5>주최자: ${username}</H5></div>
                                <div class="contents">
                                    <div class="input-group mb-3">
                                        <div class="form-control content" aria-label="With textarea" id="contents_box">
                                            ${contents}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<div class="detail_button">
            <button onclick="location.href='/eventDetail/modify?id_give=${id}'" type="button" class="btn btn-primary ui button">
                <i class="fa fa-wrench" aria-hidden="true"> 수정</i>
            </button>
            &nbsp;
            <button onclick="delete_event()" type="button" class="btn btn-danger">
                <i class="fa fa-trash" aria-hidden="true"> 삭제</i>
            </button>
            &nbsp;
            <button onclick="onClickLike()" type="button" class="btn btn-danger" id="like">
                <i class="far fa-thumbs-up"> 좋아요 ${like_count}</i>
                <input type="hidden" id="like" value="{{ events_db.like_count }}">
            </button>
            <input type="hidden" id="like" value="{{ events_db.like_count }}">
            &nbsp;
            <button onclick="onClickJoin()" type="button" class="btn btn-danger" id="like">
                참가하기
            </button>
</div>`
                $('#event').append(temp_html)

                for (let i = 0; i < join.length; i++) {
                    let join_username = join[i]['profile_name']
                    let join_file = join[i]['profile_pic']
                    let join_temp_html = `<div class = join>
                                            <h1>참가자 목록</h1>
                                            <h2> ${join.length}/${max}명</h2>
                                            <img style="width: 100px" class="rounded-circle" src="/static/${join_file}"><img>
                                            <span>${join_username}님</span>
                                          </div>`
                    $('#join').append(join_temp_html)
                }

                for (let i = 0; i < comment.length; i++) {
                    let comment_username = comment[i]['user']
                    let comment_comment = comment[i]['comment']
                    let comment_number = comment[i]['number']
                    let comment_temp_html = `<div id="comment_list_{{ id }}">
                        <div class="card mb-2">
                            <div class="card-header bg-light">
                                <i class="fa fa-comment fa"></i> 작성자: ${comment_username}
                            </div>
                            <div class="card-body">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="comment_wrote">${comment_comment}</div>
                                        <button type="button" class="btn btn-dark mt-3">수정</button>
                                        <button type="button" onclick="event_comment_delete(${comment_number})"
                                                class="btn btn-dark mt-3">삭제
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                </div>`
                    $('#comment').append(comment_temp_html)
                }
            }
        }
    });
}

function delete_event() {
    let idx = location.search.substr(location.search.indexOf("?") - 1)
    const result = confirm("정말로 삭제 하시겠습니까?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: `/event/detail`,
            data: {id_give: idx},
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
    let idx = location.search.substr(location.search.indexOf("?") - 1)
    $.ajax({
        type: "POST",
        url: "/event/like",
        data: {id_give: idx},
        success: function (response) {
            alert(response['msg'])
            window.location.reload();
        }
    })
}


function onClickJoin() {
    let idx = location.search.substr(location.search.indexOf("?") - 1)
    $.ajax({
        type: "POST",
        url: "/event/join",
        data: {id_give: idx},
        success: function (response) {
            alert(response['msg'])
            window.location.reload();
        }
    })
}


function event_comment_upload() {
    let idx = location.search.substr(location.search.indexOf("?") - 1)
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
            id_give: idx,
            comment_give: comment_input
        },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })
}

function event_comment_delete(comment_idx) {
    let idx = location.search.substr(location.search.indexOf("?") - 1)
    $.ajax({
        type: "GET",
        url: `/comment/event_write`,
        data: {
            id_give: idx,
            comment_idx: comment_idx
        },
        success: function (response) {
            alert(response["msg"])
            window.location.reload()
        }
    })

}