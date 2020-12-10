<template>
  <div class="home">
    <b-table
        :data="this.discs"
        :striped=true
        :debounce-search="100"
        class="dataTable">

      <b-table-column v-slot="props" field="name" label="Name" searchable sortable deb>
        <span class="discName">{{ props.row.name }}</span>
        <img class="discIcon" :src="'../../crowfall-images/images/disciplines/' + props.row.id + '.png'" :alt="props.row.id"/>
      </b-table-column>
      <b-table-column v-slot="props" field="type" label="Type" sortable>
        {{ props.row.type }}
      </b-table-column>
      <b-table-column v-slot="props" field="stats" label="Stats" width="400px" sortable searchable>
        <p v-for="stat in props.row.stats" :key="stat">
          {{ stat.name + ": " + stat.value }}
        </p>
      </b-table-column>
      <b-table-column v-slot="props" field="powers  " label="Powers" sortable searchable>
        <p v-for="power in props.row.grantsPowers" :key="power">
          {{ power.name + ": " + power.description }}
        </p>
        <p v-for="slot in props.row.grantsTrait" :key="slot">
          Grants Trait: {{ slot.name}}
        </p>
<!--        Grants Trait: {{ props.row.grantsTrait.map(trait => trait.name).join(", ") }}-->
      </b-table-column>
    </b-table>
  </div>
</template>

<script>
// @ is an alias to /src
// import gql from 'graphql-tag'
const axios = require('axios').default;

export default {
  name: 'Disciplines',
  components: {},
  // apollo: {
  //   discs: gql`
  //     query {
  //         allDisciplines {
  //           id
  //           name
  //         }
  //       }
  // `,
  // },
  data() {
    return {
      discs: {},
    }
  },
  created() {
  },
  mounted () {
    axios.get(
        'http://crow.gg',
        {
          params: {
            query: `
              {
                allDisciplines {
                  id
                  name
                  type
                  description
                  stats
                  grantsPowers
                  grantsTrait
                  grantsSlot
                }
              }
            `
          }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
    ).then(response => this.discs = response.data.data.allDisciplines)
  },
  computed: {
  }
}
</script>

<style lang="scss">
.discIcon {
  width: 50px;
  display: block;
  alignment: center;
}
.discName {
  font-weight: bold;
  text-align: center;
  alignment: center;
}
.dataTable {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border: 1px black;
  text-align: left;
}
</style>
