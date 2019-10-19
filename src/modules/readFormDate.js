/**
 * @param {Array<File>} files 文件集合
 */
export default files => {
    const formData = new FormData();

    files.forEach((file, index) => {
        formData.append("file_" + index, file);
    });

    return formData;
}