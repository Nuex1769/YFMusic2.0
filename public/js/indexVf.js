// export default Array.prototype.getIndex = function(item) {
//     for (var i = 0; i < this.length; i++) {
//         if (this[i].id == item.id) {
//             return i;
//         }

//     }
// }

export default function indexVf(arr, item) {
    var results = '',
        len = arr.length,
        pos = 0;
    while (pos < len) {
        pos = arr.indexOf(item, pos); //从pos处开始查询下一个元素所在的位置
        if (pos == -1) break;
        results = pos;
        pos++;
    }
    return results;
}
