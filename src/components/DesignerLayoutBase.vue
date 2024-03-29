<template>
  <div class="root">
    <aside>
      <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            class="nav-link active"
            id="nav-designer-items-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-designer-items"
            type="button"
            role="tab"
            aria-controls="nav-designer-items"
            aria-selected="true"
          >
            Design Items
          </button>
          <button
            class="nav-link"
            id="nav-custom-fields-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-custom-fields"
            type="button"
            role="tab"
            aria-controls="nav-custom-fields"
            aria-selected="false"
          >
            Fields
          </button>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="nav-designer-items"
          role="tabpanel"
          aria-labelledby="nav-designer-items-tab"
        >
          <draggable
            class="design-items btn-group-vertical col-12 gap-2"
            :list="designItems"
            item-key="id"
            ghost-class="ghost"
            v-bind="{
              group: { name: 'element-group', pull: 'clone', put: false },
              sort: false,
              disabled: false,
              animation: 300,
            }"
            :clone="onClone"
            :move="onMove"
          >
            <template #item="{ element }">
              <button type="button" class="btn btn-outline-secondary">
                {{ element.name }}
              </button>
            </template>
          </draggable>
        </div>
        <div
          class="tab-pane fade"
          id="nav-custom-fields"
          role="tabpanel"
          aria-labelledby="nav-custom-fields-tab"
        >
          <input
            class="form-control mb-3"
            placeholder="Type to search..."
            v-model="searchText"
          />
          <draggable
            class="custom-field-items min-vh-100"
            :list="filteredcustomFieldItems"
            item-key="id"
            ghost-class="ghost"
            v-bind="{
              group: 'element-group',
              sort: true,
              disabled: false,
              animation: 300,
            }"
            :move="onMove"
          >
            <template #item="{ element }">
              <button type="button" class="m-1 btn btn-outline-secondary">
                {{ element.name }}
              </button>
            </template>
          </draggable>
        </div>
      </div>
    </aside>
    <main>
      <draggable
        :list="designedItems"
        class="designed-items"
        item-key="id"
        handle=".handle"
        chosenClass="chosen"
        ghost-class="ghost"
        v-bind="{
          group: 'element-group',
          disabled: false,
          animation: 300,
          swapThreshold: 0.6,
          filter: '.locked-element',
        }"
        :move="onMove"
      >
        <template #item="{ element, index }">
          <DesignItem
            :parent="null"
            :element="element"
            :index="index"
            :customFieldItems="customFieldItems"
            :items="designedItems"
          ></DesignItem>
        </template>
      </draggable>
    </main>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import DesignItem from "./DesignItem.vue";
import { v4 as uuidv4 } from "uuid";
import onMove from "./helpers/OnMove";

