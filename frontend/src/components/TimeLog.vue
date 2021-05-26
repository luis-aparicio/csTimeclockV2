<template>
  <div>
    <b-table
      :items="items"
      :fields="fields"
      :select-mode="selectMode"
      sticky-header="stickyHeader"
      style="max-height: 23rem;"
      responsive
      ref="selectableTable"
      selectable
      @row-selected="onRowSelected"
    >
    </b-table>
  </div>
</template>

<script>
  export default {
    name: "TimeLog",
    props: ["user","showAll"],
    watch: {
    async user(newValue) {
      if(!this.showAll)
      this.items = newValue.filter(log => log.period == "current");
      else 
      this.items = newValue;
    }
  },
    data() {
      return {
        fields: [{ key: "state", label: "State" }, { key: "moment", label: "Stamp"}, {key: "hours", label: "Total"}],
        items: [],
        selectMode: 'single',
        selected: []
      }
    },
    methods: {
      onRowSelected(items) {
        this.selected = items
        this.$emit('selected', items);
      },
      selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
      },
      clearSelected() {
        this.$refs.selectableTable.clearSelected()
      }
    }
  }
</script>