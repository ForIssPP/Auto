export default function (url, data) {
    return $.ajax({
        url: `/${url}`,
        method: "GET",
        dataType: "JSON",
        data
    });
}