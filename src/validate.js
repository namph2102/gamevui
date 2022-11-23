
(function login() {
   

    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const img_dangki = $('.img_login .dangky');
    const img_dangnhap = $('.img_login .dangnhap');
    $('form').addEventListener('submit', function (e) {
        e.preventDefault();
    })
    // Xử lý con mắt
    const arr_eye = $$('.fa-solid.fa-eye');
    for (let i = 0; i < arr_eye.length; i++) {
        arr_eye[i].onclick = function () {
            let inputElement = this.parentNode.querySelector('input');
            if (inputElement) {

                if (inputElement.type == "password") {
                    inputElement.type = "text";
                }
                else {
                    inputElement.type = "password";
                }
            }

        }
    }
    var indexform=0;
    img_dangki.addEventListener('click', function (e) {
        play();
        e.target.src = "img/dangky.png"
        img_dangnhap.src = "img/dangnhap.png";
        const arrInput = $$('.form_error');
        for(let i of arrInput){
            i.innerText='';
        }
        indexform=0;
        var login_hide = $('.form-group.login_rpassword');
        if (login_hide.className.includes('hide')) {
            login_hide.classList.toggle('hide');
            $('.form_error3').classList.toggle('hide');
        }
    })
    img_dangnhap.addEventListener('click', function (e) {
        play();
        indexform=1;
        const arrInput = $$('.form_error');
        for(let i of arrInput){
            i.innerText='';
        }
        e.target.src = "img/dangnhap1.png";
        img_dangki.src = "img/dangky1.png"
        var login_hide = $('.form-group.login_rpassword');

        if (!login_hide.className.includes('hide')) {
            login_hide.classList.toggle('hide');
            $('.form_error3').classList.toggle('hide');
        }
    })
    $('button[type="submit"]').onclick = function () {
        play();
        const arrInput = $$('.form-group input');
        if(indexform==0){
            for (let i=0; i<arrInput.length; i++) {
                if (arrInput[i].value == '') {
                    showError(arrInput[i], "Vui lòng nhập trường này");
                }
                else {
                    notError(arrInput[i]);
                }
            }
            if(arrInput[2].value=='') showError(arrInput[2], "Vui lòng nhập trường này");
            else{
                if(arrInput[1].value!=arrInput[2].value) {
                    console.log(arrInput[1],arrInput[2]);
                    showError(arrInput[2], "Mật Khẩu nhập không khớp");
                }
                else{
                    notError(arrInput[2]);
                }
            }

            if(arrInput[0].value && arrInput[1].value && arrInput[2].value && arrInput[1].value==arrInput[2].value){
                localStorage.setItem('username_taixiu',arrInput[0].value);
                localStorage.setItem('password_taixiu',arrInput[1].value);
                $('.form_login').submit();
            }
            
        }
        else {
            for (let i=0; i<arrInput.length-1; i++) {
                if (arrInput[i].value == '') {
                    showError(arrInput[i], "Vui lòng nhập trường này");
                }
                else {
                    notError(arrInput[i]);
                }
            }
            if(arrInput[0].value && arrInput[1].value){
                $('.form_login').submit();
            }
        }
        
    }
    

    function showError(input, message) {
        let parent_input = input.parentNode;
        let form_error = parent_input.nextSibling;
        form_error.classList.add('active')
        form_error.innerText = message;
    }
    function notError(input) {
        let parent_input = input.parentNode;
        let form_error = parent_input.nextSibling;
        form_error.innerText = "";
        form_error.classList.remove('active')

    }

    function play() {
        var audio = document.getElementById("audio");
        audio.play();
      }
      playBG();
      function playBG() {
        var audio = document.getElementById("playblackground");
        audio.play();
      }
})();