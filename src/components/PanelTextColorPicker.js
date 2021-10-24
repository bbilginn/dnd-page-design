export default {
    get: function (element) {
        if (element.color === undefined) {
            return "text-dark";
        }
        return ["light", "info", "warning"].includes(element.color)
            ? "text-dark"
            : "text-white";
    }
}