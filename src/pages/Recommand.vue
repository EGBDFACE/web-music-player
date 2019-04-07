<template>
    <div class="subpage_viewport">
        <button @click='getRecommand'>get</button>
        <p>Recommand</p>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'Recommand',
    methods: {
        ...mapActions([
            'getRecommand'
        ])
    }
}
</script>

