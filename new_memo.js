window.addEventListener('load', function () {
    let add = document.getElementById('add');
    let val = document.getElementById('try');
    let re = document.getElementById('re');
    let clear = document.getElementById('clear');
    let list = document.getElementById('list');
    let items = JSON.parse(localStorage.getItem('to-do-List')) || [];
    updateUL(items);

    var delitems = [];
    var delOrder = [];

    //事件監聽
    add.addEventListener('click', additem);
    re.addEventListener('click', returnitem);
    clear.addEventListener('click', clearstorage);
    list.addEventListener('click', delitem);

    //新增localStorage
    function additem() {
        if (val.value != '') {
            //存入localStorage
            item = {
                content: val.value
            };
            items.push(item);
            let itemString = JSON.stringify(items);
            localStorage.setItem('to-do-List', itemString);
            updateUL(items);
            val.value = '';
        }
    }

    //更新ul
    function updateUL(items) {
        if (localStorage.getItem('to-do-List') != null) {
            //更新localStorage
            localStorage.setItem('to-do-List', JSON.stringify(items));

            //更新ul
            let getData = localStorage.getItem('to-do-List');
            let dataArr = JSON.parse(getData);
            let str = '';
            for (i = 0; i < dataArr.length; i++) {
                str += `<li data-num="${i}">${dataArr[i].content}</li>`
            }
            list.innerHTML = str;
        }
        reminder();
    }

    //刪除listItem
    function delitem(e) {
        if (e.target.nodeName != 'LI') {
            return;
        } else {
            //刪除陣列物件
            items.splice(e.target.dataset.num, 1);
            //更新localStorage
            updateUL(items);
            //刪除li
            e.target.remove();

            //刪除的儲存在sessionStorage
            let delitem = {
                content: e.target.textContent
            }
            delitems.push(delitem);
            let delitemString = JSON.stringify(delitems);
            sessionStorage.setItem('delItem', delitemString);

            //刪除data-set的儲存在sessionStorage
            delOrder.push(e.target.dataset.num);
            sessionStorage.setItem('delOerdr', delOrder);
        }
    }

    //返回刪除
    function returnitem() {
        let returnData = sessionStorage.getItem('delItem');
        let returnOrder = sessionStorage.getItem('delOerdr');
        let returnDataArr = JSON.parse(returnData);
        if (returnData != null && returnOrder != null && returnDataArr.length != 0 && returnOrder.length != 0) {
            //重新放回items陣列
            let returnOrderArr = returnOrder.split(',');
            items.splice(returnOrderArr[returnOrderArr.length - 1], 0, returnDataArr[returnDataArr.length - 1])

            //更新localStorage
            updateUL(items);

            // 刪除delitems的最後一筆，重新儲存sessionStorage
            delitems.splice(-1, 1);
            let delitemString = JSON.stringify(delitems);
            sessionStorage.setItem('delItem', delitemString);

            //刪除delOrder的最後一筆，重新儲存sessionStorage
            delOrder.splice(-1, 1);
            sessionStorage.setItem('delOerdr', delOrder);
        }
    }

    //清除所有記錄資料
    function clearstorage() {
        localStorage.clear();
        sessionStorage.clear();
        list.innerHTML = '';
        items = [];
        reminder();
    }

    //reminder
    function reminder() {
        if (list.hasChildNodes()) {
            document.querySelector('.reminder').style.display = 'block';

        } else {
            document.querySelector('.reminder').style.display = 'none';

        }
    }

})