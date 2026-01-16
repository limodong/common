/**
 * regular：正则
 * 正则表达式一套校验字符串的规则
 * 
 * g：全局搜索
 * i：忽略大小写
 */


/**
 *  \d 等价于 [0-9]  \w等价于 [A-Za-z0-9_]
 * 匹配手机号-11位，开头必须为1 【 ^1\d{10}$ 】
 * 匹配姓名-必须是3-6位中文     【 ^[\u4e00-\u9fa5]{3,6}$ 】
 * 匹配密码-6~12位字符，只能包含字母、数字、下划线  【 ^\w{6,12}$ 】
 * 匹配邮箱-例如：xxxx@xxx.xxx.xxx  【^\w+@\w+(\.\w+)+$】
 * 匹配座机号- 前面1~3位数字，后面4~8个数字 例如：xxx-xxxxxxxx 【^\d{1,3}-\d{4,8}$】
 * 匹配一个正数 【 ^\d+(\.?\d)*$ 】
 * 匹配一个小数 【 ^[\d\-]+(\.?\d+)?$ 】
 * 匹配一个整数 【 ^[\d\-]+\d*$ 】
 */

/**
 * 书写一个正则表达式，去匹配一个字符串，得到匹配的次数，输出和匹配的结果
 * 得到一个字符串中 中文字符的数量
 * 过滤敏感词，有一个敏感词数组，需要将字符串中出现的敏感词替换为四个星号   【"共产党","秘密","营销","too young too simple"】
 * 得到一个html字符串中出现的章节数量
 */
function matchString(str, regular) {
    let count = 0;
    let result, newStr = ""; // 匹配不到后返回null

    while (result = regular.exec(str)) {
        newStr += result[0] + "\n";
        ++count;
    }
    console.log(`匹配了${count}次\n${newStr}`);
    return count
}
// matchString("asdb,asjdas,asfsf,afds,fas,faw,g,aew,f,asd,f,asf,a,sd", /\w{3}/g);

function getMatchChineseCount(str, regular) {
    let count = 0;
    while (regular.test(str)) {
        ++count;
    }
    return count;
}
// console.log(getMatchChineseCount(`asdb,啊啊稍微,asfsf,阿萨德,fas,啊啊,g,aew,f,asd,f,去玩儿asf,a,sd`, /[\u4e00-\u9fa5]/g));

/**
 * 替换字符串中的敏感词
 * @param {String} oldStr 原始字符串
 * @param {Array<String>} regularArray 字符串替换的规则数组（在原始字符串中包含在这个数组中的字符串是需要被替换的）
 * @param {String} replaceStr 最终替换成的字符串
 */
function filterSensitiveWord(oldStr, regularArray, replaceStr) {
    regularArray = regularArray.map(item => (`(${item})`)).join("|");
    const reg = new RegExp(regularArray, "g");
    let result;

    // 1、提取oldStr中包含在regularArray中的开始下标和结束下标数组
    let replaceIndexArr = [];
    while (result = reg.exec(oldStr)) {
        replaceIndexArr.push([result.index, (result.index + result[0].length - 1)]);
    }
    // 2、定义newStr（返回字符串）、end（一个下标）
    let newStr = "", end = -1;
    // 遍历字符串，每次循环去对比当前下标是否在replaceIndexArr中，如果不在就往newStr中追加当前索引的字符
    // 反之需要等到循环的当前下标等于end时将replaceStr追加到newStr中，最后直到循环结束为止
    for (let i = 0; i < oldStr.length; i++) {
        if (end === -1) {
            const temp = replaceIndexArr.find(item => item[0] === i);
            if (temp) {
                end = temp[1];
            } else {
                newStr += oldStr[i];
                continue;
            }
        }
        if (i === end) {
            newStr += replaceStr;
            end = -1;
        }
    }
    console.log(newStr);

}
// **
// filterSensitiveWord("wefrwe秘密这是秘密一个秘密不准告诉别人,没有共产党就没么有新中国，中国新青年宣传的是too young too simple的新思想并不是一个营销概念来收割年轻人", ["共产党", "秘密", "营销", "too young too simple"], "****");


