<template>
    <div class="subpage_viewport">
        <button @click='getHotSearch'>get hot search</button>
        <p>{{hotSearch}}</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

// this.getHotSearch();
// console.log(this.$store.state.search.hotSearch);
export default {
    name: 'search',
    methods:{
        ...mapActions([
            'getHotSearch'
        ])
    },
    computed:{
        hotSearch: function(){
            console.log(this.$store.state.search.hotSearch);
            return this.$store.state.search.hotSearch;
        }
    }
}
</script>
