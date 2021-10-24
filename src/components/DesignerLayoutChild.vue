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
        group: 'elements',
        disabled: false,
        animation: 300,
      }"
      :disabled="locked"
      :move="checkMove"
    >
      <template #item="{ element, index }">
        <div
          :key="element.id"
          :class="[element.column ? `col-${element.columnSize}` : 'col-12']"
        >
          <DesignItem :element="element" :index="index" :items="items" />
        </div>
      </template>
    </draggable>
  </div>
</template> 

<script>
import draggable from "vuedraggable";
import DesignItem from "./DesignItem.vue";

export default {
  props: ["parent", "items"],
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
    },
    checkMove(e) {
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