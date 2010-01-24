/**
 * @module  selector
 * @author  lifesinger@gmail.com
 * @depends kissy
 */

KISSY.add('dom-selector', function(S, undefined) {

    var doc = document,
        STRING = 'string',
        SPACE = ' ',
        ANY = '*',
        REG_ID = /^#[\w-]+$/,
        REG_QUERY = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;

    /**
     * Retrieves an Array of HTMLElement based on the given CSS selector.
     * @param {string} selector
     * @param {string|HTMLElement} context An id string or a HTMLElement used as context
     * @return {Array} The array of found HTMLElement
     */
    function query(selector, context) {
        var match, t, ret = [], id, tag, cls;

        // Ref: http://ejohn.org/blog/selectors-that-people-actually-use/
        // 考虑 2/8 原则，仅支持以下选择器：
        // #id
        // tag
        // .cls
        // #id tag
        // #id .cls
        // tag.cls
        // #id tag.cls
        // 注 1：REG_QUERY 还会匹配 #id.cls 无效值
        // 注 2：tag 可以为 * 字符
        // 返回值为数组
        // 选择器无效或参数异常时，返回空数组

        // selector 为字符串是最常见的情况，优先考虑
        // 注：空白字符串无需判断，运行下去自动能返回空数组
        if (typeof selector === STRING) {
            selector = S.trim(selector);

            // selector 为 #id 是最常见的情况，特殊优化处理
            if (REG_ID.test(selector)) {
                t = getElementById(selector.slice(1));
                if (t) ret = [t]; // #id 无效时，返回空数组
            }
            // selector 为支持列表中的其它 6 种
            else if (match = REG_QUERY.exec(selector)) { // NOTICE: assignment
                // 获取匹配出的信息
                id = match[1];
                tag = match[2];
                cls = match[3];

                if (context = id ? getElementById(id) : tuneContext(context)) { // NOTICE: assignment

                    // #id .cls | #id tag.cls | .cls | tag.cls
                    if (cls) {
                        if (!id || selector.indexOf(SPACE) !== -1) { // 排除 #id.cls
                            ret = getElementsByClassName(cls, tag, context);
                        }
                    }
                    // #id tag | tag
                    else if (tag) { // 排除空白字符串
                        ret = getElementsByTagName(context, tag);
                    }
                }
            }
        }
        // 传入的 selector 是 Node
        else if (selector && selector.nodeType) {
            ret = [selector];
        }
        // 传入的 selector 是 NodeList
        else if (selector && selector.item) {
            ret = selector;
        }
        // 传入的 selector 是其它值时，返回空数组

        // 将 NodeList 转换为普通数组，并添加上 DOM 方法
        return attach(ret.item ? makeArray(ret) : ret);
    }

    // 调整 context 为合理值
    function tuneContext(context) {
        // 1). context 为 undefined 是最常见的情况，优先考虑
        if (context === undefined) {
            context = doc;
        }
        // 2). context 的第二使用场景是传入 #id
        else if (typeof context === STRING && REG_ID.test(context)) {
            context = getElementById(context.slice(1));
            // 注：#id 可能无效，这时获取的 context 为 null
        }
        // 3). context 还可以传入 HTMLElement, 此时无需处理
        // 4). 经历 1 - 3, 如果 context 还不是 HTMLElement, 赋值为 null
        else if (context && context.nodeType !== 1 && context.nodeType !== 9) {
            context = null;
        }
        return context;
    }

    // query #id
    function getElementById(id) {
        return doc.getElementById(id);
    }

    // query tag
    function getElementsByTagName(el, tag) {
        return el.getElementsByTagName(tag);
    }

    (function() {
        // Check to see if the browser returns only elements
        // when doing getElementsByTagName('*')

        // Create a fake element
        var div = doc.createElement('div');
        div.appendChild(doc.createComment(''));

        // Make sure no comments are found
        if (div.getElementsByTagName(ANY).length > 0) {
            getElementsByTagName = function(el, tag) {
                var ret = el.getElementsByTagName(tag);

                if (tag === ANY) {
                    var t = [], i = 0, j = 0, node;
                    while(node = ret[i++]) { // NOTICE: assignment
                        // Filter out possible comments
                        if(node.nodeType === 1) {
                            t[j++] = node;
                        }
                    }
                    ret = t;
                }
                return ret;
            };
        }
    })();

    // query .cls
    function getElementsByClassName(cls, tag, context) {
        var els = context.getElementsByTagName(tag || ANY),
            ret = [], i = 0, j = 0, len = els.length, el, t;

        cls = SPACE + cls + SPACE;
        for (; i < len; ++i) {
            el = els[i];
            t = el.className;
            if (t && (SPACE + t + SPACE).indexOf(cls) > -1) {
                ret[j++] = el;
            }
        }
        return ret;
    }

    // 用原生的 getElementsByClassName
    if (doc.getElementsByClassName) {
        getElementsByClassName = function(cls, tag, context) {
            var els = context.getElementsByClassName(cls),
                ret = els, i = 0, j = 0, len = els.length, el;

            if (tag && tag !== ANY) {
                ret = [];
                tag = tag.toUpperCase();
                for (; i < len; ++i) {
                    el = els[i];
                    if (el.tagName === tag) {
                        ret[j++] = el;
                    }
                }
            }
            return ret;
        }
    }
    // 用原生的 querySelectorAll
    else if (doc.querySelectorAll) {
        getElementsByClassName = function(cls, tag, context) {
            return context.querySelectorAll((tag ? tag : '') + '.' + cls);
        }
    }

    // 将 NodeList 转换为普通数组
    function makeArray(nodeList) {
        return Array.prototype.slice.call(nodeList);
    }

    // ie 不支持用 slice 转换 NodeList, 降级到普通方法
    try {
        makeArray(doc.documentElement.childNodes);
    }
    catch(e) {
        makeArray = function(nodeList) {
            var ret = [], i = 0, len = nodeList.length;
            for (; i < len; ++i) {
                ret[i] = nodeList[i];
            }
            return ret;
        }
    }

    // 添加实用方法到 arr 上
    function attach(arr) {
        return S.mix(arr, S.Dom);
    }

    // public api
    S.query = S.Dom.query = query;
});

