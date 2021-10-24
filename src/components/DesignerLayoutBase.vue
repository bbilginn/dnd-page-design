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
            id="nav-fields-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-fields"
            type="button"
            role="tab"
            aria-controls="nav-fields"
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
            :list="elements"
            item-key="id"
            ghost-class="ghost"
            v-bind="{
              group: { name: 'elements', pull: 'clone', put: 'false' },
              sort: false,
              disabled: false,
              animation: 300,
            }"
            :clone="onClone"
            class="btn-group-vertical col-12 gap-2"
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
          id="nav-fields"
          role="tabpanel"
          aria-labelledby="nav-fields-tab"
        >
          ...
        </div>
      </div>
    </aside>
    <main>
      <draggable
        :list="inUsedElements"
        class="inUsedArea"
        item-key="id"
        handle=".handle"
        ghost-class="ghost"
        v-bind="{
          group: 'elements',
          disabled: false,
          animation: 300,
        }"
      >
        <template #item="{ element, index }">
          <DesignItem
            :element="element"
            :index="index"
            :items="inUsedElements"
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

export default {
  name: "DesignerLayoutBase",
  components: {
    draggable,
    DesignItem,
  },
  data() {
    return {
      elements: [
        {
          type: "container",
          name: "Container",
          class: "container",
          container: true,
          items: [],
          hasTableGenerator: true,
          containerSize: "container-fluid",
        },
        {
          type: "row",
          name: "Row",
          class: "row",
          container: true,
          row: true,
          items: [],
          hasTableGenerator: true,
        },
        {
          type: "column",
          name: "Column",
          columnSize: 6,
          container: true,
          column: true,
          items: [],
          color: "light",
        },
        {
          type: "panel",
          name: "Panel",
          title: "Title-0",
          color: "light",
          columnSize: 12,
          container: true,
          items: [],
          hasTableGenerator: true,
          column: true,
        },
        { type: "tab", name: "Tab", container: true, items: [] },
        { type: "tabItem", name: "TabItem", container: true, items: [] },
      ],
      inUsedElements: [
        {
          type: "container",
          name: "Container",
          container: true,
          items: [],
          id: uuidv4(),
          hasTableGenerator: true,
          containerSize: "container-fluid",
        },
      ],
      liveHtml: "",
    };
  },
  watch: {
    inUsedElements: {
      handler(includedItems) {
        let index = includedItems.indexOf(
          includedItems.find((x) => x.type !== "container")
        );
        if (index >= 0) {
          includedItems.splice(index, 1);
          alert("Just container is accepted by root.");
        }
      },
      deep: true,
    },
  },
  methods: {
    onClone: function (el) {
      if (el.type == "container") {
        return {
          type: el.type,
          name: el.name,
          id: uuidv4(),
          container: true,
          items: [],
          hasTableGenerator: true,
          containerSize: "container-fluid",
        };
      } else if (el.type == "column") {
        return {
          type: el.type,
          columnSize: el.columnSize,
          name: el.name,
          id: uuidv4(),
          container: true,
          column: true,
          items: [],
          color: "light",
        };
      } else if (el.type == "row") {
        return {
          type: el.type,
          name: el.name,
          id: uuidv4(),
          container: true,
          row: true,
          items: [],
          hasTableGenerator: true,
        };
      } else if (el.type == "button") {
        return {
          type: el.type,
          name: el.name,
          id: uuidv4(),
          buttonText: "Submit",
          buttonType: "primary",
        };
      } else if (el.type == "panel") {
        return {
          id: uuidv4(),
          type: el.type,
          name: el.name,
          title: "Title-0",
          color: "light",
          columnSize: 12,
          container: true,
          items: [],
          hasTableGenerator: true,
          column: true,
        };
      } else if (el.type == "tab") {
        return {
          type: el.type,
          name: el.name,
          id: uuidv4(),
          container: true,
          items: [],
        };
      } else if (el.type == "tabItem") {
        return {
          type: el.type,
          name: el.name,
          id: uuidv4(),
          container: true,
          items: [],
        };
      }
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.row > [class^="col-"] {
  /* padding-top: 0.75rem;
  padding-bottom: 0.75rem; */
  background-color: rgba(166, 166, 166, 0.05);
  border: 1px solid rgba(66, 66, 66, 0.04);
}

[class^="container-"] {
  min-height: 25%;
}

.inUsedArea {
  border: 2px dashed #d5d5d5;
  padding: 0.1rem;
  height: 100vh;
}

.ghost {
  opacity: 0.4;
  background: #c8ebfb;
}

.root {
  display: flex;
  font-family: Open Sans, sans-serif;
}

aside {
  padding: 1rem 0rem;
  width: 15%;
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
  flex-basis: 85%;
  position: relative;
  margin-left: auto;
}

.offcanvas-start {
  width: 15% !important;
}
</style>