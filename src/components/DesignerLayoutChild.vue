<template>
  <div>
    <draggable
      class="row"
      style="min-height: 60px"
      :list="items"
      item-key="id"
      @add="onAdd"
      handle=".handle"
      ghost-class="ghost"
      v-bind="{
        group: 'designItems',
        disabled: false,
        animation: 300,
        swapThreshold: 0.75,
      }"
      :disabled="locked"
      :move="checkMove"
    >
      <template #item="{ element, index }">
        <div
          :key="element.id"
          :class="element.type === 'column' ? `${element.className}` : 'col-12'"
        >
          <DesignItem
            :parent="parent"
            :element="element"
            :index="index"
            :customFieldItems="customFieldItems"
            :items="items"
          />
        </div>
      </template>
    </draggable>
  </div>
</template> 

<script>
import draggable from "vuedraggable";
import DesignItem from "./DesignItem.vue";

export default {
  props: ["parent", "customFieldItems", "items"],
  name: "DesignerLayoutChild",
  components: {
    draggable,
    DesignItem,
  },
  beforeCreate() {
    this.$options.components.DesignItem = require("./DesignItem.vue").default;
  },
  methods: {
    onAdd: function () {
      this.$emit("childAdded");
      // console.log("emit");
    },
    checkMove(e) {
      // if (
      //   e.draggedContext.element.type === "customField" &&
      //   this.parent.type !== "column"
      // ) {
      //   return false;
      // }

      console.log(this.parent.type);
      console.log(e);
      return true;
    },
  },
  computed: {
    locked() {
      return false; //this.parent.type === "container" || this.parent.type === "row";
    },
  },
};
</script>