/**
 * Notes:
 *
 * 2010.01
 *  - 对 reg exec 的结果(id, tag, className)做 cache, 发现对性能影响很小，去掉
 *  - getElementById 使用频率最高，使用直达通道优化
 *  - getElementsByClassName 性能优于 querySelectorAll, 但 IE 系列不支持
 *  - new Node() 即便 Node 很简单，在大量循环下，对性能也会有明显降低
 *  - instanceof 对性能有影响
 *  - 内部方法的参数，比如 cls, context 等的异常情况，已经在 query 方法中有保证，无需冗余“防卫”
 *  - query 方法第一天写了近 100 行；第二天发现能简化到 50 行；一觉醒来，发现还可以进一步精简到
 *    30 行以下。突然萌发兴趣去查 jQuery 的历史代码，求证是否有类似经历……
 *  - query 方法中的条件判断考虑了“频率优先”原则。最有可能出现的情况放在前面
 *  - Array 的 push 方法可以用 j++ 来替代，性能有提升
 *  - 返回值策略和 Sizzle 一致，正常时，返回数组；其它所有情况，返回空数组
 *  - 从压缩角度考虑，还可以将 getElmentsByTagName 和 getElementsByClassName 定义为常量，
 *    不过感觉这样做太“压缩控”了，还是保留不替换
 *
 * Bugs:
 *  - S.query('#test-data *') 等带 * 号的选择器，在 IE6 下返回的值不对。jQuery 等类库也有此 bug, 诡异
 *
 * References:
 *  - http://ejohn.org/blog/selectors-that-people-actually-use/
 *  - http://ejohn.org/blog/thoughts-on-queryselectorall/
 *  - MDC: querySelector, querySelectorAll, getElementsByClassName
 *  - Sizzle: http://github.com/jeresig/sizzle
 *  - MINI: http://james.padolsey.com/javascript/mini/
 *  - Peppy: http://jamesdonaghue.com/?p=40
 *  - Sly: http://github.com/digitarald/sly
 *  - XPath, TreeWalker：http://www.cnblogs.com/rubylouvre/archive/2009/07/24/1529640.html
 */