const htmlStr = `
    <h2>第1章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas optio, fugit beatae id soluta sint quo debitis incidunt corporis corrupti. Placeat in obcaecati, laudantium officia explicabo excepturi veritatis delectus laboriosam.</p>
    <p>Quidem minus optio perferendis ipsam, suscipit nihil beatae similique distinctio eos ut vel, corrupti incidunt tempora voluptatem commodi cupiditate dolor architecto praesentium odio enim, aliquam illo veritatis magni autem. Doloremque!</p>
    <p>Unde asperiores obcaecati libero distinctio in soluta ducimus nihil? Sunt at accusamus minus earum obcaecati aspernatur nobis recusandae voluptatum facere ab possimus quia ratione, illum sed laboriosam, veniam voluptates labore.</p>
    <p>Reprehenderit quisquam minus, rerum numquam mollitia modi maiores sequi, quae fuga laborum neque laboriosam! Illo veniam rem atque natus, enim iure voluptates nihil dolores ab amet eligendi alias impedit quasi.</p>
    <p>Repellat enim cupiditate possimus perferendis nihil natus magnam soluta quos rerum tenetur iure ex dolore illo, ratione incidunt libero corrupti unde commodi ea? Dicta velit tenetur ipsum? Eligendi, placeat vel?</p>
    <h2>第2章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi quaerat beatae veritatis, vero tempora aliquam id adipisci velit fuga placeat odio impedit nam at explicabo omnis sapiente dolores unde accusantium.</p>
    <p>Ab ad cupiditate error fugit accusantium officiis deleniti eius magnam repellendus odit, itaque nesciunt at omnis ratione veniam incidunt, fugiat unde voluptates ex facilis numquam ipsam. Deserunt voluptatum cumque repellendus?</p>
    <p>Quis esse sint pariatur eaque voluptatum nulla adipisci, ipsam, reiciendis laboriosam magni nobis optio asperiores aliquid illo aperiam accusamus exercitationem odio nostrum, similique debitis? Non veniam nulla ducimus illum consequuntur!</p>
    <p>Iure aperiam explicabo similique voluptate quis aliquid officia debitis, nobis molestias modi. Voluptates repellendus distinctio possimus, nobis autem beatae repellat dolor voluptate quaerat expedita, quas neque soluta explicabo inventore! Sequi.</p>
    <p>Reprehenderit nesciunt nulla impedit ipsam quod. Non id, provident quisquam laboriosam, aperiam minima obcaecati animi accusantium, perferendis voluptatem reprehenderit ea hic qui aut? Aliquid vel sint, repellat in itaque velit.</p>
    <h2>第3章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem tenetur, autem cum vitae ex blanditiis, maiores ratione laborum sed eum ducimus! Quos deleniti non esse praesentium ea perspiciatis alias assumenda?</p>
    <p>Maiores aperiam ex amet voluptatum fugiat earum neque ut impedit sapiente? Dolor inventore, dolorem unde labore reiciendis similique sequi iusto dolores mollitia minus modi totam impedit harum aliquam repellat voluptatum?</p>
    <p>Dolorem neque fugit obcaecati? Laboriosam nam quibusdam alias ipsa nostrum error culpa deserunt atque cupiditate! Dignissimos culpa quod commodi. Distinctio atque culpa odio. Nesciunt autem libero illum similique! Autem, aut.</p>
    <p>Repudiandae dolores dolorum obcaecati dolor soluta rem tempore consectetur est, delectus doloribus error hic, veniam magni excepturi at iure laborum cupiditate, nobis architecto minima dolore voluptatum omnis ratione. Tempora, voluptas.</p>
    <p>Animi assumenda voluptatum ex esse minus! Amet voluptatem est eos hic exercitationem ex eaque excepturi ea quod accusamus minus perspiciatis deserunt, veniam, delectus vel omnis a cupiditate recusandae laborum doloribus!</p>
    <h2>第4章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, odit. Soluta consequatur cupiditate sint autem totam amet, doloremque consequuntur minima beatae accusantium. Laudantium dolorem perspiciatis, facere dolores assumenda modi eligendi.</p>
    <p>Enim qui autem porro voluptates optio repudiandae beatae? Similique exercitationem inventore aut assumenda molestiae, cum iusto quaerat modi accusamus nisi vel at illum voluptas, eaque placeat quisquam beatae ut maiores?</p>
    <p>Nemo earum dolorem deserunt totam quo iusto molestias voluptatum tempora autem suscipit impedit aut voluptatem quaerat architecto fuga sequi optio, quos nostrum dolorum deleniti reiciendis! Omnis nihil sed vero fugit?</p>
    <p>Odio cupiditate esse quidem voluptas voluptatem architecto laboriosam officia facilis atque libero tenetur, quod numquam eveniet. Deserunt delectus itaque doloremque voluptatem sit ipsa unde quidem fuga, iste ratione, soluta doloribus.</p>
    <p>Veniam explicabo ratione dolorem cum nostrum necessitatibus vitae, pariatur saepe voluptates rerum facere tempore corporis enim consequatur nulla. Laborum earum dolorem adipisci placeat et suscipit nesciunt facere blanditiis amet at?</p>
    <h2>第5章</h2>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis eius non quibusdam nam omnis perspiciatis ea quo accusantium. Aliquam, sapiente blanditiis dignissimos quidem voluptate cumque ea deserunt minima pariatur consequatur.</p>
    <p>Delectus nemo itaque placeat, eius recusandae laboriosam suscipit magni quia quas possimus natus impedit, vel architecto adipisci ipsam ex atque sit facere esse explicabo vero rerum tempora, officiis at! Laudantium.</p>
    <p>Officiis quam ut excepturi ullam temporibus! Neque, doloremque. Voluptatem natus cum quos aliquam. Saepe enim laborum mollitia quas aperiam commodi totam laudantium, magnam eum maiores minus a esse, ullam suscipit.</p>
    <p>Ut quibusdam odit, repellendus doloremque minima quidem deleniti. Maiores assumenda, sint porro minima asperiores alias harum reprehenderit dolor repellat vel facilis hic architecto quas? Blanditiis non dolor molestiae temporibus labore?</p>
    <p>Asperiores vitae, nisi, laboriosam exercitationem dolorem ullam beatae suscipit doloribus ipsa, fugit praesentium quaerat magni nemo cupiditate blanditiis? Laborum maxime nobis ea aspernatur quam voluptatem dolor debitis animi impedit vitae.</p>
    <h2>第6章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, deserunt molestias? Dolor et id inventore rem obcaecati ipsa, tempore accusantium, velit rerum ducimus veritatis exercitationem quae doloremque illum, repellendus fugit?</p>
    <p>Maiores ab unde at nisi dolores ipsum doloremque doloribus vel, aut similique sint provident saepe sit esse atque eligendi minus ipsa earum exercitationem perferendis eius ad rerum nulla. Dolores, nemo.</p>
    <p>Amet cupiditate mollitia, fugiat, nemo impedit culpa dolor rerum est sit, dolorum commodi facilis accusantium sapiente autem id nam corrupti! Ullam vel veritatis at accusantium ipsam incidunt, praesentium eveniet blanditiis?</p>
    <p>Voluptatibus molestiae velit sed ratione nihil, recusandae eveniet reiciendis, sint odit rerum necessitatibus aut ea cum praesentium enim, incidunt atque? Temporibus recusandae laudantium impedit expedita nobis saepe excepturi illo dicta.</p>
    <p>Dolore culpa eligendi doloremque distinctio rem nesciunt voluptatem vel saepe quaerat odit neque architecto dolor tenetur, non veniam delectus quis quidem perferendis facere. Adipisci, iusto porro corrupti unde impedit aliquid.</p>
    <h2>第7章</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, iste quas nesciunt, ut id praesentium commodi doloribus fugiat adipisci sunt nulla ea ipsam error! Maxime nam laboriosam maiores porro voluptatibus?</p>
    <p>Quaerat laudantium quos quo dolores iure, quae, odit in saepe laborum nostrum omnis nemo nam magnam eius. Hic nemo odio, nostrum reiciendis cum molestiae cupiditate. Asperiores aliquam pariatur nostrum quis!</p>
    <p>Sapiente dicta aperiam consectetur asperiores obcaecati, nobis labore aut et incidunt facilis impedit non molestiae exercitationem ab minus laboriosam beatae similique sint quibusdam voluptatem deserunt dolorum! Velit veniam voluptas dicta.</p>
    <p>Nobis nostrum ut, voluptate aut fuga vitae fugit repellat, possimus quibusdam ipsam eum aperiam dolore ipsa temporibus eligendi laboriosam sed magnam deserunt cum. Debitis itaque libero exercitationem! Deserunt, sed laudantium.</p>
    <p>Eaque tempore veritatis, ratione quae nisi eos. Sint porro non neque excepturi veniam velit architecto voluptas omnis dolore libero, ipsa aspernatur quo voluptatem quisquam cupiditate optio nemo, dolor nesciunt error.</p>
    <h2>第8章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore impedit consectetur atque rerum, suscipit quam nihil animi provident, neque veniam repellat, fuga rem. Omnis expedita, blanditiis corporis veritatis perspiciatis tenetur?</p>
    <p>Ipsum pariatur doloribus, impedit voluptate, laborum mollitia ut aliquid id illo repellendus sapiente ullam fuga blanditiis accusantium porro esse reprehenderit optio, tempora officia? Pariatur, maiores asperiores! Officia commodi quam cumque!</p>
    <p>Quia accusamus non rerum, incidunt veritatis hic eligendi dolore labore accusantium omnis laudantium, est minima? Neque inventore distinctio laudantium. Repudiandae provident architecto nulla a facere esse temporibus, numquam fuga deserunt.</p>
    <p>Soluta, ipsa neque veritatis nobis autem minus, sint nostrum saepe, eius quidem tempora officiis explicabo suscipit! Consequuntur impedit aliquam maiores, unde voluptate dolor, aspernatur facere, officiis animi assumenda aut corrupti!</p>
    <p>Sint minima, libero animi nulla similique dolores unde nobis? Aperiam ex sapiente pariatur sequi fuga placeat iure libero reiciendis, neque, unde quas aut dolorem maiores laborum cum. Vero, omnis sed?</p>
    <h2>第9章</h2>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam harum rem omnis nihil consequatur officiis obcaecati repellat dolor at voluptates itaque nostrum dicta veritatis officia, minus tenetur cum magni minima.</p>
    <p>Provident et voluptatum corrupti maiores quasi assumenda doloribus quam in dolor quas, illum autem nulla pariatur dolorem voluptas dolorum quibusdam. Aliquid molestias incidunt ea iure illo quisquam fuga commodi aspernatur!</p>
    <p>Dolores laborum nisi, minima non saepe odio rerum, alias molestiae optio accusamus itaque. Id facilis quis quidem quod voluptate laborum. Sed odit laboriosam perspiciatis voluptatibus, quam expedita dignissimos ullam doloremque.</p>
    <p>Omnis similique deserunt explicabo reprehenderit? Est consequuntur vero voluptatem corrupti dolores nobis. Sed recusandae et vero optio distinctio repellendus a beatae unde, impedit architecto esse! Nisi velit atque iure labore.</p>
    <p>Cum deleniti totam eius, dolorem odio obcaecati assumenda! Possimus, molestias incidunt. Ipsum, atque. Explicabo dolores perferendis deserunt impedit provident, iste nihil ut! Consectetur expedita minima neque numquam veritatis fuga eligendi?</p>
    <h2>第10章</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error mollitia blanditiis eveniet non, dignissimos rem unde doloremque esse ab ea rerum nostrum illum corporis officia excepturi optio molestiae. Quos, architecto.</p>
    <p>Deleniti magnam odit aperiam illo eligendi quidem culpa eum pariatur eaque tempora itaque dolores ipsam eveniet hic obcaecati voluptatem nostrum, beatae fugiat dolor sint nisi. Aliquam ullam consequuntur ad perspiciatis.</p>
    <p>Molestias, debitis at aliquam obcaecati sunt praesentium enim, expedita eaque nostrum aperiam cupiditate fugit, quibusdam eius! Iste fuga minus, velit esse ipsam reprehenderit temporibus consequatur veniam culpa amet, asperiores earum.</p>
    <p>Quos, rem possimus nam tenetur facilis sit inventore obcaecati amet assumenda excepturi atque libero temporibus repellendus pariatur rerum molestiae. Accusantium inventore voluptatum voluptates aut velit illum culpa sequi repellat voluptate?</p>
    <p>Voluptas consequatur odio ipsa delectus inventore animi, quisquam, perspiciatis sapiente culpa harum ex ea rerum pariatur quod et. Tempora, veniam mollitia! Odio ipsa obcaecati maiores voluptatibus commodi mollitia veritatis expedita.</p>`;
