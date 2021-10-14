$(document).ready(function () {
    show_event_list();
});

function show_event_list() {
    $.ajax({
        type: 'GET',
        url: '/event_list',
        data: {},
        success: function (response) {
            let events = response['all_events']
            let list_num = 0
            for (let i = 0; i< events.length; i++) {
                let author = events[i]['author']
                let title = events[i]['title']
                let number = events[i]['number']
                let time = formatDate(events[i]['present_time'])
                if (events.length > list_num)
                    list_num = list_num + 1
                else
                    list_num = list_num

                let temp_html = `<div class="item">
                                           <div class="num">${list_num}</div>
                                           <div class="title"><a href="/detail/${number}">${title}</a></div>
                                           <div class="author">${author}</div>
                                           <div class="date" id="time">${time}</div>
                                         </div>`
                $('#event_body').append(temp_html)
            }
        }
    });
}

function formatDate(date) {
    let newDateYear = date.substring(0,5)
    let newDateMM = date.substring(5,8)
    let newDateDD = date.substring(8,11)
    return [newDateYear, newDateMM, newDateDD].join('-');
};