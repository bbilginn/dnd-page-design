<template>
  <div class="text-dark" style="cursor: default">
    <div
      @click="addFlexPosition"
      class="pointer"
      data-bs-toggle="offcanvas"
      :data-bs-target="`#offcanvas-${editItem.id}`"
      :aria-controls="`offcanvas-${editItem.id}`"
    >
      <fa icon="edit" v-if="editItem.type === 'panel'" :class="{ textColor }" />
      <fa icon="edit" v-else />
    </div>

    <div
      class="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabindex="-1"
      :id="`offcanvas-${editItem.id}`"
      :aria-labelledby="`offcanvas-${editItem.id}-label`"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" :id="`offcanvas-${editItem.id}-label`">
          Edit Item
        </h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div
          class="mb-3"
          v-if="editItem.type === 'panel' || editItem.type === 'alert'"
        >
          <label :for="`title-input-${editItem.id}`" class="form-label"
            >Title</label
          >
          <input
            type="text"
            class="form-control"
            :id="`title-input-${editItem.id}`"
            placeholder="Title"
            v-model="editItem.title"
            @click="$event.target.select()"
          />
        </div>
        <div class="mb-3" v-if="editItem.type === 'alert'">
          <label :for="`icon-input-${editItem.id}`" class="form-label"
            >Icon</label
          >
          <input
            type="text"
            class="form-control"
            :id="`icon-input-${editItem.id}`"
            placeholder="info-circle"
            v-model="editItem.icon"
            @click="$event.target.select()"
          />
          <div :id="`icon-${editItem.id}`" class="form-text">
            Please copy-paste an icon value from <a
              href="https://fontawesome.com/v5.15/icons?d=gallery&p=1&m=free"
              target="_blank"
              >fontawesome</a
            >.            
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'alert'">
          <label :for="`message-input-${editItem.id}`" class="form-label"
            >Message</label
          >
          <textarea
            type="text"
            class="form-control"
            :id="`message-input-${editItem.id}`"
            placeholder="Your message"
            v-model="editItem.message"
            @click="$event.target.select()"
          />
        </div>
        <div class="mb-3" v-if="showColumnRanger">
          <label :for="`colRange-${editItem.id}`" class="form-label"
            >Column Range (12/{{ editItem.columnSize }})</label
          >
          <input
            type="range"
            class="form-range"
            :id="`colRange-${editItem.id}`"
            min="0"
            max="12"
            v-model="editItem.columnSize"
            :aria-describedby="`range-help-${editItem.id}`"
          />
          <div :id="`range-help-${editItem.id}`" class="form-text">
            If you set it to "0" it will be free across the other columns.
            <br />
            <a
              href="https://getbootstrap.com/docs/5.1/layout/grid/"
              target="_blank"
              >See the document</a
            >
          </div>
        </div>
        <div class="mb-3" v-if="editItem.color !== undefined">
          <label :for="`color-${editItem.id}`" class="form-label">Color</label>
          <br />

          <div
            :id="`color-${editItem.id}`"
            class="btn-group-vertical col-12 gap-2"
            :aria-describedby="`container-help-${editItem.id}`"
          >
            <div
              class="btn-group-vertical col-12 gap-2"
              v-for="(colorClass, index) in colors"
              :key="index"
            >
              <input
                type="radio"
                class="btn-check"
                :name="`color-${editItem.id}`"
                :id="`${colorClass}-outlined-${editItem.id}`"
                autocomplete="off"
                :value="colorClass"
                v-model="editItem.color"
                :checked="editItem.color === colorClass"
              />
              <label
                :class="`btn btn-outline-${colorClass}`"
                :style="colorClass === 'light' ? 'border: 1px solid black' : ''"
                :for="`${colorClass}-outlined-${editItem.id}`"
                >{{ colorClass }}</label
              >
            </div>
          </div>
          <div :id="`color-${editItem.id}`" class="form-text">
            Set your color of the item.
            <br />
            <a
              href="https://getbootstrap.com/docs/5.1/customize/color/#theme-colors"
              target="_blank"
              >See the document</a
            >
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'panel'">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="`collapsed-${editItem.id}`"
              :value="editItem.isCollapsed"
              v-model="editItem.isCollapsed"
              :checked="editItem.isCollapsed"
            />
            <label class="form-check-label" :for="`collapsed-${editItem.id}`"
              >Collapsed
            </label>
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'container'">
          <label :for="`container-size-${editItem.id}`" class="form-label"
            >Size</label
          >
          <br />
          <div
            :id="`container-size-${editItem.id}`"
            class="btn-group-vertical col-12 gap-2"
            :aria-describedby="`container-help-${editItem.id}`"
          >
            <div
              class="btn-group-vertical col-12 gap-2"
              v-for="(containerClassName, index) in containerClassTypes"
              :key="index"
            >
              <input
                type="radio"
                class="btn-check"
                :name="`container-size-${editItem.id}`"
                :id="`${containerClassName}-outlined-${editItem.id}`"
                autocomplete="off"
                :value="containerClassName"
                v-model="editItem.className"
                :checked="editItem.className === containerClassName"
              />
              <label
                class="btn btn-outline-secondary"
                :for="`${containerClassName}-outlined-${editItem.id}`"
                >{{ containerClassName }}</label
              >
            </div>
          </div>
          <div :id="`container-help-${editItem.id}`" class="form-text">
            Set your viewport of container.
            <br />
            <a
              href="https://getbootstrap.com/docs/5.1/layout/containers/"
              target="_blank"
              >See the document</a
            >
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'column'">
          <label :for="`column-size-${editItem.id}`" class="form-label"
            >Size</label
          >
          <br />
          <div
            :id="`column-size-${editItem.id}`"
            class="btn-group-vertical col-12 gap-2"
            :aria-describedby="`column-help-${editItem.id}`"
          >
            <div
              class="btn-group-vertical col-12 gap-2"
              v-for="(columnClassName, index) in columnClassTypes"
              :key="index"
            >
              <input
                type="radio"
                class="btn-check"
                :name="`column-size-${editItem.id}`"
                :id="`${columnClassName}-outlined-${editItem.id}`"
                autocomplete="off"
                :value="columnClassName"
                v-model="editItem.classType"
                :checked="editItem.classType === columnClassName"
              />
              <label
                class="btn btn-outline-secondary"
                :for="`${columnClassName}-outlined-${editItem.id}`"
                >{{ columnClassName }}</label
              >
            </div>
          </div>
          <div :id="`column-help-${editItem.id}`" class="form-text">
            Set your viewport of columns.
            <br />
            <a
              href="https://getbootstrap.com/docs/5.1/layout/grid/#how-it-works"
              target="_blank"
              >How it work</a
            >
            -
            <a
              href="https://getbootstrap.com/docs/5.1/layout/grid/#grid-options"
              target="_blank"
              >Grid options</a
            >
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'tab'">
          <label :for="`tab-type-${editItem.id}`" class="form-label"
            >Type</label
          >
          <br />
          <div
            :id="`tab-type-${editItem.id}`"
            class="btn-group-vertical col-12 gap-2"
          >
            <div
              class="btn-group-vertical col-12 gap-2"
              v-for="(columnClassName, index) in tabTypes"
              :key="index"
            >
              <input
                type="radio"
                class="btn-check"
                :name="`tab-type-${editItem.id}`"
                :id="`${columnClassName}-outlined-${editItem.id}`"
                autocomplete="off"
                :value="columnClassName"
                v-model="editItem.tabType"
                :checked="editItem.tabType === columnClassName"
              />
              <label
                class="btn btn-outline-secondary"
                :for="`${columnClassName}-outlined-${editItem.id}`"
                >{{ columnClassName }}</label
              >
            </div>
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'tab'">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="`tab-justify-${editItem.id}`"
              :value="editItem.isJustified"
              v-model="editItem.isJustified"
              :checked="editItem.isJustified"
            />
            <label class="form-check-label" :for="`tab-justify-${editItem.id}`"
              >Justified
            </label>
          </div>
        </div>
        <div class="mb-3" v-if="editItem.type === 'tab'">
          <label :for="`tab-item-${editItem.id}`" class="form-label"
            >Tab Items</label
          >
          <br />

          <draggable
            tag="ul"
            :list="editItem.items"
            item-key="id"
            ghost-class="ghost"
            handle=".handle"
            v-bind="{
              group: { name: 'items' },
              sort: true,
              disabled: false,
              animation: 300,
            }"
            class="list-group"
          >
            <template #item="{ element }">
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                "
              >
                <fa icon="arrows-alt-v" class="handle" />
                <input
                  type="text"
                  class="form-control mx-2"
                  v-model="element.name"
                  @click="$event.target.select()"
                />
                <button
                  @click="this.$parent.deleteItem(editItem.items, element)"
                  type="button"
                  class="btn btn-sm text-dark position-absolute end-0"
                >
                  &#x2715;
                </button>
              </li>
            </template>

            <template #footer>
              <div class="btn-group" role="group">
                <button class="btn" @click="this.$parent.addNewTabItem">
                  <fa icon="plus" class="text-success" />
                </button>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import panelTextColor from "./PanelTextColorPicker";
