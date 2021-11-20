<template>
  <draggable
    class="row min-size"
    :class="[{ 'row-border': parent.type === 'row' }, `element-${parent.type}`]"
    :list="items"
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
    :disabled="locked"
    :move="onMove"
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
import onMove from "./helpers/OnMove";

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
    onMove(element) {
      return onMove.check(element);
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

/* .row-border {
  border-bottom: 2px dashed #d5d5d5;
} */
</style>