function getHtmlOpenSection(str, regular) {
    let result, count = 0;
    while (regular.test(str)) {
        count++;
    }
    return count;
}


// console.log(getHtmlOpenSection(htmlStr, /<h2>[\u4e00-\u9fa5]\d+[\u4e00-\u9fa5]<\/h2>/g));



// 正则进阶部分 【1、捕获组 2、反向引用 3、正向断言（预查） 4、负向断言（预查）】

/**
 * 捕获组：用小括号包裹的部分叫捕获组，捕获组会出现在捕获结果中
 *        捕获组可以命名，叫做具名捕获组。语法：在捕获组括号内的最开始加上 ?<day> 表示给捕获组命名为day
 *        非捕获组：语法在捕获组括号内的最开始加上 ?: 表示是一个非捕获组，只是把小括号内的当成一个整体，并不会被捕获
 * 细节：捕获相对非捕获是会浪费性能
 */


/**
 * 得到字符串中的每一个日期以及每个日期的年月
 * @param {String} dateStr 一段日期字符串
 */
function getDateInfo(dateStr) {
    let dateArray = [], result;
    // 用小括号包裹的部分是捕获组,在捕获组括号最前面加上 ?<month> 表示给捕获组命名为month | 在捕获组括号内的最开始加上 ?: 表示是一个非捕获组，只是把小括号内的当成一个整体，并不会被捕获
    const reg = /(?<year>\d{4})-(?<month>\d{1,2})-(?:\d{1,2})/g;
    while (result = reg.exec(dateStr)) {
        // console.log(result);
        dateArray.push({
            s: result[0],
            year: result.groups.year,
            month: result.groups.month,
        })
    }
    console.log(dateArray);
}

