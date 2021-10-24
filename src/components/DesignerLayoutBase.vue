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
            :list="designItems"
            item-key="id"
            ghost-class="ghost"
            v-bind="{
              group: { name: 'designItems', pull: 'clone', put: 'false' },
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
          id="nav-custom-fields"
          role="tabpanel"
          aria-labelledby="nav-custom-fields-tab"
        >
          <draggable
            :list="customFields"
            item-key="id"
            ghost-class="ghost"
            v-bind="{
              group: { name: 'designItems', pull: true, put: 'false' },
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
      </div>
    </aside>
    <main>
      <draggable
        :list="designedItems"
        class="inUsedArea"
        item-key="id"
        @add="onAdd"
        handle=".handle"
        ghost-class="ghost"
        v-bind="{
          group: 'designItems',
          disabled: false,
          animation: 300,
        }"
        :move="checkMove"
      >
        <template #item="{ element, index }">
          <DesignItem
            :element="element"
            :index="index"
            :customFields="customFields"
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

export default {
  name: "DesignerLayoutBase",
  components: {
    draggable,
    DesignItem,
  },
  data() {
    return {
      designItems: [
        {
          type: "container",
          name: "Container",
          container: true,
          items: [],
          hasTableGenerator: true,
          className: "container-fluid",
        },
        {
          type: "row",
          name: "Row",
          container: true,
          row: true,
          items: [],
          hasTableGenerator: true,
        },
        {
          type: "column",
          name: "Column",
          columnSize: 0,
          classType: "col", // just type, eg: col, col-xl, col-md, etc.
          className: "col", // with or without size, eg: col-6, col-sm-12, etc.
          container: true,
          items: [],
          hasTableGenerator: true,
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
        },
        { type: "tab", name: "Tab", container: true, items: [] },
        { type: "tabItem", name: "TabItem", container: true, items: [] },
      ],
      customFields: [
        {
          type: "customField",
          customFieldType: "text",
          name: "Name",
          id: uuidv4(),
        },
        {
          type: "customField",
          customFieldType: "number",
          name: "Age",
          id: uuidv4(),
        },
        {
          type: "customField",
          customFieldType: "select",
          name: "Sex",
          id: uuidv4(),
        },
      ],
      designedItems: [
        {
          type: "container",
          name: "Container",
          container: true,
          items: [],
          id: uuidv4(),
          hasTableGenerator: true,
          className: "container-fluid",
        },
      ],
    };
  },
  watch: {
    designedItems: {
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
      let clonedElement = { ...el };
      clonedElement.id = uuidv4();
      return clonedElement;
    },
    onAdd: function () {
      // console.log(el.target.className);
    },
    checkMove(e) {
      console.log(e);
      return e.to.className !== "inUsedArea";
    },
  },
};
</script>

<style>
html {
  scroll-behavior: smooth;
}

.row > [class^="col"] {
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
</style>