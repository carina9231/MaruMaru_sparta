$(document).ready(function () {
    show_event_list();
});

function show_event_list() {
    $.ajax({
        type: 'GET',
        url: '/events/list',
        data: {},
        success: function (response) {
            let events = response['all_events']
            let list_num = 0
            for (let i = 0; i < events.length; i++) {
                let username = events[i]['username']
                let title = events[i]['title']
                let time_post = events[i]['present_date']
                let id = events[i]['number']
                let card_img = events[i]['file']
                let view = events[i]['view']
                let contents = events[i]['contents']
                let time_before = time2str(time_post)
                if (events.length > list_num)
                    list_num = list_num + 1
                else
                    list_num = list_num

                let temp_html = `<div class="row card-event">
                                    <div class="col-lg-4">
                                        <img class="card-img" src="/static/eventimg/${card_img}" class="img-fluid rounded-start" alt="pic">
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="card-content">
                                            <div class="num float-right">#${list_num}</div>
                                            <div class="evnet-title"><a href="/event/detail/${id}">${title}</a></div>
                                            <div class="author">${username}</div>
                                            <p class="event-content">${contents}</p>
                                            <div class="event-sub" id="time">${time_before}</div>
                                            <div class="view">조회수 ${view}</div>
                                        </div>
                                    </div>
                                </div>`
                $('#event-body').append(temp_html)
            }
        }
    });
}

function time2str(date) {
    let today = new Date()
    let new_date = new Date(date)
    let time = (today - new_date) / 1000 / 60  // 분

    if (time < 60) {
        return parseInt(time) + "분 전"
    }
    time = time / 60  // 시간
    if (time < 24) {
        return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
        return parseInt(time) + "일 전"
    }
    return `${new_date.getFullYear()}년 ${new_date.getMonth() + 1}월 ${new_date.getDate()}일`

}
