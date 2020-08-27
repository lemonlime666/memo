window.addEventListener('load', function () {
    let add = document.getElementById('add');
    let val = document.getElementById('try');
    let re = document.getElementById('re');
    let clear = document.getElementById('clear');
    let list = document.getElementById('list');

    var items = [];
    var delitems = [];
    var delOrder = [];

    if (localStorage.getItem('userList') != null && localStorage.getItem('userList').length != 0) {
        var dataRemain = localStorage.getItem('userList');
        var data = dataRemain.split(',');
        for (i = 0; i < data.length; i++) {
            items.push(data[i])
        }
        createLI();
    } else {
        list.innerHTML = '';
    }

    add.addEventListener('click', function () { //點擊存取localStorage
        let input = val.value;
        if (input != '') {
            items.push(input);
            console.log(items);
            localStorage.setItem('userList', items);
            val.value = ''; //input:text裡面清掉
            createLI(); //產生li在ul裡面
        }
    })

    list.addEventListener('click', (e) => {
        if (e.target.nodeName != "LI") { //如點擊的不是li不要做
            return
        } else {
            let count = e.target.dataset.id; //抓取li的data
            e.target.remove(); //刪掉點擊的li
            items.splice(count - 1, 1); //連動的陣列刪掉這筆
            localStorage.setItem('userList', items); //localStorage重置新陣列
            list.innerHTML = ''; //ul裡面清空重新塞，因為需要更新新的data-set
            createLI();

            delitems.push(e.target.textContent); //sessionStorage暫存刪除的item以免誤刪
            sessionStorage.setItem('delItem', delitems);

            delOrder.push(e.target.dataset.id) //sessionStorage暫存刪除的item的順序，return放回正確順序
            sessionStorage.setItem('delDataOrder', delOrder);
        }
    })

    clear.addEventListener('click', () => { //清除所有代辦事項，不能return
        localStorage.clear();
        list.innerHTML = '';
        items = [];
    })

    function createLI() { //產生li的函式
        let str = '';
        for (i = 0; i < items.length; i++) {
            str += `<li data-id='${i+1}'>${items[i]}</li>`;
            list.innerHTML = str;
        }
    }

    re.addEventListener('click', function () { //返回上一步以免誤刪

        if (delitems.length != 0 && delOrder.length != 0) { //判斷sessionStorage裡面有無項目
            let delDatas = sessionStorage.getItem('delItem');
            let returnDataArr = delDatas.split(',');
            let returnData = returnDataArr[returnDataArr.length - 1];

            let prevOrders = sessionStorage.getItem('delDataOrder');
            let prevorder = prevOrders.split(',');
            let returnOrder = prevorder[prevorder.length - 1];

            delitems.splice(-1, 1);
            sessionStorage.setItem('delItem', delitems);

            delOrder.splice(-1, 1);
            sessionStorage.setItem('delDataOrder', delOrder);

            items.splice(returnOrder - 1, 0, returnData);
            localStorage.setItem('userList', items);
            createLI();
        }

        if (delitems.length == 0) { //如果沒有東西就清除sessionStorage
            sessionStorage.removeItem('delItem');
        }
        if (delOrder.length == 0) {
            sessionStorage.removeItem('delDataOrder');
        }
    })

})