$(document).ready(function () {
    show_post_list();
});

function show_post_list() {
    $.ajax({
        type: 'GET',
        url: '/post_list',
        data: {},
        success: function (response) {
            let articles = response['all_articles']
            let list_num = 0
            for (let i = 0; i < articles.length; i++) {
                //let image = articles[i]['image']
                let author = articles[i]['author']
                let title = articles[i]['title']
                let contents = articles[i]['contents']
                let address = articles[i]['address']
                let number = articles[i]['number']
                let time = formatDate(articles[i]['present_time'])

                if (articles.length > list_num)
                    list_num = list_num + 1
                else
                    list_num = list_num

                let temp_html = `<div class="item">
                                           <div class="num">${list_num}</div>
                                           <div class="title"><a href="/detail/${number}">${title}</a></div>
                                           <div class="author">${author}</div>
                                           <div class="date" id="time">${time}</div>
                                         </div>`
                $('#post_body').append(temp_html)
            }
        }
    });
}

function formatDate(date) {
    let dateFormat = date.split(" ");
    let newDateYear = dateFormat[0];
    let newDateMM = dateFormat[1];
    let newDateDD = dateFormat[2];
    return [newDateYear, newDateMM, newDateDD].join('-');
};