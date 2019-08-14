<template>
    <div class="list">
        <div v-for="(item,index) in list"
            :key="index"
            class="list_item"
            >
            <div class="item_user_avatar">
                <img :src="item.commentUser.avatarUrl" class="avatar_pic" />
            </div>
            <div class="item_main">
                <div class="item_main__content">
                    <a class="item_user_nickname" 
                        :href="MUserUrl(item.commentUser.userId)"
                        target="_blank"
                        rel=noopener
                        >{{item.commentUser.nickname}}</a>
                    <span class="item_content_comment">{{' : '+item.content}}</span>
                </div>
                <div v-if="item.isRepliedFor" class="item_replied_main">
                    <span class="item_replied_user_nickname">{{item.parentCommentUser.nickname}}</span>
                    <span class="item_replied_content">{{' : '+item.parentCommentContent}}</span>
                </div>
                <div class="item_main__footer">
                    <div class="footer__time">{{CTime}}</div>
                    <div class="footer__liked">
                        <i class="liked_icon" />
                        <span class="liked_number">{{item.likedCount}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentItem',
    props: {
        list: {
            type: Array,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        CTime() {
            return 'time';
        },
    },
    methods: {
        MUserUrl(id) {
            return `https://music.163.com/#/user/home?id=${id}`;
        }
    }
}
</script>

<style lang="scss" scoped>
.list_item {
    position: relative;
    padding: 15px 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
}
.item_user_avatar {
    display: inline-block;
    width: 50px;
    height: 50px;
    position: absolute;
}
.avatar_pic {
    width: 100%;
    height: 100%;
}
.item_main {
    display: inline-block;
    margin-left: 55px;
    padding-right: 10px;
}
.item_main__content {
    word-break: break-word;
}
.item_user_nickname {
    color: #999;
    cursor: pointer;
}
</style>