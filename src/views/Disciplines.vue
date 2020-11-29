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
      <b-table-column v-slot="props" field="stats" label="Stats" centered sortable searchable>
        {{ props.row.stats }}
      </b-table-column>
      <b-table-column v-slot="props" field="powers  " label="Powers" centered sortable searchable>
        Powers: {{ props.row.grantsPowers.map(power => power.name + ": " + power.description) }}<br/>
        Slots: {{ props.row.grantsSlot.map(power => power.name + ": " + power.description) }}<br/>
        Traits: {{ props.row.grantsTrait.map(power => power.name + ": " + power.description) }}
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Disciplines',
  components: {},
  data() {
    return {
      discs: {},
    }
  },
  created() {
    const loadJson = function () {

      // Need to pass string literals when calling Node Require because of Webpack
      // https://github.com/webpack/webpack/issues/10567
      this.discs = getJsonInDirectory(require.context('../../public/crowfall-data/data/discipline', true, /\.json$/));
      this.powers = getJsonInDirectory(require.context('../../public/crowfall-data/data/power', true, /\.json$/));

      function getJsonInDirectory(requireContext) {
        const json = {};
        requireContext.keys().forEach((filepath) => {
          const jsonContent = requireContext(filepath);

          function createNestedObject(base, names, value) {
            // If a value is given, remove the last name and keep it for later:
            const lastName = arguments.length === 3 ? names.pop() : false;

            // Walk the hierarchy, creating new objects where needed.
            // If the lastName was removed, then the last object is not set yet:
            for (let i = 0; i < names.length; i++) {
              base = base[names[i]] = base[names[i]] || {};
            }

            // If a value was given, set it to the last name:
            if (lastName) base = base[lastName] = value;

            // Return the last object in the hierarchy:
            return base;
          }

          // File path example: ./disciplines/major/adjudicator.json
          const pathParts = filepath.split('/');
          const objectStructure = pathParts.slice(1, pathParts.length - 1);
          const objectName = pathParts.pop().split('.').shift(); // Remove .json suffix off filename
          objectStructure.push(objectName); // Add file name (minus .json) to object struct

          // console.log("Struct: " + objectStructure);
          // console.log("Value: " + obj);

          createNestedObject(json, objectStructure, jsonContent)
        })

        return json;
      }

    }.bind(this);
    loadJson();
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
