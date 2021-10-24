export default {
    get: function (color) {
        return ["light", "info", "warning"].includes(color)
            ? "text-dark"
            : "text-white";
    }
}