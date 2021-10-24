<template>
  <div class="card" v-if="element.type === 'panel'">
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
        <DesignItemEdit :item="element" v-if="noEdit" />
        {{ element.title ?? element.name }}
        <span
          style="font-size: 10px; position: absolute; top: 30px; left: 40px"
          v-if="element.columnSize !== undefined"
        >
          (12/{{ element.columnSize }})
        </span>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <DesignRowAndColGesture
          :item="element"
          v-if="element.hasTableGenerator && element.columnSize > 2"
        />
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

  <div v-else style="position:relative;" :class="element.containerSize">
    <div
      v-if="element.type == 'container' || element.items.length === 0"
      class="d-flex justify-content-between align-items-center handle"
    >
      <div class="d-flex justify-content-between align-items-center">
        <DesignItemEdit :item="element" v-if="noEdit" />
        {{ element.title ?? element.name }}
        <span style="font-size: 10px" v-if="element.columnSize !== undefined">
          (12/{{ element.columnSize }})
        </span>
      </div>
      <div class="btn-group btn-group-sm" role="group">
        <DesignRowAndColGesture
          :item="element"
          v-if="element.hasTableGenerator || element.columnSize > 2"
        />
        <button @click="deleteItem" type="button" class="btn btn-sm text-dark">
          &#x2715;
        </button>
      </div>
    </div>
    <DesignerLayoutChild
      :parent="element"
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
  props: ["element", "index", "items"],
  name: "DesignItem",
  components: {
    DesignerLayoutChild,
    DesignItemEdit,
    DesignRowAndColGesture,
  },
  data() {
    return {
      editItems: [],
    };
  },
  created: function () {
    this.editItems = this.items;
  },
  methods: {
    deleteItem: function () {
      let elementLength = this.editItems[this.index].items.length;
      let message = `Element has ${elementLength} child item${
        elementLength > 1 ? "s" : ""
      }. Are you sure?`;
      if (elementLength === 0 || window.confirm(message)) {
        this.editItems.splice(this.index, 1);
      }
    },
  },
  computed: {
    noEdit() {
      return this.element.type !== "row";
    },
    textColor() {
      return panelTextColor.get(this.element.color);
    },
  },
};
</script>

<style>
.element-tools {
  display: flex;
  position: relative;
  top: 0.5rem;
  right: 1rem;
}
.card-header {
  padding-right: 0.2rem !important;
}
.pointer {
  cursor: pointer;
}
.btn-group {
  right: 0;
  position: absolute;
}
</style>