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
        <span>{{ element.name }}</span>
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

  <div v-else-if="element.type === 'alert'">
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
          <span>
            {{ element.name }}
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
      <div class="px-2">
        <div class="alert" :class="`alert-${element.color}`" role="alert">
          <h4 v-if="element.title !== ''" class="alert-heading">
            {{ element.title }}
          </h4>
          <div class="d-flex align-items-center">
            <fa
              v-if="element.icon !== ''"
              :icon="element.icon"
              size="lg"
              class="me-1"
            />
            <div v-html="element.message" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="element.type === 'border'">
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
          <span>
            {{ element.name }}
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

      <div class="border p-3 mx-2 mb-2" :class="[`border-${element.color}`, element.borderClass]">
        <DesignerLayoutChild
          :parent="element"
          :customFieldItems="customFieldItems"
          :items="element.items"
        />
      </div>
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
          <span>
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
                <button
                  class="btn"
                  @click="addNewChildItem(`${element.type}Item`)"
                >
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
                <div v-html="item.content"></div>
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

  <div v-else-if="element.type === 'accordion'">
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
          <span>
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
        <div class="accordion" :id="`accordion-${element.id}`">
          <div
            class="accordion-item"
            v-for="(item, index) in element.items"
            :key="item.id"
          >
            <h2 class="accordion-header" :id="`header-${item.id}`">
              <button
                class="accordion-button"
                :class="{ collapsed: index !== 0 }"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="`#collapse-${item.id}`"
                :aria-expanded="index === 0"
                :aria-controls="`collapse-${item.id}`"
              >
                {{ item.name }}
              </button>
            </h2>
            <div
              :id="`collapse-${item.id}`"
              class="accordion-collapse collapse"
              :class="{ show: index === 0 }"
              :aria-labelledby="`header-${item.id}`"
              :data-bs-parent="`#accordion-${element.id}`"
            >
              <div class="accordion-body">
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
                <div
                  v-if="item.content !== ''"
                  v-html="item.content"
                  class="mb-3"
                />
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
        <span>
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
      childItemIndex: 0,
    };
  },
  created: function () {
    this.editItems = this.items;
    this.editcustomFieldItems = this.customFieldItems;
    this.childItemIndex = this.editItem?.items?.length ?? 0;
  },
  methods: {
    deleteItem: function (items, deleted, autoConfirmed = false) {
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
      let message = `${
        deleted?.name ?? "Element"
      } has ${elementLength} child item${
        elementLength > 1 ? "s" : ""
      }. Are you sure?`;
      if (elementLength === 0 || autoConfirmed || window.confirm(message)) {
        if (deleted?.type === "customField") {
          this.editcustomFieldItems?.push(deleted);
        }
        recoverAllChildcustomFieldItems(deleted);
        this.editcustomFieldItems?.push(...recoveredcustomFieldItems);
        let index = items?.indexOf(deleted);
        items?.splice(index, 1);
      }
    },
    addNewChildItem: function (type) {
      console.log(type);
      this.childItemIndex++;
      this.editItem.items.push({
        id: uuidv4(),
        type: type,
        name: `Item #${this.childItemIndex}`,
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
        this.element.columnSize === 0 ||
        this.element.columnSize > 2 ||
        this.element.type === "container" ||
        this.element.type === "row"
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

.alert {
  margin-bottom: 0.5rem !important;
}

.customField {
  /* border: 1px solid red;
  height: 100%;
  vertical-align: bottom;
  align-content: center; */
}
</style>