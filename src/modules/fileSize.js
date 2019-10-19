import printLog from './printLog';

/**
 * 处理文件大小
 *  
 * @param {String | Number} size 字节大小
 * @param {Number} index 字节单位下标
 */
function fileSize(size, index) {
    index = index || 0;

    let units = ["b", "Kb", "Mb", "Gb", "Tb"];
    let unit = units[index];

    // 大于1024Tb退出
    if (index === units.length) {
        return size + unit;
    }

    // 检测size类型
    if (typeof size !== 'number') {
        try {
            size = parseInt(size);
        } catch (error) {
            return size;
        }
    }


    // 如果size大于等于当前单位，即大于等于1024，将进行递归处理
    if (size >= 1024) {
        return fileSize(Math.floor(size / 1024 * 100) / 100, index + 1);
    } else {
        return size + unit;
    }
}
export default fileSize;