import draggable from "vuedraggable";

export default {
  props: ["parent", "item"],
  name: "DesignItemEdit",
  components: {
    draggable,
  },
  data() {
    return {
      editItem: null,
      editParent: null,
      containerClassTypes: [
        "container",
        "container-sm",
        "container-md",
        "container-lg",
        "container-xl",
        "container-xxl",
        "container-fluid",
      ],
      columnClassTypes: [
        "col",
        "col-xs",
        "col-sm",
        "col-md",
        "col-lg",
        "col-xl",
        "col-xxl",
      ],
      colors: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
      ],
      tabTypes: ["nav-pills", "nav-tabs"],
    };
  },
  created: function () {
    this.editItem = this.item;
    this.editParent = this.parent;
  },
  mounted: function () {
    var offCanvas = document.getElementById(`offcanvas-${this.editItem.id}`);
    offCanvas.addEventListener("hidden.bs.offcanvas", function () {
      offCanvas.style.position = "absolute";
    });
  },
  watch: {
    editItem: {
      handler(editedItem) {
        if (editedItem?.columnSize !== undefined) {
          editedItem.className =
            editedItem.columnSize > 0
              ? `${editedItem.classType}-${editedItem.columnSize}`
              : editedItem.classType;

          if (
            (editedItem.type === "tab" ||
              editedItem.type === "panel" ||
              editedItem.type === "customField") &&
            this.editParent &&
            this.editParent.type === "column"
          ) {
            this.editParent.columnSize = editedItem?.columnSize;
            this.editParent.className =
              this.editParent.columnSize > 0
                ? `${this.editParent.classType}-${editedItem.columnSize}`
                : this.editParent.classType;
          }
        }
      },
      deep: true,
    },
  },
  methods: {
    addFlexPosition: function () {
      document.getElementById(`offcanvas-${this.editItem.id}`).style.position =
        "fixed";
    },
  },
  computed: {
    textColor() {
      return panelTextColor.get(this.editItem);
    },
    showColumnRanger() {
      if (
        (this.editItem.columnSize !== undefined &&
          this.editParent &&
          this.editParent.type !== "column" &&
          this.editItem.type !== "column") ||
        this.editItem.type === "alert"
      ) {
        return false;
      }
      return true;
    },
  },
};
</script>
<style scoped>
.offcanvas {
  position: absolute;
}
.pointer {
  margin-right: 5px;
}
</style>