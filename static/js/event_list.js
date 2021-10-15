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
                let number = events[i]['number']
                let time_post = events[i]['present_date']
                let time_before = time2str(time_post)
                if (events.length > list_num)
                    list_num = list_num + 1
                else
                    list_num = list_num

                let temp_html = `<div class="item">
                                           <div class="num">${list_num}</div>
                                           <div class="title"><a href="/detail/${number}">${title}</a></div>
                                           <div class="author">${username}</div>
                                           <div class="date" id="time">${time_before}</div>
                                         </div>`
                $('#event_body').append(temp_html)
            }
        }
    });
}

// function formatDate(date) {
//     let newDateYear = date.substring(0,5)
//     let newDateMM = date.substring(5,8)
//     let newDateDD = date.substring(8,11)
//     return [newDateYear, newDateMM, newDateDD].join('-');
// };

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