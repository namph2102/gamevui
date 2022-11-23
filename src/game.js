
    (function () {
        

        //login name user
        var username__taixiu = localStorage.getItem('username_taixiu');
        if (username__taixiu) {
            $('.header_username_login').innerText = username__taixiu;
        }
        else {
            let id_ran = Math.round(Math.random() * 98999) + 154658;
            $('.header_username_login').innerText = "ID : " + id_ran;
        }

        open_close_tag();
        // Chuyển số có dấu ,
        function currency(currency) {
            const price = currency;
            return price.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            });
        }
        // Chuyển số có dấu , sang số bình thường
        function cover_currency(currency) {
            return Number(currency.replace(/,/g, ''));

        }
        function open_close_tag() {
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
        }
        //Kiểm ra thẻ đó có active hay không
        function check_active(element) {
            if (element.className.includes('active')) return true;
            return false;
        }


        let arr_history = [
            // {
            //     "phien": '120',
            //     "time": "7:15:02 10/08/2002",
            //     "cuadat": "Tài",
            //     "ketqua": "xỉu",
            //     "dices": "0-6-3",
            //     "datcuoc": 150000,
            //     "Tracancua": 0,
            //     "tienwin": 150000
            // },
        ];
        function let_update_arr_history(phien, cuadat, ketqua, dices, datcuoc, Tracancua = 0, tienwin) {
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
                arr = {
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

            }

        }
        // Lấy tất cả tiền có trong tài khoảng;
        coins(30);
        function coins(time) {
            // lấy tổng số tiền có trong tài khoảng
            let toltal_All_coins = $('.container_body .total_coin');
            const list_box_price = $$('.list_price .box_price');
            var result_box_list = Array.from($$('.result_box'));
            var result_box_list_active = [1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1];

            function list_box_taixiu(result) {
                clean_img_active(result_box_list);
                result_box_list_active.shift();
                if (result > 10) result_box_list_active.push(0);
                else {
                    result_box_list_active.push(1);
                }
                localStorage.setItem('list_box', result_box_list_active)
                for (let i in result_box_list) {
                    let s = result_box_list_active[i];
                    if (s) {
                        result_box_list[i].classList.add('active');
                    }
                }
            }
            if (!localStorage.getItem("coin")) {
                localStorage.setItem("coin", 10000000);
            }
            const coin = {
                totals_coins: Number(localStorage.getItem('coin')),
                is_datcuoc: false,
                is_time: time,
                is_win: true,
                is_add: false,
                tile_lose: 60,
                arrVip: [300, 1000, 8000, 18000, 26000, 44000, 60000, 85000, 100000, 1000000],
                vip_fee_reduce: 0,
                maxVip: 1000001,
                money_fees: 5,
                arrdices: [0, 0, 0],
                cuadat: "Tài",
                money_win: 0,
                phien_taixiu: Number(localStorage.getItem('phien')),
                get_total_coin() {
                    return cover_currency(toltal_All_coins.value);
                },
                set_total_coin(data) {
                    coin.totals_coins = data;

                    toltal_All_coins.value = currency(data);
                },
            }
            person_putmoneys();
            toltal_All_coins.value = currency(coin.totals_coins);
            //Thời gian của game
            let sub_time = $('.sub_time');
            let main_time = $('.time_main');
            let box_taixiu_dices = $('.box_taixiu_dices');
            box_taixiu_dices.classList.add('hide');
            let time_des = coin.is_time;
            let ketqua_taixiu;
            setInterval(() => {
                main_time.innerText = time_des--;
                sub_time.innerText = time_des + 1;
                if (time_des == coin.is_time - 1) {
                    game_notice("Bắt đầu phiên mới");
                    phien();
                }
                // thời giang trả tiền cân cửa
                if (time_des == Math.round(coin.is_time * 0.2)) {
                    coin.is_add = true;
                    game_notice("Trả tiền cân cửa");
                    clean_img_active(list_box_price);
                    //code ăn tiền
                    ketqua_taixiu = result_dices();
                    // end_game(ketqua_taixiu);
                }

                if (time_des == coin.is_time - 1) {
                    box_taixiu_dices.classList.add('hide');
                    main_time.classList.remove('hide');

                }
                if (coin.is_add) {
                    box_taixiu_dices.classList.remove('hide');
                    main_time.classList.add('hide');
                    sub_time.classList.remove('hide');
                    list_box_taixiu(ketqua_taixiu);
                    effect_dices(ketqua_taixiu, Math.round(coin.is_time * 0.2) + 2);
                    coin.is_add = false;
                }
                if (time_des == 0) {
                    end_game(ketqua_taixiu);
                    person_putmoneys();
                    uploadVip();
                }
                if (time_des == -1) {
                    sub_time.classList.add('hide');
                    time_des = coin.is_time;
                }
                ramdomPeople(time_des);
            }, 1000)

            //code ăn tiền 

            function end_game(data) {
                let input_value_tai = $('.game_content .value_tai').innerText;
                let input_value_xiu = $('.game_content .value_xiu').innerText;
                input_value_tai = cover_currency(input_value_tai);
                input_value_xiu = cover_currency(input_value_xiu);
                let value_datcuoc = 0;

                let sum_total = coin.get_total_coin();
                let is_Nohavemoney = false;
                if (sum_total < 0) is_Nohavemoney = true;
                if (is_Nohavemoney) {
                    game_notice(`Vui lòng nạp thêm tiền`);
                    return false;
                }
                // end game ===> result tài
                if (coin.is_datcuoc) {
                    if (data > 10) {
                        if (input_value_tai) {
                            // tiền phí
                            sum_total += input_value_tai * ((100 - coin.vip_fee_reduce) / 100);
                            value_datcuoc = input_value_tai;
                            coin.cuadat = "Tài"
                        }
                        if (input_value_xiu) {
                            sum_total -= input_value_xiu;
                            value_datcuoc = input_value_xiu;
                            coin.cuadat = "Xỉu"
                        }
                    } else {
                        if (input_value_tai) {
                            sum_total -= input_value_tai;
                            value_datcuoc = input_value_tai;
                            coin.cuadat = "Tài"
                        }
                        if (input_value_xiu) {
                            // tiền phí
                            sum_total += input_value_xiu * ((100 - coin.vip_fee_reduce) / 100);
                            value_datcuoc = input_value_xiu;
                            coin.cuadat = "Xỉu"
                        }
                    }

                    if (sum_total > coin.totals_coins && coin.is_datcuoc) {
                        coin.money_win = sum_total - coin.totals_coins;
                        game_notice(`Bạn đã thắng được +${currency(sum_total - coin.totals_coins)}`);

                    }
                    if (sum_total < coin.totals_coins && coin.is_datcuoc) {
                        coin.money_win = sum_total - coin.totals_coins;
                        game_notice(`Bạn đã thua -${currency(coin.totals_coins - sum_total)}`)
                    }
                    let_update_arr_history(coin.phien_taixiu, coin.cuadat, data, coin.dices, value_datcuoc, Tracancua = 0, coin.money_win);
                    history_cuoc(arr_history)
                    localStorage.setItem('coin', sum_total);
                    coin.set_total_coin(sum_total);
                    coin.is_datcuoc = false;

                }

            }

            // kết quả tài xỉu
            function result_dices() {
                let xx1 = Math.floor(Math.random() * 6) + 1;
                let xx2 = Math.floor(Math.random() * 6) + 1;
                let xx3 = Math.floor(Math.random() * 6) + 1;
                let input_value_tai = cover_currency($('.game_content .value_tai').innerText);
                let input_value_xiu = cover_currency($('.game_content .value_xiu').innerText);
                let sum = xx1 + xx2 + xx3;

                if (!input_value_tai && !input_value_xiu) {
                    // Hàm xúc xắc
                    let arr_boxdice = $$('.boxdice img');
                    arr_boxdice[0].src = `/img/xucxac/${xx1}.png`
                    arr_boxdice[1].src = `/img/xucxac/${xx2}.png`
                    arr_boxdice[2].src = `/img/xucxac/${xx3}.png`
                    return sum;
                    //end xuc sac
                }
                let is_taixiu_win;
                let tile_taixiu = Math.floor(Math.random() * 101);
                if (tile_taixiu < coin.tile_lose) {
                    is_taixiu_win = false;
                }
                else {
                    is_taixiu_win = true;
                }
                function sumTile(bol = 'win') {
                    var a = Math.floor(Math.random() * 6) + 1;
                    var b = Math.floor(Math.random() * 6) + 1;
                    var c = Math.floor(Math.random() * 6) + 1;
                    total = a + b + c;
                    if (bol == 'win') {
                        // muốn tìm tài khi bol true
                        while (total <= 10) {
                            a = Math.floor(Math.random() * 6) + 1;
                            b = Math.floor(Math.random() * 6) + 1;
                            c = Math.floor(Math.random() * 6) + 1;
                            total = a + b + c;
                        }
                    }
                    else {
                        // muốn tìm xỉu thì bol là false
                        while (total > 10) {
                            a = Math.floor(Math.random() * 6) + 1;
                            b = Math.floor(Math.random() * 6) + 1;
                            c = Math.floor(Math.random() * 6) + 1;
                            total = a + b + c;
                        }
                    }
                    let arr_boxdice = $$('.boxdice img');
                    arr_boxdice[0].src = `/img/xucxac/${a}.png`;
                    arr_boxdice[1].src = `/img/xucxac/${b}.png`;
                    arr_boxdice[2].src = `/img/xucxac/${c}.png`;
                    coin.dices = [a, b, c];

                    return total;
                }
                if (is_taixiu_win) {
                    if (input_value_tai) {

                        return sumTile();
                    }
                    if (input_value_xiu) {

                        return sumTile('thang');
                    }
                }
                else {
                    if (input_value_tai) {

                        return sumTile('thua');
                    }
                    if (input_value_xiu) {

                        return sumTile();
                    }
                }

            }
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
            // hiệu  ưng tài xỉu gồm kết quả tài xỉu,thời gian chạy
            function effect_dices(sum_dices, time = 10) {
                let rest_time = time;
                let arr_img_taixiu = $$('.game_content .img__taixiu');
                let arr_input_taixiu = $$('.input_value_taixiu ');
                clean_img_active(arr_img_taixiu);
                if (sum_dices > 10) {
                    $('.game_content .img__tai').classList.toggle('active');
                    $('.value_tai').classList.toggle('active');

                }
                else {
                    $('.game_content .img__xiu').classList.toggle('active');
                    $('.value_xiu').classList.toggle('active');

                }
                result_box_list[result_box_list.length - 1].classList.toggle('here');
                $('.modal_overlayer').classList.toggle('hide');
                setInterval(() => {
                    rest_time--;
                    if (rest_time == 0) {
                        clean_img_active(arr_img_taixiu);
                        clean_img_active(arr_input_taixiu);
                        result_box_list[result_box_list.length - 1].classList.remove('here');
                        $('.modal_overlayer').classList.toggle('hide');
                    }
                }, 1000)
            }

            function game_notice(notice = "Bắt đầu phiên mới", time = 1) {
                let index_time_dc = time;
                let node_gameifm = $('.game .game_ifm');
                $('.game_ifm').innerText = notice;
                if (!check_active(node_gameifm)) {
                    node_gameifm.classList.add('active');
                    setInterval(() => {
                        index_time_dc--;
                        if (index_time_dc == 0) node_gameifm.classList.remove('active');
                    }, 1000)
                }
                else {
                    node_gameifm.classList.remove('active');
                    index_time_dc = time;
                }

            }
            // Người chơi đặt cược

            function person_putmoneys() {
                const input_value_taixiu = $$('.game_content .input_value_taixiu');
                let input_value_tai = $('.game_content .value_tai');
                let input_value_xiu = $('.game_content .value_xiu');
                if (input_value_tai.className.includes('hide')) {
                    input_value_tai.innerText = "Đặt Cược";
                    input_value_tai.classList.remove('hide');
                }
                if (input_value_xiu.className.includes('hide')) {
                    input_value_xiu.innerText = "Đặt Cược";
                    input_value_xiu.classList.remove('hide');
                }
                clean_img_active(list_box_price);
                for (let item_price of list_box_price) {
                    item_price.onclick = function () {

                        clean_img_active(list_box_price);
                        this.classList.add('active');
                        let total_coin_input = put_where();
                        let face_price = item_price.innerText;
                        if (face_price.includes('M')) {
                            face_price = face_price.replace('M', '000000');
                        }
                        else {
                            face_price = face_price.replace('K', '000');
                        }
                        let price = Number(face_price);
                        let sum = 0;
                        if (total_coin_input) {
                            sum += Number(cover_currency(total_coin_input.innerText)) + price;
                            if (sum > coin.totals_coins) {
                                game_notice("Số tài khoảng không đủ để đặt cược");
                                total_coin_input.innerText = currency(coin.totals_coins);
                            } else {
                                total_coin_input.innerText = currency(sum);
                            }
                        }
                        play();
                    }
                }
                function put_where() {
                    if (input_value_xiu.innerText != 'Đặt Cược') return input_value_xiu;
                    if (input_value_tai.innerText != 'Đặt Cược') return input_value_tai;
                    return game_notice("Bạn chưa đặt cược!", 1)
                }

                input_value_tai.onclick = function () {

                    clean_img_active(input_value_taixiu, 'hide');
                    input_value_xiu.innerText = "Đặt Cược";
                    this.innerText = 0;
                    this.classList.add('hide');
                    clean_img_active(list_box_price);
                    play();
                }
                input_value_xiu.onclick = function () {

                    clean_img_active(input_value_taixiu, 'hide');
                    input_value_tai.innerText = "Đặt Cược";
                    this.innerText = 0;
                    this.classList.add('hide');
                    clean_img_active(list_box_price);
                    play();
                }
                // Đặt tất tay
                $('.put_allmoney').onclick = function (e) {

                    let value_tai = cover_currency(input_value_tai.innerText);
                    let value_xiu = cover_currency(input_value_xiu.innerText);
                    if (value_tai || value_tai == 0) {
                        input_value_tai.innerText = currency(coin.totals_coins);
                        game_notice('Bạn đang cược tất tay cửa tài!');
                    }
                    else if (value_xiu || value_xiu == 0) {
                        input_value_xiu.innerText = currency(coin.totals_coins);
                        game_notice('Bạn đang cược tất tay cửa xỉu!');
                    }
                    else game_notice('Vui chọn cửa để đặt cược!');
                    play();
                }
                $('.put_gamble').onclick = function (e) {

                    let value_tai = cover_currency(input_value_tai.innerText);
                    let value_xiu = cover_currency(input_value_xiu.innerText);
                    if (value_tai || value_xiu) {
                        coin.is_datcuoc = true;
                        game_notice('Bạn đã đặt cược thành công');
                    }
                    else {
                        game_notice('Vui lòng chọn cửa đặt cược!');
                    }
                    play();
                }
                $('.put_canel').onclick = function (e) {

                    coin.is_datcuoc = false;
                    game_notice('Bạn đã hủy cược thành công');
                    if (input_value_tai.className.includes('hide')) {
                        input_value_tai.innerText = "Đặt Cược";
                        input_value_tai.classList.remove('hide');
                    }
                    if (input_value_xiu.className.includes('hide')) {
                        input_value_xiu.innerText = "Đặt Cược";
                        input_value_xiu.classList.remove('hide');
                    }
                    play();
                }
                $('.modal_overlayer').onclick = function (e) {

                    game_notice('Đang cân cửa bạn không thể thao tác!');
                    play();
                }
            }

            function ramdomPeople(time) {
                let people_tai = $('.player_tai');
                let people_xiu = $('.player_xiu');
                let user_tai = cover_currency(people_tai.innerText);
                let user_xiu = cover_currency(people_xiu.innerText);
                let total_tai = $('.total_tai');
                let total_xiu = $('.total_xiu');
                let money_tai = cover_currency(total_tai.innerText);
                let money_xiu = cover_currency(total_xiu.innerText);
                if (time >= -1 && time <= coin.is_time - 1) {
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
            }
            $('.body_notifi').innerHTML = `<h4> Chào mừng chiến thần mới <span class="goodperson"> ${username__taixiu} </span>  đã lập tài khoảng thành công </h4>`
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

            const myDiv = $('.chat_content')

            setInterval(() => {
                ramdom_charting()
            }, 5000);
            function ramdom_charting() {
                let chat_content = $('.chat_content .chat');
                let ramdonuser = Math.floor(Math.random() * (arr_name.length - 1));
                let ramdonchatr = Math.floor(Math.random() * (username_content.length - 1));
                let random_vip = Math.floor(Math.random() * 10);

                let chatting_ran = document.createElement('h5');
                chatting_ran.innerHTML = `<span class="username">${arr_name[ramdonuser]}[ Vip${random_vip} ]</span><span class="username_content">${username_content[ramdonchatr]}</span> `;
                chat_content.appendChild(chatting_ran);

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
            uploadVip();
            function uploadVip() {
                let logo_vip = $('.logo_vip');
                let coin_rest = coin.totals_coins;
                let arr_vip_client = coin.arrVip;
                let index_vip = 0;
                if (coin_rest >= coin.maxVip * 1000) {
                    index_vip = 10;

                }
                else if (coin_rest <= arr_vip_client[0]) {
                    index_vip = 0;
                }
                else {
                    for (let i = 0; i < arr_vip_client.length - 1; i++) {
                        if (coin_rest >= arr_vip_client[i] * 1000 && coin_rest <= arr_vip_client[i + 1] * 1000) {
                            index_vip = i + 1;
                            break;
                        }
                    }
                }

                if (index_vip <= 0) {
                    logo_vip.src = "";
                    coin.vip_fee_reduce = 0;
                }
                else {
                    coin.vip_fee_reduce = Number(((1 - (Math.pow(index_vip, 2) / 100)) * coin.money_fees).toFixed(2));
                    logo_vip.src = "/img/xucxac/vip" + index_vip + ".png";
                }
                // coin.money_fees-=
                return true;

            }
            event_footer();
            // game__notice_home("Chức năng đang bảo trì");
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
            function phien() {
                let phien_ = coin.phien_taixiu;
                phien_++;
                coin.phien_taixiu = phien_;
                localStorage.setItem("phien", phien_);
                $(".phientaixiu .phien").innerText = phien_;
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
            // âm thanh click
            function play() {
                var audio = document.getElementById("audio");
                audio.play();
            }

            naptien();
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
                    if (coin.is_win) {
                        let s = giatrinap.value;
                        capcha();
                        if (Number(s)) {
                            coin.is_win = false;
                            let nap = confirm("Bạn chắc muốn nạp tiền không ?");
                            if (nap) {
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
                            alert("Mã thẻ không đúng");
                            modal_hiennaptien.innerText = '';
                            giatrinap.value = '';
                        }
                    }
                    else {
                        alert("Một ngày chỉ nạp 1 lần duy nhất trách spam");
                    }
                }
            }


        }

        function capcha() {
            const text = 'abcdefghijklmnopqrstuvwxyz0123456789';
            const arrText = text.split('');
            function ran(arr = []) {
                let output = [];
                for (var i = 0; i <= 5; i++) {
                    let index = Math.floor(Math.random() * (arr.length - 1));
                    output.push(arr[index]);
                }
                return output.join('');
            }
            var rcapcha = ran(arrText);
            let code_capcha = $('.code_capcha').innerText = rcapcha;
            $('.box_foot i').onclick = function () {
                var rcapcha = ran(arrText);
                let code_capcha = $('.code_capcha').innerText = rcapcha;
            }
            var erro = $('.capcha_erro');
            var inputcapcha = document.getElementsByName('capcha')[0];
        }

        // arr_history=[
        //     {
        //         "phien":120,
        //         "time":"7:15:02 10/08/2002",
        //         "cuadat":"Tài",
        //         "ketqua":"xỉu",
        // "dices":0-0-0
        //         "time":"7:15:02 10/08/2002",
        //         "datcuoc":150000,
        //         "Tracancua":0,
        //         "tienwin":150000
        //      },
        // ]
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



    })();
