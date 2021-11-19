<template>
  <div class="dropdown">
    <button
      class="btn btn-sm dropdown-toggle"
      :class="textColor"
      type="button"
      :id="`gesture-${item.id}`"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <fa icon="border-all" />
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li>
        <div class="table-sizer">
          <table ref="tableSizer">
            <tbody>
              <tr v-for="(row, rowIndex) in tableMatrix" :key="row">
                <td
                  @mouseover="sizer"
                  @click="maker"
                  v-for="(col, colIndex) in row"
                  :key="col"
                  :row-index="rowIndex + 1"
                  :col-index="colIndex + 1"
                  :ref="'col-' + col"
                ></td>
              </tr>
            </tbody>
          </table>
          <div class="text-center">
            <span>{{ numberOfRow }}</span>
            <span class="multiplication-sign">x</span>
            <span>{{ numberOfCol }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template> 

<script>
import { v4 as uuidv4 } from "uuid";
import panelTextColor from "./PanelTextColorPicker";

export default {
  props: ["item"],
  name: "DesignRowAndColGesture",
  data() {
    return {
      editItem: null,
      tableMatrix: [],
      selecteds: [],
      numberOfRow: 0,
      numberOfCol: 0,
    };
  },
  methods: {
    sizer: function (x) {
      let td = x.toElement ?? x.target ?? x.path[0];

      let rowIndex = (this.numberOfRow = td.getAttribute("row-index"));
      let colIndex = (this.numberOfCol = td.getAttribute("col-index"));

      for (let i = 1; i <= 144; i++) {
        this.$refs[`col-${i}`].style.background = "#efefef";
      }

      let selecteds = this.range(1, rowIndex).map((x, i) => {
        return {
          rowIndex: x,
          cell: this.range(1, colIndex).map((y) => {
            return i * 12 + y;
          }),
        };
      });

      selecteds.forEach((x) => {
        x.cell.forEach((y) => {
          this.$refs[`col-${y}`].style.background = "#6cafca";
        });
      });

      this.selecteds = selecteds;
    },
    maker: function () {
      if (this.editItem.items.length > this.selecteds.length) {
        let deletedRows = [...this.editItem.items.slice(this.selecteds.length)];
        deletedRows.forEach((x) => {
          this.$parent.deleteItem(this.editItem.items, x, true);
        });
      }

      let items = this.selecteds.map((x) => {
        let selectedColIndex = x.cell.length;
        let row = this.editItem.items[x.rowIndex - 1];
        if (row !== undefined) {
          let col = row.items[selectedColIndex - 1];
          if (col === undefined) {
            let newColsLen = selectedColIndex - row.items.length;
            for (let i = 0; i < newColsLen; i++) {
              row.items.push({
                id: uuidv4(),
                type: "column",
                name: "Column",
                columnSize: 0,
                classType: "col", // just type, eg: col, col-xl, col-md, etc.
                className: "col", // with or without size, eg: col-6, col-sm-12, etc.
                container: true,
                items: [],
              });
            }
            return row;
          } else {
            if (row.items.length - selectedColIndex > 0) {
              let selectedLastIndex = row.items.length - selectedColIndex;
              let restOfCols = selectedColIndex + selectedLastIndex;
              let deletedCols = [];
              for (let i = selectedColIndex; i < restOfCols; i++) {
                deletedCols.push(row.items[i]);
              }
              deletedCols.forEach((x) => {
                this.$parent.deleteItem(row.items, x, true);
              });
            }
            return row;
          }
        }

        return {
          type: "row",
          name: "Row",
          id: uuidv4(),
          container: true,
          row: true,
          items: x.cell.map(() => {
            return {
              id: uuidv4(),
              type: "column",
              name: "Column",
              columnSize: 0,
              classType: "col", // just type, eg: col, col-xl, col-md, etc.
              className: "col", // with or without size, eg: col-6, col-sm-12, etc.
              container: true,
              items: [],
            };
          }),
        };
      });
      this.editItem.items = items;
    },
    range: function (start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx);
    },
  },
  created: function () {
    this.editItem = this.item;
    for (let index = 1; index <= 12; index++) {
      let x = index * 12;
      this.tableMatrix.push(this.range(x - 11, x));
    }
  },
  computed: {
    textColor() {
      return panelTextColor.get(this.item);
    },
  },
};
</script>

<style>
.table-sizer {
  margin: 1px;
  position: relative;
  text-align: center;
}

.table-sizer table {
  border-collapse: separate;
  border-spacing: 2px;
}

.table-sizer td {
  cursor: pointer;
  height: 12px;
  width: 12px;
  border: 1.5px solid #acacac !important;
  border-radius: 1.5px;
  padding: 5px !important;
  background: #efefef;
}

.multiplication-sign {
  margin: 0 5px;
}
</style>