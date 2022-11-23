setTimeout(()=>{
    "use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//login name user
var username__taixiu = localStorage.getItem('username_taixiu');
if (username__taixiu) {
    $('.header_username_login').innerText = username__taixiu;
}
else {
    let id_ran = Math.round(Math.random() * 98999) + 154658;
    $('.header_username_login').innerText = "ID : " + id_ran;
}
$('.body_notifi').innerHTML = `<h4> Chào mừng chiến thần mới <span class="goodperson"> ${username__taixiu} </span>  đã lập tài khoảng thành công </h4>`
if (!localStorage.getItem("phien")) {
    localStorage.setItem("phien", 1200000);
}
$(".phientaixiu .phien").innerText = localStorage.getItem("phien");
if (!localStorage.getItem('coin')) {
    localStorage.setItem('coin', 20000000)
}
(() => {
    let timeGame = 20;
    times(timeGame);
    function times(time) {
        let time_main = $('.time_main');
        let sub_time = $('.sub_time');
        let value_tai = $('.value_tai');
        let value_xiu = $('.value_xiu');
        let img__tai = $('.img__tai');
        let img__xiu = $('.img__xiu');
        let add_moneys = $('.add_moneys');
        let coin_game;
        const list_price = $$('.list_price .box_price');
        let input_value_taixiu = $$('.input_value_taixiu');
        let sumDC = 0;
        let arr_history = [];
        let result_box_list = Array.from($$('.result_box'));
        let result_box_list_active = [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1];

        function check_active(element) {
            if (element.className.includes('active')) return true;
            return false;
        }
        function game_notice(notice = "Bắt đầu phiên mới", time = 1, active = "active") {
            let index_time_dc = time;
            let node_gameifm = $('.game_ifm');
            $('.game_ifm').innerText = notice;
            if (!check_active(node_gameifm)) {
                node_gameifm.classList.add(active);
                setInterval(() => {
                    index_time_dc--;
                    if (index_time_dc == 0) node_gameifm.classList.remove(active);
                }, 1000)
            }
            else {
                node_gameifm.classList.remove(active);
                index_time_dc = time;
            }
        };
        function currency(currency) {
            const price = currency;
            return price.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            });
        }
        function cover_currency(currency) {
            return Number(currency.replace(/,/g, ''));
        }
        function phien() {
            let phien_ = localStorage.getItem("phien");
            phien_++;
            localStorage.setItem("phien", phien_);
            $(".phientaixiu .phien").innerText = phien_;
        }
        function notifi_member_win() {
            setInterval(() => {
                let vip = Math.floor(Math.random() * 8) + 1
                let indexrandom = Math.floor(Math.random() * (arr_name.length - 1));
                let coin_random = Math.floor(Math.random() * (10000000 - 3000000) + 3000000);
                $('.body_notifi').innerHTML = `<h4>Chúc mừng người chơi <span class="goodperson"> ${arr_name[indexrandom]} [Vip${vip}] </span> thắng lớn <span
                class="money_lucky">${currency(coin_random)}</span> </h4>`

            }, 16000)
        };
        let arr_name = ["Quốc Khang", "Thúy Vi", "Minh Khang", "Hồ Quân", "Hồng Thúy", "La Khang", "Vô kỵ", "Nguyễn Chính", "Quý Đôn", "Trùm Tài Xỉu", "Nhung Hương", "Thúy Kiều", "Quốc An", "Hữu Luận", "Minh Tiến", "Đại Nghĩa", "Hùng Dũng", "Mới ra tù", "Chiến Thành", "Thái Nguyễn"]
        notifi_member_win();
        let username_content = [
            "Tài 16 nha mọi người", "Húp 10", "Bú Xỉu 5", "Ăn thua hoài", "Tao mới cấm cái sổ đỏ", "Đen thôi đỏ quên đi",
            "Chơi chục lần win 1 lần game bịp quá", "Sáng giờ đchơi nhẹ cũng dc 2 M", "Game như bùi", "Hút máu vcl", "Thua hoài cay quá mọi người"

        ];
        let arr_catthing = [{
            'user': "Admin",
            'content': "Game free giải trí thôi nha chỉ chơi dc tài xỉu thôi"
        },
        ]
        function ramdom_charting() {
            let chat_content = $('.chat_content .chat');
            let ramdonuser = Math.floor(Math.random() * (arr_name.length - 1));
            let ramdonchatr = Math.floor(Math.random() * (username_content.length - 1));
            let random_vip = Math.floor(Math.random() * 10);

            let chatting_ran = document.createElement('h5');
            chatting_ran.innerHTML = `<span class="username">${arr_name[ramdonuser]}[ Vip${random_vip} ]</span><span class="username_content">${username_content[ramdonchatr]}</span> `;
            chat_content.appendChild(chatting_ran);

        }
        setInterval(() => {
            ramdom_charting()
        }, 5000);
        //clean active
        function clean_img_active(Nodelist_Active, modal = 'active') {
            // clean active img tài xỉu
            let item_active = Nodelist_Active;
            for (let item of item_active) {
                if (item.className.includes(modal)) {
                    item.classList.remove(modal);
                }
            }
        }
        function let_update_arr_history(phien, cuadat, ketqua, dices = [], datcuoc, Tracancua = 0, tienwin) {
            if (datcuoc > 0) {
                let data = new Date();
                let hours = data.getHours();
                let minutes = data.getMinutes();
                let seconds = data.getSeconds();
                var month = data.getUTCMonth() + 1; //months from 1-12
                var day = data.getUTCDate();
                var year = data.getUTCFullYear();
                let fulldata = `
           
                ${(hours) >= 10 ? hours : `0${hours}`}:${(minutes) >= 10 ? minutes : `0${minutes}`}:${(seconds) >= 10 ? seconds : `0${seconds}`}-${(day) >= 10 ? day : `0${day}`}/${(month) >= 10 ? month : `0${month}`}/${year}
                
                `;
                let result = (ketqua > 10) ? "Tài" : "Xỉu";
                let arr = {
                    "phien": phien,
                    "time": fulldata,
                    "cuadat": cuadat,
                    "ketqua": result,
                    "dices": `${dices[0]}-${dices[1]}-${dices[2]}`,
                    "datcuoc": datcuoc,
                    "Tracancua": Tracancua,
                    "tienwin": tienwin,
                };
                arr_history.push(arr);
                history_cuoc(arr_history);
            }
        }
        function history_cuoc(arr_list) {

            // Load data tài xiu
            let html = Array.from(arr_list).map(function (item) {
                return `
                    <tr>
                    <td class="table_list_cuoc_phien">#${item["phien"]}</td>
                    <td class="table_list_cuoc_time">${item["time"]}</td>
                    <td class="table_list_cuoc_red">${item["cuadat"]}</td>
                    <td class="table_list_cuoc_red">(${item["dices"]}) <br> <span class="table_list_cuoc_ketqua">${item["ketqua"]}</span></div></td>
                    <td class="table_list_cuoc_red">${currency(item["datcuoc"])}</td>
                    <td >${currency(item["Tracancua"])}</td>
                    <td class="table_list_cuoc_red">${currency(item["tienwin"])}</td>
                    
                    `;
            });
            if (html.length >= 8) {
                let subhtml = '';
                for (let i = html.length - 9; i < html.length; i++) {
                    subhtml += html[i];
                }
                $('.table_list_cuoc').innerHTML = subhtml;
            }
            else $('.table_list_cuoc').innerHTML = html.join('');
        }
        function list_box_taixiu(result) {
            clean_img_active(result_box_list);
            result_box_list_active.shift();
            if (result > 10) result_box_list_active.push(0);
            else {
                result_box_list_active.push(1);
            }
            for (let i in result_box_list) {
                let s = result_box_list_active[i];
                if (s) {
                    result_box_list[i].classList.add('active');
                }
            }
        }
        function naptien() {
            let box_money = $('header .container_body');
            let total_coin_input = $('.container_body .total_coin');
            let modal = $('.modal');
            let close_modal = $('.close-modal');
            let modal_hiennaptien = $('#modal-hiennaptien');
            let btn_naptien = $('.modal button');
            let value_name = $('.name_naptien');
            let giatrinap = $('#giatrinap');
            // Bật tắt modal
            total_coin_input.onclick = function () {
                modal.classList.toggle('hide')
            }
            box_money.onclick = function () {
                modal.classList.toggle('hide')
            }
            close_modal.onclick = function () {
                modal.classList.toggle('hide')
            }
            value_name.value = localStorage.getItem('username_taixiu');

            giatrinap.addEventListener('input', function (e) {
                modal_hiennaptien.innerText = currency(Number(e.target.value));
            })

            btn_naptien.onclick = function () {
                if (app.is_nap) {
                    let s = giatrinap.value;
                    if (Number(s)) {
                        app.is_nap = false;
                        let getcoin = localStorage.getItem('coin')
                        let sum = Number(getcoin) + Number(s);
                        game__notice_home(` Bạn đã nạp thành công ${currency(Number(s))} VNĐ`)
                        localStorage.setItem('coin', sum);
                        
                        total_coin_input.value = currency(sum);
                        modal_hiennaptien.value = '';
                        modal_hiennaptien.innerText = '';
                        giatrinap.value = '';
                        modal.classList.add('hide');

                    }
                }
                else {
                    game__notice_home(`Giới hạn nạp 1 lần thôi nha bạn !!`)
                    modal.classList.add('hide');
                }
                app.coin=Number(localStorage.getItem('coin'));
            }
        };

        const app = {
            coin: Number(localStorage.getItem('coin')),
            arrVip: [300, 1000, 8000, 18000, 26000, 44000, 60000, 85000, 100000, 1000000],
            is_time: time,
            is_subtime: time * 1 / 5,
            tile_lost: 50,
            is_datcuoc: false,
            is_win: false,
            is_nap: true,
            vip_fee: 0,
            money_fee: 5,
            arrdices: [0, 0, 0],
            cuadat: "Tài",
            datcuoc: 0,
            money_win: 0,
            render() {
                $('.total_coin').value = currency(this.coin);
                coin_game = this.coin;
                localStorage.setItem('coin', this.coin)
                this.system_vip(this.coin);
            },
            rest_time() {
                let time_result = time;
                time_main.innerText = time;
                sub_time.innerText = time;
                if (time_result == this.is_time) {
                    game_notice("Bắt đầu phiên mới");
                    phien();
                    time_main.classList.remove("hide");
                    $('.box_taixiu_dices').classList.add('hide');
                    this.cancelActive();
                }
                time--;
                this.ramdomPeople(time);
                if (time_result == this.is_subtime) {
                    game_notice("Trả tiền cân cửa");
                    this.dices(this.handDatcuoc());
                    time_main.classList.add("hide")
                    sub_time.classList.remove('hide');
                    $('.modal_overlayer').classList.remove("hide");
                    result_box_list[result_box_list.length - 1].classList.add('here');

                }
                if (time_result == this.is_subtime - 2) {
                    add_moneys.classList.remove('active');
                }
                // nếu thời gian bằng 0 thì ??
                if (time_result == -1) {
                    if (check_active(img__xiu)) {
                        img__xiu.classList.remove('active');
                    }
                    if (check_active(img__tai)) {
                        img__tai.classList.remove('active');
                    }
                    clean_img_active(input_value_taixiu, "active");
                    result_box_list[result_box_list.length - 1].classList.remove('here');
                    sub_time.classList.add('hide')
                    time = this.is_time;
                }

            },
            cancelActive() {
                value_tai.innerText = "Đặt Cược";
                value_xiu.innerText = "Đặt Cược";
                $('.modal_overlayer').classList.add("hide");
                this.is_datcuoc = false;
                sumDC = 0;

                clean_img_active(list_price, "active");
            },
            handDatcuoc() {
                let win_or_lose = Math.floor(Math.random() * 100) + 1;
                this.is_win = (win_or_lose >= this.tile_lost) ? true : false;
                let number_value_tai = cover_currency(value_tai.innerText);
                let number_value_xiu = cover_currency(value_xiu.innerText);
                let free_money = this.vip_fee;
                if (this.is_win) {
                    if (this.is_datcuoc) {
                        if (number_value_tai > 0) {
                            this.cuadat = "Tài";
                            this.datcuoc = number_value_tai;
                            this.coin += Number(Math.round(number_value_tai * (1 - (free_money / 100))));
                            this.money_win = Number(Math.round(number_value_tai * (1 - (free_money / 100))));
                            game_notice(`Bạn đã thắng được +${currency(Number(Math.round(number_value_tai * (1 - (free_money / 100)))))}`);
                            add_moneys.classList.add('active');
                            $('.value_tai').classList.add('active');
                            add_moneys.innerText = `+${currency(number_value_tai)}`
                            return "TaiWin";
                        } else if (number_value_xiu > 0) {
                            this.cuadat = "Xỉu";
                            this.datcuoc = number_value_xiu;
                            this.coin += Number(Math.round(number_value_xiu * (1 - (free_money / 100))));
                            this.money_win = Number(Math.round(number_value_xiu * (1 - (free_money / 100))));
                            game_notice(`Bạn đã thắng được +${currency(Number(Math.round(number_value_xiu * (1 - (free_money / 100)))))}`);
                            $('.value_xiu').classList.add('active');
                            add_moneys.classList.add('active');
                            add_moneys.innerText = `+${currency(number_value_xiu)}`
                            return "XiuWin";
                        }
                    }
                    return "nomal";
                }
                else {
                    if (this.is_datcuoc) {
                        if (number_value_tai > 0) {
                            this.cuadat = "Tài";
                            this.datcuoc = number_value_tai;
                            this.coin -= number_value_tai;
                            this.money_win = -number_value_tai;
                            game_notice(`Bạn đã thua -${currency(number_value_tai)}`);
                            add_moneys.classList.add('active');
                            add_moneys.innerText = `-${currency(number_value_tai)}`
                            $('.value_xiu').classList.add('active');
                            return "XiuWin";
                        } else if (number_value_xiu > 0) {
                            this.cuadat = "Xỉu";
                            this.datcuoc = number_value_xiu;
                            this.coin -= number_value_xiu;
                            this.money_win = -number_value_xiu;
                            game_notice(`Bạn đã thua -${currency(number_value_xiu)}`);
                            add_moneys.classList.add('active');
                            $('.value_tai').classList.add('active');
                            add_moneys.innerText = `-${currency(number_value_xiu)}`
                            return "TaiWin";
                        }
                    }
                    return "nomal";
                }
            },
            dices(result_dices) {
                let a = 0, b = 0, c = 0;
                a = Math.floor(Math.random() * 6) + 1;
                function winTai() {
                    let total = 0;
                    while (total <= 10) {
                        b = Math.floor(Math.random() * 6) + 1;
                        c = Math.floor(Math.random() * 6) + 1;
                        total = a + b + c;
                    }

                    return total;
                }
                function winxiu() {
                    let total = 20;
                    while (total >= 11) {
                        b = Math.floor(Math.random() * 6) + 1;
                        c = Math.floor(Math.random() * 6) + 1;
                        total = a + b + c;
                    }
                    return total;
                }
                if (result_dices == "TaiWin") {
                    winTai();
                    $('.img__tai').classList.toggle('active');
                }
                else if (result_dices == "XiuWin") {
                    winxiu();
                    $('.img__xiu').classList.toggle('active');
                }
                else {
                    b = Math.floor(Math.random() * 6) + 1;
                    c = Math.floor(Math.random() * 6) + 1;
                    let total = a + b + c;
                    if (total > 10) {
                        img__tai.classList.add('active');
                    }
                    else {
                        img__xiu.classList.add('active');
                    }
                }
                this.arrdices = [a, b, c];
                let arr_boxdice = $$('.boxdice img');
                arr_boxdice[0].src = `/img/xucxac/${a}.png`;
                arr_boxdice[1].src = `/img/xucxac/${b}.png`;
                arr_boxdice[2].src = `/img/xucxac/${c}.png`;
                $('.box_taixiu_dices').classList.remove('hide');
                //    let_update_arr_history(phien, cuadat, ketqua, dices, datcuoc, Tracancua = 0, tienwin)
                if (this.datcuoc > 0) let_update_arr_history(localStorage.getItem("phien"), this.cuadat, a + b + c, [a, b, c], this.datcuoc, 0, this.money_win);
                this.datcuoc = 0;
                list_box_taixiu(a + b + c);
                this.render();

            },
            system_vip(coin) {
                let vip_arr = this.arrVip;
                vip_arr = vip_arr.map(item => item * 1000);
                let index_vip = 0;
                if (coin > vip_arr[vip_arr.length - 1]) {
                    index_vip = 10;
                }
                else if (vip_arr[0] > coin) {
                    index_vip = 0;
                }
                else {
                    for (let i = 0; i < vip_arr.length - 1; i++) {
                        if (vip_arr[i] <= coin && coin < vip_arr[i + 1]) {
                            index_vip = i + 1;
                            break;
                        }
                    }
                }
                if (index_vip != 0) {
                    this.vip_fee = Number(((1 - (Math.pow(index_vip, 2) / 100)) * this.money_fee).toFixed(2));
                    $('.logo_vip').src = "/img/xucxac/vip" + index_vip + ".png";
                }
            },
            handle_event() {
                // Tắt mở  Game tài xỉu
                $('.game_content_close').onclick = function () {

                    $('.game').classList.toggle('hide');
                }
                $('.open_taixiu').onclick = function () {

                    $('.game').classList.toggle('hide');
                }
                // Tắt mở chat
                $('.chat_content_chat').onclick = function () {

                    $('.game_chat').classList.toggle('hide');
                }
                $('.game_content_chat').onclick = function () {

                    $('.game_chat').classList.toggle('hide')
                }
                // Sự kiện đặt cược

                let put_allmoney = $('.put_allmoney');
                let put_gamble = $('.put_gamble');
                let put_canel = $('.put_canel');


                for (let box_price of list_price) {
                    box_price.onclick = function (e) {
                        clean_img_active(list_price, "active");
                        e.target.classList.add('active')
                        let number_money = this.innerText;
                        if (number_money.includes("K")) {
                            number_money = Number(String(number_money).slice(0, number_money.length - 1))
                            sumDC += number_money * 1000;
                            if (sumDC >coin_game) {
                                game_notice("Số tiền trong tài khoảng không đủ !");
                                sumDC =coin_game;
                            }
                        } else {
                            number_money = Number(String(number_money).slice(0, number_money.length - 1))
                            sumDC += number_money * 1000000;
                            if (sumDC >coin_game) {
                                game_notice("Số tiền trong tài khoảng không đủ !");
                                sumDC =coin_game;
                            }
                        }
                        if (value_tai.innerText != "Đặt Cược") {
                            value_tai.innerText = currency(sumDC);
                        }
                        if (value_xiu.innerText != "Đặt Cược") {
                            value_xiu.innerText = currency(sumDC);
                        }
                    }
                }
                value_tai.onclick = function () {
                    this.innerText = 0;
                    sumDC = 0;
                    value_xiu.innerText = "Đặt Cược"
                }
                value_xiu.onclick = function () {
                    this.innerText = 0;
                    sumDC = 0;
                    value_tai.innerText = "Đặt Cược"
                }

                put_allmoney.onclick = function () {

                    if (coin_game > 0) {
                        if (value_tai.innerText != "Đặt Cược") {
                            game_notice("Đặt tất tay cửa Tài thành công !")
                            value_tai.innerText = currency(coin_game);
                        }
                        else if (value_xiu.innerText != "Đặt Cược") {
                            game_notice("Đặt tất tay cửa Xỉu thành công !")
                            value_xiu.innerText = currency(coin_game);
                        }
                        else {
                            game_notice("Vui Lòng chọn cửa để đặt cược!")
                        }
                    }else{
                        game_notice("Vui Lòng nạp thêm tiền!")
                    }

                }
                put_gamble.onclick = function () {

                    if (coin_game > 0) {
                        if (value_tai.innerText == "Đặt Cược" && value_xiu.innerText == "Đặt Cược") {
                            game_notice("Vui lòng chọn cửa để đặt cược!")
                            play();
                            return 0;
                        }
                        if (value_tai.innerText == 0 || value_xiu.innerText == 0) {
                            game_notice("Vui lòng chọn giá trị để đặt cược!")
                            play();
                            return 0;
                        }
                        game_notice("Bạn đã đặt cược thành công!");
                        app.is_datcuoc = true;
                    }
                    else{
                        game_notice("Vui Lòng nạp thêm tiền!")
                    }
                    play();
                }
                put_canel.onclick = function () {
                    app.is_datcuoc = false;
                    if (cover_currency(value_tai.innerText) > 0) {
                        game_notice("Hủy cửa Tài thành công !");
                        value_tai.innerText = "Đặt Cược";
                        play();
                        return 0;
                    }
                    if (cover_currency(value_xiu.innerText) > 0) {
                        game_notice("Hủy cửa Xỉu thành công !");
                        value_xiu.innerText = "Đặt Cược";
                        play();
                        return 0;
                    }
                    if (coin_game > 0) {
                        game_notice("Bạn chưa đặt cược!")
                    }
                    else{
                        game_notice("Vui Lòng nạp thêm tiền!")
                    }
                    play();

                }

            },
            ramdomPeople(time) {
                let people_tai = $('.player_tai');
                let people_xiu = $('.player_xiu');
                let user_tai = cover_currency(people_tai.innerText);
                let user_xiu = cover_currency(people_xiu.innerText);
                let total_tai = $('.total_tai');
                let total_xiu = $('.total_xiu');
                let money_tai = cover_currency(total_tai.innerText);
                let money_xiu = cover_currency(total_xiu.innerText);
                if (time >= -1 && time <= this.is_time - 1) {
                    // Random user player
                    user_tai += Math.round(Math.random() * 100);
                    user_xiu += Math.round(Math.random() * 100);
                    people_tai.innerText = currency(user_tai);
                    people_xiu.innerText = currency(user_xiu);

                    // Random money player  put
                    money_tai += Math.round(Math.random() * 150 * 88) * 9857;
                    money_xiu += Math.round(Math.random() * 135 * 77) * 8745;
                    total_tai.innerText = currency(money_tai);
                    total_xiu.innerText = currency(money_xiu);

                }
                else {
                    people_tai.innerText = 0;
                    people_xiu.innerText = 0
                    user_tai = 0;
                    user_xiu = 0;

                    money_tai = 0;
                    money_xiu = 0;
                    total_tai.innerText = 0;
                    total_xiu.innerText = 0;
                }
            },
        };
        setInterval(() => {
            app.rest_time();
        }, 1000)
        app.render();
        app.handle_event();
        naptien();
        //--------------------End ap;
    }
})();
event_footer();
function game__notice_home(notice, time = 2) {
    let game__notice_home = $('.game__notice_home .grid');
    let parent_game = game__notice_home.parentElement;
    parent_game.classList.add("active");

    game__notice_home.innerText = notice;
    let value_time = time;
    setInterval(() => {
        value_time--;
        if (value_time == 0) {
            parent_game.classList.remove("active");
        }
    }, 1000)
}
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}
function event_footer() {
    let event_btn = $('.footer_btn .event_btn');
    let rule_btn = $('.footer_btn .rule_btn');
    let holine_btn = $('.footer_btn .holine_btn');
    let livechat_btn = $('.footer_btn .livechat_btn');
    let box__game2 = $('.boxs_gameAll .box__game2');
    let box__game3 = $('.boxs_gameAll .box__game3');
    let box__game4 = $('.boxs_gameAll .box__game4');
    let rut_tien_now = $('footer .h1_footer');

    // loa phụ

    event_btn.onclick = function () {

        game__notice_home("Chức năng đang bảo trì");
        play();
    }
    rule_btn.onclick = function () {

        game__notice_home("Chức năng đang bảo trì");
        play();
    }
    holine_btn.onclick = function () {

        game__notice_home("Chức năng đang bảo trì");
        play();
    }
    livechat_btn.onclick = function () {

        game__notice_home("Chức năng đang bảo trì");
        play();
    }
    box__game2.onclick = function () {

        game__notice_home("Game Bầu Cua chưa cập nhập");
        play();
    }
    box__game3.onclick = function () {
        game__notice_home("Game Ba Cào  chưa cập nhập");
        play();
    }
    box__game4.onclick = function () {

        game__notice_home("Game Trái cây  chưa cập nhập");
        play();
    }
    rut_tien_now.onclick = function () {
        game__notice_home("Hệ thống chưa cập nhập");
        play();

    }
    $('.container_footer').onclick = function () {

        game__notice_home("Tin Tức và Settings chưa cập nhập");
        play();
    }
    // đóng mở tab history
    let modal_history = $('.history');
    let close_history = $('.history_cuoc img');
    $('.game_content_lichsu').onclick = function () {
        modal_history.classList.toggle('hide');
    }
    close_history.onclick = function (e) {
        modal_history.classList.toggle('hide');
    }
}


},1000)