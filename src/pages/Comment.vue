<template>
    <div class="subpage_viewport">
        <div class="hot_comment" v-if="comments.offset == 0">
            <div class="hot_comment__title">热门评论</div>
            <CommentItem :list="comments.hotComments" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CommentItem from '../components/CommentItem';

export default {
    name: 'Comment',
    components: {
        CommentItem
    },
    computed: {
        ...mapState({
            comments: state => state.comment.comments
        })
    }
}
</script>

<style lang="scss" scoped>
.subpage_viewport {
    height: 90%;
    overflow-x: hidden;
    overflow-y: auto;
}
.hot_comment {
    margin-bottom: 20px;
}
.hot_comment__title {
    margin-bottom: 10px;
}
</style>