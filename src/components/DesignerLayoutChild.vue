<template>
  <draggable
    class="row min-size"
    :class="{ 'row-border': parent.type === 'row' }"
    :list="items"
    item-key="id"
    @add="onAdd"
    handle=".handle"
    delay="0"
    chosenClass="chosen"
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
      <DesignItem
        :key="element.id"
        class="position-relative"
        :class="element.type === 'column' ? `${element.className}` : ''"
        :parent="parent"
        :element="element"
        :index="index"
        :customFieldItems="customFieldItems"
        :items="items"
      />
    </template>
  </draggable>
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

<style>
.min-size {
  min-height: 50px;
}

.row-border {
  /* border-bottom: 2px dashed #d5d5d5; */
}
</style>