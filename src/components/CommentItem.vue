<template>
    <div class="list">
        <div v-for="(item,index) in list"
            :key="index"
            class="list_item"
            >
            <div class="item_user_avatar">
                <div>
                    <img :src="item.commentUser.avatarUrl" class="avatar_pic" />
                </div>
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
                    <span class="item_replied_icon"></span>
                    <a class="item_replied_user_nickname"
                        :href="MUserUrl(item.parentCommentUser.userId)"
                        target="_blank"
                        rel=noopener
                        >{{item.parentCommentUser.nickname}}</a>
                    <span class="item_replied_content">{{' : '+item.parentCommentContent}}</span>
                </div>
                <div class="item_main__footer">
                    <div class="footer__time">{{MTime(item.commentTime)}}</div>
                    <div class="footer__liked">
                        <i class="liked_icon" />
                        <span class="liked_number">{{MLikedCount(item.likedCount)}}</span>
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
       
    },
    methods: {
        MUserUrl(id) {
            return `https://music.163.com/#/user/home?id=${id}`;
        },
        MTime(time) {
            const nowDate = new Date();
            if (time.getFullYear() == nowDate.getFullYear()) {
                if (time.getMonth() == nowDate.getMonth() && time.getDate() == nowDate.getDate()) {
                    if (nowDate.getTime() - time.getTime() < 3600*1000 ) {
                        if (time.getMinutes() == nowDate.getMinutes()) {
                            return '刚刚';
                        } else {
                            return (Math.floor((nowDate.getTime()-time.getTime())/(1000*60))) + '分钟前';
                        }
                    } else {
                        return (time.getHours()<10 ? '0'+time.getHours() : time.getHours())+':'+(time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
                    }
                } else {
                    if (time.getMonth() == nowDate.getMonth() && time.getDate() == nowDate.getDate()-1) {
                        return '昨天'+(time.getHours<10? '0'+time.getHours() :time.getHours())+':'+(time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
                    } else {
                        return (time.getMonth()+1)+'月'+time.getDate()+'日 '+(time.getHours()<10?'0'+time.getHours(): time.getHours())+':'+(time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
                    }
                }
            }else {
                return time.getFullYear()+'年'+(time.getMonth()+1)+'月'+time.getDate()+'日 '+(time.getHours()<10?'0'+time.getHours():time.getHours())+':'+(time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes());
            }
        },
        MLikedCount(number) {
            if (number > 100000) {
                return (number/10000).toFixed(1) + '万';
            } else {
                return number;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    margin-right: 10px;
}
.list_item {
    position: relative;
    padding: 15px 5px;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
}
.item_user_avatar {
    display: inline-block;
    // width: 50px;
    // height: 50px;
    width: 8%;
    height: 0;
    padding-bottom: 8%;
    position: absolute;
}
.avatar_pic {
    width: 100%;
    height: 100%;
}
.item_main {
    display: inline-block;
    // margin-left: 55px;
    margin-left: 10%;
    width: 88%;
    padding-right: 10px;
}
.item_main__content {
    word-break: break-word;
}
.item_user_nickname {
    color: #999;
    cursor: pointer;
}
.item_replied_main {
    word-break: break-word;
    position: relative;
    padding: 8px 19px;
    margin-top: 10px;
    line-height: 20px;
    // background-color: rgba(244,244,244,.05);
    // border: 1px solid rgba(222,222,222,.05);
}
.item_replied_user_nickname {
    @extend .item_user_nickname;
}
.item_replied_content {
    color: #999;
}
.item_replied_icon {
    position: absolute;
    overflow: hidden;
    width: 16px;
    height: 10px;
    top: 0;
    transform: translate(-50%,-100%);
    &::after{
        content: '';
        position: absolute;
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        margin: -6px;
        // border: 1px solid rgba(222,222,222,.05);
        background: rgba(244,244,244,.05);
        transform: rotate(45deg);
        left: 50%;
        bottom: -4px
    }
}
.item_main__footer {
    line-height: 24px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
}
.footer__time {
    color: #999;
    line-height: 24px;
}
// .footer__liked {
//     margin-right: 20px;
// }
.liked_icon {
    margin-right: 5px;
    background-image: url('../assets/images/comment2X.png');
    width: 20px;
    height: 20px;
    background-size: 59.5px;
    display: inline-block;
    vertical-align: -4px;
    overflow: hidden;
    background-position: -30px -30px;
    cursor: pointer;
    &:hover{
        background-position: 0 -30px;
    }
}
</style>