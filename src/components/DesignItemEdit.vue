<template>
  <div>
    <div
      @click="addFlexPosition"
      class="pointer"
      :class="{ textColor, 'text-dark': item.type === 'container' }"
      data-bs-toggle="offcanvas"
      :data-bs-target="`#offcanvas-${editItem.id}`"
      :aria-controls="`offcanvas-${editItem.id}`"
    >
      <fa icon="edit" />
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
        <div class="mb-3" v-if="editItem.type === 'panel'">
          <label :for="`title-input-${editItem.id}`" class="form-label"
            >Title</label
          >
          <input
            type="text"
            class="form-control"
            :id="`title-input-${editItem.id}`"
            placeholder="Title"
            v-model="editItem.title"
          />
        </div>
        <div class="mb-3" v-if="editItem.columnSize !== undefined">
          <label :for="`colRange-${editItem.id}`" class="form-label"
            >Column Range (12/{{ editItem.columnSize }})</label
          >
          <input
            type="range"
            class="form-range"
            :id="`colRange-${editItem.id}`"
            min="1"
            max="12"
            v-model="editItem.columnSize"
          />
        </div>
        <div class="mb-3" v-if="editItem.type === 'panel'">
          <label :for="`header-color-${editItem.id}`" class="form-label"
            >Header Color</label
          >
          <br />
          <div
            :id="`header-color-${editItem.id}`"
            class="btn-group-vertical col-12 gap-2"
          >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`primary-outlined-${editItem.id}`"
              autocomplete="off"
              value="primary"
              v-model="editItem.color"
              :checked="editItem.color === 'primary'"
            />
            <label
              class="btn btn-outline-primary"
              :for="`primary-outlined-${editItem.id}`"
              >bg-primary</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`secondary-outlined-${editItem.id}`"
              autocomplete="off"
              value="secondary"
              v-model="editItem.color"
              :checked="editItem.color === 'secondary'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`secondary-outlined-${editItem.id}`"
              >bg-secondary</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`success-outlined-${editItem.id}`"
              autocomplete="off"
              value="success"
              v-model="editItem.color"
              :checked="editItem.color === 'success'"
            />
            <label
              class="btn btn-outline-success"
              :for="`success-outlined-${editItem.id}`"
              >bg-success</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`danger-outlined-${editItem.id}`"
              autocomplete="off"
              value="danger"
              v-model="editItem.color"
              :checked="editItem.color === 'danger'"
            />
            <label
              class="btn btn-outline-danger"
              :for="`danger-outlined-${editItem.id}`"
              >bg-danger</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`warning-outlined-${editItem.id}`"
              autocomplete="off"
              value="warning"
              v-model="editItem.color"
              :checked="editItem.color === 'warning'"
            />
            <label
              class="btn btn-outline-warning"
              :for="`warning-outlined-${editItem.id}`"
              >bg-warning</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`info-outlined-${editItem.id}`"
              autocomplete="off"
              value="info"
              v-model="editItem.color"
              :checked="editItem.color === 'info'"
            />
            <label
              class="btn btn-outline-info"
              :for="`info-outlined-${editItem.id}`"
              >bg-info</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`light-outlined-${editItem.id}`"
              autocomplete="off"
              value="light"
              v-model="editItem.color"
              :checked="editItem.color === 'light'"
            />
            <label
              class="btn btn-outline-light text-dark"
              style="border: 1px solid #d5d5d5"
              :for="`light-outlined-${editItem.id}`"
              >bg-light</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`header-color-${editItem.id}`"
              :id="`dark-outlined-${editItem.id}`"
              autocomplete="off"
              value="dark"
              v-model="editItem.color"
              :checked="editItem.color === 'dark'"
            />
            <label
              class="btn btn-outline-dark"
              :for="`dark-outlined-${editItem.id}`"
              >bg-dark</label
            >
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
          >
            <input
              type="radio"
              class="btn-check"
              :name="`container-size-${editItem.id}`"
              :id="`container-fluid-outlined-${editItem.id}`"
              autocomplete="off"
              value="container-fluid"
              v-model="editItem.containerSize"
              :checked="editItem.containerSize === 'container-fluid'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`container-fluid-outlined-${editItem.id}`"
              >container-fluid</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`container-size-${editItem.id}`"
              :id="`container-sm-outlined-${editItem.id}`"
              autocomplete="off"
              value="container-sm"
              v-model="editItem.containerSize"
              :checked="editItem.containerSize === 'container-sm'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`container-sm-outlined-${editItem.id}`"
              >container-sm</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`container-size-${editItem.id}`"
              :id="`container-md-outlined-${editItem.id}`"
              autocomplete="off"
              value="container-md"
              v-model="editItem.containerSize"
              :checked="editItem.containerSize === 'container-md'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`container-md-outlined-${editItem.id}`"
              >container-md</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`container-size-${editItem.id}`"
              :id="`container-lg-outlined-${editItem.id}`"
              autocomplete="off"
              value="container-lg"
              v-model="editItem.containerSize"
              :checked="editItem.containerSize === 'container-lg'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`container-lg-outlined-${editItem.id}`"
              >container-lg</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`container-size-${editItem.id}`"
              :id="`container-xl-outlined-${editItem.id}`"
              autocomplete="off"
              value="container-xl"
              v-model="editItem.containerSize"
              :checked="editItem.containerSize === 'container-xl'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`container-xl-outlined-${editItem.id}`"
              >container-xl</label
            >
            <input
              type="radio"
              class="btn-check"
              :name="`container-size-${editItem.id}`"
              :id="`container-xxl-outlined-${editItem.id}`"
              autocomplete="off"
              value="container-xxl"
              v-model="editItem.containerSize"
              :checked="editItem.containerSize === 'container-xxl'"
            />
            <label
              class="btn btn-outline-secondary"
              :for="`container-xxl-outlined-${editItem.id}`"
              >container-xxl</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import panelTextColor from "./PanelTextColorPicker";

export default {
  props: ["item"],
  name: "DesignItemEdit",
  data() {
    return {
      editItem: null,
    };
  },
  created: function () {
    this.editItem = this.item;
  },
  mounted: function () {
    var offCanvas = document.getElementById(`offcanvas-${this.editItem.id}`);
    offCanvas.addEventListener("hidden.bs.offcanvas", function () {
      offCanvas.style.position = "absolute";
    });
  },
  methods: {
    addFlexPosition: function () {
      document.getElementById(`offcanvas-${this.editItem.id}`).style.position =
        "fixed";
    },
  },
  computed: {
    textColor() {
      return panelTextColor.get(this.editItem.color);
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