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
            const best = response['best']
            let list_num = 0
            bestView(best);
            for (let i = 0; i < articles.length; i++) {
                let author = articles[i]['author']
                let title = articles[i]['title']
                let number = articles[i]['number']
                let time = formatDate(articles[i]['present_time'])
                let view = articles[i]['view']
                if (articles.length > list_num)
                    list_num = list_num + 1
                else
                    list_num = list_num

                let temp_html = `<div class="item">
                                           <div class="num">${list_num}</div>
                                           <div class="title"><a href="/detail/${number}">${title}</a></div>
                                           <div class="author">${author}</div>
                                           <div class="date" id="time">${time}</div>
                                           <div class="view">${view}</div>          
                                 </div>`

                $('#post_body').append(temp_html)
            }
        }
    });
}

function formatDate(date) {
    let newDateYear = date.substring(0, 5)
    let newDateMM = date.substring(5, 8)
    let newDateDD = date.substring(8, 11)
    return [newDateYear, newDateMM, newDateDD].join('-');
};


function bestView(best) {
    const author = best['author']
    const title = best['title']
    const number = best['number']
    const time = formatDate(best['present_time'])
    const view = best['view']

    const temp_html = `<div class="item">
                          <div class="num" style="{color: red}">Best</div>
                          <div class="title"><a href="/detail/${number}">${title}</a></div>
                          <div class="author">${author}</div>
                          <div class="date" id="time">${time}</div>
                          <div class="view">${view}</div>          
                     </div>`
    $('#post_body').append(temp_html)
}