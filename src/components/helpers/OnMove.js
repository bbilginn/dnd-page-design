export default {
    check: function (element) {
        let to = element.to;
        let draggedElement = element.draggedContext.element;
        let hasChildNodes = to.hasChildNodes();

        switch (draggedElement.type) {
            case 'customField':
                return to.classList.contains("custom-field-items") || to.classList.contains("element-column") && !hasChildNodes;

            case 'container':
                return to.classList.contains("designed-items");

            case 'row':
                return !to.classList.contains("designed-items");

            case 'column':
                return to.classList.contains("element-row") && to.childNodes.length < 12;

            case 'panel':
            case 'tab':
            case 'accordion':
            case 'alert':
            case 'border':
                return to.classList.contains("element-column") && !hasChildNodes;
        }

        return true;
    }
}