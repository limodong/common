/**
 * 时间处理工具函数
 * 包含以下功能：
 * 1、时间格式化
 * 2、给定出生年月日计算年龄
 * 3、根据当前月份，输出这一个月的每一天的星期（2026年1月1日：星期四）
 * 3、时间运算（例如：添加或者减少2天|2小时|2分钟|20秒|200毫秒）
 */
function formate(date) {
    const year = date.getFullYear().toString().padStart(4, 0);
    const month = (date.getMonth() + 1).toString().padStart(2, 0);
    const day = date.getDate().toString().padStart(2, 0);
    const hour = date.getHours().toString().padStart(2, 0);
    const minutes = date.getMinutes().toString().padStart(2, 0);
    const seconds = date.getSeconds().toString().padStart(2, 0);
    console.log(`${year}-${month}-${day} ${hour}:${minutes}:${seconds}`);
}

function calcAgeByBirthday(birthday) {
    const now = new Date();
    const month = birthday.getMonth() + 1;
    const nowMonth = now.getMonth() + 1;
    let age = now.getFullYear() - birthday.getFullYear();
    if (nowMonth > month || (nowMonth === month && now.getDate() >= birthday.getDate())) {
        return age;
    }
    return age - 1;
}

function getCurrentMonthWeek() {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth()+1;
    const moreDay = [1, 3, 5, 7, 9, 10, 12];
    const smallDay = [4, 6, 8, 11];
    let dayNum = 31;
    if (smallDay.includes(month)) {
        dayNum = 30;
    }
    else if (month === 2) {
        if (currentYear % 4 === 0) {
            dayNum = 29;
        } else {
            dayNum = 28;
        }
    }
    const map = { 0: "周日", 1: "周一", 2: "周二", 3: "周三", 4: "周四", 5: "周五", 6: "周六" }
    console.log(`---->${dayNum}`)
    for (let i = 1; i <= dayNum; i++) {
        console.log(`${year}年${month}月${i}日：${map[new Date(d.setDate(i)).getDay()]}`)
    }
}