export default {
  name: "DesignerLayoutBase",
  components: {
    draggable,
    DesignItem,
  },
  data() {
    return {
      searchText: "",
      designItems: [
        {
          type: "container",
          name: "Container",
          container: true,
          items: [],
          className: "container-fluid",
        },
        {
          type: "row",
          name: "Row",
          container: true,
          row: true,
          items: [],
        },
        {
          type: "column",
          name: "Column",
          columnSize: 0,
          classType: "col", // just type, eg: col, col-xl, col-md, etc.
          className: "col", // with or without size, eg: col-6, col-sm-12, etc.
          container: true,
          items: [],
        },
        {
          type: "panel",
          name: "Panel",
          title: "Title",
          color: "light",
          columnSize: 0,
          container: true,
          items: [],
          isCollapsed: false,
        },
        {
          type: "tab",
          name: "Tab",
          columnSize: 0,
          tabType: "nav-tabs",
          isJustified: false,
          items: [
            {
              id: uuidv4(),
              type: "tabItem",
              name: "Item #1",
              container: true,
              items: [],
            },
          ],
        },
        {
          type: "accordion",
          name: "Accordion",
          columnSize: 0,
          items: [
            {
              id: uuidv4(),
              type: "accordionItem",
              name: "Item #1",
              content: "",
              container: true,
              items: [],
            },
          ],
        },
        {
          type: "alert",
          name: "Alert",
          title: "",
          message: "A simple primary alert—check it out!",
          icon: "",
          color: "primary",
          columnSize: 0,
        },
        {
          type: "border",
          name: "Border",
          columnSize: 0,
          color: "",
          borderClass: "",
          container: true,
          items: [],
          isCollapsed: false,
        },
      ],
      customFieldItems: [
        {
          id: uuidv4(),
          type: "customField",
          customFieldType: "text",
          name: "Name",
          columnSize: 0,
        },
        {
          id: uuidv4(),
          type: "customField",
          customFieldType: "number",
          name: "Age",
          columnSize: 0,
        },
        {
          id: uuidv4(),
          type: "customField",
          customFieldType: "select",
          name: "Sex",
          columnSize: 0,
        },
        {
          id: uuidv4(),
          type: "customField",
          customFieldType: "select",
          name: "City",
          columnSize: 0,
        },
        {
          id: uuidv4(),
          type: "customField",
          customFieldType: "select",
          name: "Position",
          columnSize: 0,
        },
        {
          id: uuidv4(),
          type: "customField",
          customFieldType: "bool",
          name: "IsActive",
          columnSize: 0,
        },
      ],
      filteredcustomFieldItems: [],
      designedItems: [
        {
          type: "container",
          name: "Container",
          container: true,
          items: [],
          id: uuidv4(),
          className: "container-fluid",
        },
      ],
    };
  },
  created: function () {
    this.filteredcustomFieldItems = this.customFieldItems;
  },
  watch: {
    // designedItems: {
    //   handler(includedItems) {
    //     console.log(includedItems);
    //   },
    //   deep: true,
    // },
    searchText: {
      handler(text) {
        this.filteredcustomFieldItems = this.customFieldItems;
        this.filteredcustomFieldItems = this.customFieldItems.filter((x) => {
          return x.name.toLowerCase().includes(text.toLowerCase());
        });
        if (text.length === 0) {
          return;
        }
        let customFields = document.getElementsByClassName("custom-field");
        customFields.forEach((element) => {
          if (element.getAttribute("name-value").toLowerCase().includes(text)) {
            element.classList.remove("bg-white");
            element.classList.add("bg-info");
            setTimeout(() => {
              element.classList.remove("bg-info");
              element.classList.add("bg-white");
            }, 500);
          }
        });
      },
    },
  },
  methods: {
    onClone: function (el) {
      let clonedElement = JSON.parse(JSON.stringify(el));
      clonedElement.id = uuidv4();

      if (clonedElement.type === "tab") {
        clonedElement.items.forEach((x) => {
          x["id"] = uuidv4();
        });
      }

      return clonedElement;
    },
    onMove: function (element) {
      return onMove.check(element);
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.row > [class*="col"] {
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  background-color: rgba(166, 166, 166, 0.05);
  border: 1px solid rgba(66, 66, 66, 0.04);
}

/* .row:empty {
  background-color: white;
} */

[class*="container"] {
  min-height: 25%;
}

.designed-items {
  padding: 0.1rem;
  height: 100vh;
}

.ghost {
  opacity: 0.4;
  background: #c8ebfb;
  border: 2px dashed red !important;
}

/* .chosen {
  opacity: 0.4;
  background: #c8ebfb;
  border: 2px dashed red !important;
} */

.root {
  display: flex;
  font-family: Open Sans, sans-serif;
}

aside {
  padding: 1rem 0rem;
  width: 16%;
  background: white;
  height: 100vh;
  box-shadow: 1px 0 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  z-index: 2;
}

aside .tab-pane {
  padding: 1rem 2rem;
}

main {
  flex-basis: 84%;
  position: relative;
  margin-left: auto;
}

.offcanvas-start {
  width: 16% !important;
}

.handle {
  cursor: move;
}
</style>