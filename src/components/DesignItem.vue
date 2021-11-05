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
              class="fw-lighter"
              style="font-size: 10px"
              v-if="element.columnSize !== undefined && element.columnSize > 1"
            >
              12/{{ element.columnSize }}
            </span>
          </span>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <DesignRowAndColGesture :item="element" v-if="showRowAndColGesture" />
          <button
            @click="deleteItem(editItems, element)"
            type="button"
            class="btn btn-sm"
            :class="textColor"
          >
            &#x2715;
          </button>
        </div>
      </div>
      <div class="card-body" :class="{ collapse: element.isCollapsed }">
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
          class="fw-lighter"
          style="font-size: 10px"
          v-if="parent.columnSize !== undefined && parent.columnSize > 1"
        >
          12/{{ parent.columnSize }}
        </span>
      </div>
      <button
        @click="deleteItem(editItems, element)"
        type="button"
        class="btn btn-sm text-dark"
      >
        &#x2715;
      </button>
    </div>
  </div>

  <div v-else-if="element.type === 'tab'">
    <div class="border rounded">
      <div
        class="
          d-flex
          justify-content-between
          align-items-center
          handle
          pt-1
          ps-3
        "
      >
        <div class="d-flex justify-content-between align-items-center">
          <DesignItemEdit :parent="parent" :item="element" v-if="noEdit" />
          <span :class="textColor">
            {{ element.name }}
            <span
              class="fw-lighter"
              style="font-size: 10px"
              v-if="element.columnSize !== undefined && element.columnSize > 1"
            >
              12/{{ element.columnSize }}
            </span>
          </span>
        </div>
        <div class="btn-group btn-group-sm" role="group">
          <button
            @click="deleteItem(editItems, element)"
            type="button"
            class="btn btn-sm text-dark"
          >
            &#x2715;
          </button>
        </div>
      </div>
      <div class="p-2">
        <div class="card">
          <div class="card-header">
            <div
              class="nav card-header-tabs"
              :class="[
                element.tabType,
                { 'nav-justified': element.isJustified },
                { 'pb-2': element.tabType === 'nav-pills' },
                { 'border-0': element?.items?.length === 0 },
              ]"
              :id="element.id"
              role="tablist"
            >
              <button
                v-for="(item, index) in element.items"
                :key="item.id"
                class="nav-link"
                :class="{ active: index === 0 }"
                :id="`nav-${index}-tab`"
                data-bs-toggle="tab"
                :data-bs-target="`#nav-${item.id}`"
                :aria-controls="item.id"
                type="button"
                role="tab"
                aria-selected="true"
              >
                {{ item.name }}
              </button>
              <div class="ps-1 pe-2">
                <button class="btn" @click="addNewTabItem">
                  <fa icon="plus" class="text-success" />
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="tab-content" :id="`nav-tabContent-${element.id}`">
              <div
                v-for="(item, index) in element.items"
                :key="item.id"
                class="tab-pane fade"
                :class="{ 'show active': index === 0 }"
                :id="`nav-${item.id}`"
                role="tabpanel"
                :aria-labelledby="`nav-${item.id}-tab`"
              >
                <div class="d-flex justify-content-end align-items-center">
                  <div class="btn-group btn-group-sm" role="group">
                    <DesignRowAndColGesture :item="item" />
                    <button
                      @click="deleteItem(element.items, item)"
                      type="button"
                      class="btn btn-sm text-dark"
                    >
                      &#x2715;
                    </button>
                  </div>
                </div>
                <DesignerLayoutChild
                  :parent="item"
                  :customFieldItems="customFieldItems"
                  :items="item.items"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
            class="fw-lighter me-1"
            style="font-size: 10px"
            v-if="element.columnSize !== undefined && element.columnSize > 1"
          >
            12/{{ element.columnSize }}
          </span>
          <span
            class="fw-lighter"
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
          @click="deleteItem(editItems, element)"
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
import { v4 as uuidv4 } from "uuid";

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
      editItem: this.element,
      editItems: [],
      editcustomFieldItems: [],
      tabItemIndex: 0,
    };
  },
  created: function () {
    this.editItems = this.items;
    this.editcustomFieldItems = this.customFieldItems;
    this.tabItemIndex = this.editItem?.items?.length ?? 0;
  },
  methods: {
    deleteItem: function (items, deleted) {
      let recoveredcustomFieldItems = [];
      function recoverAllChildcustomFieldItems(el) {
        if (el && el.items?.length > 0) {
          el.items.forEach((child) => {
            if (child.type === "customField") {
              recoveredcustomFieldItems.push(child);
            }
            recoverAllChildcustomFieldItems(child);
          });
        }
      }
      let elementChildItems = deleted?.items ?? [];
      let elementLength = elementChildItems.length;
      let message = `Element has ${elementLength} child item${
        elementLength > 1 ? "s" : ""
      }. Are you sure?`;
      if (elementLength === 0 || window.confirm(message)) {
        if (deleted.type === "customField") {
          this.editcustomFieldItems?.push(deleted);
        }
        recoverAllChildcustomFieldItems(deleted);
        this.editcustomFieldItems?.push(...recoveredcustomFieldItems);
        let index = items.indexOf(deleted);
        items.splice(index, 1);
      }
    },
    addNewTabItem: function () {
      this.tabItemIndex++;
      this.editItem.items.push({
        id: uuidv4(),
        type: "tabItem",
        name: `Item-${this.tabItemIndex}`,
        container: true,
        items: [],
      });
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