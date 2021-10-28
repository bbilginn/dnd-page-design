<template>
  <div v-if="element.type === 'panel'">
    <div class="card">
      <div
        class="
          card-header
          d-flex
          justify-content-between
          align-items-center
          handle
        "
        :class="`bg-${element.color}`"
      >
        <div class="d-flex justify-content-between align-items-center">
          <DesignItemEdit :parent="parent" :item="element" v-if="noEdit" />
          <span :class="textColor"
            >{{ element.title ?? element.name }}
            <span
              class="position-absolute"
              style="font-size: 10px; top: 30px; left: 40px"
              v-if="element.columnSize !== undefined && element.columnSize > 1"
            >
              12/{{ element.columnSize }}
            </span>
          </span>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <DesignRowAndColGesture :item="element" v-if="showRowAndColGesture" />
          <button
            @click="deleteItem"
            type="button"
            class="btn btn-sm"
            :class="textColor"
          >
            &#x2715;
          </button>
        </div>
      </div>
      <div class="card-body">
        <DesignerLayoutChild
          :parent="element"
          :items="element.items"
          v-if="element.container == true"
        />
      </div>
    </div>
  </div>

  <div v-else-if="element.type === 'customField'" class="handle">
    <div
      :name-value="element.name"
      class="
        custom-field
        border border-1
        rounded
        bg-white
        d-flex
        justify-content-between
        align-items-center
        p-2
      "
    >
      <div class="d-flex justify-content-between align-items-center">
        <DesignItemEdit :parent="parent" :item="element" v-if="noEdit" />
        <span :class="textColor">{{ element.name }}</span>
        <span
          class="position-absolute"
          style="font-size: 10px; top: 40px; left: 40px"
          v-if="parent.columnSize !== undefined && parent.columnSize > 1"
        >
          12/{{ parent.columnSize }}
        </span>
      </div>
      <button
        :class="textColor"
        @click="deleteItem"
        type="button"
        class="btn btn-sm"
      >
        &#x2715;
      </button>
    </div>
  </div>

  <div v-else :class="[element.type === 'container' ? element.className : '']">
    <div
      v-if="showHeader"
      class="d-flex justify-content-between align-items-center handle"
    >
      <div class="d-flex justify-content-between align-items-center">
        <DesignItemEdit :parent="parent" :item="element" v-if="noEdit" />
        <span :class="textColor">
          {{ element.name }}
          <span
            style="font-size: 10px; margin-right: 2px"
            v-if="element.columnSize !== undefined && element.columnSize > 1"
          >
            12/{{ element.columnSize }}
          </span>
          <span
            style="font-size: 10px"
            v-if="
              element.classType !== undefined &&
              element.classType !== 'col' &&
              element.columnSize > 1
            "
          >
            {{ element.classType }}
          </span>
        </span>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <DesignRowAndColGesture :item="element" v-if="showRowAndColGesture" />
        <button
          :class="textColor"
          @click="deleteItem"
          type="button"
          class="btn btn-sm text-dark"
        >
          &#x2715;
        </button>
      </div>
    </div>
    <DesignerLayoutChild
      :parent="element"
      :customFieldItems="customFieldItems"
      :items="element.items"
      v-if="element.container == true"
    />
  </div>
</template>

<script>
import DesignerLayoutChild from "./DesignerLayoutChild.vue";
import DesignItemEdit from "./DesignItemEdit.vue";
import DesignRowAndColGesture from "./DesignRowAndColGesture.vue";
import panelTextColor from "./PanelTextColorPicker";

export default {
  props: ["parent", "element", "index", "customFieldItems", "items"],
  name: "DesignItem",
  components: {
    DesignerLayoutChild,
    DesignItemEdit,
    DesignRowAndColGesture,
  },
  data() {
    return {
      editItems: [],
      editcustomFieldItems: [],
    };
  },
  created: function () {
    this.editItems = this.items;
    this.editcustomFieldItems = this.customFieldItems;
  },
  methods: {
    deleteItem: function () {
      let recoveredcustomFieldItems = [];
      function recoverAllChildcustomFieldItems(element) {
        if (element && element.items?.length > 0) {
          element.items.forEach((child) => {
            if (child.type === "customField") {
              recoveredcustomFieldItems.push(child);
            }
            recoverAllChildcustomFieldItems(child);
          });
        }
      }
      let elementChildItems = this.element?.items ?? [];
      let elementLength = elementChildItems.length;
      let message = `Element has ${elementLength} child item${
        elementLength > 1 ? "s" : ""
      }. Are you sure?`;
      if (elementLength === 0 || window.confirm(message)) {
        if (this.element.type === "customField") {
          this.editcustomFieldItems.push(this.element);
        }
        recoverAllChildcustomFieldItems(this.element);
        this.editcustomFieldItems.push(...recoveredcustomFieldItems);
        this.editItems.splice(this.index, 1);
      }
    },
  },
  computed: {
    noEdit() {
      return this.element.type !== "row";
    },
    textColor() {
      return panelTextColor.get(this.element);
    },
    showHeader() {
      return (
        this.element.type == "container" || this.element.items?.length === 0
      );
    },
    showRowAndColGesture() {
      return (
        this.element.hasTableGenerator !== undefined &&
        (this.element.columnSize === 0 ||
          this.element.columnSize > 2 ||
          this.element.type === "container")
      );
    },
  },
};
</script>

<style>
.card-header {
  padding-right: 0.2rem !important;
}

.pointer {
  cursor: pointer;
}

.customField {
  /* border: 1px solid red;
  height: 100%;
  vertical-align: bottom;
  align-content: center; */
}
</style>