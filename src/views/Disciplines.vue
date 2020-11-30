<template>
  <div class="home">
    <b-field group-multiline grouped>
      <div class="control">
      </div>
    </b-field>
    <b-table
        :data="this.discList"
        :striped=true
        :debounce-search="100">

      <b-table-column v-slot="props" field="name" label="Name" centered searchable sortable deb>
        <span class="discName">{{ props.row.name }}</span>
        <img class="discIcon" :src="'../../crowfall-images/images/disciplines/' + props.row.id + '.png'" :alt="props.row.id"/>
      </b-table-column>
      <b-table-column v-slot="props" field="type" label="Type" centered sortable>
        {{ props.row.type }}
      </b-table-column>
      <b-table-column v-slot="props" field="stats" label="Stats" width="400px" centered sortable searchable>
        <p v-for="stat in props.row.stats" :key="stat">
          {{ stat.name + ": " + stat.value }}
        </p>
      </b-table-column>
      <b-table-column v-slot="props" field="powers  " label="Powers" centered sortable searchable>
        <p v-for="power in props.row.grantsPowers" :key="power">
          {{ power.name + ": " + power.description }}
        </p>
        <p v-for="slot in props.row.grantsSlot" :key="slot">
          Grants Slot: {{ slot.name + ": " + slot.description }}
        </p>
        <p v-for="trait in props.row.grantsTrait" :key="trait">
          Grants Trait: {{ trait.name }}
        </p>
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src
import {getJsonInDirectory} from "@/assets/js/helpers";

export default {
  name: 'Disciplines',
  components: {},
  data() {
    return {
      discs: {},
    }
  },
  created() {
    // Need to pass string literals when calling Node Require because of Webpack
    // https://github.com/webpack/webpack/issues/10567
    this.discs = getJsonInDirectory(require.context('../../public/crowfall-data/data/discipline', true, /\.json$/));
  },
  computed: {
    discList: function () {
      let list = [];
      for (let discName in this.discs.major) {
        list.push(this.discs.major[discName])
      }
      return list;
    }
  }
}
</script>

<style lang="scss">
.discIcon {
  width: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.discName {
  font-weight: bold;
}
</style>