// getDateInfo("2022-1-19,2000-9-8,2025-10-11,2024-03-02");

/**
 * 使用repalce将日期中的 - 转换成 / 
 * 
 * @param {String} dateStr 日期字符串
 */
function dateFormate(dateStr) {
    // 第一种方式
    // return dateStr.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g, (match, g1, g2, g3) => {
    //     return `${g1}/${g2}/${g3}`;
    // })
    // 第二种方式$1表示捕获组1，$2表示捕获组2，$3表示捕获组3
    return dateStr.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g, "$1/$2/$3");
}
// console.log(dateFormate("--2022-1-19-,--2000-9-8,- 2025-10-11,2024-03-02- --"));


/**
 * 反向引用：匹配重复出现的字符，语法 -> 在捕获组括号内末尾添加 ```\捕获组编号```
 * 例子：str1 = 1212; str2 = 1213;
 *       reg = /(\d\1)/;
 *       reg.test(str1);//true
 *       reg.test(str2);//false
 */
// const str = 1212;
// const reg = /(\d\2)/g;
// console.log(reg.test(str));



/**
 * 找到字符串中重复出现多次的字符
 * @param {String} str 字符串
 */
function findRepeatingCharacters(str) {
    const reg = /(?<char>[a-z])\1+/gi;
    // return str.match(reg, "$1")
    let result, characters = [];
    while (result = reg.exec(str)) {
        characters.push(result.groups.char)
    }
    return characters;
}
// console.log(findRepeatingCharacters("aaaaabbbbbbbbccccddddddddefgHHHH"));

/**
 * 将一串数字字符串从右至左每三位加一个英文逗号（5,622,342）
 * @param {String} str 一串数字字符串
 */
function func(str) {
    const reg = /\B(?=(\d{3})+$)/g;// 匹配空字符后面是否有连着3个数字
    return str.replace(reg, ","); // 空字符后面连着3个数字就将空字符替换成逗号
}

// console.log(func("562663"));

function func2(str) {
    const reg = /[a-zA-Z]+(?!\d+)/g;
    return str.match(reg);
}
// console.log(func2("asda324sd123ss123ff"))

/**
 * 校验密码强度
 * @param {String} pwd 密码
 */
function verifyPwdStrength(pwd) {

}
verifyPwdStrength("@")